import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import type { Connect, Plugin, ResolvedConfig } from 'vite'

import { legacyRedirects, legalPageTitles } from '../src/content/seo.ts'
import { fullAddress, site } from '../src/content/site.ts'
import { localizePath } from '../src/i18n/paths.ts'
import { alternatesFor, getPageSeo, indexablePaths } from '../src/lib/seo.ts'
import type { Language } from '../src/i18n/index.ts'

const languages: Array<Language> = ['es', 'en']

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function renderHead(path: string, lang: Language) {
  const page = getPageSeo(path, lang)
  const tags = page.tags.map(({ tag, attrs, text }) => {
    const rendered = Object.entries(attrs)
      .map(([key, value]) => `${key}="${escapeHtml(value)}"`)
      .join(' ')
    if (tag === 'script') {
      return `<script data-seo ${rendered}>${text}</script>`
    }
    return `<${tag} data-seo ${rendered} />`
  })
  return [`<title>${escapeHtml(page.title)}</title>`, ...tags].join('\n    ')
}

/** Contenido mínimo para rastreadores que no ejecutan JavaScript. */
function renderNoscript(path: string, lang: Language) {
  const page = getPageSeo(path, lang)
  const links = indexablePaths()
    .map((target) => {
      const label = getPageSeo(target, lang).title
      return `<li><a href="${localizePath(target, lang)}">${escapeHtml(label)}</a></li>`
    })
    .join('')
  return `<noscript><h1>${escapeHtml(page.title)}</h1><p>${escapeHtml(page.description)}</p><p>${escapeHtml(site.name)}, ${escapeHtml(fullAddress)}. <a href="${site.phone.href}">${escapeHtml(site.phone.display)}</a></p><ul>${links}</ul></noscript>`
}

/** El fondo del hero es el LCP de la portada; sin esto el navegador no lo ve hasta ejecutar React. */
function renderLcpPreload(path: string) {
  if (path !== '/') return ''
  return `<link rel="preload" as="image" href="${encodeURI(site.hero.backdrop)}" fetchpriority="high" />\n    `
}

function renderPage(
  template: string,
  path: string,
  lang: Language,
  fontPreloads: string,
) {
  return template
    .replace(/<html lang="[^"]*"/, `<html lang="${lang}"`)
    .replace(/<title>[\s\S]*?<\/title>\s*/, '')
    .replace(/<meta\s+data-seo[\s\S]*?\/>\s*/, '')
    .replace(
      '</head>',
      `  ${renderLcpPreload(path)}${fontPreloads}${renderHead(path, lang)}\n  </head>`,
    )
    .replace(
      '<div id="app">',
      `${renderNoscript(path, lang)}\n    <div id="app">`,
    )
}

/** `/contact-us` → `contact-us.html`: los hosts lo sirven sin redirigir a la URL con barra final. */
function htmlFile(path: string) {
  return path === '/' ? 'index.html' : `${path.slice(1)}.html`
}

/** Google trata un `meta refresh` inmediato como redirección permanente; funciona en cualquier host estático. */
function renderRedirect(target: string) {
  const url = `${site.url}${target}`
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>${escapeHtml(site.name)}</title>
    <link rel="canonical" href="${url}" />
    <meta http-equiv="refresh" content="0; url=${target}" />
  </head>
  <body>
    <a href="${target}">${url}</a>
  </body>
</html>
`
}

function urlFor(path: string, lang: Language) {
  return alternatesFor(path).find((item) => item.hreflang === lang)?.href
}

function renderSitemap(paths: Array<string>) {
  const entries = paths.flatMap((path) =>
    languages.map((lang) => {
      const alternates = alternatesFor(path)
      const loc = urlFor(path, lang)
      const links = alternates
        .map(
          (item) =>
            `    <xhtml:link rel="alternate" hreflang="${item.hreflang}" href="${item.href}" />`,
        )
        .join('\n')
      return `  <url>\n    <loc>${loc}</loc>\n${links}\n  </url>`
    }),
  )
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`
}

/** Formato de https://llmstxt.org: H1, resumen y listas de enlaces bajo H2. */
function renderLlmsTxt(paths: Array<string>) {
  const list = (items: Array<string>, lang: Language) =>
    items
      .map((path) => {
        const { title, description } = getPageSeo(path, lang)
        return `- [${title}](${urlFor(path, lang)}): ${description}`
      })
      .join('\n')
  const isArea = (path: string) => path.startsWith('/practice-areas/')

  return `# ${site.name}

> ${getPageSeo('/', 'en').description}

Address: ${fullAddress}. Phone: ${site.phone.display}. Email: ${site.email}. Hours: Monday to Friday, ${site.hours.open} to ${site.hours.close}.

## Pages

${list(paths.filter((path) => !isArea(path)), 'en')}

## Practice areas

${list(paths.filter(isArea), 'en')}

## Español

${list(paths, 'es')}
`
}

/** Fuentes que usa la primera pintura de cualquier página; el navegador las descubriría tarde, dentro del CSS. */
async function renderFontPreloads(outDir: string) {
  const assets = await readdir(join(outDir, 'assets'))
  return assets
    .filter((file) =>
      /^(manrope-latin-wght|libre-caslon-display-latin-400)-normal-.*\.woff2$/.test(
        file,
      ),
    )
    .map(
      (file) =>
        `<link rel="preload" as="font" type="font/woff2" href="/assets/${file}" crossorigin />\n    `,
    )
    .join('')
}

/**
 * En `pnpm dev` y `pnpm preview`, el fallback de SPA responde con HTML y estado 200 a cualquier
 * URL, y los agentes lo leen como un manifiesto roto. La firma no ofrece servicios para agentes:
 * `/.well-known/ai-catalog.json` debe dar 404, igual que en el host con `404.html`.
 */
const agentFiles: Connect.NextHandleFunction = (req, res, next) => {
  const pathname = req.url?.split('?')[0]
  if (pathname === '/llms.txt') {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.end(renderLlmsTxt(indexablePaths()))
  } else if (pathname?.startsWith('/.well-known/')) {
    res.statusCode = 404
    res.end()
  } else {
    next()
  }
}

/**
 * Al compilar genera un HTML por ruta e idioma con su propio `<head>`, además de
 * `sitemap.xml`, `llms.txt` y un `404.html` sin indexar. El cuerpo lo sigue pintando React.
 */
export function seo(): Array<Plugin> {
  let config: ResolvedConfig

  return [
    {
      name: 'alg-agent-files',
      configureServer(server) {
        server.middlewares.use(agentFiles)
      },
      configurePreviewServer(server) {
        server.middlewares.use(agentFiles)
      },
    },
    {
      name: 'alg-seo',
      apply: 'build',
      configResolved(resolved) {
        config = resolved
      },
      async closeBundle() {
        const outDir = join(config.root, config.build.outDir)
        const template = await readFile(join(outDir, 'index.html'), 'utf8')
        const paths = indexablePaths()
        const fontPreloads = await renderFontPreloads(outDir)

        async function write(file: string, content: string) {
          const target = join(outDir, file)
          await mkdir(dirname(target), { recursive: true })
          await writeFile(target, content)
        }

        for (const lang of languages) {
          for (const path of paths) {
            await write(
              htmlFile(localizePath(path, lang)),
              renderPage(template, path, lang, fontPreloads),
            )
          }
        }
        for (const [from, target] of Object.entries(legacyRedirects)) {
          await write(htmlFile(from), renderRedirect(target))
        }
        // `/login`, las páginas legales aún vacías y las rutas inexistentes llevan `noindex`
        await write(
          '404.html',
          renderPage(template, '/404', 'en', fontPreloads),
        )
        for (const path of ['/login', ...Object.keys(legalPageTitles)]) {
          for (const lang of languages) {
            await write(
              htmlFile(localizePath(path, lang)),
              renderPage(template, path, lang, fontPreloads),
            )
          }
        }
        await write('sitemap.xml', renderSitemap(paths))
        await write('llms.txt', renderLlmsTxt(paths))
      },
    },
  ]
}

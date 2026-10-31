import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import type { Plugin, ResolvedConfig } from 'vite'

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

function renderPage(template: string, path: string, lang: Language) {
  return template
    .replace(/<html lang="[^"]*"/, `<html lang="${lang}"`)
    .replace(/<title>[\s\S]*?<\/title>\s*/, '')
    .replace(/<meta\s+data-seo[\s\S]*?\/>\s*/, '')
    .replace('</head>', `  ${renderHead(path, lang)}\n  </head>`)
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

function renderSitemap(paths: Array<string>) {
  const entries = paths.flatMap((path) =>
    languages.map((lang) => {
      const alternates = alternatesFor(path)
      const loc = alternates.find((item) => item.hreflang === lang)?.href
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

/**
 * Al compilar genera un HTML por ruta e idioma con su propio `<head>`, además de
 * `sitemap.xml` y un `404.html` sin indexar. El cuerpo lo sigue pintando React.
 */
export function seo(): Plugin {
  let config: ResolvedConfig

  return {
    name: 'alg-seo',
    apply: 'build',
    configResolved(resolved) {
      config = resolved
    },
    async closeBundle() {
      const outDir = join(config.root, config.build.outDir)
      const template = await readFile(join(outDir, 'index.html'), 'utf8')
      const paths = indexablePaths()

      async function write(file: string, content: string) {
        const target = join(outDir, file)
        await mkdir(dirname(target), { recursive: true })
        await writeFile(target, content)
      }

      for (const lang of languages) {
        for (const path of paths) {
          await write(
            htmlFile(localizePath(path, lang)),
            renderPage(template, path, lang),
          )
        }
      }
      for (const [from, target] of Object.entries(legacyRedirects)) {
        await write(htmlFile(from), renderRedirect(target))
      }
      // `/login`, las páginas legales aún vacías y las rutas inexistentes llevan `noindex`
      await write('404.html', renderPage(template, '/404', 'en'))
      for (const path of ['/login', ...Object.keys(legalPageTitles)]) {
        for (const lang of languages) {
          await write(
            htmlFile(localizePath(path, lang)),
            renderPage(template, path, lang),
          )
        }
      }
      await write('sitemap.xml', renderSitemap(paths))
    },
  }
}

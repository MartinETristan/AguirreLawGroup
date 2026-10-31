import { faq } from '../content/faq.ts'
import { practiceAreas } from '../content/practice-areas.ts'
import { areaCopy, legalPageTitles, pageCopy } from '../content/seo.ts'
import { site } from '../content/site.ts'
import { testimonials } from '../content/testimonials.ts'
import { localizePath } from '../i18n/paths.ts'
import type { PracticeArea } from '../content/practice-areas.ts'
import type { SeoCopy } from '../content/seo.ts'
import type { Language } from '@/i18n'

// Sin alias ni dependencias de navegador: este módulo también corre al compilar (`scripts/vite-seo.ts`).

const OG_IMAGE = '/og-image.webp'
const seoLanguages: Array<Language> = ['es', 'en']

type SeoTag = {
  tag: 'meta' | 'link' | 'script'
  attrs: Record<string, string>
  text?: string
}

export type PageSeo = {
  title: string
  description: string
  tags: Array<SeoTag>
}

function absoluteUrl(path: string) {
  return encodeURI(`${site.url}${path === '/' ? '/' : path}`)
}

function isArea(slug: string): slug is PracticeArea {
  return practiceAreas.includes(slug as PracticeArea)
}

function areaSlug(path: string) {
  const slug = path.match(/^\/practice-areas\/([^/]+)$/)?.[1]
  return slug && isArea(slug) ? slug : undefined
}

function copyFor(path: string, lang: Language): SeoCopy | undefined {
  const slug = areaSlug(path)
  if (slug) return areaCopy[slug][lang]
  if (path === '/testimonials' && testimonials.length === 0) return undefined
  return path in pageCopy
    ? pageCopy[path as keyof typeof pageCopy][lang]
    : undefined
}

/** Rutas públicas e indexables, sin prefijo de idioma. `/login` queda fuera a propósito. */
export function indexablePaths() {
  return [
    ...Object.keys(pageCopy).filter((path) => copyFor(path, 'es')),
    ...practiceAreas.map((slug) => `/practice-areas/${slug}`),
  ]
}

/** URLs alternas de una ruta en cada idioma; `x-default` apunta a la versión base (inglés). */
export function alternatesFor(path: string) {
  return [
    ...seoLanguages.map((lang) => ({
      hreflang: lang,
      href: absoluteUrl(localizePath(path, lang)),
    })),
    { hreflang: 'x-default', href: absoluteUrl(path) },
  ]
}

function firmSchema(lang: Language) {
  return {
    '@type': 'LegalService',
    '@id': `${site.url}/#firm`,
    name: site.name,
    url: absoluteUrl(localizePath('/', lang)),
    logo: absoluteUrl('/Logos/alg-logo.webp'),
    image: absoluteUrl(OG_IMAGE),
    telephone: site.phone.href.replace('tel:', ''),
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.zip,
      addressCountry: 'US',
    },
    hasMap: site.address.mapsUrl,
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: site.hours.opens,
      closes: site.hours.closes,
    },
    areaServed: [
      { '@type': 'City', name: 'Brownsville, TX' },
      { '@type': 'AdministrativeArea', name: 'Cameron County, TX' },
      { '@type': 'Place', name: 'Rio Grande Valley, TX' },
    ],
    knowsAbout: practiceAreas.map((slug) => areaCopy[slug].en.title),
    sameAs: site.socials.map((social) => social.href),
    employee: { '@id': `${site.url}/#attorney` },
  }
}

function attorneySchema() {
  return {
    '@type': 'Person',
    '@id': `${site.url}/#attorney`,
    name: site.attorney.name,
    jobTitle: 'Attorney',
    image: absoluteUrl(site.attorney.photoFront),
    worksFor: { '@id': `${site.url}/#firm` },
    alumniOf: [
      { '@type': 'CollegeOrUniversity', name: site.attorney.jd.school },
      { '@type': 'CollegeOrUniversity', name: site.attorney.ba.school },
    ],
  }
}

function pageSchemas(path: string, lang: Language, copy: SeoCopy) {
  const url = absoluteUrl(localizePath(path, lang))
  const schemas: Array<Record<string, unknown>> = []

  if (path === '/') {
    schemas.push({
      '@type': 'WebSite',
      '@id': `${site.url}/#website`,
      name: site.name,
      url,
      inLanguage: seoLanguages,
      publisher: { '@id': `${site.url}/#firm` },
    })
  }

  if (path === '/contact-us') {
    schemas.push({
      '@type': 'ContactPage',
      url,
      name: copy.title,
      description: copy.description,
      inLanguage: lang,
      mainEntity: { '@id': `${site.url}/#firm` },
    })
  }

  const slug = areaSlug(path)
  if (slug) {
    schemas.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        { path: '/practice-areas', name: pageCopy['/practice-areas'][lang].title },
        { path, name: copy.title },
      ].map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        item: absoluteUrl(localizePath(item.path, lang)),
      })),
    })
  }

  // Las preguntas frecuentes solo se muestran en esta área
  if (slug === 'criminal-law') {
    schemas.push({
      '@type': 'FAQPage',
      url,
      mainEntity: faq.map((item) => ({
        '@type': 'Question',
        name: item.question[lang],
        acceptedAnswer: { '@type': 'Answer', text: item.answer[lang] },
      })),
    })
  }

  return schemas
}

/** Etiquetas del `<head>` de una ruta; las usan por igual el build y la navegación en cliente. */
export function getPageSeo(path: string, lang: Language): PageSeo {
  const copy = copyFor(path, lang)

  if (!copy) {
    return {
      title:
        path in legalPageTitles
          ? `${legalPageTitles[path as keyof typeof legalPageTitles][lang]} | ${site.name}`
          : site.name,
      description: pageCopy['/'][lang].description,
      tags: [
        { tag: 'meta', attrs: { name: 'robots', content: 'noindex' } },
        {
          tag: 'meta',
          attrs: {
            name: 'description',
            content: pageCopy['/'][lang].description,
          },
        },
      ],
    }
  }

  const title = `${copy.title} | ${site.name}`
  const url = absoluteUrl(localizePath(path, lang))
  const image = absoluteUrl(OG_IMAGE)
  const meta = (attr: 'name' | 'property', key: string, content: string) => ({
    tag: 'meta' as const,
    attrs: { [attr]: key, content },
  })

  return {
    title,
    description: copy.description,
    tags: [
      meta('name', 'description', copy.description),
      meta('name', 'robots', 'index, follow, max-image-preview:large'),
      { tag: 'link', attrs: { rel: 'canonical', href: url } },
      ...alternatesFor(path).map((alternate): SeoTag => ({
        tag: 'link',
        attrs: { rel: 'alternate', ...alternate },
      })),
      meta('property', 'og:type', 'website'),
      meta('property', 'og:site_name', site.name),
      meta('property', 'og:locale', lang === 'es' ? 'es_US' : 'en_US'),
      meta(
        'property',
        'og:locale:alternate',
        lang === 'es' ? 'en_US' : 'es_US',
      ),
      meta('property', 'og:title', title),
      meta('property', 'og:description', copy.description),
      meta('property', 'og:url', url),
      meta('property', 'og:image', image),
      meta('property', 'og:image:width', '1200'),
      meta('property', 'og:image:height', '630'),
      meta('name', 'twitter:card', 'summary_large_image'),
      {
        tag: 'script',
        attrs: { type: 'application/ld+json' },
        text: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            firmSchema(lang),
            attorneySchema(),
            ...pageSchemas(path, lang, copy),
          ],
        }).replace(/</g, '\\u003c'),
      },
    ],
  }
}

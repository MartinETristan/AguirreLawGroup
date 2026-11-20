import { areaFaqs } from '../content/faq.ts'
import { practiceAreas } from '../content/practice-areas.ts'
import { areaCopy, breadcrumbHome, imageAlt, pageCopy } from '../content/seo.ts'
import { site } from '../content/site.ts'
import { testimonials } from '../content/testimonials.ts'
import { localizePath } from '../i18n/paths.ts'
import type { PracticeArea } from '../content/practice-areas.ts'
import type { SeoCopy } from '../content/seo.ts'
import type { Language } from '@/i18n'

// Sin alias ni dependencias de navegador: este módulo también corre al compilar (`scripts/vite-seo.ts`).

// JPEG y no WebP: WhatsApp, LinkedIn y X no siempre pintan la vista previa en WebP
const OG_IMAGE = '/og-image.jpg'
const LOGO_IMAGE = '/TheLawGun/thelawgun-gold-600.webp'
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

const officeId = (id: string) => `${site.url}/#office-${id}`

function postalAddress(street: string, city: string, zip: string) {
  return {
    '@type': 'PostalAddress',
    streetAddress: street,
    addressLocality: city,
    addressRegion: site.address.state,
    postalCode: zip,
    addressCountry: 'US',
  }
}

function geoCoordinates({ lat, lng }: { lat: number; lng: number }) {
  return { '@type': 'GeoCoordinates', latitude: lat, longitude: lng }
}

function firmSchema(lang: Language) {
  const phone = site.phone.href.replace('tel:', '')
  const [main, ...branches] = site.offices
  return {
    '@type': ['LegalService', 'Attorney'],
    '@id': `${site.url}/#firm`,
    name: site.name,
    // Nombre anterior de la firma (aguirre-lawgroup.com): une ambas marcas en una sola entidad
    alternateName: 'Aguirre Law Group',
    description: pageCopy['/'][lang].description,
    url: absoluteUrl(localizePath('/', lang)),
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl(LOGO_IMAGE),
      width: 600,
      height: 200,
    },
    image: absoluteUrl(OG_IMAGE),
    telephone: phone,
    email: site.email,
    address: postalAddress(
      site.address.street,
      site.address.city,
      site.address.zip,
    ),
    geo: geoCoordinates(main.geo),
    hasMap: site.address.mapsUrl,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: phone,
      email: site.email,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: site.hours.opens,
      closes: site.hours.closes,
    },
    // Las oficinas de McAllen y Harlingen atienden con cita: sin horario
    department: branches.map((office) => ({
      '@type': 'LegalService',
      '@id': officeId(office.id),
      name: `${site.name} ${office.city}`,
      parentOrganization: { '@id': `${site.url}/#firm` },
      telephone: phone,
      address: postalAddress(
        office.street,
        office.city,
        office.region.match(/\d{5}$/)?.[0] ?? '',
      ),
      geo: geoCoordinates(office.geo),
    })),
    areaServed: [
      ...site.offices.map((office) => ({
        '@type': 'City',
        name: `${office.city}, ${site.address.state}`,
      })),
      { '@type': 'AdministrativeArea', name: 'Cameron County, TX' },
      { '@type': 'AdministrativeArea', name: 'Hidalgo County, TX' },
      { '@type': 'Place', name: 'Rio Grande Valley, TX' },
    ],
    knowsAbout: practiceAreas.map((slug) => areaCopy[slug].en.title),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: pageCopy['/practice-areas'][lang].title,
      itemListElement: practiceAreas.map((slug) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: areaCopy[slug][lang].title,
          url: absoluteUrl(localizePath(`/practice-areas/${slug}`, lang)),
        },
      })),
    },
    sameAs: site.socials.map((social) => social.href),
    employee: { '@id': `${site.url}/#attorney` },
    founder: { '@id': `${site.url}/#attorney` },
  }
}

function attorneySchema(lang: Language) {
  return {
    '@type': 'Person',
    '@id': `${site.url}/#attorney`,
    name: site.attorney.name,
    jobTitle: lang === 'es' ? 'Abogado' : 'Attorney',
    url: absoluteUrl(localizePath('/attorney', lang)),
    image: absoluteUrl(site.attorney.photoFront),
    worksFor: { '@id': `${site.url}/#firm` },
    workLocation: { '@id': `${site.url}/#firm` },
    knowsAbout: practiceAreas.map((slug) => areaCopy[slug].en.title),
    alumniOf: [
      { '@type': 'CollegeOrUniversity', name: site.attorney.jd.school },
      { '@type': 'CollegeOrUniversity', name: site.attorney.ba.school },
    ],
  }
}

/** Tipo de página de schema.org por ruta; el resto son `WebPage`. */
const pageTypes: Partial<Record<string, string>> = {
  '/about-us': 'AboutPage',
  '/attorney': 'ProfilePage',
  '/practice-areas': 'CollectionPage',
  '/contact-us': 'ContactPage',
}

function pageSchemas(path: string, lang: Language, copy: SeoCopy) {
  const url = absoluteUrl(localizePath(path, lang))
  const slug = areaSlug(path)
  const schemas: Array<Record<string, unknown>> = []

  if (path === '/') {
    schemas.push({
      '@type': 'WebSite',
      '@id': `${site.url}/#website`,
      name: site.name,
      alternateName: 'Aguirre Law Group',
      url: absoluteUrl(localizePath('/', lang)),
      inLanguage: seoLanguages,
      publisher: { '@id': `${site.url}/#firm` },
    })
  }

  schemas.push({
    '@type': pageTypes[path] ?? 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: copy.title,
    description: copy.description,
    inLanguage: lang,
    isPartOf: { '@id': `${site.url}/#website` },
    about: { '@id': `${site.url}/#firm` },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: absoluteUrl(OG_IMAGE),
      width: 1200,
      height: 630,
    },
    ...(path === '/attorney' && {
      mainEntity: { '@id': `${site.url}/#attorney` },
    }),
    ...(path === '/contact-us' && {
      mainEntity: { '@id': `${site.url}/#firm` },
    }),
    ...(slug && { mainEntity: { '@id': `${url}#service` } }),
    ...(path !== '/' && { breadcrumb: { '@id': `${url}#breadcrumb` } }),
  })

  if (path !== '/') {
    const trail = [
      { path: '/', name: breadcrumbHome[lang] },
      // Las áreas cuelgan de «Áreas de práctica»
      ...(slug
        ? [
            {
              path: '/practice-areas',
              name: pageCopy['/practice-areas'][lang].title,
            },
          ]
        : []),
      { path, name: copy.title },
    ]
    schemas.push({
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: trail.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        item: absoluteUrl(localizePath(item.path, lang)),
      })),
    })
  }

  if (slug) {
    schemas.push({
      '@type': 'Service',
      '@id': `${url}#service`,
      name: copy.title,
      description: copy.description,
      serviceType: areaCopy[slug].en.title,
      url,
      inLanguage: lang,
      provider: { '@id': `${site.url}/#firm` },
      areaServed: [
        { '@type': 'City', name: 'Brownsville, TX' },
        { '@type': 'Place', name: 'Rio Grande Valley, TX' },
      ],
    })
  }

  // Solo las áreas con preguntas frecuentes en la página llevan `FAQPage`
  const faq = slug && areaFaqs[slug]
  if (faq) {
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
      title: site.name,
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
      meta('property', 'og:image:type', 'image/jpeg'),
      meta('property', 'og:image:alt', imageAlt[lang]),
      meta('name', 'twitter:card', 'summary_large_image'),
      meta('name', 'twitter:title', title),
      meta('name', 'twitter:description', copy.description),
      meta('name', 'twitter:image', image),
      meta('name', 'twitter:image:alt', imageAlt[lang]),
      // Señales de ubicación para Bing y directorios; Google las ignora
      meta('name', 'geo.region', 'US-TX'),
      meta('name', 'geo.placename', 'Brownsville'),
      meta(
        'name',
        'geo.position',
        `${site.address.geo.lat};${site.address.geo.lng}`,
      ),
      meta('name', 'ICBM', `${site.address.geo.lat}, ${site.address.geo.lng}`),
      {
        tag: 'script',
        attrs: { type: 'application/ld+json' },
        text: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            firmSchema(lang),
            attorneySchema(lang),
            ...pageSchemas(path, lang, copy),
          ],
        }).replace(/</g, '\\u003c'),
      },
    ],
  }
}

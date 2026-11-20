/**
 * Fuente de verdad de la firma.
 * Todo dato factual (contacto, dirección, horario, redes, credenciales) vive
 * aquí; los textos traducibles viven en `src/i18n/locales`.
 */
export const site = {
  name: 'The LawGun',
  // Logo del navbar: The Law Gun en dorado liso, recortado y a 40 px de alto a 1x
  logo: {
    src: '/TheLawGun/thelawgun-gold-nav-80.webp',
    srcSet:
      '/TheLawGun/thelawgun-gold-nav-40.webp 1x, /TheLawGun/thelawgun-gold-nav-80.webp 2x, /TheLawGun/thelawgun-gold-nav-120.webp 3x',
    width: 149,
    height: 40,
    alt: 'The Law Gun',
  },
  url: 'https://thelawgun.com',

  phone: {
    display: '(956) 477-7777',
    href: 'tel:+19564777777',
  },
  email: 'appointment@thelawgun.com',

  address: {
    street: '811 E Madison St',
    city: 'Brownsville',
    state: 'TX',
    zip: '78520',
    // Geocodificado con OpenStreetMap (coincidencia exacta del número 811)
    geo: { lat: 25.9061, lng: -97.4980114 },
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=811+E+Madison+St+Brownsville+TX+78520',
  },

  /**
   * Oficinas. La principal es `address` (datos estructurados); las demás son con cita. `geo` son las
   * coordenadas del mapa de contacto, geocodificadas con OpenStreetMap.
   */
  offices: [
    {
      id: 'brownsville',
      city: 'Brownsville',
      kind: 'main',
      street: '811 E. Madison St.',
      region: 'Brownsville, TX 78520',
      geo: { lat: 25.9061, lng: -97.4980114 },
    },
    {
      id: 'mcallen',
      city: 'McAllen',
      kind: 'appointment',
      street: '200 S. 10th St., Suite 905',
      region: 'McAllen, TX 78521',
      geo: { lat: 26.2019209, lng: -98.2313816 },
    },
    {
      id: 'harlingen',
      city: 'Harlingen',
      kind: 'appointment',
      street: '314 E. Tyler Ave., Suite B',
      region: 'Harlingen, TX 78550',
      geo: { lat: 26.1895472, lng: -97.6927948 },
    },
  ],

  hours: {
    open: '8:30 a.m.',
    close: '5:30 p.m.',
    // Formato de 24 h para los datos estructurados
    opens: '08:30',
    closes: '17:30',
  },

  socials: [
    {
      id: 'facebook',
      label: 'Facebook',
      href: 'https://www.facebook.com/Aguirrelawgroup/',
    },
    {
      id: 'instagram',
      label: 'Instagram',
      href: 'https://www.instagram.com/aguirre.lawgroup',
    },
    {
      id: 'x',
      label: 'X (Twitter)',
      href: 'https://twitter.com/AguirreLawgroup',
    },
  ],

  hero: {
    logo: {
      // Temporal: versión Satin (degradado). La dorada lisa es `thelawgun-gold-*` con los mismos anchos.
      src: '/TheLawGun/thelawgun-satin-1200.webp',
      srcSet:
        '/TheLawGun/thelawgun-satin-600.webp 600w, /TheLawGun/thelawgun-satin-900.webp 900w, /TheLawGun/thelawgun-satin-1200.webp 1200w',
      // Ancho máximo real: `max-w-md` en móvil y 34rem desde `sm`
      sizes: '(min-width: 640px) 34rem, min(28rem, calc(100vw - 2rem))',
    },
    logoAlt: 'The Law Gun',
    // TODO: sustituir por la foto de fondo definitiva
    backdrop: '/BG_TEST.webp',
  },

  attorney: {
    name: 'Javier Aguirre',
    photo: '/JavierAguirre/JavierAguireSide.webp',
    photoFront: '/JavierAguirre/Javier Aguirre Front.webp',
    practicingSince: 2008,
    prosecutorYear: 2017,
    jd: { school: 'St. Mary’s University', year: 2007 },
    ba: { school: 'University of Texas at Brownsville (UTRGV)' },
    scouts: { troop: 356, since: 2014 },
  },
} as const

export type SocialId = (typeof site.socials)[number]['id']

/** Años de ejercicio; se calcula para que no vuelva a quedar desactualizado. */
export const yearsPracticing =
  new Date().getFullYear() - site.attorney.practicingSince

export const fullAddress = `${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip}`

export type Office = (typeof site.offices)[number]
export type OfficeId = Office['id']

export const officeAddress = (office: Office) =>
  `${office.street}, ${office.region}`

/** Ruta en Google Maps hacia la oficina (abre la app en el móvil). */
export const officeDirectionsUrl = (office: Office) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(officeAddress(office))}`

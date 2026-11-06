/**
 * Fuente de verdad de la firma.
 * Todo dato factual (contacto, dirección, horario, redes, credenciales) vive
 * aquí; los textos traducibles viven en `src/i18n/locales`.
 */
export const site = {
  name: 'Aguirre Law Group',
  // Logo del navbar: The Law Gun en blanco, recortado y a 40 px de alto a 1x
  logo: {
    src: '/TheLawGun/thelawgun-white-nav-80.webp',
    srcSet:
      '/TheLawGun/thelawgun-white-nav-40.webp 1x, /TheLawGun/thelawgun-white-nav-80.webp 2x, /TheLawGun/thelawgun-white-nav-120.webp 3x',
    width: 149,
    height: 40,
    alt: 'The Law Gun',
  },
  url: 'https://www.aguirre-lawgroup.com',

  phone: {
    display: '(956) 477-7777',
    href: 'tel:+19564777777',
  },
  email: 'appointment@aguirre-lawgroup.com',

  address: {
    street: '811 E Madison St',
    city: 'Brownsville',
    state: 'TX',
    zip: '78520',
    // Geocodificado con OpenStreetMap (coincidencia exacta del número 811)
    geo: { lat: 25.9061, lng: -97.4980114 },
    // Límites del mapa, [oeste, sur] y [este, norte]: la zona urbana de Brownsville y el puerto.
    // El límite municipal de OpenStreetMap llega hasta 26.22 N por franjas anexadas que abarcan
    // San Benito y Los Fresnos, y por eso aquí se recorta.
    mapBounds: [
      [-97.58, 25.84],
      [-97.35, 26.0],
    ] as [[number, number], [number, number]],
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=811+E+Madison+St+Brownsville+TX+78520',
  },

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

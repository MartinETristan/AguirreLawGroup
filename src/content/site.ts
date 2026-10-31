/**
 * Fuente de verdad de la firma.
 * Todo dato factual (contacto, dirección, horario, redes, credenciales) vive
 * aquí; los textos traducibles viven en `src/i18n/locales`.
 */
export const site = {
  name: 'Aguirre Law Group',
  logo: '/Logos/alg-logo-light.png',
  url: 'https://www.aguirre-lawgroup.com',

  phone: {
    display: '(956) 443-0678',
    href: 'tel:+19564430678',
  },
  email: 'appointment@aguirre-lawgroup.com',

  address: {
    street: '811 E Madison St',
    city: 'Brownsville',
    state: 'TX',
    zip: '78520',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=811+E+Madison+St+Brownsville+TX+78520',
  },

  hours: {
    open: '8:30 a.m.',
    close: '5:30 p.m.',
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

  attorney: {
    name: 'Javier Aguirre',
    practicingSince: 2008,
    prosecutorYear: 2017,
    jd: { school: 'St. Mary’s University', year: 2007 },
    ba: { school: 'University of Texas at Brownsville' },
    scouts: { troop: 356, since: 2014 },
  },
} as const

export type SocialId = (typeof site.socials)[number]['id']

export const fullAddress = `${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip}`

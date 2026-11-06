import type { PracticeArea } from './practice-areas.ts'
import type { Language } from '@/i18n'

export type SeoCopy = { title: string; description: string }

type StaticPath =
  | '/'
  | '/about-us'
  | '/practice-areas'
  | '/firm'
  | '/attorney'
  | '/testimonials'
  | '/contact-us'

/**
 * Títulos de pestaña de las páginas legales. Siguen con `noindex` y fuera del sitemap
 * mientras estén vacías: al tener su texto, pasarlas a `pageCopy`.
 */
export const legalPageTitles = {
  '/privacy-policy': { es: 'Aviso de privacidad', en: 'Privacy Policy' },
  '/terms': { es: 'Términos', en: 'Terms' },
  '/legal-disclaimer': { es: 'Aviso legal', en: 'Legal Disclaimer' },
} satisfies Record<string, Record<Language, string>>

/** URLs del sitio anterior que Google ya conoce (su sitemap) y que cambiaron de ruta. */
export const legacyRedirects: Record<string, string> = {
  '/appointment': '/contact-us',
  '/criminal-law': '/practice-areas/criminal-law',
  '/criminal-law-faq': '/practice-areas/criminal-law',
  '/drug-charges': '/practice-areas/drug-charges',
  '/dwi': '/practice-areas/dwi',
  '/personal-injury-1': '/practice-areas/personal-injury',
  '/theft-property-crimes': '/practice-areas/theft-property',
  '/violent-crimes': '/practice-areas/violent-crimes',
  '/white-collar-crime': '/practice-areas/white-collar',
}

/** Títulos y descripciones por ruta; el sufijo con el nombre de la firma se agrega al generar la etiqueta. */
export const pageCopy: Record<StaticPath, Record<Language, SeoCopy>> = {
  '/': {
    es: {
      title: 'Abogados de lesiones personales en Brownsville, TX',
      description:
        'Abogados de lesiones personales y defensa criminal en Brownsville, Texas, y el Valle del Río Grande. Accidentes de auto, camión, laborales y caídas. Consulta gratuita.',
    },
    en: {
      title: 'Personal injury attorneys in Brownsville, TX',
      description:
        'Personal injury and criminal defense attorneys in Brownsville, Texas, and the Rio Grande Valley. Car, truck and work accidents and falls. Free consultation.',
    },
  },
  '/about-us': {
    es: {
      title: 'Nosotros: abogados en Brownsville, TX',
      description:
        'Conoce a Aguirre Law Group y al abogado Javier Aguirre, con práctica en casos penales y de lesiones personales en el Valle del Río Grande.',
    },
    en: {
      title: 'About Us: attorneys in Brownsville, TX',
      description:
        'Meet Aguirre Law Group and attorney Javier Aguirre, practicing criminal defense and personal injury law in the Rio Grande Valley.',
    },
  },
  '/practice-areas': {
    es: {
      title: 'Áreas de práctica en Brownsville, TX',
      description:
        'Derecho penal, DWI, cargos por drogas, lesiones personales, robo, delitos violentos y de cuello blanco en Brownsville, Texas.',
    },
    en: {
      title: 'Practice areas in Brownsville, TX',
      description:
        'Criminal law, DWI, drug charges, personal injury, theft, violent crimes and white collar crimes in Brownsville, Texas.',
    },
  },
  '/firm': {
    es: {
      title: 'La firma: defensa legal en Brownsville, TX',
      description:
        'Cómo trabaja Aguirre Law Group: estudiamos la evidencia y preparamos la estrategia de tu defensa en Brownsville y el Valle del Río Grande.',
    },
    en: {
      title: 'The firm: legal defense in Brownsville, TX',
      description:
        'How Aguirre Law Group works: we study the evidence and build your defense strategy in Brownsville and the Rio Grande Valley.',
    },
  },
  '/attorney': {
    es: {
      title: 'Javier Aguirre, abogado en Brownsville, TX',
      description:
        'Javier Aguirre, abogado de defensa criminal y lesiones personales. Ejerce en el Valle del Río Grande desde 2008.',
    },
    en: {
      title: 'Javier Aguirre, attorney in Brownsville, TX',
      description:
        'Javier Aguirre, criminal defense and personal injury attorney. Practicing in the Rio Grande Valley since 2008.',
    },
  },
  '/testimonials': {
    es: {
      title: 'Testimonios de clientes en Brownsville, TX',
      description:
        'Lo que dicen los clientes de Aguirre Law Group, abogados en Brownsville, Texas.',
    },
    en: {
      title: 'Client testimonials in Brownsville, TX',
      description:
        'What clients say about Aguirre Law Group, attorneys in Brownsville, Texas.',
    },
  },
  '/contact-us': {
    es: {
      title: 'Contacto: consulta gratuita en Brownsville, TX',
      description:
        'Contacta a Aguirre Law Group en 811 E Madison St, Brownsville, TX. Agenda tu consulta gratuita sobre defensa criminal o lesiones personales.',
    },
    en: {
      title: 'Contact: free consultation in Brownsville, TX',
      description:
        'Contact Aguirre Law Group at 811 E Madison St, Brownsville, TX. Schedule your free criminal defense or personal injury consultation.',
    },
  },
}

export const areaCopy: Record<PracticeArea, Record<Language, SeoCopy>> = {
  'criminal-law': {
    es: {
      title: 'Abogado penalista en Brownsville, TX',
      description:
        'Defensa en delitos menores y graves en Brownsville, Texas. Resuelve tus dudas sobre cargos penales y agenda tu consulta gratuita.',
    },
    en: {
      title: 'Criminal defense attorney in Brownsville, TX',
      description:
        'Misdemeanor and felony defense in Brownsville, Texas. Get answers about criminal charges and schedule your free consultation.',
    },
  },
  dwi: {
    es: {
      title: 'Abogado de DWI en Brownsville, TX',
      description:
        'Defensa por DWI en Brownsville y el Valle del Río Grande. Conoce la ley de Texas y las posibles sanciones, y agenda tu consulta gratuita.',
    },
    en: {
      title: 'DWI attorney in Brownsville, TX',
      description:
        'DWI defense in Brownsville and the Rio Grande Valley. Learn about Texas law and potential penalties, and schedule your free consultation.',
    },
  },
  'drug-charges': {
    es: {
      title: 'Abogado por cargos de drogas en Brownsville, TX',
      description:
        'Defensa por posesión, venta, tráfico y otros cargos estatales o federales de drogas en Brownsville, Texas. Consulta gratuita.',
    },
    en: {
      title: 'Drug charges attorney in Brownsville, TX',
      description:
        'Defense for possession, sale, trafficking and other state or federal drug charges in Brownsville, Texas. Free consultation.',
    },
  },
  'personal-injury': {
    es: {
      title: 'Abogado de lesiones personales en Brownsville, TX',
      description:
        'Accidentes de auto, camión y moto, laborales, caídas y muerte por negligencia en Brownsville y el Valle del Río Grande. Qué hacer, leyes de Texas y consulta gratuita.',
    },
    en: {
      title: 'Personal injury attorney in Brownsville, TX',
      description:
        'Car, truck and motorcycle accidents, work injuries, falls and wrongful death in Brownsville and the Rio Grande Valley. What to do, Texas law and a free consultation.',
    },
  },
  'car-accidents': {
    es: {
      title: 'Abogado de accidentes de auto en Brownsville, TX',
      description:
        'Choques por alcance, de frente y con fuga en Brownsville y el Valle del Río Grande. Leyes de Texas, seguros y consulta gratuita.',
    },
    en: {
      title: 'Car accident attorney in Brownsville, TX',
      description:
        'Rear-end, head-on and hit-and-run crashes in Brownsville and the Rio Grande Valley. Texas law, insurance and a free consultation.',
    },
  },
  'drunk-driving-accidents': {
    es: {
      title: 'Abogado de accidentes por conductor ebrio en Brownsville',
      description:
        'Reclamos contra conductores ebrios y bares en Brownsville, Texas: daños ejemplares, ley dram shop y consulta gratuita.',
    },
    en: {
      title: 'Drunk driving accident attorney in Brownsville, TX',
      description:
        'Claims against drunk drivers and bars in Brownsville, Texas: exemplary damages, dram shop law and a free consultation.',
    },
  },
  'truck-accidents': {
    es: {
      title: 'Abogado de accidentes de camión en Brownsville, TX',
      description:
        'Choques con tráileres y 18 ruedas en Brownsville y el Valle del Río Grande. Normas de la FMCSA, responsables y consulta gratuita.',
    },
    en: {
      title: 'Truck accident attorney in Brownsville, TX',
      description:
        'Semi and 18-wheeler crashes in Brownsville and the Rio Grande Valley. FMCSA rules, liable parties and a free consultation.',
    },
  },
  'motorcycle-accidents': {
    es: {
      title: 'Abogado de accidentes de moto en Brownsville, TX',
      description:
        'Accidentes de motocicleta en Brownsville, Texas: ley de cascos, culpa compartida y consulta gratuita.',
    },
    en: {
      title: 'Motorcycle accident attorney in Brownsville, TX',
      description:
        'Motorcycle crashes in Brownsville, Texas: helmet law, shared fault and a free consultation.',
    },
  },
  'pedestrian-accidents': {
    es: {
      title: 'Abogado de atropellos a peatones en Brownsville, TX',
      description:
        'Peatones atropellados en Brownsville, Texas: derecho de paso, coberturas PIP y UM/UIM y consulta gratuita.',
    },
    en: {
      title: 'Pedestrian accident attorney in Brownsville, TX',
      description:
        'Pedestrians hit by cars in Brownsville, Texas: right of way, PIP and UM/UIM coverage and a free consultation.',
    },
  },
  'bicycle-accidents': {
    es: {
      title: 'Abogado de accidentes de bicicleta en Brownsville, TX',
      description:
        'Ciclistas lesionados en Brownsville, Texas: tus derechos en la vía, culpa compartida y consulta gratuita.',
    },
    en: {
      title: 'Bicycle accident attorney in Brownsville, TX',
      description:
        'Injured cyclists in Brownsville, Texas: your rights on the road, shared fault and a free consultation.',
    },
  },
  'uber-lyft-accidents': {
    es: {
      title: 'Abogado de accidentes de Uber y Lyft en Brownsville',
      description:
        'Pasajeros y terceros lesionados en viajes de Uber o Lyft en Brownsville, Texas. Qué seguro responde y consulta gratuita.',
    },
    en: {
      title: 'Uber & Lyft accident attorney in Brownsville, TX',
      description:
        'Passengers and others hurt in Uber or Lyft crashes in Brownsville, Texas. Which insurance pays and a free consultation.',
    },
  },
  'tour-bus-accidents': {
    es: {
      title: 'Abogado de accidentes de autobús en Brownsville, TX',
      description:
        'Accidentes de autobuses turísticos, chárter, escolares y shuttles en Brownsville, Texas. Consulta gratuita.',
    },
    en: {
      title: 'Tour bus accident attorney in Brownsville, TX',
      description:
        'Tour, charter, school bus and shuttle accidents in Brownsville, Texas. Free consultation.',
    },
  },
  'uninsured-motorists': {
    es: {
      title: 'Abogado de conductores sin seguro en Brownsville, TX',
      description:
        'Reclamos UM/UIM cuando el responsable no tiene seguro, huyó o su cobertura no alcanza, en Brownsville, Texas.',
    },
    en: {
      title: 'Uninsured motorist attorney in Brownsville, TX',
      description:
        'UM/UIM claims when the at-fault driver is uninsured, fled or lacks enough coverage, in Brownsville, Texas.',
    },
  },
  'theft-property': {
    es: {
      title: 'Abogado por robo y delitos contra la propiedad',
      description:
        'Defensa por allanamiento, robo en tiendas, incendio provocado, falsificación de cheques y más en Brownsville, Texas.',
    },
    en: {
      title: 'Theft and property crimes attorney',
      description:
        'Defense for burglary, shoplifting, arson, check forgery and more in Brownsville, Texas.',
    },
  },
  'violent-crimes': {
    es: {
      title: 'Abogado de delitos violentos en Brownsville, TX',
      description:
        'Defensa por agresión, violencia doméstica, secuestro y otros cargos graves en Brownsville, Texas. Consulta gratuita.',
    },
    en: {
      title: 'Violent crimes attorney in Brownsville, TX',
      description:
        'Defense for assault, domestic violence, kidnapping and other serious charges in Brownsville, Texas. Free consultation.',
    },
  },
  'white-collar': {
    es: {
      title: 'Abogado de delitos de cuello blanco en Brownsville',
      description:
        'Defensa por fraude, malversación, extorsión y lavado de dinero en Brownsville, Texas, incluso con intervención federal.',
    },
    en: {
      title: 'White collar crimes attorney in Brownsville, TX',
      description:
        'Defense for fraud, embezzlement, extortion and money laundering in Brownsville, Texas, including federal cases.',
    },
  },
}

import type { PracticeArea } from './practice-areas'
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
      title: 'Abogados en Brownsville, TX',
      description:
        'Abogados de defensa criminal y lesiones personales en Brownsville, Texas, y el Valle del Río Grande. Agenda tu consulta gratuita.',
    },
    en: {
      title: 'Attorneys in Brownsville, TX',
      description:
        'Criminal defense and personal injury attorneys in Brownsville, Texas, and the Rio Grande Valley. Schedule your free consultation.',
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
        'Accidentes de auto, laborales, caídas y más en Brownsville y el Valle del Río Grande. Agenda tu consulta gratuita.',
    },
    en: {
      title: 'Personal injury attorney in Brownsville, TX',
      description:
        'Car and work accidents, falls and more in Brownsville and the Rio Grande Valley. Schedule your free consultation.',
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

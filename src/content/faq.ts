import type { Language } from '@/i18n'

export type FaqItem = {
  id: string
  question: Record<Language, string>
  answer: Record<Language, string>
}

/** Preguntas de la página "Criminal Law FAQ" de aguirre-lawgroup.com. */
export const faq: Array<FaqItem> = [
  {
    id: 'innocent',
    question: {
      es: '¿Necesito un abogado aunque sea inocente?',
      en: 'Do I need a lawyer even if I am innocent?',
    },
    answer: {
      es: 'Es común que se acuse a personas de delitos que no cometieron, y un abogado es tu mejor línea de defensa. Además, quien cometió un delito puede ser acusado injustamente de otros. En Aguirre Law Group te ayudamos a responder a las acusaciones y a preparar un plan sólido.',
      en: 'It is common for people to be charged with crimes they did not commit, and an attorney is your best line of defense. People who committed one crime may also be wrongfully accused of others. Aguirre Law Group can help you address the accusations and develop a strong plan.',
    },
  },
  {
    id: 'misdemeanor-felony',
    question: {
      es: '¿En qué se diferencian un delito menor y un delito grave?',
      en: 'How do a misdemeanor and a felony differ?',
    },
    answer: {
      es: 'Depende de la gravedad del delito. Por lo general, un delito menor es una falta de menor gravedad con castigo de un año o menos. Un delito grave es más serio y puede conllevar más de un año de prisión.',
      en: 'It depends on the severity of the crime. Typically, a misdemeanor is a lesser crime with punishment limited to one year or less. A felony is more serious and can carry more than a year in prison.',
    },
  },
  {
    id: 'bail',
    question: {
      es: '¿Qué es la fianza?',
      en: 'What is bail?',
    },
    answer: {
      es: 'Es una cantidad de dinero o una propiedad que el acusado entrega a la corte para asegurar que regresará cuando se le solicite. Si regresa y no incumple las condiciones de la fianza, el dinero puede devolverse, incluso si resulta condenado.',
      en: 'Bail is an amount of money or property the defendant gives the court to ensure they return when requested. If they return and do not break the conditions of bail, the money can be returned, even if they are convicted.',
    },
  },
  {
    id: 'cost',
    question: {
      es: '¿Cuánto debo esperar pagar por un abogado?',
      en: 'How much should I expect to pay for a lawyer?',
    },
    answer: {
      es: 'Depende de la gravedad del cargo y de los hechos del caso. En Aguirre Law Group podemos darte una consulta para evaluar cuánto costará tu defensa.',
      en: 'It depends on the severity of your charge and the facts of the case. Aguirre Law Group can provide a consultation to assess how much your defense will cost.',
    },
  },
  {
    id: 'record',
    question: {
      es: '¿Cómo me afectaría tener antecedentes penales?',
      en: 'How will a criminal record affect me?',
    },
    answer: {
      es: 'Una condena o un historial penal puede dañar tu imagen y tus oportunidades: afectar futuros empleos, dificultar la entrada a otros países, aumentar el tiempo de condena en casos futuros, implicar prohibiciones sobre armas de fuego o alcohol y cargar con un estigma social.',
      en: 'A conviction or criminal history can tarnish your image and opportunities: it may affect future jobs, make it harder to enter other countries, mean more time on future convictions, bring prohibitions on firearms or alcohol, and carry a social stigma.',
    },
  },
]

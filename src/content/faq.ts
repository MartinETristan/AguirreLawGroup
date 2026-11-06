import type { PracticeArea } from './practice-areas'
import type { Language } from '@/i18n'

export type FaqItem = {
  id: string
  question: Record<Language, string>
  answer: Record<Language, string>
}

/** Preguntas de la página "Criminal Law FAQ" de aguirre-lawgroup.com. */
const criminalFaq: Array<FaqItem> = [
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

/**
 * Preguntas de lesiones personales, adaptadas a la ley de Texas a partir de la estructura
 * de stevedimopoulos.com. Revisión pendiente del abogado: plazos, regla del 50% y honorarios
 * (no se afirma que el cobro sea por contingencia porque no está confirmado).
 */
const injuryFaq: Array<FaqItem> = [
  {
    id: 'deadline',
    question: {
      es: '¿Cuánto tiempo tengo para presentar una demanda?',
      en: 'How long do I have to file a lawsuit?',
    },
    answer: {
      es: 'En Texas, por lo general, dos años desde la fecha de la lesión. Hay excepciones, y si el responsable es una ciudad, un condado u otra entidad de gobierno, puede exigirse un aviso formal en solo unos meses. Mientras antes nos contactes, más evidencia podemos conservar.',
      en: 'In Texas, generally two years from the date of the injury. There are exceptions, and if the responsible party is a city, county or other government entity, formal notice may be required within just a few months. The sooner you contact us, the more evidence we can preserve.',
    },
  },
  {
    id: 'worth',
    question: {
      es: '¿Cuánto vale mi caso?',
      en: 'How much is my case worth?',
    },
    answer: {
      es: 'Depende de la gravedad de la lesión, los gastos médicos presentes y futuros, el tiempo sin trabajar, el efecto en tu vida diaria y la conducta del responsable. Ningún abogado puede prometerte una cifra, pero en la consulta te explicamos qué daños puedes reclamar.',
      en: 'It depends on how serious the injury is, present and future medical costs, time off work, the effect on your daily life and the conduct of the responsible party. No lawyer can promise you a number, but in the consultation we explain which damages you can claim.',
    },
  },
  {
    id: 'shared-fault',
    question: {
      es: '¿Qué pasa si yo también tuve parte de la culpa?',
      en: 'What if I was partly at fault?',
    },
    answer: {
      es: 'Texas aplica la responsabilidad proporcional: tu compensación se reduce según tu porcentaje de culpa. Si tu responsabilidad no supera el 50%, aún puedes recibir compensación; si la supera, no. Las aseguradoras suelen exagerar la culpa de la víctima, por eso conviene que alguien defienda tu versión.',
      en: 'Texas uses proportionate responsibility: your compensation is reduced by your percentage of fault. If your responsibility is 50% or less, you can still recover; if it is greater, you cannot. Insurers often exaggerate the victim’s fault, so it helps to have someone defending your side of the story.',
    },
  },
  {
    id: 'insurance',
    question: {
      es: '¿Debo hablar con la aseguradora del otro conductor?',
      en: 'Should I talk to the other driver’s insurance company?',
    },
    answer: {
      es: 'Debes reportar el accidente a tu propia aseguradora, pero no estás obligado a dar una declaración grabada a la del otro conductor. Sus ajustadores trabajan para pagar lo menos posible. Antes de firmar o aceptar una oferta, consúltanos.',
      en: 'You should report the accident to your own insurer, but you are not required to give a recorded statement to the other driver’s. Their adjusters work to pay as little as possible. Before signing or accepting an offer, talk to us.',
    },
  },
  {
    id: 'uninsured',
    question: {
      es: '¿Y si el responsable no tiene seguro?',
      en: 'What if the responsible driver has no insurance?',
    },
    answer: {
      es: 'Si tu póliza incluye cobertura de conductor sin seguro o con seguro insuficiente (UM/UIM), puedes reclamar a tu propia aseguradora. En Texas esa cobertura viene incluida salvo que la hayas rechazado por escrito. Revisamos tu póliza para encontrar todas las vías de compensación.',
      en: 'If your policy includes uninsured/underinsured motorist (UM/UIM) coverage, you can make a claim with your own insurer. In Texas that coverage is included unless you rejected it in writing. We review your policy to find every path to compensation.',
    },
  },
  {
    id: 'trial',
    question: {
      es: '¿Mi caso tendrá que ir a juicio?',
      en: 'Will my case have to go to trial?',
    },
    answer: {
      es: 'La mayoría de los casos de lesiones personales se resuelve con un acuerdo antes del juicio. Aun así, preparamos cada caso como si fuera a llegar a la corte, y si la aseguradora no hace una oferta justa, estamos listos para litigar.',
      en: 'Most personal injury cases are resolved through a settlement before trial. Even so, we prepare every case as if it will reach the courtroom, and if the insurer won’t make a fair offer, we are ready to litigate.',
    },
  },
  {
    id: 'consultation',
    question: {
      es: '¿Cuánto cuesta la consulta?',
      en: 'How much does the consultation cost?',
    },
    answer: {
      es: 'La consulta inicial es gratuita. En ella evaluamos tu caso y te explicamos con claridad cómo trabajaríamos y cuáles serían los honorarios antes de que firmes cualquier acuerdo.',
      en: 'The initial consultation is free. We evaluate your case and clearly explain how we would work together and what the fees would be before you sign any agreement.',
    },
  },
]

/** Preguntas frecuentes por área; solo las áreas listadas aquí muestran la sección. */
export const areaFaqs: Partial<Record<PracticeArea, Array<FaqItem>>> = {
  'personal-injury': injuryFaq,
  'criminal-law': criminalFaq,
}

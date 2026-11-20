import { site } from './site'
import type { LegalDocument } from './legal-types'
import type { Language } from '@/i18n'

const { name } = site

/**
 * Aviso legal del sitio. No afirma cobro por contingencia, certificaciones ni resultados concretos
 * (ver pendientes en `.claude/CLAUDE.md`). Pendiente de revisión del abogado, en particular el texto
 * de publicidad de abogados que exigen las Reglas Disciplinarias de Texas.
 */
export const legalDisclaimer: Record<Language, LegalDocument> = {
  es: {
    updated: '19 de noviembre de 2026',
    intro: [
      `Lee este Aviso legal antes de usar el sitio web de ${name}. Explica los límites de la información que publicamos y qué significa, y qué no, ponerte en contacto con nosotros.`,
    ],
    sections: [
      {
        id: 'not-advice',
        title: 'Información general, no asesoría legal',
        paragraphs: [
          'El contenido de este sitio es información general sobre la ley de Texas y nuestros servicios. No constituye asesoría legal ni sustituye la orientación de un abogado sobre tu situación. Cada caso es distinto, y la ley y su aplicación pueden cambiar, por lo que la información puede no estar al día o no aplicar a tu caso. No actúes ni dejes de actuar basándote solo en lo que leas aquí.',
        ],
      },
      {
        id: 'no-relationship',
        title: 'No se crea una relación abogado-cliente',
        paragraphs: [
          `Leer este sitio, llamarnos, escribirnos o enviar el formulario de contacto no crea una relación abogado-cliente con ${name} ni con sus abogados. Esa relación solo existe cuando ambas partes lo acuerdan por escrito. Hasta entonces, no nos envíes información confidencial ni detalles sensibles de tu caso: podría no estar protegida por el privilegio abogado-cliente y no podemos garantizar que mantengamos su reserva. Además, podemos tener un conflicto de intereses que nos impida representarte.`,
        ],
      },
      {
        id: 'deadlines',
        title: 'Plazos legales',
        paragraphs: [
          'Las leyes establecen plazos estrictos para presentar reclamaciones y para responder a cargos, citatorios y notificaciones, y pueden vencer sin aviso. Si crees que tienes un caso o enfrentas un cargo, consulta con un abogado cuanto antes. Esperar puede perjudicar tus derechos.',
        ],
      },
      {
        id: 'results',
        title: 'Sin garantía de resultados',
        paragraphs: [
          'No garantizamos ni prometemos ningún resultado. Cada caso depende de sus hechos, de la evidencia y de la ley aplicable. Los resultados anteriores, si se mencionan, no garantizan un resultado similar en tu caso.',
        ],
      },
      {
        id: 'testimonials',
        title: 'Testimonios y reseñas',
        paragraphs: [
          'Los testimonios y reseñas que puedan aparecer en este sitio reflejan la experiencia individual de quien los da y no garantizan ni predicen el resultado de tu caso.',
        ],
      },
      {
        id: 'jurisdiction',
        title: 'Alcance y jurisdicción',
        paragraphs: [
          `${name} ejerce en el estado de Texas, con oficinas en Brownsville, McAllen y Harlingen. La información de este sitio se refiere a la ley de Texas y a la ley federal aplicable en Texas; no ofrecemos asesoría sobre la ley de otras jurisdicciones por medio de este sitio.`,
        ],
      },
      {
        id: 'advertising',
        title: 'Publicidad de abogados',
        paragraphs: [
          'Este sitio puede considerarse publicidad de servicios legales conforme a las Reglas Disciplinarias de Conducta Profesional de Texas.',
        ],
      },
      {
        id: 'accuracy',
        title: 'Exactitud y enlaces',
        paragraphs: [
          'Procuramos que la información sea correcta, pero no garantizamos que esté completa ni libre de errores. No somos responsables del contenido de los sitios de terceros a los que enlazamos. Consulta también nuestros Términos de uso y nuestro Aviso de privacidad.',
        ],
      },
      {
        id: 'contact',
        title: 'Contáctanos',
        paragraphs: [
          'Si tienes preguntas sobre este Aviso legal, escríbenos o llámanos:',
        ],
        contact: true,
      },
    ],
  },
  en: {
    updated: 'November 19, 2026',
    intro: [
      `Please read this Legal Disclaimer before using the ${name} website. It explains the limits of the information we publish and what contacting us does and does not mean.`,
    ],
    sections: [
      {
        id: 'not-advice',
        title: 'General Information, Not Legal Advice',
        paragraphs: [
          'The content of this site is general information about Texas law and our services. It is not legal advice and is not a substitute for an attorney’s guidance on your situation. Every case is different, and the law and how it is applied can change, so the information may be out of date or may not apply to your case. Do not act, or refrain from acting, based solely on what you read here.',
        ],
      },
      {
        id: 'no-relationship',
        title: 'No Attorney-Client Relationship',
        paragraphs: [
          `Reading this site, calling us, writing to us, or submitting the contact form does not create an attorney-client relationship with ${name} or its attorneys. That relationship exists only when both parties agree to it in writing. Until then, do not send us confidential information or sensitive details about your case: it may not be protected by the attorney-client privilege, and we cannot guarantee that we will keep it confidential. We may also have a conflict of interest that prevents us from representing you.`,
        ],
      },
      {
        id: 'deadlines',
        title: 'Legal Deadlines',
        paragraphs: [
          'The law sets strict deadlines for filing claims and for responding to charges, summonses, and notices, and they can expire without warning. If you believe you have a case or you are facing a charge, speak with an attorney as soon as possible. Waiting can harm your rights.',
        ],
      },
      {
        id: 'results',
        title: 'No Guarantee of Results',
        paragraphs: [
          'We do not guarantee or promise any outcome. Every case depends on its facts, the evidence, and the applicable law. Prior results, if mentioned, do not guarantee a similar outcome in your case.',
        ],
      },
      {
        id: 'testimonials',
        title: 'Testimonials and Reviews',
        paragraphs: [
          'Any testimonials and reviews that may appear on this site reflect the individual experience of the person giving them and do not guarantee or predict the outcome of your case.',
        ],
      },
      {
        id: 'jurisdiction',
        title: 'Scope and Jurisdiction',
        paragraphs: [
          `${name} practices in the State of Texas, with offices in Brownsville, McAllen, and Harlingen. The information on this site refers to Texas law and the federal law that applies in Texas; we do not offer advice about the law of other jurisdictions through this site.`,
        ],
      },
      {
        id: 'advertising',
        title: 'Attorney Advertising',
        paragraphs: [
          'This site may be considered advertising for legal services under the Texas Disciplinary Rules of Professional Conduct.',
        ],
      },
      {
        id: 'accuracy',
        title: 'Accuracy and Links',
        paragraphs: [
          'We try to keep the information accurate, but we do not guarantee that it is complete or error-free. We are not responsible for the content of the third-party sites we link to. Please also see our Terms of Use and our Privacy Policy.',
        ],
      },
      {
        id: 'contact',
        title: 'Contact Us',
        paragraphs: [
          'If you have any questions about this Legal Disclaimer, please contact us at:',
        ],
        contact: true,
      },
    ],
  },
}

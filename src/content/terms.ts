import { site } from './site'
import type { LegalDocument } from './legal-types'
import type { Language } from '@/i18n'

const { name, url } = site
const website = url.replace('https://', 'www.')

/**
 * Términos de uso del sitio. Redactados para The LawGun (despacho de defensa penal y lesiones personales
 * en Texas); la jurisdicción y la sede son Texas y el condado de Cameron. Pendiente de revisión del abogado.
 */
export const terms: Record<Language, LegalDocument> = {
  es: {
    updated: '19 de noviembre de 2026',
    intro: [
      `Estos Términos de uso regulan el acceso y el uso del sitio web de ${name}, ${website} (el «Sitio»). Al visitar el Sitio o usarlo, aceptas estos términos. Si no estás de acuerdo con ellos, te pedimos que no uses el Sitio.`,
    ],
    sections: [
      {
        id: 'purpose',
        title: 'Finalidad del sitio',
        paragraphs: [
          `El Sitio ofrece información general sobre ${name}, sus abogados y sus áreas de práctica: defensa criminal y lesiones personales en Brownsville, Texas, y el Valle del Río Grande. Su contenido es informativo y no constituye asesoría legal. Consulta también nuestro Aviso legal.`,
        ],
      },
      {
        id: 'no-relationship',
        title: 'No se crea una relación abogado-cliente',
        paragraphs: [
          'Visitar el Sitio, leer su contenido, llamarnos, escribirnos o enviar el formulario de contacto no crea una relación abogado-cliente. Esa relación solo existe cuando ambas partes acuerdan por escrito que te representamos. Hasta entonces, no envíes información confidencial ni detalles sensibles de tu caso: lo que nos envíes antes de ese acuerdo podría no estar protegido por el privilegio abogado-cliente.',
        ],
      },
      {
        id: 'use',
        title: 'Uso permitido',
        paragraphs: [
          'Puedes usar el Sitio para tu consulta personal y no comercial. Al usarlo, te comprometes a no:',
        ],
        items: [
          {
            text: 'usar el Sitio de forma ilegal o para fines que infrinjan derechos de otras personas;',
          },
          {
            text: 'intentar acceder sin autorización al Sitio, a sus sistemas o a la información de otros usuarios;',
          },
          {
            text: 'interferir con el funcionamiento del Sitio, ni sobrecargarlo con herramientas automatizadas;',
          },
          {
            text: 'copiar, extraer de forma masiva o revender el contenido del Sitio;',
          },
          {
            text: 'enviar información falsa o de otra persona, ni hacerte pasar por alguien más.',
          },
        ],
      },
      {
        id: 'communications',
        title: 'Comunicaciones con nosotros',
        paragraphs: [
          'El formulario de contacto prepara un borrador de correo electrónico dirigido a nosotros; solo recibimos la información cuando tú envías ese correo. Cuando nos contactas, aceptas que podamos responderte por teléfono, correo electrónico o, si lo aceptaste expresamente, mensaje de texto. Cómo tratamos tu información y los términos de los mensajes de texto se explican en nuestro Aviso de privacidad. No respondemos de inmediato a todos los mensajes: si tu asunto es urgente, llámanos.',
        ],
      },
      {
        id: 'ip',
        title: 'Propiedad intelectual',
        paragraphs: [
          `El contenido del Sitio, incluidos los textos, el diseño, los logotipos, las marcas, las fotografías y las imágenes, pertenece a ${name} o se usa con autorización, y está protegido por las leyes de propiedad intelectual. No puedes reproducirlo, modificarlo ni distribuirlo sin nuestro permiso previo por escrito, salvo para uso personal y no comercial.`,
        ],
      },
      {
        id: 'third-party',
        title: 'Enlaces y servicios de terceros',
        paragraphs: [
          'El Sitio puede enlazar a sitios de terceros, como nuestras redes sociales o Google Maps, y mostrar un mapa que carga un proveedor externo. Esos sitios y servicios tienen sus propios términos y políticas, y no los controlamos ni somos responsables de ellos. Un enlace no implica que respaldemos ese sitio.',
        ],
      },
      {
        id: 'warranties',
        title: 'Exclusión de garantías',
        paragraphs: [
          'El Sitio y su contenido se ofrecen «tal cual» y «según disponibilidad». Procuramos que la información sea correcta y esté al día, pero no garantizamos que esté libre de errores, que esté completa ni que el Sitio funcione sin interrupciones. La ley puede cambiar, y la información sobre ella puede dejar de estar vigente.',
        ],
      },
      {
        id: 'liability',
        title: 'Limitación de responsabilidad',
        paragraphs: [
          `En la medida que lo permita la ley, ${name} y sus abogados, empleados y colaboradores no serán responsables de daños directos, indirectos, incidentales o consecuentes derivados del uso del Sitio, de la imposibilidad de usarlo o de haber confiado en su contenido. Nada en estos términos limita la responsabilidad que no pueda limitarse conforme a la ley aplicable ni los deberes profesionales de nuestros abogados hacia sus clientes.`,
        ],
      },
      {
        id: 'law',
        title: 'Ley aplicable y jurisdicción',
        paragraphs: [
          'Estos términos se rigen por las leyes del estado de Texas y las leyes federales de Estados Unidos que sean aplicables, sin tener en cuenta sus normas sobre conflicto de leyes. Cualquier controversia derivada del uso del Sitio se someterá a los tribunales competentes del condado de Cameron, Texas.',
        ],
      },
      {
        id: 'language',
        title: 'Idiomas',
        paragraphs: [
          'El Sitio está disponible en inglés y en español. Si hay alguna diferencia entre ambas versiones, prevalece la versión en inglés.',
        ],
      },
      {
        id: 'changes',
        title: 'Cambios a estos términos',
        paragraphs: [
          'Podemos actualizar estos términos de vez en cuando. Los cambios se publicarán en esta página con la fecha de «Última actualización» renovada, y el uso continuo del Sitio después de publicarlos supone que los aceptas.',
        ],
      },
      {
        id: 'contact',
        title: 'Contáctanos',
        paragraphs: [
          'Si tienes preguntas sobre estos Términos de uso, escríbenos o llámanos:',
        ],
        contact: true,
      },
    ],
  },
  en: {
    updated: 'November 19, 2026',
    intro: [
      `These Terms of Use govern access to and use of the ${name} website, ${website} (the “Site”). By visiting or using the Site, you agree to these terms. If you do not agree with them, please do not use the Site.`,
    ],
    sections: [
      {
        id: 'purpose',
        title: 'Purpose of the Site',
        paragraphs: [
          `The Site provides general information about ${name}, its attorneys, and its practice areas: criminal defense and personal injury in Brownsville, Texas, and the Rio Grande Valley. Its content is informational and is not legal advice. Please also see our Legal Disclaimer.`,
        ],
      },
      {
        id: 'no-relationship',
        title: 'No Attorney-Client Relationship',
        paragraphs: [
          'Visiting the Site, reading its content, calling us, writing to us, or submitting the contact form does not create an attorney-client relationship. That relationship exists only when both parties agree in writing that we represent you. Until then, do not send confidential information or sensitive details about your case: what you send us before that agreement may not be protected by the attorney-client privilege.',
        ],
      },
      {
        id: 'use',
        title: 'Permitted Use',
        paragraphs: [
          'You may use the Site for your personal, non-commercial reference. By using it, you agree not to:',
        ],
        items: [
          {
            text: 'use the Site unlawfully or for purposes that infringe the rights of others;',
          },
          {
            text: 'attempt to gain unauthorized access to the Site, its systems, or other users’ information;',
          },
          {
            text: 'interfere with the operation of the Site or overload it with automated tools;',
          },
          {
            text: 'copy, bulk-extract, or resell the Site’s content;',
          },
          {
            text: 'submit false information or another person’s information, or impersonate anyone.',
          },
        ],
      },
      {
        id: 'communications',
        title: 'Communications with Us',
        paragraphs: [
          'The contact form prepares an email draft addressed to us; we only receive the information when you send that email. When you contact us, you agree that we may respond by phone, email, or, if you expressly agreed to it, text message. How we handle your information and the terms for text messages are explained in our Privacy Policy. We do not respond immediately to every message: if your matter is urgent, call us.',
        ],
      },
      {
        id: 'ip',
        title: 'Intellectual Property',
        paragraphs: [
          `The Site’s content, including text, design, logos, trademarks, photographs, and images, belongs to ${name} or is used with permission, and is protected by intellectual property laws. You may not reproduce, modify, or distribute it without our prior written permission, except for personal, non-commercial use.`,
        ],
      },
      {
        id: 'third-party',
        title: 'Third-Party Links and Services',
        paragraphs: [
          'The Site may link to third-party sites, such as our social media pages or Google Maps, and displays a map loaded by an outside provider. Those sites and services have their own terms and policies, and we do not control them or take responsibility for them. A link does not mean we endorse that site.',
        ],
      },
      {
        id: 'warranties',
        title: 'Disclaimer of Warranties',
        paragraphs: [
          'The Site and its content are provided “as is” and “as available.” We try to keep the information accurate and current, but we do not warrant that it is error-free or complete, or that the Site will operate without interruption. The law may change, and information about it may no longer be current.',
        ],
      },
      {
        id: 'liability',
        title: 'Limitation of Liability',
        paragraphs: [
          `To the extent permitted by law, ${name} and its attorneys, employees, and contractors will not be liable for any direct, indirect, incidental, or consequential damages arising from your use of the Site, your inability to use it, or your reliance on its content. Nothing in these terms limits liability that cannot be limited under applicable law or our attorneys’ professional duties to their clients.`,
        ],
      },
      {
        id: 'law',
        title: 'Governing Law and Jurisdiction',
        paragraphs: [
          'These terms are governed by the laws of the State of Texas and applicable United States federal law, without regard to conflict-of-law rules. Any dispute arising from the use of the Site will be brought in the courts of competent jurisdiction in Cameron County, Texas.',
        ],
      },
      {
        id: 'language',
        title: 'Languages',
        paragraphs: [
          'The Site is available in English and Spanish. If there is any difference between the two versions, the English version prevails.',
        ],
      },
      {
        id: 'changes',
        title: 'Changes to These Terms',
        paragraphs: [
          'We may update these terms from time to time. Changes will be posted on this page with an updated “Last Updated” date, and your continued use of the Site after they are posted means you accept them.',
        ],
      },
      {
        id: 'contact',
        title: 'Contact Us',
        paragraphs: [
          'If you have any questions about these Terms of Use, please contact us at:',
        ],
        contact: true,
      },
    ],
  },
}

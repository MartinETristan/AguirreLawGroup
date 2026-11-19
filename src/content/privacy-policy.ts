import { site } from './site'
import type { LegalDocument } from './legal-types'
import type { Language } from '@/i18n'

const { name, url, phone, email } = site
const website = url.replace('https://', 'www.')

/**
 * Aviso de privacidad, adaptado del modelo de Premier Group Insurance a lo que el sitio hace de verdad:
 * el formulario solo abre un borrador de correo, no hay cookies ni analítica y el mapa de contacto
 * carga teselas de OpenFreeMap. Si cambia algo de eso (formulario con backend, analítica, casilla de
 * SMS), hay que actualizar este texto y la fecha de `updated`.
 */
export const privacyPolicy: Record<Language, LegalDocument> = {
  es: {
    updated: '19 de noviembre de 2026',
    intro: [
      `${name} se compromete a proteger tu privacidad. Este Aviso de privacidad describe cómo recopilamos, usamos, divulgamos y protegemos tu información cuando visitas nuestro sitio web, ${website}, o te comunicas con nosotros por cualquier otro medio.`,
    ],
    sections: [
      {
        id: 'collect',
        title: 'Información que recopilamos',
        paragraphs: ['Podemos recopilar los siguientes tipos de información:'],
        items: [
          {
            label: 'Información personal.',
            text: 'Cuando nos contactas por medio de nuestro sitio, por teléfono o por correo electrónico, podemos recopilar la información personal que nos proporciones, como tu nombre completo, número de teléfono, correo electrónico, dirección postal, el tipo de caso y lo que decidas contarnos sobre él.',
          },
          {
            label: 'Información recopilada automáticamente.',
            text: 'Al visitar el sitio, podemos recopilar información sobre tu dispositivo y su uso, como la dirección IP, el tipo de navegador, el sistema operativo, las direcciones de referencia y las páginas consultadas. Nuestro sitio no usa cookies de seguimiento ni herramientas de analítica; esta información puede quedar en los registros de nuestro proveedor de alojamiento.',
          },
          {
            label: 'Mapa de la oficina.',
            text: 'La página de contacto muestra un mapa cuyas imágenes carga un proveedor externo (OpenFreeMap). Al cargarlas, ese proveedor puede recibir tu dirección IP y los datos de tu navegador.',
          },
        ],
      },
      {
        id: 'form',
        title: 'El formulario de contacto',
        paragraphs: [
          'Nuestro formulario de contacto no envía tus datos por sí mismo: prepara un borrador de correo electrónico en tu aplicación de correo, dirigido a nosotros. Solo recibimos la información cuando tú envías ese correo. Si prefieres, puedes llamarnos o escribirnos directamente.',
          'Ponerte en contacto con nosotros o enviar el formulario no crea una relación abogado-cliente. Hasta que confirmemos por escrito que te representamos, no envíes información confidencial ni detalles sensibles de tu caso. Cuando sí te representemos, trataremos tu información conforme a nuestros deberes de confidencialidad como abogados bajo las Reglas Disciplinarias de Conducta Profesional de Texas.',
        ],
      },
      {
        id: 'use',
        title: 'Cómo usamos tu información',
        paragraphs: [
          'Usamos la información que recopilamos para los siguientes fines:',
        ],
        items: [
          {
            label: 'Comunicarnos contigo.',
            text: 'Usamos tus datos de contacto para responder a tus consultas, prestar servicios legales, enviarte información administrativa y mantenerte al tanto de tu caso o de nuestros servicios.',
          },
          {
            label: 'Comunicaciones de marketing y promocionales.',
            text: 'Con tu consentimiento, podemos usar tu información para enviarte novedades, boletines o comunicaciones de marketing por correo electrónico, teléfono o mensaje de texto. Puedes darte de baja en cualquier momento siguiendo las instrucciones de la comunicación o contactándonos directamente.',
          },
          {
            label: 'Cumplimiento legal.',
            text: 'Podemos usar tu información para cumplir con leyes, reglamentos u obligaciones legales aplicables, incluida la respuesta a citatorios, órdenes judiciales o solicitudes legales.',
          },
        ],
      },
      {
        id: 'sms-consent',
        title: 'Consentimiento para recibir mensajes de texto',
        paragraphs: [
          `No estás obligado a aceptar recibir mensajes de texto de ${name}. Al proporcionar tu número de teléfono y aceptar expresamente recibirlos, consientes que ${name} te envíe mensajes de texto sobre tu consulta, nuestros servicios o asuntos legales relacionados. Pueden aplicar tarifas de mensajes y datos. Puedes dejar de recibirlos en cualquier momento respondiendo «STOP» a cualquier mensaje que te enviemos. Ten en cuenta que darte de baja puede limitar nuestra capacidad de comunicarnos contigo sobre tu caso o nuestros servicios.`,
        ],
      },
      {
        id: 'sharing',
        title: 'Cómo compartimos y divulgamos tu información',
        paragraphs: [
          'No vendemos ni alquilamos tu información personal a terceros. No vendemos, alquilamos, divulgamos ni transferimos a ningún tercero tu consentimiento para recibir mensajes de texto ni tu número de teléfono con fines de marketing de terceros. Podemos compartir tu información en las siguientes circunstancias:',
        ],
        items: [
          {
            label: 'Proveedores de servicios.',
            text: 'Podemos compartir tu información con proveedores que prestan servicios en nuestro nombre, como marketing, atención al cliente o soporte técnico. Estos proveedores están obligados por contrato a proteger tu información y a usarla solo para los servicios que nos prestan.',
          },
          {
            label: 'Requisitos legales.',
            text: 'Podemos divulgar tu información si lo exige la ley, un reglamento o un proceso legal, o si creemos que es necesario para proteger nuestros derechos, nuestra propiedad o la seguridad de nuestros usuarios o de otras personas.',
          },
        ],
      },
      {
        id: 'security',
        title: 'Seguridad de los datos',
        paragraphs: [
          'Aplicamos medidas de seguridad razonables para proteger tu información personal contra el acceso, uso, divulgación, alteración o destrucción no autorizados. Sin embargo, ningún método de transmisión por internet ni de almacenamiento electrónico es completamente seguro, y no podemos garantizar una seguridad absoluta.',
        ],
      },
      {
        id: 'rights',
        title: 'Tus derechos y opciones',
        items: [
          {
            label: 'Darte de baja.',
            text: 'Puedes dejar de recibir comunicaciones de marketing siguiendo las instrucciones que incluyen o contactándonos directamente. Si te das de baja, aún podremos enviarte comunicaciones no promocionales relacionadas con tus servicios legales o con nuestra relación profesional.',
          },
          {
            label: 'Acceder y actualizar tu información.',
            text: 'Tienes derecho a acceder a tu información personal, actualizarla o corregirla. Para hacerlo, contáctanos con los datos que aparecen más abajo.',
          },
        ],
      },
      {
        id: 'third-party',
        title: 'Sitios web de terceros',
        paragraphs: [
          'Nuestro sitio puede contener enlaces a sitios de terceros, como nuestras redes sociales o Google Maps para las indicaciones de llegada. No somos responsables de las prácticas de privacidad ni del contenido de esos sitios. Te recomendamos revisar las políticas de privacidad de cualquier sitio que visites.',
        ],
      },
      {
        id: 'sms-communication',
        title: 'Comunicación por mensajes de texto (SMS)',
        paragraphs: [
          `Podemos enviar mensajes de texto (SMS) de ${name}, directamente o por medio de un agente externo o proveedor de servicios autorizado, a través de tu proveedor de servicios de comunicación para entregártelos. Aceptas que tu proveedor actúa como tu agente en esta función. No se compartirá información móvil con terceros ni afiliados con fines de marketing o promoción. Todas las categorías anteriores excluyen los datos de aceptación (opt-in) y el consentimiento de los mensajes de texto: esa información no se compartirá con ningún tercero, incluidos afiliados o socios comerciales, y la aceptación no es transferible a otra parte involucrada en el proceso.`,
        ],
      },
      {
        id: 'children',
        title: 'Privacidad de los menores',
        paragraphs: [
          'Nuestro sitio no está dirigido a menores de 13 años y no recopilamos a sabiendas información personal de ellos. Si nos enteramos de que recopilamos por error información personal de un menor de 13 años, tomaremos medidas para eliminarla.',
        ],
      },
      {
        id: 'changes',
        title: 'Cambios a este Aviso de privacidad',
        paragraphs: [
          'Podemos actualizar este Aviso de privacidad de vez en cuando. Publicaremos los cambios en esta página con la fecha de «Última actualización» renovada. Te recomendamos revisarla periódicamente.',
        ],
      },
      {
        id: 'contact',
        title: 'Contáctanos',
        paragraphs: [
          'Si tienes preguntas o inquietudes sobre este Aviso de privacidad o sobre nuestras prácticas de privacidad, escríbenos o llámanos:',
        ],
        contact: true,
      },
      {
        id: 'sms-terms',
        title: 'Términos y condiciones de los mensajes de texto',
        paragraphs: [
          'Al aceptar recibir mensajes de texto, aceptas lo siguiente:',
        ],
        numbered: true,
        items: [
          {
            label: 'Consentimiento para las comunicaciones por SMS.',
            text: 'Los números de teléfono obtenidos durante el proceso de consentimiento para SMS no se compartirán con terceros con fines de marketing. Así nos aseguramos de que tu información se use únicamente para comunicaciones relacionadas con nuestros servicios.',
          },
          {
            label: 'Tipos de comunicaciones por SMS.',
            text: `Al aceptar, puedes recibir mensajes de texto de ${name} relacionados con tu consulta, notificaciones sobre tu caso y atención al cliente.`,
          },
          {
            label: 'Frecuencia de los mensajes.',
            text: 'La frecuencia varía según el tipo de comunicación.',
          },
          {
            label: 'Posibles costos de los mensajes.',
            text: 'Pueden aplicar las tarifas estándar de mensajes y datos, según el plan de tu operador. Estas tarifas pueden variar para mensajes nacionales o internacionales.',
          },
          {
            label: 'Cómo aceptar.',
            text: 'Aceptando expresamente recibir mensajes de texto cuando te comuniques con nosotros por teléfono, por correo electrónico o mediante el formulario de contacto del sitio.',
          },
          {
            label: 'Cómo darte de baja.',
            text: `Puedes darte de baja en cualquier momento respondiendo «STOP» a cualquier mensaje. También puedes contactarnos directamente al ${phone.display} o en ${email}.`,
          },
          {
            label: 'Ayuda.',
            text: `Si tienes algún problema, responde con la palabra «HELP» o contáctanos directamente al ${phone.display} o en ${email}.`,
          },
          {
            label: 'Otras opciones.',
            text: 'Si no deseas recibir mensajes de texto, puedes optar por no aceptarlos cuando te los ofrezcamos o por no dar tu número de teléfono.',
          },
          {
            label: 'Avisos estándar de mensajería.',
            text: `Pueden aplicar tarifas de mensajes y datos. Puedes darte de baja en cualquier momento enviando «STOP». Para recibir ayuda, envía «HELP» o consulta este Aviso de privacidad (${url}/es/privacy-policy). La frecuencia de los mensajes varía según el servicio.`,
          },
        ],
      },
    ],
  },
  en: {
    updated: 'November 19, 2026',
    intro: [
      `${name} is committed to protecting your privacy. This Privacy Policy describes how we collect, use, disclose, and protect your information when you visit our website, ${website}, or interact with us in any other manner.`,
    ],
    sections: [
      {
        id: 'collect',
        title: 'Information We Collect',
        paragraphs: [
          'We may collect the following types of information from you:',
        ],
        items: [
          {
            label: 'Personal Information.',
            text: 'When you contact us through our website, phone, or email, we may collect the personal information you provide, including your full name, phone number, email address, mailing address, your type of case, and whatever you choose to tell us about it.',
          },
          {
            label: 'Automatically Collected Information.',
            text: 'When you visit our website, we may collect certain information about your device and usage, including IP address, browser type, operating system, referring URLs, and pages viewed. Our website does not use tracking cookies or analytics tools; this information may be kept in our hosting provider’s logs.',
          },
          {
            label: 'Office Map.',
            text: 'The contact page shows a map whose images are loaded from a third-party provider (OpenFreeMap). When they load, that provider may receive your IP address and browser details.',
          },
        ],
      },
      {
        id: 'form',
        title: 'The Contact Form',
        paragraphs: [
          'Our contact form does not send your information by itself: it prepares an email draft in your email app, addressed to us. We only receive the information when you send that email. If you prefer, you can call us or write to us directly.',
          'Contacting us or submitting the form does not create an attorney-client relationship. Until we confirm in writing that we represent you, please do not send confidential information or sensitive details about your case. Once we do represent you, we will handle your information in line with our confidentiality duties as attorneys under the Texas Disciplinary Rules of Professional Conduct.',
        ],
      },
      {
        id: 'use',
        title: 'How We Use Your Information',
        paragraphs: [
          'We use the information we collect for the following purposes:',
        ],
        items: [
          {
            label: 'To Communicate with You.',
            text: 'We use your contact information to respond to your inquiries, provide legal services, send administrative information, and keep you informed about your case or our services.',
          },
          {
            label: 'Marketing and Promotional Communications.',
            text: 'With your consent, we may use your information to send you updates, newsletters, or marketing communications via email, phone, or text message. You can opt out of receiving these communications at any time by following the instructions provided in the communication or contacting us directly.',
          },
          {
            label: 'Legal Compliance.',
            text: 'We may use your information to comply with applicable laws, regulations, or legal obligations, including responding to subpoenas, court orders, or legal requests.',
          },
        ],
      },
      {
        id: 'sms-consent',
        title: 'Consent to Receive Text Messages',
        paragraphs: [
          `You are not required to consent to receiving text messages from ${name}. By providing your phone number and expressly agreeing to receive them, you consent to receive text messages from ${name} regarding your inquiry, our services, or related legal matters. Message and data rates may apply. You can opt out of receiving text messages at any time by replying “STOP” to any text message you receive from us. Please note that opting out may limit our ability to communicate with you regarding your case or services.`,
        ],
      },
      {
        id: 'sharing',
        title: 'Information Sharing and Disclosure',
        paragraphs: [
          'We do not sell or rent your personal information to third parties. We do not sell, rent, release, or transfer your SMS consent or phone number to any third party for any third-party marketing purposes. We may share your information in the following circumstances:',
        ],
        items: [
          {
            label: 'Service Providers.',
            text: 'We may share your information with our service providers who perform services on our behalf, such as marketing, customer service, or technical support. These service providers are contractually obligated to protect your information and use it only for the services they provide.',
          },
          {
            label: 'Legal Requirements.',
            text: 'We may disclose your information if required by law, regulation, or legal process, or if we believe disclosure is necessary to protect our rights, property, or the safety of our users or others.',
          },
        ],
      },
      {
        id: 'security',
        title: 'Data Security',
        paragraphs: [
          'We implement reasonable security measures to protect your personal information from unauthorized access, use, disclosure, alteration, or destruction. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.',
        ],
      },
      {
        id: 'rights',
        title: 'Your Rights and Choices',
        items: [
          {
            label: 'Opting Out.',
            text: 'You may opt out of receiving marketing communications from us by following the instructions in those communications or contacting us directly. If you opt out, we may still send you non-promotional communications related to your legal services or our ongoing professional relationship.',
          },
          {
            label: 'Access and Update Information.',
            text: 'You have the right to access, update, or correct your personal information. To do so, please contact us using the information provided below.',
          },
        ],
      },
      {
        id: 'third-party',
        title: 'Third-Party Websites',
        paragraphs: [
          'Our website may contain links to third-party websites, such as our social media pages or Google Maps for directions. We are not responsible for the privacy practices or content of these third-party sites. We encourage you to review the privacy policies of any third-party websites you visit.',
        ],
      },
      {
        id: 'sms-communication',
        title: 'SMS Message Communication',
        paragraphs: [
          `We may send any ${name} text (SMS) message, either directly or via a third-party agent or authorized service provider, through your communication service provider in order to deliver it to you. You agree that your communication service provider is acting as your agent in this capacity. No mobile information will be shared with third parties or affiliates for marketing or promotional purposes. All the above categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties, including affiliates or business partners, and the opt-in is not transferable to another party involved in the process.`,
        ],
      },
      {
        id: 'children',
        title: 'Children’s Privacy',
        paragraphs: [
          'Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have inadvertently collected personal information from a child under 13, we will take steps to delete such information.',
        ],
      },
      {
        id: 'changes',
        title: 'Changes to This Privacy Policy',
        paragraphs: [
          'We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated “Last Updated” date. We encourage you to review this Privacy Policy periodically for any updates.',
        ],
      },
      {
        id: 'contact',
        title: 'Contact Us',
        paragraphs: [
          'If you have any questions or concerns about this Privacy Policy or our privacy practices, please contact us at:',
        ],
        contact: true,
      },
      {
        id: 'sms-terms',
        title: 'SMS Terms and Conditions',
        paragraphs: [
          'By opting in to receive SMS messages, you agree to the following:',
        ],
        numbered: true,
        items: [
          {
            label: 'Consent for SMS Communication.',
            text: 'Phone numbers obtained during the SMS consent process will not be shared with third parties for marketing purposes. This ensures that your information is used solely for communication purposes related to our services.',
          },
          {
            label: 'Types of SMS Communications.',
            text: `By opting in, you may receive SMS messages from ${name} related to your inquiry, case notifications, and customer care.`,
          },
          {
            label: 'Message Frequency.',
            text: 'Message frequency may vary depending on the type of communication.',
          },
          {
            label: 'Potential Fees for SMS Messaging.',
            text: 'Standard message and data rates may apply, depending on your carrier’s pricing plan. These fees may differ for domestic or international messages.',
          },
          {
            label: 'Opt-In Methods.',
            text: 'By expressly agreeing to receive text messages when you contact us by phone, by email, or through the website’s contact form.',
          },
          {
            label: 'Opt-Out Instructions.',
            text: `You can opt out at any time by replying “STOP” to any SMS message. Alternatively, contact us directly at ${phone.display} or at ${email}.`,
          },
          {
            label: 'Help.',
            text: `If you are experiencing any issues, reply with the keyword “HELP” or contact us directly at ${phone.display} or at ${email}.`,
          },
          {
            label: 'Additional Options.',
            text: 'If you do not wish to receive SMS messages, you can choose not to agree to them when we offer them, or not to provide your phone number.',
          },
          {
            label: 'Standard Messaging Disclosures.',
            text: `Message and data rates may apply. You can opt out at any time by texting “STOP.” For assistance, text “HELP” or visit our Privacy Policy (${url}/privacy-policy). Message frequency may vary depending on service.`,
          },
        ],
      },
    ],
  },
}

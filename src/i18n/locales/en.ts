import type { Translation } from './es'

const en: Translation = {
  common: {
    freeConsultation: 'Free consultation',
    scheduleConsultation: 'Schedule your free consultation',
    call: 'Call {{phone}}',
    hours: 'Mon–Fri, {{open}} – {{close}}',
    skipToContent: 'Skip to content',
  },
  nav: {
    label: 'Main',
    home: 'Home',
    about: 'About Us',
    areas: 'Practice Areas',
    firm: 'The Firm',
    attorney: 'Attorney',
    testimonials: 'Testimonials',
    contact: 'Contact',
    openMenu: 'Open menu',
    areasSubmenu: 'Practice areas submenu',
    menu: 'Menu',
    language: 'Language',
    login: 'Log in',
  },
  hero: {
    heading: 'Criminal defense and personal injury attorneys in Brownsville, Texas',
    stats: {
      sinceLabel: 'Practicing in the Rio Grande Valley',
      cases: 'Hundreds',
      casesLabel: 'Of cases and jury trials',
      prosecutor: 'City prosecutor',
      prosecutorLabel: 'City of Brownsville, {{year}}',
    },
  },
  values: {
    label: 'Values',
    words: ['Reliable.', 'Devoted.', 'Respected.'],
  },
  areas: {
    title: 'One decision shouldn’t change your life.',
    viewAll: 'View all practice areas',
    other: {
      title: 'Don’t see your case?',
      text: 'Tell us what happened and we’ll guide you at no cost.',
    },
    items: {
      'criminal-law': {
        title: 'Criminal Law',
        text: 'Mistakes happen. We aggressively defend your rights in misdemeanor and felony cases.',
      },
      dwi: {
        title: 'DWI',
        text: 'Don’t let one bad decision change your life forever.',
      },
      'drug-charges': {
        title: 'Drug Charges',
        text: 'Possession, sales, trafficking, and other state or federal charges.',
      },
      'personal-injury': {
        title: 'Personal Injury',
        text: 'Car and work accidents, slip and falls, and more. Don’t let your pain go ignored.',
      },
      'theft-property': {
        title: 'Theft & Property Crimes',
        text: 'Burglary, shoplifting, arson, check forgery, and more.',
      },
      'violent-crimes': {
        title: 'Violent Crimes',
        text: 'Assault, domestic violence, kidnapping, and other serious charges.',
      },
      'white-collar': {
        title: 'White Collar Crime',
        text: 'Fraud, embezzlement, extortion, and money laundering, often with federal involvement.',
      },
    },
  },
  firm: {
    title: 'Your rights and your freedom come first.',
    lead: 'Whether you are facing a personal injury that has changed your life or an arrest that puts your future at stake, you need an attorney who will do everything in their power to defend your well-being, rights, and freedom.',
    evidence:
      'We have the insight to find weaknesses and mistakes in the prosecution’s case. We thoroughly study the evidence and devise the best strategy for your defense.',
    reasonsTitle: 'When you choose Aguirre Law Group, you are choosing:',
    reasons: [
      'A law firm that prioritizes your rights and freedom above anything else.',
      'A dedicated attorney who is thoroughly familiar with the Texas criminal justice system.',
      '{{years}} years of litigation experience.',
      'A track record that includes hundreds of cases and jury trials.',
      'A team with you the whole time: arraignment, negotiations, hearings and, if necessary, trial.',
    ],
  },
  attorney: {
    photoAlt: '{{name}}, criminal defense and personal injury attorney in Brownsville, Texas',
    role: 'Criminal defense and personal injury attorney',
    bio: 'Practicing law in the Rio Grande Valley since {{year}}, {{years}} years ago, with a focus on criminal and personal injury cases.',
    bio2: 'He defends individuals charged with DWI, drug possession, tax evasion, theft, assault, extortion, and other misdemeanors or felonies in Brownsville, Texas.',
    personal:
      'When not advocating for the rights of his clients, he enjoys spending time with his wife and two children.',
    credentials: {
      jd: 'Juris Doctor (J.D.)',
      ba: 'B.A. in Government',
      aa: 'A.A.',
      aaValue: 'Spanish Translations',
      prosecutor: 'City Prosecutor',
      prosecutorValue: 'Brownsville, {{year}}',
      community: 'Community',
      communityValue: 'Scoutmaster, BSA Troop {{troop}}, since {{year}}',
    },
  },
  landing: {
    hero: {
      call: 'Call',
    },
    areas: {
      title: 'What are you facing?',
      items: {
        'criminal-law': 'Misdemeanors and felonies.',
        dwi: 'First offense or repeat.',
        'drug-charges': 'Possession, sales, trafficking. State or federal.',
        'personal-injury': 'Car and work accidents, falls.',
        'theft-property': 'Burglary, shoplifting, arson, forgery.',
        'violent-crimes': 'Assault, domestic violence, kidnapping.',
        'white-collar': 'Fraud, embezzlement, extortion, money laundering.',
      },
    },
    firm: {
      stagesCaption: 'A team with you the whole time.',
      stages: ['Arraignment', 'Negotiations', 'Hearings', 'Trial'],
      stageCondition: 'if necessary',
      evidence:
        'We thoroughly study the evidence and look for weaknesses and mistakes in the prosecution’s case.',
    },
    attorney: {
      personal: 'Husband and father of two.',
      more: 'View full profile',
      practicing: 'Begins practicing in the Rio Grande Valley',
      scouts: 'Scoutmaster, BSA Troop {{troop}}',
      prosecutor: 'City prosecutor, Brownsville',
      today: 'Today',
      years: '{{years}} years in practice',
    },
    contact: {
      lead: 'Call to speak directly with your attorney or fill out the form.',
    },
  },
  areaPage: {
    back: 'All practice areas',
    cta: 'Request an evaluation',
    ctaText: 'Tell us what happened and we’ll evaluate your case.',
    otherAreas: 'Other areas',
    disclaimer:
      'General information about Texas law; not legal advice. Penalties vary by case and may change with the law.',
  },
  faq: {
    title: 'Frequently asked questions.',
  },
  testimonials: {
    title: 'What our clients say.',
  },
  contact: {
    title: 'Let’s talk about your case.',
    lead: 'When facing a life-changing situation, you need a legal team that will do everything to protect you. Call to speak directly with your attorney or fill out the form.',
    form: {
      name: 'Full name',
      phone: 'Phone',
      email: 'Email',
      caseType: 'Case type',
      caseTypePlaceholder: 'Select an option',
      other: 'Other',
      message: 'Tell us about your case (optional)',
      disclaimer:
        'Your information is confidential. Submitting this form does not create an attorney-client relationship.',
      submit: 'Open email draft',
      draftOpened:
        'Your request hasn’t been sent yet: review the draft in your email and send it. If it didn’t open, call us or write to us at {{email}}.',
      mailSubject: 'Consultation request — {{name}}',
      errors: {
        nameRequired: 'Enter your name.',
        nameInvalid: 'Enter your name using letters only.',
        phoneRequired: 'Enter your phone number.',
        phoneInvalid:
          'Enter a 10-digit phone number or, if international, include the country code (+52…).',
        emailRequired: 'Enter your email address.',
        emailInvalid: 'Enter a valid email, like name@example.com.',
        areaRequired: 'Select your case type.',
      },
    },
    map: {
      title: 'Our office.',
      label: 'Map showing the office location: {{address}}',
      directions: 'Get directions',
      loading: 'Loading map',
      unavailable: 'The map could not be loaded. Use “Get directions” to see the route.',
      zoom: 'Map zoom',
      zoomIn: 'Zoom in',
      zoomOut: 'Zoom out',
      touchHint: 'Use two fingers to move the map',
      attribution: 'Show or hide map credits',
    },
  },
  login: {
    back: 'Back to the site',
    title: 'Log in',
    email: 'Email',
    password: 'Password',
    submit: 'Log in',
    unavailable: 'System access is not available yet.',
    errors: {
      emailRequired: 'Enter your email address.',
      emailInvalid: 'Enter a valid email, like name@example.com.',
      passwordRequired: 'Enter your password.',
    },
  },
  cta: {
    title: 'Facing a charge or recovering from an injury?',
    text: 'Contact us today to request an initial case evaluation.',
  },
  footer: {
    motto: 'Reliable. Devoted. Respected.',
    office: 'Office',
    contact: 'Contact',
    navigation: 'Navigation',
    social: 'Social media',
    rights: '© {{year}} {{name}}. All rights reserved.',
    legal: {
      privacy: 'Privacy Policy',
      terms: 'Terms',
      disclaimer: 'Legal Disclaimer',
    },
  },
  notFound: {
    title: 'Page not found.',
    text: 'The page you’re looking for doesn’t exist or has moved.',
    back: 'Back to home',
  },
}

export default en

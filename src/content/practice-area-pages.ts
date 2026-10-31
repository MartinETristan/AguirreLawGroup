import { yearsPracticing } from './site'
import type { PracticeArea } from './practice-areas'
import type { Language } from '@/i18n'

export type AreaSection = {
  title: string
  text?: Array<string>
  list?: Array<string>
  rows?: Array<{ label: string; value: string }>
  note?: string
}

export type AreaPage = {
  tagline: string
  intro: Array<string>
  sections: Array<AreaSection>
}

/**
 * Contenido de cada área, tomado de aguirre-lawgroup.com.
 * Cambios frente al original (revisión pendiente del abogado):
 * - El teléfono (956) 548-2230 de algunas páginas se unificó en `site.phone`.
 * - DWI: sin los recargos anuales de DPS ni la cuota de reinstalación ligada a
 *   ellos; el Driver Responsibility Program se derogó el 1 de septiembre de 2019.
 * - Drogas: sin el listado de sustancias por grupo ni la categoría "Life felony",
 *   que no se pudieron confirmar contra el código vigente.
 */
const penaltyRows: Record<Language, AreaSection['rows']> = {
  es: [
    { label: 'Delito menor Clase C', value: 'Multa de hasta $500.' },
    {
      label: 'Delito menor Clase B',
      value: 'Hasta 180 días de cárcel y/o multa de hasta $2,000.',
    },
    {
      label: 'Delito menor Clase A',
      value: 'Hasta 1 año de cárcel y/o multa de hasta $4,000.',
    },
    {
      label: 'Delito grave de cárcel estatal',
      value: 'De 180 días a 2 años de cárcel y/o multa de hasta $10,000.',
    },
    {
      label: 'Delito grave de tercer grado',
      value: 'De 2 a 10 años de prisión y/o multa de hasta $10,000.',
    },
    {
      label: 'Delito grave de segundo grado',
      value: 'De 2 a 20 años de prisión y/o multa de hasta $10,000.',
    },
    {
      label: 'Delito grave de primer grado',
      value: 'De 5 a 99 años o cadena perpetua y/o multa de hasta $10,000.',
    },
  ],
  en: [
    { label: 'Class C misdemeanor', value: 'A fine up to $500.' },
    {
      label: 'Class B misdemeanor',
      value: 'Up to 180 days in jail and/or a fine up to $2,000.',
    },
    {
      label: 'Class A misdemeanor',
      value: 'Up to 1 year in jail and/or a fine up to $4,000.',
    },
    {
      label: 'State jail felony',
      value: '180 days to 2 years in jail and/or a fine up to $10,000.',
    },
    {
      label: 'Third-degree felony',
      value: '2 to 10 years in prison and/or a fine up to $10,000.',
    },
    {
      label: 'Second-degree felony',
      value: '2 to 20 years in prison and/or a fine up to $10,000.',
    },
    {
      label: 'First-degree felony',
      value: '5 to 99 years or life in prison and/or a fine up to $10,000.',
    },
  ],
}

export const areaPages: Record<PracticeArea, Record<Language, AreaPage>> = {
  'criminal-law': {
    es: {
      tagline: 'Defensa firme para personas acusadas en Brownsville.',
      intro: [
        'Dirigida por el abogado Javier Aguirre, Aguirre Law Group representa a personas acusadas en Brownsville y en todo el condado de Cameron. No dejes que un error te persiga el resto de tu vida.',
      ],
      sections: [
        {
          title: 'Por qué necesitas un abogado defensor',
          text: [
            'Cada caso penal y cada corte son distintos. Necesitas a alguien que determine qué cargos enfrentas y cómo protegerte mejor. Javier Aguirre lleva tu caso personalmente, con atención al detalle y comunicación abierta.',
          ],
          list: [
            'Reducir el nivel del delito',
            'Limpiar tu nombre de los cargos',
            'Minimizar las sanciones',
            'Negociar menos tiempo de cárcel o ninguno',
            'Agilizar el proceso legal',
            'Completar correctamente el papeleo legal',
            'Mantenerte informado sobre tu caso',
            'Comunicarnos con las demás partes',
            'Ayudarte a conservar tu empleo',
            'Construir una defensa sólida',
          ],
          note: 'Cuando tomamos un caso, reunimos a investigadores privados, especialistas en evidencia y otros profesionales para buscar el mejor resultado posible.',
        },
        {
          title: 'Casos que defendemos',
          text: [
            'Tenemos experiencia litigando en cortes federales, estatales y municipales.',
          ],
          rows: [
            {
              label: 'Manejo en estado de ebriedad',
              value:
                'Puedes perder tu licencia y tu empleo, y enfrentar multas altas y cárcel, sea primera ofensa o reincidencia.',
            },
            {
              label: 'Cargos estatales y federales por drogas',
              value:
                'Posesión o intención de distribuir: uno de los cargos más serios que puedes enfrentar.',
            },
            {
              label: 'Delitos de cuello blanco',
              value:
                'Lavado de dinero, malversación, extorsión, evasión fiscal, fraude de seguros, robo de identidad, falsificación de cheques y fraude bancario o de tarjetas.',
            },
            {
              label: 'Robo y delitos contra la propiedad',
              value:
                'Una condena puede dificultar que encuentres empleo o consigas crédito.',
            },
            {
              label: 'Delitos violentos',
              value:
                'Agresión agravada, cargos por armas, violencia doméstica y otros delitos violentos.',
            },
          ],
        },
      ],
    },
    en: {
      tagline: 'Tough defense for the criminally charged in Brownsville.',
      intro: [
        'Led by attorney Javier Aguirre, Aguirre Law Group represents accused individuals in Brownsville and throughout Cameron County. Don’t let a mistake haunt you for the rest of your life.',
      ],
      sections: [
        {
          title: 'Why you need a criminal defense attorney',
          text: [
            'Every criminal case and court is different. You need someone who can determine what charges you face and how best to protect yourself. Javier Aguirre personally handles your case, with attention to detail and open communication.',
          ],
          list: [
            'Reducing the level of your offense',
            'Clearing your name of charges',
            'Minimizing penalties',
            'Negotiating for less or no jail time',
            'Speeding up legal proceedings',
            'Correctly completing legal paperwork',
            'Keeping you informed about your case',
            'Communicating with other parties',
            'Helping you keep your job',
            'Building a solid defense',
          ],
          note: 'When we take on a case, we bring together private investigators, evidence specialists, and other professionals to pursue the best possible result.',
        },
        {
          title: 'Cases we defend',
          text: [
            'We have experience litigating in federal, state, and municipal courts.',
          ],
          rows: [
            {
              label: 'Driving while intoxicated',
              value:
                'You could lose your license and your job, and face heavy fines and jail time, whether it’s a first offense or a repeat DWI.',
            },
            {
              label: 'State and federal drug charges',
              value:
                'Possession or intent to distribute: among the most serious charges you can face.',
            },
            {
              label: 'White collar crimes',
              value:
                'Money laundering, embezzlement, extortion, tax evasion, insurance fraud, identity theft, check forgery, and bank or credit card fraud.',
            },
            {
              label: 'Theft and property crimes',
              value:
                'A conviction can make it hard to find a job or get credit.',
            },
            {
              label: 'Violent crimes',
              value:
                'Aggravated assault, weapons charges, domestic violence, and other violent crimes.',
            },
          ],
        },
      ],
    },
  },
  dwi: {
    es: {
      tagline: 'Un arresto por DWI no significa que tu caso esté perdido.',
      intro: [
        'Manejar en estado de ebriedad puede afectar seriamente tu calidad de vida y tu capacidad de trabajar. Buscamos inconsistencias en el caso en tu contra para lograr que los cargos se reduzcan o se desestimen.',
      ],
      sections: [
        {
          title: 'La ley de DWI en Texas',
          text: [
            'Según el Código Penal de Texas § 49.04, una persona comete DWI si conduce un vehículo motorizado en un lugar público en estado de ebriedad. La policía usa pruebas químicas, de sangre y de sobriedad en campo para determinar si la concentración de alcohol en la sangre (BAC) alcanza el límite legal de 0.08.',
            'La fiscalía debe probar que tenías el control físico real del vehículo. Pueden influir estos factores:',
          ],
          list: [
            'Si estabas en el asiento del conductor con el vehículo en operación',
            'En qué lugar del vehículo te encontrabas',
            'Si el vehículo se había conducido recientemente',
            'Si tenías las llaves en tu poder',
          ],
        },
        {
          title: 'Sanciones por DWI en Texas',
          text: [
            'Incluso en una primera ofensa, las sanciones pueden incluir:',
          ],
          list: [
            'Pérdida de la licencia de conducir',
            'Multas elevadas',
            'Cárcel',
            'Servicio comunitario',
            'Libertad condicional',
            'Escuela de DWI',
          ],
          rows: [
            {
              label: 'Condenas múltiples',
              value:
                'Pérdida del privilegio de conducir hasta por 2 años y multa de hasta $4,000.',
            },
            {
              label: 'Tercera ofensa',
              value:
                'Delito grave de tercer grado: de 2 a 10 años de prisión, pérdida del privilegio de conducir y multa de hasta $10,000.',
            },
          ],
          note: 'También puede afectar tu capacidad de trabajar y aumentar las primas de tu seguro de auto.',
        },
        {
          title: 'Cargos que atendemos',
          list: [
            'DWI de primera ofensa o reincidente',
            'DUI de menores de edad',
            'Agresión por intoxicación',
            'DWI relacionado con drogas',
          ],
        },
      ],
    },
    en: {
      tagline: 'A DWI arrest doesn’t mean your case is lost.',
      intro: [
        'Driving while intoxicated can seriously affect your quality of life and your ability to work. We look for inconsistencies in the case against you in order to have your charges reduced or dismissed.',
      ],
      sections: [
        {
          title: 'Texas law regarding DWI',
          text: [
            'Under Texas Penal Code § 49.04, a person commits DWI by operating a motor vehicle in a public place while intoxicated. Police use chemical, blood, and field sobriety tests to determine whether a driver’s blood alcohol concentration (BAC) reaches the legal limit of .08.',
            'The prosecution must prove you were in actual physical control of the vehicle. Determining factors can include:',
          ],
          list: [
            'Whether you were in the driver’s seat while the vehicle was in operation',
            'Where you were in the vehicle',
            'Whether the vehicle had recently been driven',
            'Whether the keys were in your possession',
          ],
        },
        {
          title: 'Texas DWI penalties',
          text: ['Even on a first offense, penalties can include:'],
          list: [
            'Loss of driver’s license',
            'Steep fines',
            'Jail time',
            'Community service',
            'Probation',
            'DWI school',
          ],
          rows: [
            {
              label: 'Multiple convictions',
              value:
                'Loss of driving privileges for up to 2 years and a fine up to $4,000.',
            },
            {
              label: 'Third offense',
              value:
                'Third-degree felony: 2 to 10 years in prison, loss of driving privileges, and a fine up to $10,000.',
            },
          ],
          note: 'It can also affect your ability to work and increase your car insurance premiums.',
        },
        {
          title: 'Charges we handle',
          list: [
            'First-offense or repeat DWI',
            'Underage DUI',
            'Intoxication assault',
            'Drug-related DWI',
          ],
        },
      ],
    },
  },
  'drug-charges': {
    es: {
      tagline: 'Una acusación seria exige una defensa decidida.',
      intro: [
        'Los delitos de drogas conllevan sanciones muy severas y pueden presentarse a nivel estatal o federal. Por su gravedad, contacta a Aguirre Law Group de inmediato si te arrestaron por un caso de drogas.',
        'En Texas, las sustancias controladas se clasifican en grupos de sanción según su potencial de abuso y su peligrosidad.',
      ],
      sections: [
        {
          title: 'Sanciones posibles',
          rows: [
            {
              label: 'Delito menor Clase B',
              value: 'Hasta 180 días de cárcel y/o multa de hasta $2,000.',
            },
            {
              label: 'Delito menor Clase A',
              value: 'Hasta 1 año de cárcel y/o multa de hasta $4,000.',
            },
            {
              label: 'Delito grave de tercer grado',
              value: 'De 2 a 10 años de prisión y/o multa de hasta $10,000.',
            },
            {
              label: 'Delito grave de segundo grado',
              value: 'De 2 a 20 años de prisión y/o multa de hasta $10,000.',
            },
            {
              label: 'Delito grave de primer grado',
              value:
                'De 5 a 99 años o cadena perpetua y/o multa de hasta $10,000.',
            },
          ],
          note: 'Muchos de estos delitos pueden presentarse como delitos graves, con años de prisión y multas de hasta $100,000.',
        },
        {
          title: 'Qué puede influir en tu sanción',
          list: [
            'El tipo de droga',
            'La cantidad',
            'Condenas previas por drogas',
            'La intención que se te atribuye',
            'Si presuntamente hubo menores involucrados',
            'El lugar del arresto (p. ej., zona escolar)',
            'Si ocurrieron otros delitos',
            'Si se usó un arma mortal',
          ],
        },
        {
          title: 'Cargos que defendemos',
          list: [
            'Posesión',
            'Posesión de parafernalia',
            'Venta',
            'Contrabando',
            'Fabricación',
            'Tráfico',
            'Transporte',
            'Posesión con intención de distribuir',
            'Fraude con recetas médicas',
          ],
        },
        {
          title: 'Por qué Aguirre Law Group',
          text: [
            'Estas acusaciones pueden arruinar tu vida, tu reputación y tu capacidad de trabajar. Tienes derechos constitucionales que no pueden violarse. Investigamos a fondo las circunstancias de tu cargo y lo analizamos en busca de puntos débiles y acciones ilegales que hayan afectado tus derechos.',
          ],
        },
      ],
    },
    en: {
      tagline: 'Serious accusations require an aggressive defense.',
      intro: [
        'Drug crimes carry extremely severe penalties and can be charged at the state or federal level. Because of their seriousness, contact Aguirre Law Group immediately after an arrest for a drug case.',
        'In Texas, controlled substances are placed into penalty groups based on their potential for abuse and harmfulness.',
      ],
      sections: [
        {
          title: 'Potential penalties',
          rows: [
            {
              label: 'Class B misdemeanor',
              value: 'Up to 180 days in jail and/or a fine up to $2,000.',
            },
            {
              label: 'Class A misdemeanor',
              value: 'Up to 1 year in jail and/or a fine up to $4,000.',
            },
            {
              label: 'Third-degree felony',
              value: '2 to 10 years in prison and/or a fine up to $10,000.',
            },
            {
              label: 'Second-degree felony',
              value: '2 to 20 years in prison and/or a fine up to $10,000.',
            },
            {
              label: 'First-degree felony',
              value:
                '5 to 99 years or life in prison and/or a fine up to $10,000.',
            },
          ],
          note: 'Many of these crimes can be charged as felonies, with years in prison and fines as high as $100,000.',
        },
        {
          title: 'What can affect your penalty',
          list: [
            'The type of drug',
            'The quantity',
            'Previous drug convictions',
            'Your alleged intent',
            'Whether minors were allegedly involved',
            'Where you were arrested (e.g., a school zone)',
            'Whether other crimes took place',
            'Whether a deadly weapon was used',
          ],
        },
        {
          title: 'Charges we defend',
          list: [
            'Possession',
            'Possession of drug paraphernalia',
            'Sales',
            'Smuggling',
            'Manufacturing',
            'Trafficking',
            'Transportation',
            'Possession with intent to distribute',
            'Prescription fraud',
          ],
        },
        {
          title: 'Why Aguirre Law Group',
          text: [
            'These accusations can ruin your life, your reputation, and your ability to work. You have Constitutional rights that cannot be violated. We thoroughly investigate the circumstances of your charge and analyze it for weak points and illegal actions that infringed on your rights.',
          ],
        },
      ],
    },
  },
  'personal-injury': {
    es: {
      tagline: 'No enfrentes solo una lesión que cambió tu vida.',
      intro: [
        'Si tú o un ser querido se lesionaron en un accidente de auto, un accidente laboral, una caída u otro incidente causado por otra parte, podrías presentar una demanda por lesiones personales. Ayudamos a las víctimas a obtener la justicia y la compensación que necesitan para retomar su vida.',
      ],
      sections: [
        {
          title: 'Tipos de casos',
          text: [
            'Hemos ayudado a decenas de personas y familias en casos como:',
          ],
          list: [
            'Accidentes de auto',
            'Accidentes laborales',
            'Resbalones y caídas',
            'Mordeduras de perro',
            'Negligencia',
            'Negligencia médica',
          ],
        },
        {
          title: 'Compensación que puedes recibir',
          text: [
            'El valor de tu caso depende de los daños físicos, económicos, mentales y emocionales que has tenido que cargar. Pueden incluir:',
          ],
          rows: [
            {
              label: 'Gastos médicos',
              value:
                'Costos pasados y futuros de atención relacionada con la lesión.',
            },
            {
              label: 'Pérdida de ingresos',
              value:
                'Lo que dejaste de ganar y cualquier reducción de salario si ya no puedes hacer tu trabajo.',
            },
            {
              label: 'Dolor y sufrimiento',
              value: 'Las molestias del accidente y sus efectos continuos.',
            },
            {
              label: 'Angustia emocional',
              value:
                'Cuando un accidente grave y traumático deja un efecto psicológico.',
            },
            {
              label: 'Discapacidad física',
              value:
                'Cuando ya no puedes disfrutar de actividades diarias, pasatiempos o ejercicio.',
            },
            {
              label: 'Desfiguración',
              value:
                'Cuando la lesión altera de forma importante tu apariencia y limita una vida normal.',
            },
            {
              label: 'Pérdida de consorcio',
              value:
                'Cuando la lesión afecta tus relaciones personales, en general con tu cónyuge e hijos.',
            },
            {
              label: 'Daños punitivos',
              value:
                'Buscan castigar y disuadir conductas indebidas; la mayoría de los estados los limita.',
            },
          ],
        },
        {
          title: 'Qué hacer después de una lesión',
          list: [
            'Busca atención médica',
            'Documenta cómo te lesionaste',
            'Presenta un informe del incidente a tu aseguradora',
            'Intenta establecer quién tuvo la culpa',
            'Reúne los datos de los testigos',
            'Continúa tu tratamiento médico según lo necesites',
            'Documenta el proceso, incluida la atención médica y el trato con aseguradoras',
            'Contacta a Aguirre Law Group',
          ],
          note: 'Actuar con rapidez aumenta tus probabilidades de resolver tu reclamo antes.',
        },
      ],
    },
    en: {
      tagline: 'Don’t face a life-changing injury alone.',
      intro: [
        'If you or a loved one were injured in a car accident, work-related accident, slip and fall, or other incident caused by another party, you may be able to file a personal injury lawsuit. We help victims obtain the justice and compensation they need to get their life back on track.',
      ],
      sections: [
        {
          title: 'Types of cases',
          text: [
            'We have helped dozens of individuals and families with cases including:',
          ],
          list: [
            'Car accidents',
            'Work-related accidents',
            'Slip and falls',
            'Dog bites',
            'Negligence',
            'Medical malpractice',
          ],
        },
        {
          title: 'Compensation you can receive',
          text: [
            'The value of your case depends on the physical, monetary, mental, and emotional damages you have had to carry. They can include:',
          ],
          rows: [
            {
              label: 'Medical expenses',
              value: 'Past and future costs of care related to the injury.',
            },
            {
              label: 'Loss of earnings',
              value:
                'What you lost while out of work and any reduction in wages if you can no longer perform your job.',
            },
            {
              label: 'Pain and suffering',
              value: 'The discomfort of the accident and its ongoing effects.',
            },
            {
              label: 'Emotional distress',
              value:
                'When a serious, traumatic accident leaves a psychological effect.',
            },
            {
              label: 'Physical impairment',
              value:
                'When you can no longer enjoy day-to-day activities, hobbies, or exercise.',
            },
            {
              label: 'Disfigurement',
              value:
                'When the injury majorly alters your appearance and inhibits a normal life.',
            },
            {
              label: 'Loss of consortium',
              value:
                'When the injury harms personal relationships, generally with your spouse and children.',
            },
            {
              label: 'Punitive damages',
              value:
                'Meant to punish and deter improper behavior; most states limit them.',
            },
          ],
        },
        {
          title: 'What to do after an injury',
          list: [
            'Seek medical attention',
            'Document how you were injured',
            'Submit an incident report to your insurance company',
            'Try to establish who was at fault',
            'Gather contact information from witnesses',
            'Continue medical treatment as needed',
            'Document the process, including medical care and insurance dealings',
            'Contact Aguirre Law Group',
          ],
          note: 'Acting quickly increases your chances of resolving your claim sooner.',
        },
      ],
    },
  },
  'theft-property': {
    es: {
      tagline:
        'Mereces que tu versión de los hechos se represente con precisión.',
      intro: [
        'Estos delitos conllevan consecuencias serias, multas y posible tiempo en cárcel o prisión. Trabajamos para que los cargos se desestimen o se reduzcan lo más posible, en Brownsville y sus alrededores.',
        'Un cargo así puede destruir tu historial y dificultar tu vida y tu carrera. Javier Aguirre ofrece comunicación honesta y abierta desde el primer día.',
      ],
      sections: [
        {
          title: 'Casos que atendemos',
          list: [
            'Incendio provocado',
            'Allanamiento',
            'Daño criminal',
            'Invasión de propiedad',
            'Falsificación de cheques',
            'Grafiti',
            'Robo con violencia',
            'Robo en tiendas',
          ],
        },
        {
          title: 'Sanciones',
          text: [
            'Una condena puede incluir restitución, multas y costas judiciales, además de cárcel o prisión:',
          ],
          rows: penaltyRows.es,
        },
      ],
    },
    en: {
      tagline:
        'You deserve to have your side of the story accurately represented.',
      intro: [
        'These crimes come with serious consequences, fines, and potential time in jail or prison. We work to have your charges dismissed or reduced as much as possible, in Brownsville and the surrounding area.',
        'A charge like this can destroy your record and make it hard to move on with your life and career. Javier Aguirre offers honest and open communication from day one.',
      ],
      sections: [
        {
          title: 'Cases we handle',
          list: [
            'Arson',
            'Burglary',
            'Criminal mischief',
            'Criminal trespassing',
            'Check forgery',
            'Graffiti',
            'Robbery',
            'Retail theft (shoplifting)',
          ],
        },
        {
          title: 'Penalties',
          text: [
            'A conviction can include restitution, fines, and court costs, as well as jail or prison time:',
          ],
          rows: penaltyRows.en,
        },
      ],
    },
  },
  'violent-crimes': {
    es: {
      tagline: 'La defensa que necesitas para seguir en libertad.',
      intro: [
        'Una condena por un delito violento puede afectarte toda la vida. Muchas personas acusadas actuaron en defensa propia, fueron identificadas por error o acusadas falsamente. Incluso si cometiste un error, nos aseguramos de que recibas un trato justo y de proteger tus derechos.',
      ],
      sections: [
        {
          title: 'Qué hará nuestro equipo',
          list: [
            'Dedicar tiempo a investigar los hechos',
            'Revisar la evidencia de la fiscalía',
            'Realizar una investigación independiente',
            'Contrainterrogar testigos y presentar peritos y testigos favorables',
            'Asesorarte sobre ofertas de acuerdo con la fiscalía',
            'Reunir profesionales para la mejor estrategia de defensa',
          ],
        },
        {
          title: 'Casos que atendemos',
          list: [
            'Alteración del orden público',
            'Restricción ilegal',
            'Secuestro',
            'Agresión menor',
            'Violencia doméstica',
            'Agresión sexual',
            'Agresión grave',
            'Agresión agravada',
            'Agresión con arma mortal',
          ],
        },
        {
          title: 'Cómo influye el estado mental',
          text: [
            'El cargo depende de cómo se cometió el delito, las lesiones de la presunta víctima, si se usó un arma y el estado mental culpable. Según el Código Penal de Texas § 6.02, de mayor a menor:',
          ],
          list: [
            'Intencional',
            'A sabiendas',
            'Imprudente',
            'Negligencia criminal',
          ],
        },
        {
          title: 'Sanciones en Texas',
          text: [
            'Dependen de la gravedad del delito, si hubo lesiones, las condenas previas y quién fue la presunta víctima:',
          ],
          rows: penaltyRows.es,
        },
      ],
    },
    en: {
      tagline: 'The defense you need to stay free.',
      intro: [
        'A conviction for a violent crime can affect you for the rest of your life. Many people charged were acting in self-defense, mistakenly identified, or falsely accused. Even if you did make a mistake, we help ensure you are treated fairly and your rights are protected.',
      ],
      sections: [
        {
          title: 'What our team will do',
          list: [
            'Invest substantial time investigating the facts',
            'Review the evidence used by the prosecutor',
            'Conduct an independent investigation',
            'Cross-examine witnesses and line up experts and favorable witnesses',
            'Advise you on plea bargain offers when necessary',
            'Bring together professionals for the best defense strategy',
          ],
        },
        {
          title: 'Cases we handle',
          list: [
            'Disorderly conduct',
            'Unlawful restraint',
            'Kidnapping',
            'Misdemeanor assault',
            'Domestic violence',
            'Sexual assault',
            'Felony assault',
            'Aggravated assault',
            'Assault with a deadly weapon',
          ],
        },
        {
          title: 'How your mental state affects your charge',
          text: [
            'Charges depend on how the crime was committed, the alleged victim’s injuries, whether a weapon was used, and the culpable mental state. Under Texas Penal Code § 6.02, from highest to lowest:',
          ],
          list: ['Intentional', 'Knowing', 'Reckless', 'Criminal negligence'],
        },
        {
          title: 'Penalties in Texas',
          text: [
            'They depend on the severity of the offense, whether bodily injury occurred, previous convictions, and who the alleged victim was:',
          ],
          rows: penaltyRows.en,
        },
      ],
    },
  },
  'white-collar': {
    es: {
      tagline: 'Inocente hasta que se demuestre lo contrario.',
      intro: [
        'Si te acusan de fraude, malversación, falsificación de cheques, fraude con tarjetas o lavado de dinero, necesitas una defensa activa. Estos casos pueden dañarte en lo personal, lo profesional y lo económico, y suelen requerir mucha investigación.',
        'Con frecuencia intervienen el FBI y el IRS, y entonces las posibles sanciones crecen enormemente.',
      ],
      sections: [
        {
          title: 'Casos que atendemos',
          text: [
            `Con ${yearsPracticing} años de experiencia en defensa penal, Javier Aguirre ha representado a personas acusadas de:`,
          ],
          list: [
            'Soborno',
            'Extorsión',
            'Malversación',
            'Lavado de dinero',
            'Robo de identidad',
            'Fraude hipotecario, de asistencia social, de salud o de seguros',
            'Falsificación',
            'Fraude bancario',
          ],
        },
        {
          title: 'Sanciones posibles',
          list: [
            'Cárcel o prisión',
            'Multas sustanciales',
            'Largos periodos de libertad condicional',
            'Servicio comunitario',
            'Decomiso de bienes',
          ],
        },
        {
          title: 'Cómo podemos ayudarte',
          list: [
            'Buscar que los cargos se retiren o se desestimen',
            'Buscar que los cargos se reduzcan',
            'Negociar libertad condicional en lugar de prisión',
            'Defender con firmeza tus derechos y libertades',
            'Negociar un programa de desviación, si está disponible',
          ],
        },
      ],
    },
    en: {
      tagline: 'Innocent until proven guilty.',
      intro: [
        'If you have been accused of fraud, embezzlement, check forgery, credit card fraud, or money laundering, you need an active defense. These cases can damage you personally, professionally, and financially, and often require substantial investigation.',
        'They often involve the FBI and IRS, and when they do, the potential for serious penalties grows tremendously.',
      ],
      sections: [
        {
          title: 'Cases we handle',
          text: [
            `With ${yearsPracticing} years of experience in criminal defense, Javier Aguirre has represented individuals accused of:`,
          ],
          list: [
            'Bribery',
            'Extortion',
            'Embezzlement',
            'Money laundering',
            'Identity theft',
            'Mortgage, welfare, healthcare, or insurance fraud',
            'Counterfeiting and forgery',
            'Bank fraud',
          ],
        },
        {
          title: 'Potential penalties',
          list: [
            'Jail time or imprisonment',
            'Substantial fines',
            'Lengthy terms of probation',
            'Community service',
            'Forfeiture of assets',
          ],
        },
        {
          title: 'How we can help',
          list: [
            'Seek to have your charges dropped or dismissed',
            'Seek to have your charges reduced',
            'Negotiate for probation instead of imprisonment',
            'Aggressively defend your rights and liberties',
            'Negotiate for a diversion program if available',
          ],
        },
      ],
    },
  },
}

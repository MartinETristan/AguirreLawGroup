import type { AreaPage } from './practice-area-pages'
import type { InjuryArea } from './practice-areas'
import type { Language } from '@/i18n'

/**
 * Subáreas de lesiones personales (estructura de stevedimopoulos.com, adaptada a Texas).
 * Contenido redactado para el sitio nuevo, sin fuente en aguirre-lawgroup.com: las cifras y
 * referencias legales (TNC, FMCSA, cascos, dram shop, UM/UIM) esperan la revisión del abogado.
 */
type InjurySubarea = Exclude<InjuryArea, 'personal-injury'>

const deadline: Record<Language, { label: string; value: string }> = {
  es: {
    label: 'Plazo para demandar',
    value:
      'Por lo general, dos años desde la fecha del accidente. Si el responsable es una entidad de gobierno, el aviso formal puede exigirse en pocos meses.',
  },
  en: {
    label: 'Deadline to file',
    value:
      'Generally two years from the date of the accident. If a government entity is responsible, formal notice may be required within a few months.',
  },
}

const sharedFault: Record<Language, { label: string; value: string }> = {
  es: {
    label: 'Responsabilidad proporcional',
    value:
      'Si compartes parte de la culpa, tu compensación se reduce según tu porcentaje. Si tu responsabilidad supera el 50%, no puedes recuperar daños.',
  },
  en: {
    label: 'Proportionate responsibility',
    value:
      'If you share part of the blame, your compensation is reduced by your percentage. If your responsibility is greater than 50%, you cannot recover damages.',
  },
}

export const injuryAreaPages: Record<
  InjurySubarea,
  Record<Language, AreaPage>
> = {
  'car-accidents': {
    es: {
      tagline: 'Un choque no debería costarte tu salud ni tu tranquilidad.',
      intro: [
        'Los accidentes de auto son la causa más común de lesiones graves en Texas. Si otro conductor causó el choque, puedes reclamar tus gastos médicos, los salarios que dejaste de ganar, la reparación de tu vehículo y el dolor que viviste.',
        'La aseguradora del otro conductor empieza a armar su defensa desde el primer día. Nosotros reunimos el reporte policial, las fotos, los testigos y los registros médicos para que tu reclamo refleje lo que de verdad perdiste.',
      ],
      sections: [
        {
          title: 'Choques que atendemos',
          list: [
            'Choques por alcance',
            'Choques laterales en intersecciones',
            'Choques de frente',
            'Volcaduras',
            'Conductores distraídos con el celular',
            'Exceso de velocidad y manejo agresivo',
            'Choques con fuga',
            'Choques con varios vehículos',
          ],
        },
        {
          title: 'Leyes de Texas que afectan tu caso',
          rows: [
            {
              label: 'Estado de culpa',
              value:
                'En Texas paga quien causó el choque, normalmente a través de su seguro de responsabilidad civil. El mínimo legal es de $30,000 por persona lesionada, $60,000 por accidente y $25,000 por daños a la propiedad.',
            },
            {
              label: 'Tu propia póliza',
              value:
                'La cobertura PIP ayuda con gastos médicos y salarios sin importar quién tuvo la culpa, y la de conductor sin seguro (UM/UIM) cubre lo que el otro seguro no alcanza. Ambas vienen incluidas salvo que las hayas rechazado por escrito.',
            },
            deadline.es,
            sharedFault.es,
          ],
        },
        {
          title: 'Errores que reducen tu reclamo',
          list: [
            'Esperar días para ver a un médico',
            'Dar una declaración grabada al otro seguro',
            'Aceptar la primera oferta',
            'Publicar sobre el accidente en redes sociales',
            'Reparar el auto antes de documentar los daños',
            'Interrumpir tu tratamiento',
          ],
        },
      ],
    },
    en: {
      tagline: "A crash shouldn't cost you your health or your peace of mind.",
      intro: [
        'Car accidents are the most common cause of serious injuries in Texas. If another driver caused the crash, you can claim your medical bills, lost wages, vehicle repairs and the pain you went through.',
        "The other driver's insurer starts building its defense on day one. We gather the police report, photos, witnesses and medical records so your claim reflects what you truly lost.",
      ],
      sections: [
        {
          title: 'Crashes we handle',
          list: [
            'Rear-end collisions',
            'T-bone crashes at intersections',
            'Head-on collisions',
            'Rollovers',
            'Distracted drivers on their phones',
            'Speeding and aggressive driving',
            'Hit-and-run crashes',
            'Multi-vehicle pileups',
          ],
        },
        {
          title: 'Texas laws that affect your case',
          rows: [
            {
              label: 'At-fault state',
              value:
                'In Texas the driver who caused the crash pays, usually through their liability insurance. The legal minimum is $30,000 per injured person, $60,000 per accident and $25,000 for property damage.',
            },
            {
              label: 'Your own policy',
              value:
                "PIP coverage helps with medical bills and wages no matter who was at fault, and uninsured/underinsured motorist (UM/UIM) coverage pays what the other driver's insurance can't. Both are included unless you rejected them in writing.",
            },
            deadline.en,
            sharedFault.en,
          ],
        },
        {
          title: 'Mistakes that shrink your claim',
          list: [
            'Waiting days to see a doctor',
            "Giving a recorded statement to the other driver's insurer",
            'Accepting the first offer',
            'Posting about the accident on social media',
            'Repairing the car before documenting the damage',
            'Stopping your treatment',
          ],
        },
      ],
    },
  },

  'drunk-driving-accidents': {
    es: {
      tagline:
        'Manejar ebrio es una decisión. Sus consecuencias tienen responsables.',
      intro: [
        'Los choques causados por conductores ebrios suelen dejar las lesiones más graves. Además del proceso penal contra el conductor, tú tienes derecho a un reclamo civil propio para cubrir tus gastos médicos, tus ingresos perdidos y tu sufrimiento.',
        'Como también defendemos casos de DWI, conocemos cómo se construye la evidencia de intoxicación: pruebas de aliento y de sangre, videos de la patrulla y reportes de arresto. Usamos esa experiencia para demostrar la responsabilidad del conductor.',
      ],
      sections: [
        {
          title: 'Quién puede ser responsable',
          rows: [
            {
              label: 'El conductor',
              value:
                'Responde por los daños que causó, aunque el caso penal siga abierto o termine sin condena.',
            },
            {
              label: 'El bar o restaurante',
              value:
                'La ley de Texas (dram shop) permite reclamar a un negocio que vendió alcohol a alguien obviamente intoxicado que representaba un peligro claro.',
            },
            {
              label: 'El dueño del vehículo',
              value:
                'Si prestó su auto a alguien que sabía que no estaba en condiciones de manejar.',
            },
          ],
        },
        {
          title: 'Leyes de Texas que afectan tu caso',
          rows: [
            {
              label: 'Caso civil y penal',
              value:
                'Son independientes. En el civil basta con demostrar la negligencia con una preponderancia de la evidencia, un estándar menor que el del juicio penal.',
            },
            {
              label: 'Daños ejemplares',
              value:
                'Manejar intoxicado puede justificar daños ejemplares (punitivos), que buscan castigar la conducta. En casos de asalto u homicidio por intoxicación no aplica el límite habitual.',
            },
            deadline.es,
          ],
        },
        {
          title: 'Evidencia que reunimos',
          list: [
            'Reporte policial y de arresto',
            'Resultados de aliento o de sangre',
            'Videos de la patrulla y de cámaras cercanas',
            'Recibos y testigos del lugar donde bebió',
            'Antecedentes de DWI del conductor',
            'Registros médicos de tus lesiones',
          ],
        },
      ],
    },
    en: {
      tagline:
        'Driving drunk is a choice. Its consequences have someone responsible.',
      intro: [
        'Crashes caused by drunk drivers often leave the most serious injuries. Apart from the criminal case against the driver, you have your own civil claim to cover your medical bills, lost income and suffering.',
        'Because we also defend DWI cases, we know how intoxication evidence is built: breath and blood tests, patrol car videos and arrest reports. We use that experience to prove the driver was responsible.',
      ],
      sections: [
        {
          title: 'Who may be responsible',
          rows: [
            {
              label: 'The driver',
              value:
                'Is liable for the harm they caused, even if the criminal case is still open or ends without a conviction.',
            },
            {
              label: 'The bar or restaurant',
              value:
                "Texas's dram shop law lets you bring a claim against a business that served alcohol to someone obviously intoxicated who posed a clear danger.",
            },
            {
              label: 'The vehicle owner',
              value:
                'If they lent their car to someone they knew was in no condition to drive.',
            },
          ],
        },
        {
          title: 'Texas laws that affect your case',
          rows: [
            {
              label: 'Civil and criminal cases',
              value:
                'They are separate. In the civil case, negligence only has to be proven by a preponderance of the evidence, a lower standard than at a criminal trial.',
            },
            {
              label: 'Exemplary damages',
              value:
                'Driving while intoxicated may justify exemplary (punitive) damages, meant to punish the conduct. In intoxication assault or manslaughter cases the usual cap does not apply.',
            },
            deadline.en,
          ],
        },
        {
          title: 'Evidence we gather',
          list: [
            'Police and arrest reports',
            'Breath or blood test results',
            'Patrol car and nearby camera footage',
            'Receipts and witnesses from where they drank',
            "The driver's DWI history",
            'Medical records of your injuries',
          ],
        },
      ],
    },
  },

  'truck-accidents': {
    es: {
      tagline:
        'Contra una empresa de transporte, la evidencia se pierde rápido.',
      intro: [
        'Un camión de carga puede pesar más de 80,000 libras. Por eso los choques con tráileres y 18 ruedas suelen causar lesiones graves o la muerte. En Brownsville, con el tráfico de carga que cruza la frontera, estos accidentes son más frecuentes de lo que se piensa.',
        'Las empresas de transporte y sus aseguradoras envían investigadores al lugar en cuestión de horas. Actuamos rápido para exigir que conserven los registros del conductor y del camión antes de que desaparezcan.',
      ],
      sections: [
        {
          title: 'Causas frecuentes',
          list: [
            'Fatiga por exceder las horas de manejo',
            'Carga mal asegurada o con sobrepeso',
            'Frenos y llantas sin mantenimiento',
            'Conductores sin la capacitación necesaria',
            'Puntos ciegos y giros amplios',
            'Uso de alcohol o drogas',
          ],
        },
        {
          title: 'Quién puede ser responsable',
          rows: [
            {
              label: 'El conductor',
              value: 'Por manejar cansado, distraído o a exceso de velocidad.',
            },
            {
              label: 'La empresa de transporte',
              value:
                'Por contratar o supervisar mal, presionar con los horarios o no dar mantenimiento.',
            },
            {
              label: 'Quien cargó el camión',
              value: 'Si la carga se movió o excedía el peso permitido.',
            },
            {
              label: 'El fabricante',
              value: 'Si una pieza defectuosa causó o agravó el accidente.',
            },
          ],
        },
        {
          title: 'Reglas que se aplican',
          rows: [
            {
              label: 'Normas federales',
              value:
                'La FMCSA regula las horas de manejo, el mantenimiento, las pruebas de drogas y las licencias. Una violación puede demostrar la negligencia.',
            },
            {
              label: 'Registros del camión',
              value:
                'El registro electrónico de horas (ELD) y la caja negra guardan velocidad, frenado y horas de manejo. Pedimos que se conserven de inmediato.',
            },
            deadline.es,
          ],
        },
      ],
    },
    en: {
      tagline: 'Against a trucking company, evidence disappears fast.',
      intro: [
        'A loaded commercial truck can weigh more than 80,000 pounds. That is why crashes with semis and 18-wheelers so often cause serious injury or death. In Brownsville, with freight traffic crossing the border, these accidents happen more often than people think.',
        'Trucking companies and their insurers send investigators to the scene within hours. We act quickly to demand they preserve the driver and truck records before they disappear.',
      ],
      sections: [
        {
          title: 'Common causes',
          list: [
            'Fatigue from exceeding driving hours',
            'Unsecured or overweight cargo',
            'Poorly maintained brakes and tires',
            'Drivers without proper training',
            'Blind spots and wide turns',
            'Alcohol or drug use',
          ],
        },
        {
          title: 'Who may be responsible',
          rows: [
            {
              label: 'The driver',
              value: 'For driving tired, distracted or speeding.',
            },
            {
              label: 'The trucking company',
              value:
                'For poor hiring or supervision, pressure over schedules or skipped maintenance.',
            },
            {
              label: 'Whoever loaded the truck',
              value: 'If the cargo shifted or exceeded the weight limit.',
            },
            {
              label: 'The manufacturer',
              value: 'If a defective part caused or worsened the crash.',
            },
          ],
        },
        {
          title: 'Rules that apply',
          rows: [
            {
              label: 'Federal regulations',
              value:
                'The FMCSA regulates hours of service, maintenance, drug testing and licensing. A violation can help prove negligence.',
            },
            {
              label: 'Truck records',
              value:
                'The electronic logging device (ELD) and black box store speed, braking and driving hours. We ask for them to be preserved right away.',
            },
            deadline.en,
          ],
        },
      ],
    },
  },

  'motorcycle-accidents': {
    es: {
      tagline: 'Ir en moto no te hace culpable del accidente.',
      intro: [
        'Un motociclista no tiene la protección de una cabina, así que hasta un choque a baja velocidad puede causar fracturas, lesiones en la cabeza o en la columna. La mayoría ocurre porque otro conductor no vio la moto.',
        'Las aseguradoras suelen culpar al motociclista por prejuicio. Reconstruimos lo que pasó con la escena, los testigos y los daños de los vehículos para demostrar quién fue el responsable.',
      ],
      sections: [
        {
          title: 'Causas frecuentes',
          list: [
            'Giros a la izquierda frente a la moto',
            'Cambios de carril sin revisar el punto ciego',
            'Puertas que se abren de pronto',
            'Choques por alcance en semáforos',
            'Baches y obras sin señalizar',
            'Conductores distraídos',
          ],
        },
        {
          title: 'Leyes de Texas que afectan tu caso',
          rows: [
            {
              label: 'Uso del casco',
              value:
                'Los mayores de 21 años pueden ir sin casco si completaron un curso de seguridad o tienen un seguro médico que cubra al menos $10,000.',
            },
            {
              label: 'Sin casco',
              value:
                'No usarlo no te quita el derecho a reclamar, pero la aseguradora puede alegar que agravó tus lesiones para reducir tu compensación.',
            },
            sharedFault.es,
            deadline.es,
          ],
        },
      ],
    },
    en: {
      tagline: "Riding a motorcycle doesn't make you to blame for the crash.",
      intro: [
        "A motorcyclist has no cabin to protect them, so even a low-speed crash can cause fractures, head injuries or spinal damage. Most happen because another driver didn't see the bike.",
        'Insurers often blame the rider out of bias. We reconstruct what happened from the scene, witnesses and vehicle damage to show who was responsible.',
      ],
      sections: [
        {
          title: 'Common causes',
          list: [
            'Left turns in front of the rider',
            'Lane changes without checking the blind spot',
            'Car doors opened suddenly',
            'Rear-end crashes at traffic lights',
            'Potholes and unmarked road work',
            'Distracted drivers',
          ],
        },
        {
          title: 'Texas laws that affect your case',
          rows: [
            {
              label: 'Helmet use',
              value:
                'Riders 21 and older may ride without a helmet if they completed a safety course or carry health insurance covering at least $10,000.',
            },
            {
              label: 'No helmet',
              value:
                "Not wearing one doesn't take away your right to a claim, but the insurer may argue it worsened your injuries to reduce your compensation.",
            },
            sharedFault.en,
            deadline.en,
          ],
        },
      ],
    },
  },

  'pedestrian-accidents': {
    es: {
      tagline: 'Caminar por tu ciudad no debería ponerte en peligro.',
      intro: [
        'Un peatón atropellado puede sufrir lesiones graves aunque el vehículo vaya despacio. Estos accidentes suelen ocurrir en cruces, estacionamientos, zonas escolares y calles sin banqueta.',
        'Determinamos si el conductor no cedió el paso, iba distraído o a exceso de velocidad, y buscamos todas las coberturas disponibles, incluidas las de tu propia póliza.',
      ],
      sections: [
        {
          title: 'Dónde ocurren',
          list: [
            'Cruces peatonales',
            'Intersecciones con semáforo',
            'Estacionamientos',
            'Zonas escolares',
            'Calles sin banqueta o mal iluminadas',
            'Entradas de casas y negocios',
          ],
        },
        {
          title: 'Leyes de Texas que afectan tu caso',
          rows: [
            {
              label: 'Derecho de paso',
              value:
                'Los conductores deben ceder el paso a los peatones en los cruces peatonales y tener cuidado especial con niños y personas mayores.',
            },
            {
              label: 'Fuera del cruce',
              value:
                'Si cruzabas por otro lugar, aún puedes reclamar, aunque la aseguradora alegará que compartes la culpa.',
            },
            {
              label: 'Tu propia póliza',
              value:
                'Tu cobertura PIP y la de conductor sin seguro (UM/UIM) pueden protegerte también cuando vas a pie.',
            },
            deadline.es,
          ],
        },
      ],
    },
    en: {
      tagline: "Walking in your own city shouldn't put you in danger.",
      intro: [
        'A pedestrian hit by a car can suffer serious injuries even at low speed. These accidents often happen at crossings, parking lots, school zones and streets without sidewalks.',
        'We determine whether the driver failed to yield, was distracted or was speeding, and we look for every available coverage, including your own policy.',
      ],
      sections: [
        {
          title: 'Where they happen',
          list: [
            'Crosswalks',
            'Intersections with traffic lights',
            'Parking lots',
            'School zones',
            'Streets without sidewalks or with poor lighting',
            'Home and business driveways',
          ],
        },
        {
          title: 'Texas laws that affect your case',
          rows: [
            {
              label: 'Right of way',
              value:
                'Drivers must yield to pedestrians in crosswalks and take special care around children and older adults.',
            },
            {
              label: 'Outside a crosswalk',
              value:
                'If you crossed somewhere else, you can still bring a claim, though the insurer will argue you share the blame.',
            },
            {
              label: 'Your own policy',
              value:
                'Your PIP and uninsured/underinsured motorist (UM/UIM) coverage may protect you on foot as well.',
            },
            deadline.en,
          ],
        },
      ],
    },
  },

  'bicycle-accidents': {
    es: {
      tagline: 'En Texas, la bicicleta tiene derecho a la calle.',
      intro: [
        'Un ciclista golpeado por un vehículo puede sufrir fracturas, lesiones en la cabeza y heridas que tardan meses en sanar. Muchos de estos choques ocurren porque el conductor no dejó espacio suficiente o no miró antes de girar o abrir la puerta.',
        'Investigamos la escena, buscamos videos y testigos, y demostramos que el conductor no respetó tus derechos en la vía.',
      ],
      sections: [
        {
          title: 'Causas frecuentes',
          list: [
            'Rebases demasiado cerca',
            'Giros a la derecha que cortan el paso',
            'Puertas de autos estacionados',
            'Conductores que no ceden el paso',
            'Salidas de estacionamientos y entradas',
            'Conductores distraídos',
          ],
        },
        {
          title: 'Leyes de Texas que afectan tu caso',
          rows: [
            {
              label: 'Vehículo con derechos',
              value:
                'Un ciclista tiene los mismos derechos y deberes que el conductor de un vehículo, y puede usar el carril cuando no es seguro compartirlo.',
            },
            {
              label: 'Luces de noche',
              value:
                'La ley exige luz blanca al frente y reflector o luz roja atrás. No llevarlas puede usarse para alegar que compartes la culpa.',
            },
            sharedFault.es,
            deadline.es,
          ],
        },
      ],
    },
    en: {
      tagline: 'In Texas, a bicycle has a right to the road.',
      intro: [
        "A cyclist hit by a vehicle can suffer fractures, head injuries and wounds that take months to heal. Many of these crashes happen because the driver didn't leave enough room or didn't look before turning or opening a door.",
        'We investigate the scene, look for video and witnesses, and show that the driver disregarded your rights on the road.',
      ],
      sections: [
        {
          title: 'Common causes',
          list: [
            'Passing too close',
            'Right turns that cut the rider off',
            'Parked car doors',
            'Drivers who fail to yield',
            'Cars leaving parking lots and driveways',
            'Distracted drivers',
          ],
        },
        {
          title: 'Texas laws that affect your case',
          rows: [
            {
              label: 'A vehicle with rights',
              value:
                "A cyclist has the same rights and duties as the driver of a vehicle, and may take the lane when it isn't safe to share it.",
            },
            {
              label: 'Lights at night',
              value:
                'The law requires a white light in front and a red reflector or light in back. Riding without them may be used to argue you share the blame.',
            },
            sharedFault.en,
            deadline.en,
          ],
        },
      ],
    },
  },

  'uber-lyft-accidents': {
    es: {
      tagline: 'Saber qué seguro responde es la mitad del caso.',
      intro: [
        'Si te lesionaste como pasajero de Uber o Lyft, o te chocó un conductor de una de estas aplicaciones, tu reclamo depende de algo que pocos saben: qué estaba haciendo el conductor en la aplicación en el momento del choque.',
        'Las plataformas tratan a sus conductores como contratistas independientes y suelen intentar desligarse. Identificamos la póliza que corresponde y la reclamamos por ti.',
      ],
      sections: [
        {
          title: 'Qué seguro aplica',
          rows: [
            {
              label: 'Aplicación apagada',
              value: 'Responde el seguro personal del conductor.',
            },
            {
              label: 'Esperando un viaje',
              value:
                'La plataforma debe tener una cobertura de al menos $50,000 por persona, $100,000 por accidente y $25,000 por daños a la propiedad.',
            },
            {
              label: 'En camino o con pasajero',
              value:
                'Aplica una póliza de responsabilidad civil de al menos $1 millón.',
            },
          ],
          note: 'Estas coberturas vienen de la ley de Texas para empresas de redes de transporte.',
        },
        {
          title: 'Quién puede reclamar',
          list: [
            'Pasajeros del vehículo',
            'Ocupantes de otros vehículos',
            'Peatones y ciclistas',
            'Conductores de la aplicación chocados por otro',
          ],
        },
        {
          title: 'Qué hacer',
          list: [
            'Toma captura de pantalla del viaje en la aplicación',
            'Reporta el accidente a la policía y en la aplicación',
            'Anota los datos del conductor y del vehículo',
            'Busca atención médica de inmediato',
          ],
          note: deadline.es.value,
        },
      ],
    },
    en: {
      tagline: 'Knowing which insurance pays is half the case.',
      intro: [
        'If you were hurt as an Uber or Lyft passenger, or hit by a rideshare driver, your claim depends on something few people know: what the driver was doing in the app at the moment of the crash.',
        'Rideshare companies treat their drivers as independent contractors and often try to distance themselves. We identify the right policy and pursue it for you.',
      ],
      sections: [
        {
          title: 'Which insurance applies',
          rows: [
            {
              label: 'App off',
              value: "The driver's personal insurance applies.",
            },
            {
              label: 'Waiting for a ride',
              value:
                'The company must carry coverage of at least $50,000 per person, $100,000 per accident and $25,000 for property damage.',
            },
            {
              label: 'En route or with a passenger',
              value: 'A liability policy of at least $1 million applies.',
            },
          ],
          note: "These coverages come from Texas's law on transportation network companies.",
        },
        {
          title: 'Who can bring a claim',
          list: [
            'Passengers in the vehicle',
            'Occupants of other vehicles',
            'Pedestrians and cyclists',
            'Rideshare drivers hit by someone else',
          ],
        },
        {
          title: 'What to do',
          list: [
            'Take a screenshot of the ride in the app',
            'Report the accident to the police and in the app',
            "Write down the driver's and vehicle's details",
            'Get medical care right away',
          ],
          note: deadline.en.value,
        },
      ],
    },
  },

  'tour-bus-accidents': {
    es: {
      tagline: 'Quien te transporta por dinero debe cuidarte más.',
      intro: [
        'Los autobuses turísticos, chárter y de pasajeros llevan a decenas de personas a la vez, muchas sin cinturón de seguridad. Cuando uno choca o se vuelca, las lesiones suelen ser graves y numerosas.',
        'Las empresas de autobuses están obligadas a un alto grado de cuidado con sus pasajeros. Investigamos al conductor, a la empresa y el mantenimiento del vehículo, y coordinamos el reclamo cuando hay varios lesionados.',
      ],
      sections: [
        {
          title: 'Vehículos que incluye',
          list: [
            'Autobuses turísticos y chárter',
            'Autobuses de pasajeros entre ciudades',
            'Transportes de casinos y hoteles',
            'Shuttles de aeropuerto',
            'Autobuses escolares',
            'Transporte público',
          ],
        },
        {
          title: 'Reglas que se aplican',
          rows: [
            {
              label: 'Transportista público',
              value:
                'En Texas, quien transporta pasajeros por pago debe actuar con un alto grado de cuidado, mayor que el de un conductor común.',
            },
            {
              label: 'Normas federales',
              value:
                'Los autobuses que cruzan estados siguen las reglas de la FMCSA sobre horas de manejo, mantenimiento y seguros mínimos, que llegan a $5 millones en vehículos de 16 asientos o más.',
            },
            {
              label: 'Autobuses públicos',
              value:
                'Los reclamos contra escuelas o transporte municipal tienen plazos de aviso cortos y límites de compensación.',
            },
            deadline.es,
          ],
        },
      ],
    },
    en: {
      tagline: 'Whoever carries you for pay owes you more care.',
      intro: [
        'Tour, charter and passenger buses carry dozens of people at once, many without seat belts. When one crashes or rolls over, injuries tend to be severe and numerous.',
        'Bus companies are held to a high degree of care toward their passengers. We investigate the driver, the company and the vehicle maintenance, and we coordinate the claim when several people are hurt.',
      ],
      sections: [
        {
          title: 'Vehicles included',
          list: [
            'Tour and charter buses',
            'Intercity passenger buses',
            'Casino and hotel shuttles',
            'Airport shuttles',
            'School buses',
            'Public transit',
          ],
        },
        {
          title: 'Rules that apply',
          rows: [
            {
              label: 'Common carrier',
              value:
                'In Texas, anyone who carries passengers for pay must exercise a high degree of care, greater than an ordinary driver.',
            },
            {
              label: 'Federal regulations',
              value:
                'Buses that cross state lines follow FMCSA rules on driving hours, maintenance and minimum insurance, which reaches $5 million for vehicles with 16 or more seats.',
            },
            {
              label: 'Public buses',
              value:
                'Claims against schools or municipal transit have short notice deadlines and limits on compensation.',
            },
            deadline.en,
          ],
        },
      ],
    },
  },

  'uninsured-motorists': {
    es: {
      tagline: 'Que el otro conductor no tenga seguro no te deja sin opciones.',
      intro: [
        'Muchos conductores en Texas manejan sin seguro o con la cobertura mínima, que no alcanza para una lesión grave. Si te chocó uno de ellos, o huyó del lugar, tu propia póliza puede cubrir la diferencia.',
        'Aunque es tu aseguradora, en este reclamo actúa como la parte contraria: buscará pagar lo menos posible. Presentamos el reclamo, demostramos tus daños y negociamos como lo haríamos con cualquier otro seguro.',
      ],
      sections: [
        {
          title: 'Coberturas',
          rows: [
            {
              label: 'Sin seguro (UM)',
              value:
                'Cubre tus lesiones cuando el responsable no tiene seguro o huyó del lugar.',
            },
            {
              label: 'Seguro insuficiente (UIM)',
              value:
                'Cubre la diferencia cuando el seguro del responsable no alcanza para todos tus daños.',
            },
            {
              label: 'PIP',
              value:
                'Paga gastos médicos y salarios perdidos sin importar quién tuvo la culpa.',
            },
          ],
        },
        {
          title: 'Leyes de Texas que afectan tu caso',
          rows: [
            {
              label: 'Incluida por defecto',
              value:
                'Las aseguradoras deben ofrecer UM/UIM y PIP. Están incluidas en tu póliza salvo que las hayas rechazado por escrito.',
            },
            {
              label: 'Quiénes están cubiertos',
              value:
                'Por lo general tú, tus familiares que viven contigo y los pasajeros de tu vehículo, también como peatones o ciclistas según la póliza.',
            },
            deadline.es,
          ],
        },
        {
          title: 'Qué hacer',
          list: [
            'Llama a la policía, sobre todo si el conductor huyó',
            'Avisa pronto a tu aseguradora',
            'Pide una copia de tu póliza completa',
            'No firmes una liberación sin orientación',
          ],
        },
      ],
    },
    en: {
      tagline:
        "The other driver having no insurance doesn't leave you without options.",
      intro: [
        'Many Texas drivers are uninsured or carry only minimum coverage, which falls short for a serious injury. If one of them hit you, or fled the scene, your own policy may cover the difference.',
        "Even though it's your insurer, in this claim it acts as the other side: it will try to pay as little as possible. We file the claim, prove your damages and negotiate as we would with any other insurer.",
      ],
      sections: [
        {
          title: 'Coverages',
          rows: [
            {
              label: 'Uninsured (UM)',
              value:
                'Covers your injuries when the at-fault driver has no insurance or fled the scene.',
            },
            {
              label: 'Underinsured (UIM)',
              value:
                "Covers the gap when the at-fault driver's insurance isn't enough for all your damages.",
            },
            {
              label: 'PIP',
              value:
                'Pays medical bills and lost wages no matter who was at fault.',
            },
          ],
        },
        {
          title: 'Texas laws that affect your case',
          rows: [
            {
              label: 'Included by default',
              value:
                'Insurers must offer UM/UIM and PIP. They are included in your policy unless you rejected them in writing.',
            },
            {
              label: "Who's covered",
              value:
                'Usually you, relatives who live with you and passengers in your vehicle, also as pedestrians or cyclists depending on the policy.',
            },
            deadline.en,
          ],
        },
        {
          title: 'What to do',
          list: [
            'Call the police, especially if the driver fled',
            'Notify your insurer promptly',
            'Ask for a copy of your full policy',
            "Don't sign a release without guidance",
          ],
        },
      ],
    },
  },
}

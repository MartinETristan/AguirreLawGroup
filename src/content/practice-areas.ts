/**
 * Áreas de práctica. El orden aquí define el orden en la web; el título y la
 * descripción de cada una están en `areas.items.<slug>` de las traducciones.
 */
export const practiceAreas = [
  'criminal-law',
  'dwi',
  'drug-charges',
  'personal-injury',
  'theft-property',
  'violent-crimes',
  'white-collar',
] as const

export type PracticeArea = (typeof practiceAreas)[number]

export function isPracticeArea(value: unknown): value is PracticeArea {
  return practiceAreas.includes(value as PracticeArea)
}

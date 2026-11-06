/**
 * Áreas de práctica. El orden aquí define el orden en la web; el título y la
 * descripción de cada una están en `areas.items.<slug>` de las traducciones.
 * Lesiones personales va primero: es el área prioritaria de la firma, seguida de
 * sus subáreas por tipo de accidente.
 */
export const injuryAreas = [
  'personal-injury',
  'car-accidents',
  'drunk-driving-accidents',
  'truck-accidents',
  'motorcycle-accidents',
  'pedestrian-accidents',
  'bicycle-accidents',
  'uber-lyft-accidents',
  'tour-bus-accidents',
  'uninsured-motorists',
] as const

export const criminalAreas = [
  'criminal-law',
  'dwi',
  'drug-charges',
  'theft-property',
  'violent-crimes',
  'white-collar',
] as const

export const practiceAreas = [...injuryAreas, ...criminalAreas] as const

export type InjuryArea = (typeof injuryAreas)[number]
export type CriminalArea = (typeof criminalAreas)[number]
export type PracticeArea = (typeof practiceAreas)[number]

/** Grupos para menús y listados; el título se resuelve con `areas.groups.<key>`. */
export const areaGroups = [
  { key: 'injury', areas: injuryAreas },
  { key: 'criminal', areas: criminalAreas },
] as const

export function isPracticeArea(value: unknown): value is PracticeArea {
  return practiceAreas.includes(value as PracticeArea)
}

export function areaGroupOf(area: PracticeArea) {
  return areaGroups.find((group) =>
    (group.areas as ReadonlyArray<PracticeArea>).includes(area),
  )!
}

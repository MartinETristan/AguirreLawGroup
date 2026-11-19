export type LegalItem = { label?: string; text: string }

export type LegalSection = {
  id: string
  title: string
  paragraphs?: Array<string>
  items?: Array<LegalItem>
  /** Numera los elementos (términos del servicio de SMS). */
  numbered?: boolean
  /** Agrega al final los datos de contacto de la firma, tomados de `site`. */
  contact?: boolean
}

export type LegalDocument = {
  updated: string
  intro: Array<string>
  sections: Array<LegalSection>
}

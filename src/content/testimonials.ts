import type { PracticeArea } from './practice-areas.ts'
import type { Language } from '@/i18n'

export type Testimonial = {
  id: string
  name: string
  area: PracticeArea
  quote: Record<Language, string>
  /** true mientras el testimonio sea de ejemplo; reemplazar por reseñas reales */
  placeholder?: boolean
}

// TODO: reemplazar por testimonios reales (p. ej. reseñas de Google) con permiso del cliente.
export const testimonials: Array<Testimonial> = [
  // {
  //   id: 't1',
  //   name: '[Nombre del cliente]',
  //   area: 'criminal-law',
  //   quote: {
  //     es: '[Testimonio real de un cliente, dos o tres líneas.]',
  //     en: '[A real client testimonial, two or three lines.]',
  //   },
  //   placeholder: true,
  // },
  // {
  //   id: 't2',
  //   name: '[Nombre del cliente]',
  //   area: 'personal-injury',
  //   quote: {
  //     es: '[Testimonio real de un cliente, dos o tres líneas.]',
  //     en: '[A real client testimonial, two or three lines.]',
  //   },
  //   placeholder: true,
  // },
  // {
  //   id: 't3',
  //   name: '[Nombre del cliente]',
  //   area: 'dwi',
  //   quote: {
  //     es: '[Testimonio real de un cliente, dos o tres líneas.]',
  //     en: '[A real client testimonial, two or three lines.]',
  //   },
  //   placeholder: true,
  // },
]

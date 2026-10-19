/** Enlaces del header y footer; la etiqueta se resuelve con `nav.<key>`. */
export const mainNav = [
  { to: '/areas', key: 'areas' },
  { to: '/firma', key: 'firm' },
  { to: '/abogado', key: 'attorney' },
  { to: '/testimonios', key: 'testimonials' },
] as const

export type NavKey = (typeof mainNav)[number]['key'] | 'home' | 'contact'

/** Enlaces del navbar, en el orden del sitio original; la etiqueta se resuelve con `nav.<key>`. */
export const mainNav = [
  { to: '/', key: 'home' },
  { to: '/nosotros', key: 'about' },
  { to: '/areas', key: 'areas' },
  { to: '/contacto', key: 'contact' },
] as const

/** Enlaces del footer, que conservan el acceso a la ruta propia de cada sección. */
export const footerNav = [
  { to: '/areas', key: 'areas' },
  { to: '/firma', key: 'firm' },
  { to: '/abogado', key: 'attorney' },
  { to: '/testimonios', key: 'testimonials' },
] as const

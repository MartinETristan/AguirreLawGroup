import { testimonials } from './testimonials'

/** Enlaces del navbar, en el orden del sitio original; la etiqueta se resuelve con `nav.<key>`. */
export const mainNav = [
  { to: '/', key: 'home' },
  { to: '/about-us', key: 'about' },
  { to: '/practice-areas', key: 'areas' },
  { to: '/contact-us', key: 'contact' },
] as const

/** Enlaces del footer, que conservan el acceso a la ruta propia de cada sección. */
export const footerNav = (
  [
    { to: '/practice-areas', key: 'areas' },
    { to: '/firm', key: 'firm' },
    { to: '/attorney', key: 'attorney' },
    { to: '/testimonials', key: 'testimonials' },
  ] as const
).filter((item) => item.key !== 'testimonials' || testimonials.length > 0)

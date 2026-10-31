import type { Language } from '@/i18n'

const ES_PREFIX = '/es'

/** Quita el prefijo de idioma de la URL pública; las rutas internas no lo llevan. */
export function stripLanguagePrefix(pathname: string) {
  if (pathname === ES_PREFIX) return '/'
  return pathname.startsWith(`${ES_PREFIX}/`)
    ? pathname.slice(ES_PREFIX.length)
    : pathname
}

/** Inglés sin prefijo (`/contact-us`), español bajo `/es` (`/es/contact-us`). */
export function localizePath(pathname: string, lang: Language) {
  if (lang === 'en') return pathname
  return pathname === '/' ? ES_PREFIX : `${ES_PREFIX}${pathname}`
}

import type { Language } from '@/i18n'

const EN_PREFIX = '/en'

/** Quita el prefijo de idioma de la URL pública; las rutas internas no lo llevan. */
export function stripLanguagePrefix(pathname: string) {
  if (pathname === EN_PREFIX) return '/'
  return pathname.startsWith(`${EN_PREFIX}/`)
    ? pathname.slice(EN_PREFIX.length)
    : pathname
}

/** Español sin prefijo (`/contacto`), inglés bajo `/en` (`/en/contacto`). */
export function localizePath(pathname: string, lang: Language) {
  if (lang === 'es') return pathname
  return pathname === '/' ? EN_PREFIX : `${EN_PREFIX}${pathname}`
}

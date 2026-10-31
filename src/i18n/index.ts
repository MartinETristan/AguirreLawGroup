import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './locales/en'
import es from './locales/es'
import { stripLanguagePrefix } from './paths'

export const languages = ['es', 'en'] as const
export type Language = (typeof languages)[number]

const resources = {
  es: { translation: es },
  en: { translation: en },
} as const

i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng
})

// El idioma sale de la URL (`/es/...`; sin prefijo, inglés) para que cada versión sea indexable
const { pathname } = window.location

void i18n.use(initReactI18next).init({
  resources,
  lng: stripLanguagePrefix(pathname) === pathname ? 'en' : 'es',
  fallbackLng: 'en',
  supportedLngs: languages,
  nonExplicitSupportedLngs: true,
  interpolation: { escapeValue: false },
  returnObjects: true,
})

export function currentLanguage(lng: string | undefined): Language {
  return lng?.startsWith('es') ? 'es' : 'en'
}

export default i18n

import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import en from './locales/en'
import es from './locales/es'

export const languages = ['es', 'en'] as const
export type Language = (typeof languages)[number]

export const resources = {
  es: { translation: es },
  en: { translation: en },
} as const

i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng
})

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'es',
    supportedLngs: languages,
    nonExplicitSupportedLngs: true,
    interpolation: { escapeValue: false },
    detection: {
      // El idioma sale de la URL (`/en/...`) para que cada versión sea indexable
      order: ['path'],
      lookupFromPathIndex: 0,
      caches: [],
    },
    returnObjects: true,
  })

export function currentLanguage(lng: string | undefined): Language {
  return lng?.startsWith('en') ? 'en' : 'es'
}

export default i18n

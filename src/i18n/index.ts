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

function syncDocument(lng: string) {
  document.documentElement.lang = lng
  document.title = i18n.t('meta.title')
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute('content', i18n.t('meta.description'))
}

i18n.on('languageChanged', syncDocument)

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
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'alg-lang',
      caches: ['localStorage'],
    },
    returnObjects: true,
  })

export function currentLanguage(lng: string | undefined): Language {
  return lng?.startsWith('en') ? 'en' : 'es'
}

export default i18n

import type { Translation } from './locales/es'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation'
    resources: { translation: Translation }
    returnObjects: true
  }
}

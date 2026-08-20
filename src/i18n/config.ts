import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Import translation files
import frTranslation from './locales/fr/translation.json'
import enTranslation from './locales/en/translation.json'
import woTranslation from './locales/wo/translation.json'

const resources = {
  fr: {
    translation: frTranslation
  },
  en: {
    translation: enTranslation
  },
  wo: {
    translation: woTranslation
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fr',
    debug: false,
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  })

export default i18n

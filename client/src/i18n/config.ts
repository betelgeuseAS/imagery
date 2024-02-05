import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

import { z } from 'zod'
import { makeZodI18nMap } from 'zod-i18n-map'
import translationZodEnglish from 'zod-i18n-map/locales/en/zod.json'
import translationZodUkrainian from 'zod-i18n-map/locales/uk-UA/zod.json'

import translationEnglish from './locales/en/translation.json'
import translationUkrainian from './locales/ua/translation.json'

import { localStore } from '../services'

i18next.use(initReactI18next).init({
  lng: localStore.getLanguage(),
  fallbackLng: localStore.getLanguage(),
  fallbackNS: 'translation',
  interpolation: {
    escapeValue: false
  },
  debug: false,
  resources: {
    en: {
      translation: translationEnglish, // Custom translation
      zod: translationZodEnglish // Zod translation
    },
    ua: {
      translation: translationUkrainian,
      zod: translationZodUkrainian
    }
  }
})

z.setErrorMap(makeZodI18nMap({ ns: ['zod', 'translation'] }))

export default i18next

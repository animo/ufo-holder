// eslint-disable-next-line import/no-named-as-default
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

export * from './Translation'
import { en, nl } from './resources'

void i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    nl: {
      translation: nl,
    },
  },
  // lng: 'en',
  lng: 'nl',
})

export { i18n }

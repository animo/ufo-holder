import { unescape } from 'html-escaper'
// eslint-disable-next-line import/no-named-as-default
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

export * from './Translation'
import { nl } from './resources'

void i18n.use(initReactI18next).init({
  resources: {
    nl: {
      translation: nl,
    },
  },
  interpolation: {
    escape: unescape,
  },
  lng: 'nl',
})

export { i18n }

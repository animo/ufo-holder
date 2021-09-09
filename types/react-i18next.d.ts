import { Translation } from '../src/translations'

import 'react-i18next'

declare module 'react-i18next' {
  interface CustomTypeOptions {
    resources: {
      translation: Translation
    }
  }
}

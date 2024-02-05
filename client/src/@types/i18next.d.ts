import { typesI18N } from '../types'

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: typeof typesI18N.i18nResources
    returnNull: false
  }
}

import { i18nResources } from '../types'

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: typeof i18nResources
    returnNull: false
  }
}

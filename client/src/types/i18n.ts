import StringMap, { TOptions } from 'i18next'

import translation from '../i18n/locales/en/translation.json'
import zod from 'zod-i18n-map/locales/en/zod.json'

export type i18nType = {
  t: (
    key: string | TemplateStringsArray | (string | TemplateStringsArray)[],
    options?: string | TOptions<typeof StringMap> | undefined
  ) => string
}

export const i18nResources = {
  translation,
  zod
} as const

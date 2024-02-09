import { localStoreKeys } from './keys'
import { constants } from '../constants'

const get = (key: string): string | null => localStorage.getItem(key)
const set = (key: string, value: string): void => localStorage.setItem(key, value)
const remove = (key: string): void => localStorage.removeItem(key)
const clear = (): void => localStorage.clear()

const stringify = (value: object): string => JSON.stringify(value)
const parse = (value: string): object => JSON.parse(value)

const tryCallback = (callback: () => void): unknown => {
  try {
    return callback()
  } catch (error) {
    console.error('[localStorage]', error)
    return null
  }
}

export const localStore = {
  setTheme: (value: string) => tryCallback(() => set(localStoreKeys.THEME, value)),
  getTheme: (): string => {
    return tryCallback(() => get(localStoreKeys.THEME)) === constants.THEME.DARK
      ? constants.THEME.DARK
      : constants.THEME.LIGHT
  },

  setLanguage: (value: string) => tryCallback(() => set(localStoreKeys.LANGUAGE, value)),
  getLanguage: (): string => {
    switch (tryCallback(() => get(localStoreKeys.LANGUAGE))) {
      case constants.LANGUAGE.ENGLISH:
        return constants.LANGUAGE.ENGLISH
      case constants.LANGUAGE.UKRAINIAN:
        return constants.LANGUAGE.UKRAINIAN
      default:
        return constants.LANGUAGE.ENGLISH
    }
  },

  setRememberMe: (value: boolean) => tryCallback(() => set(localStoreKeys.REMEMBER_ME, String(value))),
  getRememberMe: (): boolean => tryCallback(() => get(localStoreKeys.REMEMBER_ME)) === 'true',

  setAccessToken: (value: string) => tryCallback(() => set(localStoreKeys.ACCESS_TOKEN, value)),
  getAccessToken: (): string => (tryCallback(() => get(localStoreKeys.ACCESS_TOKEN)) as string) || '',
  removeAccessToken: (): void => {
    tryCallback(() => remove(localStoreKeys.ACCESS_TOKEN))
  },

  setRefreshToken: (value: string) => tryCallback(() => set(localStoreKeys.REFRESH_TOKEN, value)),
  getRefreshToken: (): string => (tryCallback(() => get(localStoreKeys.REFRESH_TOKEN)) as string) || '',
  removeRefreshToken: (): void => {
    tryCallback(() => remove(localStoreKeys.REFRESH_TOKEN))
  },

  setUserId: (value: string) => tryCallback(() => set(localStoreKeys.USER_ID, value)),
  getUserId: (): string => (tryCallback(() => get(localStoreKeys.USER_ID)) as string) || '',
  removeUserId: (): void => {
    tryCallback(() => remove(localStoreKeys.USER_ID))
  }
}

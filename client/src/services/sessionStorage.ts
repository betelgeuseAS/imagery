import { sessionStoreKeys } from './keys'

const get = (key: string): string | null => sessionStorage.getItem(key)
const set = (key: string, value: string): void => sessionStorage.setItem(key, value)
const remove = (key: string): void => sessionStorage.removeItem(key)
const clear = (): void => sessionStorage.clear()

const tryCallback = (callback: () => void): unknown => {
  try {
    return callback()
  } catch (error) {
    console.error('[sessionStorage]', error)
    return null
  }
}

export const sessionStore = {
  setAccessToken: (value: string) => tryCallback(() => set(sessionStoreKeys.ACCESS_TOKEN, value)),
  getAccessToken: (): string => (tryCallback(() => get(sessionStoreKeys.ACCESS_TOKEN)) as string) || '',
  removeAccessToken: (): void => {
    tryCallback(() => remove(sessionStoreKeys.ACCESS_TOKEN))
  },

  setRefreshToken: (value: string) => tryCallback(() => set(sessionStoreKeys.REFRESH_TOKEN, value)),
  getRefreshToken: (): string => (tryCallback(() => get(sessionStoreKeys.REFRESH_TOKEN)) as string) || '',
  removeRefreshToken: (): void => {
    tryCallback(() => remove(sessionStoreKeys.REFRESH_TOKEN))
  },

  setUserId: (value: string) => tryCallback(() => set(sessionStoreKeys.USER_ID, value)),
  getUserId: (): string => (tryCallback(() => get(sessionStoreKeys.USER_ID)) as string) || '',
  removeUserId: (): void => {
    tryCallback(() => remove(sessionStoreKeys.USER_ID))
  }
}

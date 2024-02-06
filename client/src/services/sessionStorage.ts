import { sessionStoreKeys } from '.'

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

  setRefreshToken: (value: string) => tryCallback(() => set(sessionStoreKeys.REFRESH_TOKEN, value)),
  getRefreshToken: (): string => (tryCallback(() => get(sessionStoreKeys.REFRESH_TOKEN)) as string) || '',

  setUserId: (value: string) => tryCallback(() => set(sessionStoreKeys.USER_ID, value)),
  getUserId: (): string => (tryCallback(() => get(sessionStoreKeys.USER_ID)) as string) || ''
}

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

export const sessionStore = {}

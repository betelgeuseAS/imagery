const get = (key: string): string | null => localStorage.getItem(key)
const set = (key: string, value: string): void => localStorage.setItem(key, value)

export const localStore = { get, set }

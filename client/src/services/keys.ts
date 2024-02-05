interface IKeysLocal {
  THEME: string
  LANGUAGE: string
  REMEMBER_ME: string
}

export const localStoreKeys: IKeysLocal = {
  THEME: 'app_theme',
  LANGUAGE: 'app_language',
  REMEMBER_ME: 'auth_remember_me'
}

interface IKeysSession {}

export const sessionStoreKeys: IKeysSession = {}

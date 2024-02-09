interface IKeysLocal {
  THEME: string
  LANGUAGE: string
  REMEMBER_ME: string
  ACCESS_TOKEN: string
  REFRESH_TOKEN: string
  USER_ID: string
}

export const localStoreKeys: IKeysLocal = {
  THEME: 'app_theme',
  LANGUAGE: 'app_language',
  REMEMBER_ME: 'auth_remember_me',
  ACCESS_TOKEN: 'auth_access_token',
  REFRESH_TOKEN: 'auth_refresh_token',
  USER_ID: 'account_user_id'
}

interface IKeysSession {
  ACCESS_TOKEN: string
  REFRESH_TOKEN: string
  USER_ID: string
}

export const sessionStoreKeys: IKeysSession = {
  ACCESS_TOKEN: 'auth_access_token',
  REFRESH_TOKEN: 'auth_refresh_token',
  USER_ID: 'account_user_id'
}

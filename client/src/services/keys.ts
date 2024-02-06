interface IKeysLocal {
  THEME: string
  LANGUAGE: string
  ACCESS_TOKEN: string
  REFRESH_TOKEN: string
  USER_ID: string
}

export const localStoreKeys: IKeysLocal = {
  THEME: 'app_theme',
  LANGUAGE: 'app_language',
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

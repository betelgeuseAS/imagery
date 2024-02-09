import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'

import { typesAuth } from '../../types'
import { localStore, sessionStore } from '../../services'

const mutex = new Mutex()

const resetAuth = (): void => {
  localStore.removeAccessToken()
  localStore.removeRefreshToken()
  localStore.removeUserId()

  sessionStore.removeAccessToken()
  sessionStore.removeRefreshToken()
  sessionStore.removeUserId()
}

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.REACT_APP_API_BASE_URL as string}/v1`,
  prepareHeaders: (headers) => {
    const token = sessionStore.getAccessToken() || localStore.getAccessToken()
    if (token) headers.set('authorization', `Bearer ${token}`)

    return headers
  }
})

const baseQueryWithReAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()

      try {
        const rememberMe = localStore.getRememberMe()
        const refreshToken = sessionStore.getRefreshToken() || localStore.getRefreshToken()

        if (refreshToken) {
          // Try to get a new token
          const refreshResult = await baseQuery(
            {
              url: 'auth/refresh-tokens',
              method: 'POST',
              body: { refreshToken }
            },
            api,
            extraOptions
          )

          if (refreshResult.data) {
            const userWithTokens = refreshResult.data as typesAuth.IUserWithTokens

            if (rememberMe) {
              localStore.setAccessToken(userWithTokens.tokens.access.token)
              localStore.setRefreshToken(userWithTokens.tokens.refresh.token)
              localStore.setUserId(userWithTokens.user.id)
            } else {
              sessionStore.setAccessToken(userWithTokens.tokens.access.token)
              sessionStore.setRefreshToken(userWithTokens.tokens.refresh.token)
              sessionStore.setUserId(userWithTokens.user.id)
            }
          } else {
            resetAuth()
          }
        }
      } finally {
        release()
      }
    }

    // Retry the initial query
    result = await baseQuery(args, api, extraOptions)
  }

  return result
}

const api = createApi({
  reducerPath: 'rootApi',
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({})
})

export default api

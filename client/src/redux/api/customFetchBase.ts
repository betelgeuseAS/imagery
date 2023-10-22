import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { Mutex } from 'async-mutex'

import { logout } from '../features/userSlice'

const baseUrl = `${process.env.REACT_APP_API_BASE_URL}/v1/`

const mutex = new Mutex()

const baseQuery = fetchBaseQuery({ baseUrl })

const customFetchBase: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  await mutex.waitForUnlock()

  let result = await baseQuery(args, api, extraOptions)

  if ((result.error?.data as any)?.message === 'You are not logged in') {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()

      try {
        const refreshResult = await baseQuery({ credentials: 'include', url: 'auth/refresh' }, api, extraOptions)

        if (refreshResult.data) {
          result = await baseQuery(args, api, extraOptions)
        } else {
          api.dispatch(logout())

          window.location.href = '/login'
        }
      } finally {
        release()
      }
    } else {
      await mutex.waitForUnlock()

      result = await baseQuery(args, api, extraOptions)
    }
  }

  return result
}

export default customFetchBase

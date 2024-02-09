import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query/react'

import api from './api/api'
import { rtkQueryErrorLogger } from './middleware'

import uiReducer from './features/uiSlice'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    uiState: uiReducer
  },
  devTools: process.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware, rtkQueryErrorLogger)
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>

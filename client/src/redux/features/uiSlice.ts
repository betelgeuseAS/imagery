import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { PaletteMode } from '@mui/material'

import { typesUI } from '../../types'
import { localStore } from '../../services'

const initialState: typesUI.IUIState = {
  themeMode: localStore.getTheme() as PaletteMode
}

export const uiSlice = createSlice({
  name: 'uiSlice',
  initialState,
  reducers: {
    toggleTheme: (state, action: PayloadAction<PaletteMode>) => {
      state.themeMode = action.payload
    }
  }
})

export const { toggleTheme } = uiSlice.actions
export default uiSlice.reducer

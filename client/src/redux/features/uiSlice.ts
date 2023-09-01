import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { PaletteMode } from '@mui/material'

import { IUIState } from '../../types'
import { constants } from '../../constants'

const initialState: IUIState = {
  themeMode: (localStorage.getItem('themeMode') || constants.THEME.LIGHT) as PaletteMode
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

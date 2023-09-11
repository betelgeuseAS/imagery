import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { PaletteMode } from '@mui/material'

import { IUIState } from '../../types'
import { constants } from '../../constants'
import { localStore } from '../../services'

const initialState: IUIState = {
  themeMode: (localStore.get('themeMode') || constants.THEME.LIGHT) as PaletteMode
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

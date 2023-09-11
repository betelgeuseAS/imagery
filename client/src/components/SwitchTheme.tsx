import { FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Box, IconButton, PaletteMode } from '@mui/material'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'

import type { RootState } from '../redux/store'
import { constants } from '../constants'
import { localStore } from '../services'
import { toggleTheme } from '../redux/features/uiSlice'

export const SwitchTheme: FC = () => {
  const themeMode = useSelector((state: RootState) => state.uiState.themeMode)
  const dispatch = useDispatch()

  const handleToggleTheme = () => {
    const currentTheme = (
      themeMode === constants.THEME.LIGHT ? constants.THEME.DARK : constants.THEME.LIGHT
    ) as PaletteMode

    dispatch(toggleTheme(currentTheme))
    localStore.set('themeMode', currentTheme)
  }

  return (
    <Box>
      <IconButton onClick={handleToggleTheme} color="inherit">
        {themeMode === constants.THEME.DARK ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  )
}

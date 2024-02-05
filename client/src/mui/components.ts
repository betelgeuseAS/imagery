import { Link } from 'react-router-dom'

import { PaletteMode } from '@mui/material'
import { styled } from '@mui/material/styles'

import { typesUI } from '../types'
import { constants } from '../constants'

export const createComponents = (themeMode?: PaletteMode): typesUI.IComponents => {
  return {
    LinkItem: styled(Link)`
      text-decoration: underline;
      color: ${themeMode === constants.THEME.LIGHT ? '#000000' : '#FFFFFF'};
      &:hover {
        text-decoration: underline;
      }
    `
  }
}

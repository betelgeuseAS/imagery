import { Link } from 'react-router-dom'

import { PaletteMode } from '@mui/material'
import { styled } from '@mui/material/styles'

import { IComponents } from '../types'
import { constants } from '../constants'

export const createComponents = (themeMode?: PaletteMode): IComponents => {
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

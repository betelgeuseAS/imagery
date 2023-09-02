import { Link } from 'react-router-dom'

import { colors, PaletteMode } from '@mui/material'
import { styled } from '@mui/material/styles'

import { IComponents } from '../types'

const LinkItem = styled(Link)`
  text-decoration: none;
  color: ${colors.purple[500]};
  &:hover {
    text-decoration: underline;
  }
`

export const createComponents = (themeMode?: PaletteMode): IComponents => {
  return {
    LinkItem
  }
}

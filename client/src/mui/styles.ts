import { PaletteMode } from '@mui/material'

import { IStyles } from '../types'

export const createStyles = (themeMode?: PaletteMode): IStyles => {
  return {
    // Flex
    flexBetweenStart: { display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: 1 },
    flexBetweenCenter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 },
    flexStartCenter: { display: 'flex', justifyContent: 'start', alignItems: 'center', gap: 1 },
    flexCenterCenter: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 },

    // Common
    noHoverBackground: { '&:hover': { backgroundColor: 'transparent' } }
  }
}

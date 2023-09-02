import { PaletteMode } from '@mui/material'

import { IStyles } from '../types'

export const createStyles = (themeMode?: PaletteMode): IStyles => {
  return {
    // Flex
    flexBetweenCenter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 },
    flexCenterCenter: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }
  }
}

import { createTheme, PaletteColor, SimplePaletteColorOptions, Theme, ThemeOptions } from '@mui/material/styles'
import { colors, PaletteMode } from '@mui/material'

import { constants } from '../constants'

declare module '@mui/material/styles' {
  interface Palette {
    // accent: PaletteColor
  }
  interface PaletteOptions {
    // accent: SimplePaletteColorOptions
  }
  interface Theme {
    text?: {
      primary?: {
        fontSize?: number
      }
    }
  }
  interface ThemeOptions {
    text?: {
      primary?: {
        fontSize?: React.CSSProperties['fontSize']
        color?: React.CSSProperties['color']
      }
    }
  }
  interface TypographyOptions {
    color?: React.CSSProperties['color']
  }
}

export const createDesign = (themeMode: PaletteMode) => {
  const themeOptions: ThemeOptions = {
    text: {
      primary: {
        fontSize: 12,
        color: colors.blue[400]
      }
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `h5 { font-weight: 600 !important; }`
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            padding: 8
          }
        }
      }
    },
    palette: {
      mode: themeMode,
      // primary: { main: 'hsl(171, 66%, 44%)' },
      // accent: { main: 'hsl(171, 66%, 44%)' },
      text: {
        // primary: themeMode === constants.THEME.LIGHT ? '#6d657b' : '#a9abc0',
        // secondary: '',
        // disabled: colors.purple[500]
      }
    },
    typography: {
      fontFamily: ['Poppins', 'sans-serif'].join(','),
      fontSize: 12
    }
  }

  return createTheme(themeOptions)
}

import { createTheme, PaletteColor, SimplePaletteColorOptions, Theme, ThemeOptions } from '@mui/material/styles'
import { colors } from '@mui/material'

declare module '@mui/material/styles' {
  interface Palette {
    accent: PaletteColor
  }
  interface PaletteOptions {
    accent: SimplePaletteColorOptions
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
}

export const theme = createTheme({
  text: {
    primary: {
      fontSize: 16,
      color: colors.blue[400]
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: 12,
          background: 'hsl(171, 66%, 44%)'
        }
      }
    }
  },
  palette: {
    primary: { main: 'hsl(171, 66%, 44%)' },
    accent: { main: 'hsl(171, 66%, 44%)' }
  },
  typography: {
    fontFamily: ['Poppins', 'sans-serif'].join(','),
    fontSize: 12
  },
  spacing: 4
})

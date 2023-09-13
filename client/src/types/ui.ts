import { PaletteMode, SxProps, Theme } from '@mui/material'
import { StyledComponent } from '@emotion/styled'

export interface IUIState {
  themeMode: PaletteMode
}

type SxPropsOptional = SxProps<Theme> | undefined

export interface IStyles {
  flexBetweenStart: SxPropsOptional
  flexBetweenCenter: SxPropsOptional
  flexStartCenter: SxPropsOptional
  flexCenterCenter: SxPropsOptional

  noHoverBackground: SxPropsOptional
}

export interface IComponents {
  LinkItem: StyledComponent<any>
}

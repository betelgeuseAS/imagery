import { PaletteMode, SxProps, Theme } from '@mui/material'
import { StyledComponent } from '@emotion/styled'

export interface IUIState {
  themeMode: PaletteMode
}

type SxPropsOptional = SxProps<Theme> | undefined

export interface IStyles {
  flexBetweenCenter: SxPropsOptional
  flexCenterCenter: SxPropsOptional
}

export interface IComponents {
  LinkItem: StyledComponent<any>
}

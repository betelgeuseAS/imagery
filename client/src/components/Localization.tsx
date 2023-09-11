import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { Box, ToggleButtonGroup, ToggleButton } from '@mui/material'

import { constants } from '../constants'
import { localStore } from '../services'

export const Localization: FC = () => {
  const { i18n } = useTranslation()

  const handleChangeLanguage = (event: React.MouseEvent<HTMLElement>, language: string) => {
    i18n.changeLanguage(language)
    localStore.set('language', language)
  }

  return (
    <Box>
      <ToggleButtonGroup value={i18n.language} color="primary" size="small" exclusive onChange={handleChangeLanguage}>
        <ToggleButton value={constants.LANGUAGE.ENGLISH}>EN</ToggleButton>
        <ToggleButton value={constants.LANGUAGE.UKRAINIAN}>UA</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  )
}

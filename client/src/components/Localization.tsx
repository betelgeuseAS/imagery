import { useEffect } from 'react'
import { useTranslation, Trans } from 'react-i18next'

import { Box, ToggleButtonGroup, ToggleButton } from '@mui/material'

export const Localization: React.FC = () => {
  const { t, i18n } = useTranslation()

  useEffect(() => {
    const currentLanguage: string = localStorage.getItem('language') || 'en'

    i18n.changeLanguage(currentLanguage)
  }, [])

  const handleChangeLanguage = (event: React.MouseEvent<HTMLElement>, language: string) => {
    i18n.changeLanguage(language)
    localStorage.setItem('language', language)
  }

  return (
    <Box>
      <ToggleButtonGroup value={i18n.language} color="primary" exclusive onChange={handleChangeLanguage}>
        <ToggleButton value="en">EN</ToggleButton>
        <ToggleButton value="ua">UA</ToggleButton>
      </ToggleButtonGroup>

      {/*<Trans i18nKey="welcome">trans</Trans>*/}
      {/*<h2>{t('welcome')}</h2>*/}
    </Box>
  )
}

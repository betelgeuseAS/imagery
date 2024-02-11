import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { Box, Typography, Button } from '@mui/material'

import { routes } from '../router'

export const HomePage = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <Box>
      <Button onClick={() => navigate(routes.Login.relativePath)}>{t('auth.log_in')}</Button>
      <Typography sx={{ display: 'inline', mx: 1 }}>|</Typography>
      <Button onClick={() => navigate(routes.Register.relativePath)}>{t('auth.sign_up')}</Button>
    </Box>
  )
}

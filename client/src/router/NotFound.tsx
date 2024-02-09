import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Image } from 'mui-image'

import { Container, Typography, Grid, Box } from '@mui/material'

import { routes } from './'
import { typesI18N } from '../types'
import { RootState } from '../redux/store'
import { createComponents, createStyles } from '../mui'

import notFoundImage from '../assets/routes/404.webp'

const NotFound = () => {
  const { t }: typesI18N.i18nType = useTranslation()

  const themeMode = useSelector((state: RootState) => state.uiState.themeMode)

  const styles = createStyles(themeMode)
  const { LinkItem } = createComponents(themeMode)

  return (
    <Container disableGutters>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <Box sx={{ ...styles.flexCenterCenter, height: 'calc(100vh - (24px * 2))' }}>
            <Box sx={{ maxWidth: '21rem', width: '100%' }}>
              <Typography variant="h3" gutterBottom>
                {t('not_found.page')}
              </Typography>
              <Typography sx={{ mb: 1 }}>{t('not_found.message')}</Typography>

              <LinkItem to={routes.Home.relativePath}>
                <Typography>{t('not_found.action')}</Typography>
              </LinkItem>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={7}>
          <Box sx={{ ...styles.flexCenterCenter, height: 'calc(100vh - (24px * 2))' }}>
            <Image src={notFoundImage} duration={0} style={{ width: '100%', height: 'auto' }} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default NotFound

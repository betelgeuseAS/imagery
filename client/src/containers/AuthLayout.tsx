import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Box, Container, Grid, Typography } from '@mui/material'
import { Image } from 'mui-image'

import { RootState } from '../redux/store'
import { createStyles } from '../mui'

import { SwitchTheme } from '../components/SwitchTheme'
import { Localization } from '../components/Localization'

import iconImage from '../assets/logo/icon_128.png'
import abstractionImage from '../assets/auth/abstraction.jpg'

export const AuthLayout: FC = () => {
  const themeMode = useSelector((state: RootState) => state.uiState.themeMode)

  const styles = createStyles(themeMode)

  return (
    <Container disableGutters>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={7}>
          <Box sx={{ ...styles.flexBetweenStart, flexDirection: 'column', gap: 2, height: 'calc(100vh - (24px * 2))' }}>
            <Box sx={styles.flexStartCenter}>
              <Image src={iconImage} width="25px" duration={0} />
              <Typography variant="h5">Imagery</Typography>
            </Box>

            <Box sx={{ maxWidth: '21rem', margin: '0 auto' }}>
              <Outlet />
            </Box>

            <Box sx={styles.flexStartCenter}>
              <SwitchTheme />
              <Localization />
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} sm={5} sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Box sx={{ height: '100%', width: '100%', position: 'relative' }}>
            <Image src={abstractionImage} duration={0} style={{ borderRadius: '8px' }} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { object, string, TypeOf } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

import { Box, Container, Typography, Grid, Alert, Link as MUILink, Divider, IconButton } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Image } from 'mui-image'

import { createStyles, createComponents } from '../mui'
import { useLoginUserMutation } from '../redux/api/authApi'

import FormInput from '../components/FormInput'
import FormInputPassword from '../components/FormInputPassword'
import FormCheckbox from '../components/FormCheckbox'
import { SwitchTheme } from '../components/SwitchTheme'
import { Localization } from '../components/Localization'

import natureMountingImage from '../assets/nature/nature_maunting.jpg'
import facebookSocialImage from '../assets/social/facebook.png'
import twitterSocialImage from '../assets/social/twitter.png'
import githubSocialImage from '../assets/social/github.png'
import googleSocialImage from '../assets/social/google.png'

const loginSchema = object({
  email: string().min(1, 'Email address is required').email('Email Address is invalid'),
  password: string()
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters')
    .regex(/\d/, 'Password must contain at least 1 letter and 1 number')
    .regex(/[a-zA-Z]/, 'Password must contain at least 1 letter and 1 number')
})

export type LoginInput = TypeOf<typeof loginSchema>

const LoginPage = () => {
  const styles = createStyles()
  const { LinkItem } = createComponents()

  const { t } = useTranslation()

  const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema)
  })

  const [loginUser, { isLoading, isError, error, isSuccess }] = useLoginUserMutation()

  const navigate = useNavigate()
  const location = useLocation()

  const from = ((location.state as any)?.from.pathname as string) || '/'

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful }
  } = methods

  useEffect(() => {
    if (isSuccess) {
      toast.success('You successfully logged in')
      navigate(from)
    }

    if (isError) {
      if (Array.isArray((error as any).data.error)) {
        ;(error as any).data.error.forEach((el: any) =>
          toast.error(el.message, {
            position: 'top-right'
          })
        )
      } else {
        toast.error((error as any).data.message, {
          position: 'top-right'
        })
      }
    }
  }, [isLoading])

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
  }, [isSubmitSuccessful])

  const onSubmitHandler: SubmitHandler<LoginInput> = (values) => {
    loginUser(values)
  }

  return (
    <Container disableGutters>
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <Box sx={{ height: '100%', width: '100%', position: 'relative', py: 3 }}>
            <Box
              sx={{
                ...styles.flexStartCenter,
                position: 'absolute',
                top: 31,
                left: 8,
                zIndex: 100,
                backgroundColor: 'background.default',
                borderRadius: 2,
                p: 1
              }}>
              <SwitchTheme />

              <Localization />
            </Box>

            <Image src={natureMountingImage} duration={0} style={{ borderRadius: '8px' }} />
          </Box>
        </Grid>

        <Grid item xs={5} sx={{ ...styles.flexCenterCenter, height: '100vh' }}>
          <Box>
            <Typography variant="h5" gutterBottom>
              {t('welcome')}
            </Typography>
            <Typography gutterBottom>{t('sigh_in_label')}</Typography>

            <Alert icon={false} color="error" sx={{ my: 2 }}>
              Admin: <strong>admin_user@gmail.com</strong> / Password: <strong>password123</strong>
              <br />
              User: <strong>user@gmail.com</strong> / Password: <strong>password123</strong>
            </Alert>

            <FormProvider {...methods}>
              <Box
                component="form"
                onSubmit={handleSubmit(onSubmitHandler)}
                noValidate
                autoComplete="off"
                maxWidth="27rem"
                width="100%">
                <FormInput name="email" label={t('email')} type="email" size="small" autoFocus />
                <FormInputPassword name="password" label={t('password')} size="small" />

                <Box sx={styles.flexBetweenCenter}>
                  <FormCheckbox name="remember" label={t('remember_me')} />

                  <LinkItem to="/forgotpassword">
                    <Typography>{t('forgot_password')}?</Typography>
                  </LinkItem>
                </Box>

                <LoadingButton variant="contained" fullWidth disableElevation type="submit" loading={isLoading}>
                  {t('login')}
                </LoadingButton>

                <Typography align="center" sx={{ my: 2 }}>
                  {t('new_on_platform')}? <LinkItem to="/register">{t('create_account')}</LinkItem>
                </Typography>

                <Box textAlign="center" sx={{ mb: 1 }}>
                  <Divider />

                  <Typography
                    align="center"
                    sx={{ mt: -1.5, mx: 'auto', backgroundColor: 'background.default', width: '70px' }}>
                    {t('or')}
                  </Typography>
                </Box>

                <Box sx={{ ...styles.flexCenterCenter }}>
                  <IconButton component={MUILink} href="#">
                    <Image src={facebookSocialImage} width="15px" duration={0} />
                  </IconButton>
                  <IconButton component={MUILink} href="#">
                    <Image src={twitterSocialImage} width="15px" duration={0} />
                  </IconButton>
                  <IconButton component={MUILink} href="#">
                    <Image src={githubSocialImage} width="15px" duration={0} />
                  </IconButton>
                  <IconButton component={MUILink} href="#">
                    <Image src={googleSocialImage} width="15px" duration={0} />
                  </IconButton>
                </Box>
              </Box>
            </FormProvider>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default LoginPage

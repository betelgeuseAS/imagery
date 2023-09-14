import { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { object, string, TypeOf } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

import { Box, Container, Typography, Grid, Link as MUILink, Divider, IconButton, Button } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Image } from 'mui-image'

import i18next from '../i18n/config'
import { RootState } from '../redux/store'
import { createStyles, createComponents } from '../mui'
import { useLoginUserMutation } from '../redux/api/authApi'

import FormInput from '../components/FormInput'
import FormInputPassword from '../components/FormInputPassword'
import FormCheckbox from '../components/FormCheckbox'
import { SwitchTheme } from '../components/SwitchTheme'
import { Localization } from '../components/Localization'

import iconImage from '../assets/logo/icon_128.png'
import natureMountingImage from '../assets/nature/nature_maunting.jpg'
import googleSocialImage from '../assets/social/google.png'
import microsoftSocialImage from '../assets/social/microsoft.png'
import appleSocialImage from '../assets/social/apple.png'

const loginSchema = object({
  email: string().min(1, i18next.t('validation.email_required')).email(i18next.t('validation.email_invalid')),
  password: string()
    .min(1, i18next.t('validation.password_required'))
    .min(8, i18next.t('validation.password_more', { number: 8 }))
    .max(32, i18next.t('validation.password_less', { number: 32 }))
    .regex(/\d/, i18next.t('validation.contains_letter_number', { letter: 1, number: 1 }))
    .regex(/[a-zA-Z]/, i18next.t('validation.contains_letter_number', { letter: 1, number: 1 }))
})

export type LoginInput = TypeOf<typeof loginSchema>

const LoginPage: FC = () => {
  const themeMode = useSelector((state: RootState) => state.uiState.themeMode)

  const styles = createStyles(themeMode)
  const { LinkItem } = createComponents(themeMode)

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
          <Box sx={{ ...styles.flexBetweenStart, flexDirection: 'column', gap: 2, height: 'calc(100vh - (24px * 2))' }}>
            <Box sx={styles.flexStartCenter}>
              <Image src={iconImage} width="25px" duration={0} />

              <Typography variant="h5">Imagery</Typography>
            </Box>

            <Box sx={{ maxWidth: '21rem', margin: '0 auto' }}>
              <Typography variant="h5" gutterBottom>
                {t('auth.log_in')}
              </Typography>
              <Typography gutterBottom sx={{ color: 'text.disabled' }}>
                {t('auth.log_in_label')}
              </Typography>

              <FormProvider {...methods}>
                <Box
                  component="form"
                  onSubmit={handleSubmit(onSubmitHandler)}
                  noValidate
                  autoComplete="off"
                  maxWidth="21rem"
                  width="100%">
                  <FormInput name="email" label={t('forms.email')} type="email" size="small" autoFocus />
                  <FormInputPassword name="password" label={t('forms.password')} size="small" />

                  <Box sx={styles.flexBetweenCenter}>
                    <FormCheckbox name="remember" label={t('auth.log_in_keep')} />

                    <LinkItem to="/forgotpassword">
                      <Typography>{t('auth.forgot_password')}?</Typography>
                    </LinkItem>
                  </Box>

                  <LoadingButton variant="contained" fullWidth disableElevation type="submit" loading={isLoading}>
                    {t('auth.log_in')}
                  </LoadingButton>

                  <Typography align="center" sx={{ color: 'text.disabled', my: 2 }}>
                    {t('auth.new_on_platform')}? <LinkItem to="/register">{t('auth.create_account')}</LinkItem>
                  </Typography>

                  <Box textAlign="center" sx={{ mb: 1 }}>
                    <Divider />

                    <Typography
                      align="center"
                      sx={{
                        color: 'text.disabled',
                        backgroundColor: 'background.default',
                        width: '70px',
                        mt: -1.5,
                        mx: 'auto'
                      }}>
                      {t('conjunction.or')}
                    </Typography>
                  </Box>

                  <Box sx={{ ...styles.flexCenterCenter }}>
                    <Button sx={styles.noHoverBackground}>
                      <Image src={googleSocialImage} width="18px" duration={0} />
                    </Button>
                    <Button sx={styles.noHoverBackground}>
                      <Image src={microsoftSocialImage} width="18px" duration={0} />
                    </Button>
                    <Button sx={styles.noHoverBackground}>
                      <Image src={appleSocialImage} width="20px" duration={0} />
                    </Button>
                  </Box>
                </Box>
              </FormProvider>
            </Box>

            <Box sx={styles.flexStartCenter}>
              <SwitchTheme />

              <Localization />
            </Box>
          </Box>
        </Grid>

        <Grid item xs={5}>
          <Box sx={{ height: '100%', width: '100%', position: 'relative', py: 3 }}>
            <Image src={natureMountingImage} duration={0} style={{ borderRadius: '8px' }} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default LoginPage

import { FC, Fragment } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { object, string, boolean, TypeOf } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import { Box, Typography, Divider, Button } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Image } from 'mui-image'

import { typesLocation } from '../types'
import i18next from '../i18n/config'
import { RootState } from '../redux/store'
import { createStyles, createComponents } from '../mui'
import { useLoginMutation } from '../redux/api/auth.api'
import { routes } from '../router'
import { localStore, sessionStore } from '../services'

import FormInput from '../components/FormInput'
import FormInputPassword from '../components/FormInputPassword'
import FormCheckbox from '../components/FormCheckbox'

import googleSocialImage from '../assets/social/google.png'
import microsoftSocialImage from '../assets/social/microsoft.png'
import appleSocialImage from '../assets/social/apple.png'

const loginSchema = object({
  email: string()
    .min(1, i18next.t('validation.email_required' as any) as string)
    .email(i18next.t('validation.email_invalid' as any) as string),
  password: string()
    .min(1, i18next.t('validation.password_required' as any) as string)
    .min(8, i18next.t('validation.password_more' as any, { number: 8 } as any) as string)
    .max(32, i18next.t('validation.password_less' as any, { number: 32 } as any) as string)
    .refine((value) => /\d/.test(value) && /[a-zA-Z]/.test(value), {
      params: { i18n: { key: 'validation.password_contains_letter_number', values: { letter: 1, number: 1 } } }
    }),
  remember: boolean()
})

export type LoginInput = TypeOf<typeof loginSchema>

export const LoginPage: FC = () => {
  localStore.setRememberMe(false)

  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()

  const themeMode = useSelector((state: RootState) => state.uiState.themeMode)
  const styles = createStyles(themeMode)
  const { LinkItem } = createComponents(themeMode)

  const [loginUser, { isLoading /* , isError, error, isSuccess, data */ }] = useLoginMutation()

  const methods = useForm<LoginInput>({
    defaultValues: {
      email: 'admin_user@gmail.com',
      password: 'password123'
    },
    resolver: zodResolver(loginSchema)
  })

  const { handleSubmit /* reset, formState: { isSubmitSuccessful } */ } = methods

  const previousLocationState = location.state as typesLocation.LocationState

  const onSubmitHandler: SubmitHandler<LoginInput> = async (values) => {
    const { email, password, remember } = values

    localStore.setRememberMe(remember)

    await loginUser({ email, password })
      .unwrap()
      .then((payload) => {
        if (remember) {
          localStore.setAccessToken(payload.tokens.access.token)
          localStore.setRefreshToken(payload.tokens.refresh.token)
          localStore.setUserId(payload.user.id)
        } else {
          sessionStore.setAccessToken(payload.tokens.access.token)
          sessionStore.setRefreshToken(payload.tokens.refresh.token)
          sessionStore.setUserId(payload.user.id)
        }

        navigate(previousLocationState?.from.pathname || routes.Dashboard.absolutePath, { replace: true })
      })
  }

  return (
    <Fragment>
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

            <LinkItem to={routes.ForgotPassword.absolutePath}>
              <Typography>{t('auth.log_in_forgot_password')}?</Typography>
            </LinkItem>
          </Box>

          <LoadingButton variant="contained" fullWidth disableElevation type="submit" loading={isLoading}>
            {t('auth.log_in')}
          </LoadingButton>

          <Typography align="center" sx={{ color: 'text.disabled', my: 2 }}>
            {t('auth.new_on_platform')}?{' '}
            <LinkItem to={routes.Register.absolutePath}>{t('auth.create_account')}</LinkItem>
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
    </Fragment>
  )
}

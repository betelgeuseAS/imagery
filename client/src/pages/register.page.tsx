import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { object, string, TypeOf } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

import { Box, Container, Grid, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Image } from 'mui-image'

import i18next from '../i18n/config'
import { createComponents, createStyles } from '../mui'
import { useRegisterUserMutation } from '../redux/api/authApi'

import FormInput from '../components/FormInput'
import FormInputPassword from '../components/FormInputPassword'
import { SwitchTheme } from '../components/SwitchTheme'
import { Localization } from '../components/Localization'

import natureMountingImage from '../assets/nature/nature_maunting.jpg'

const registerSchema = object({
  name: string().min(1, i18next.t('validation.full_name_required')).max(100, i18next.t('validation.full_name_less')),
  email: string().min(1, i18next.t('validation.email_required')).email(i18next.t('validation.email_invalid')),
  password: string()
    .min(1, i18next.t('validation.password_required'))
    .min(8, i18next.t('validation.password_more', { number: 8 }))
    .max(32, i18next.t('validation.password_less', { number: 32 }))
    .regex(/\d/, i18next.t('validation.contains_letter_number', { letter: 1, number: 1 }))
    .regex(/[a-zA-Z]/, i18next.t('validation.contains_letter_number', { letter: 1, number: 1 })),
  passwordConfirm: string().min(1, i18next.t('validation.password_confirm'))
}).refine((data) => data.password === data.passwordConfirm, {
  path: ['passwordConfirm'],
  // message: i18next.t('validation.password_not_match'),
  params: { i18n: 'validation.password_not_match' }
})

export type RegisterInput = TypeOf<typeof registerSchema>

const RegisterPage: FC = () => {
  const styles = createStyles()
  const { LinkItem } = createComponents()

  const { t } = useTranslation()

  const methods = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema)
  })

  const [registerUser, { isLoading, isSuccess, error, isError, data }] = useRegisterUserMutation()

  const navigate = useNavigate()

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful }
  } = methods

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message)
      navigate('/verifyemail')
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

  const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => {
    registerUser(values)
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
              {t('auth.welcome', { name: 'Imagery' })}
            </Typography>
            <Typography gutterBottom>{t('auth.sigh_up_label')}</Typography>

            <FormProvider {...methods}>
              <Box
                component="form"
                onSubmit={handleSubmit(onSubmitHandler)}
                noValidate
                autoComplete="off"
                maxWidth="27rem"
                width="100%">
                <FormInput name="name" label={t('forms.full_name')} size="small" autoFocus />
                <FormInput name="email" label={t('forms.email')} type="email" size="small" />
                <FormInputPassword name="password" label={t('forms.password')} size="small" />
                <FormInputPassword name="passwordConfirm" label={t('forms.confirm_password')} size="small" />

                <Typography align="center" sx={{ mb: 2 }}>
                  {t('auth.already_have_account')}? <LinkItem to="/login">{t('auth.login_here')}</LinkItem>
                </Typography>

                <LoadingButton variant="contained" fullWidth disableElevation type="submit" loading={isLoading}>
                  {t('auth.signup')}
                </LoadingButton>
              </Box>
            </FormProvider>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default RegisterPage

import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { object, string, TypeOf } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import { Box, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'

import { typesI18N } from '../types'
import { RootState } from '../redux/store'
import i18next from '../i18n/config'
import { routes } from '../router'
import { useForgotPasswordMutation } from '../redux/api/auth.api'
import { createComponents } from '../mui'

import FormInput from '../components/FormInput'

const forgotPasswordSchema = object({
  email: string()
    .min(1, i18next.t('validation.email_required' as any) as string)
    .email(i18next.t('validation.email_invalid' as any) as string)
})

export type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>

export const ForgotPasswordPage = () => {
  const { t }: typesI18N.i18nType = useTranslation()
  const methods = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema)
  })

  const themeMode = useSelector((state: RootState) => state.uiState.themeMode)
  const { LinkItem } = createComponents(themeMode)

  const [sendForgotPassword, { isLoading, isSuccess }] = useForgotPasswordMutation()

  const onSubmitHandler: SubmitHandler<ForgotPasswordInput> = async ({ email }) => {
    await sendForgotPassword({ email })
    // .unwrap()
    // .then(() => {
    //   toast.success('message')
    // })
  }

  if (isSuccess) {
    return (
      <Fragment>
        <Typography align="center" gutterBottom sx={{ color: 'text.disabled', mb: 2 }}>
          {t('auth.forgot_password_sent')}
        </Typography>
        <Typography align="center">
          <LinkItem to={routes.Login.absolutePath}>{t('auth.back_to_log_in')}</LinkItem>
        </Typography>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <Typography variant="h5" gutterBottom>
        {t('auth.forgot_password')}
      </Typography>
      <Typography gutterBottom sx={{ color: 'text.disabled' }}>
        {t('auth.forgot_password_label')}
      </Typography>

      <FormProvider {...methods}>
        <Box
          component="form"
          onSubmit={methods.handleSubmit(onSubmitHandler)}
          noValidate
          autoComplete="off"
          maxWidth="21rem"
          width="100%">
          <FormInput name="email" label={t('forms.email')} type="email" size="small" autoFocus />

          <LoadingButton
            variant="contained"
            fullWidth
            disableElevation
            type="submit"
            loading={isLoading}
            sx={{ mt: 1, mb: 2 }}>
            {t('auth.retrieve_password')}
          </LoadingButton>

          <Typography align="center">
            <LinkItem to={routes.Login.absolutePath}>{t('auth.back_to_log_in')}</LinkItem>
          </Typography>
        </Box>
      </FormProvider>
    </Fragment>
  )
}

import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { object, string, TypeOf } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import { Box, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'

import { typesI18N } from '../types'
import { RootState } from '../redux/store'
import i18next from '../i18n/config'
import routes from '../router/routes'
import { useResetPasswordMutation } from '../redux/api/auth.api'
import { createComponents } from '../mui'

import FormInputPassword from '../components/FormInputPassword'

const resetPasswordSchema = object({
  password: string()
    .min(1, i18next.t('validation.password_required' as any) as string)
    .min(8, i18next.t('validation.password_more' as any, { number: 8 } as any) as string)
    .max(32, i18next.t('validation.password_less' as any, { number: 32 } as any) as string)
    .refine((value) => /\d/.test(value) && /[a-zA-Z]/.test(value), {
      params: { i18n: { key: 'validation.password_contains_letter_number', values: { letter: 1, number: 1 } } }
    }),
  passwordConfirm: string().min(1, i18next.t('validation.password_confirm' as any) as string)
}).refine((data) => data.password === data.passwordConfirm, {
  path: ['passwordConfirm'],
  params: { i18n: 'validation.password_not_match' }
})

export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>

export const ResetPasswordPage = () => {
  const { t }: typesI18N.i18nType = useTranslation()
  const [searchParams] = useSearchParams()
  // const { resetToken } = useParams<{ resetToken: string }>()
  const navigate = useNavigate()
  const methods = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema)
  })

  const themeMode = useSelector((state: RootState) => state.uiState.themeMode)
  const { LinkItem } = createComponents(themeMode)

  const [ResetUserPassword, { isLoading }] = useResetPasswordMutation()

  const onSubmitHandler: SubmitHandler<ResetPasswordInput> = async (values) => {
    const token = searchParams.get('token')

    if (!token) {
      // toast.error('Your token is invalid')
      return
    }

    await ResetUserPassword({ body: { ...values }, params: { token } })
    // .unwrap()
    // .then(() => {
    //   toast('Password reset was successful. Please try logging in again')
    //   navigate(routes.Login.absolutePath)
    // })
  }

  return (
    <Fragment>
      <Typography variant="h5" gutterBottom>
        {t('auth.reset_password')}
      </Typography>
      <Typography gutterBottom sx={{ color: 'text.disabled' }}>
        {t('auth.reset_password_label')}
      </Typography>

      <FormProvider {...methods}>
        <Box
          component="form"
          onSubmit={methods.handleSubmit(onSubmitHandler)}
          noValidate
          autoComplete="off"
          maxWidth="21rem"
          width="100%">
          <FormInputPassword name="password" label={t('forms.password')} size="small" />
          <FormInputPassword name="passwordConfirm" label={t('forms.confirm_password')} size="small" />

          <LoadingButton
            variant="contained"
            sx={{ mt: 1, mb: 2 }}
            fullWidth
            disableElevation
            type="submit"
            loading={isLoading}>
            {t('auth.reset_password')}
          </LoadingButton>
        </Box>
      </FormProvider>

      <Typography align="center">
        <LinkItem to={routes.Login.absolutePath}>{t('auth.back_to_log_in')}</LinkItem>
      </Typography>
    </Fragment>
  )
}

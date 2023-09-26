import { Fragment, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { object, string, TypeOf } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

import { Box, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'

import i18next from '../i18n/config'
import { useResetPasswordMutation } from '../redux/api/authApi'

import FormInputPassword from '../components/FormInputPassword'

const resetPasswordSchema = object({
  password: string()
    .min(1, i18next.t('validation.password_required'))
    .min(8, i18next.t('validation.password_more', { number: 8 }))
    .max(32, i18next.t('validation.password_less', { number: 32 }))
    .regex(/\d/, i18next.t('validation.password_contains_letter_number', { letter: 1, number: 1 }))
    .regex(/[a-zA-Z]/, i18next.t('validation.password_contains_letter_number', { letter: 1, number: 1 })),
  passwordConfirm: string().min(1, i18next.t('validation.password_confirm'))
}).refine((data) => data.password === data.passwordConfirm, {
  path: ['passwordConfirm'],
  params: { i18n: 'validation.password_not_match' }
})

export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>

export const ResetPasswordPage = () => {
  const { resetToken } = useParams<{ resetToken: string }>()

  const { t } = useTranslation()

  const methods = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema)
  })

  const [resetPassword, { isLoading, isError, error, isSuccess }] = useResetPasswordMutation()

  const navigate = useNavigate()

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful }
  } = methods

  useEffect(() => {
    if (isSuccess) {
      navigate('/login')
      toast.success('Password updated successfully, login', {
        position: 'top-right'
      })
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

  const onSubmitHandler: SubmitHandler<ResetPasswordInput> = (values) => {
    resetPassword({ ...values, resetToken: resetToken! })
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
          onSubmit={handleSubmit(onSubmitHandler)}
          noValidate
          autoComplete="off"
          maxWidth="21rem"
          width="100%">
          <FormInputPassword name="password" label={t('forms.password')} size="small" />
          <FormInputPassword name="passwordConfirm" label={t('forms.confirm_password')} size="small" />

          <LoadingButton
            variant="contained"
            sx={{ mt: 1 }}
            fullWidth
            disableElevation
            type="submit"
            loading={isLoading}>
            {t('auth.reset_password')}
          </LoadingButton>
        </Box>
      </FormProvider>
    </Fragment>
  )
}

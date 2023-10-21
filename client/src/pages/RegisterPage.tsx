import { FC, useEffect, Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { object, string, TypeOf } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

import { Box, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'

import { i18nType } from '../types'
import { RootState } from '../redux/store'
import i18next from '../i18n/config'
import { createComponents } from '../mui'
import { useRegisterUserMutation } from '../redux/api/authApi'

import FormInput from '../components/FormInput'
import FormInputPassword from '../components/FormInputPassword'

const registerSchema = object({
  name: string()
    .min(1, i18next.t('validation.full_name_required' as any) as string)
    .max(100, i18next.t('validation.full_name_less' as any) as string),
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
  passwordConfirm: string().min(1, i18next.t('validation.password_confirm' as any) as string)
}).refine((data) => data.password === data.passwordConfirm, {
  path: ['passwordConfirm'],
  params: { i18n: 'validation.password_not_match' }
})

export type RegisterInput = TypeOf<typeof registerSchema>

export const RegisterPage: FC = () => {
  const themeMode = useSelector((state: RootState) => state.uiState.themeMode)

  const { LinkItem } = createComponents(themeMode)

  const { t }: i18nType = useTranslation()

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
      navigate('/verify_email')
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
    <Fragment>
      <Typography variant="h5" gutterBottom>
        {t('auth.sign_up')}
      </Typography>
      <Typography gutterBottom sx={{ color: 'text.disabled' }}>
        {t('auth.sigh_up_label')}
      </Typography>

      <FormProvider {...methods}>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmitHandler)}
          noValidate
          autoComplete="off"
          maxWidth="21rem"
          width="100%">
          <FormInput name="name" label={t('forms.full_name')} size="small" autoFocus />
          <FormInput name="email" label={t('forms.email')} type="email" size="small" />
          <FormInputPassword name="password" label={t('forms.password')} size="small" />
          <FormInputPassword name="passwordConfirm" label={t('forms.confirm_password')} size="small" />

          <Typography align="center" sx={{ color: 'text.disabled', mb: 2 }}>
            {t('auth.already_have_account')}? <LinkItem to="/login">{t('auth.log_in_here')}</LinkItem>
          </Typography>

          <LoadingButton variant="contained" fullWidth disableElevation type="submit" loading={isLoading}>
            {t('auth.sign_up')}
          </LoadingButton>
        </Box>
      </FormProvider>
    </Fragment>
  )
}

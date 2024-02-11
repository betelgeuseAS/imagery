import { FC, Fragment } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { object, string, TypeOf } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import { Box, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'

import { RootState } from '../redux/store'
import i18next from '../i18n/config'
import routes from '../router/routes'
import { useVerifyEmailMutation } from '../redux/api/auth.api'
import { createComponents } from '../mui'

import FormInput from '../components/FormInput'

const verificationCodeSchema = object({
  verificationCode: string().min(1, i18next.t('validation.verification_code_required' as any) as string)
})

export type VerificationCodeInput = TypeOf<typeof verificationCodeSchema>

export const EmailVerificationPage: FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const methods = useForm<VerificationCodeInput>({
    resolver: zodResolver(verificationCodeSchema)
  })

  const themeMode = useSelector((state: RootState) => state.uiState.themeMode)
  const { LinkItem } = createComponents(themeMode)

  const [verifyUserEmail, { isLoading }] = useVerifyEmailMutation()

  const onSubmitHandler: SubmitHandler<VerificationCodeInput> = async ({ verificationCode }) => {
    const token = searchParams.get('token')

    if (!token) {
      // toast.error('Your token is invalid')

      return
    }

    await verifyUserEmail({ token })
    // .unwrap()
    // .then(() => {
    //   toast('Your email was successfully verified')
    //   navigate(routes.Login.absolutePath)
    // })
  }

  return (
    <Fragment>
      <Typography variant="h5" gutterBottom>
        {t('auth.verification')}
      </Typography>
      <Typography gutterBottom sx={{ color: 'text.disabled' }}>
        {t('auth.verification_label')}
      </Typography>

      <FormProvider {...methods}>
        <Box
          component="form"
          onSubmit={methods.handleSubmit(onSubmitHandler)}
          noValidate
          autoComplete="off"
          maxWidth="21rem"
          width="100%">
          <FormInput name="verificationCode" label={t('forms.verification_code')} size="small" autoFocus />

          <LoadingButton
            variant="contained"
            fullWidth
            disableElevation
            type="submit"
            loading={isLoading}
            sx={{ mt: 1, mb: 2 }}>
            {t('auth.verify_email')}
          </LoadingButton>
        </Box>
      </FormProvider>

      <Typography align="center">
        <LinkItem to={routes.Login.absolutePath}>{t('auth.back_to_log_in')}</LinkItem>
      </Typography>
    </Fragment>
  )
}

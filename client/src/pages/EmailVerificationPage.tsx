import { FC, Fragment, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { object, string, TypeOf } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

import { Box, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'

import i18next from '../i18n/config'
import { useVerifyEmailMutation } from '../redux/api/authApi'

import FormInput from '../components/FormInput'

const verificationCodeSchema = object({
  verificationCode: string().min(1, i18next.t('validation.verification_code_required'))
})

export type VerificationCodeInput = TypeOf<typeof verificationCodeSchema>

export const EmailVerificationPage: FC = () => {
  const { verificationCode } = useParams()

  const { t } = useTranslation()

  const methods = useForm<VerificationCodeInput>({
    resolver: zodResolver(verificationCodeSchema)
  })

  const [verifyEmail, { isLoading, isError, error, isSuccess, data }] = useVerifyEmailMutation()

  const navigate = useNavigate()

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful }
  } = methods

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message)
      navigate('/login')
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

  useEffect(() => {
    if (verificationCode) {
      reset({ verificationCode })
    }
  }, [])

  const onSubmitHandler: SubmitHandler<VerificationCodeInput> = ({ verificationCode }) => {
    verifyEmail(verificationCode)
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
          onSubmit={handleSubmit(onSubmitHandler)}
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
            sx={{ mt: 1 }}>
            {t('auth.verify_email')}
          </LoadingButton>
        </Box>
      </FormProvider>
    </Fragment>
  )
}

import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { object, string, TypeOf } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'

import { Box, Container, Typography, Grid } from '@mui/material'
import { LoadingButton as _LoadingButton } from '@mui/lab'
import { styled } from '@mui/material/styles'

import { useLoginUserMutation } from '../redux/api/authApi'

import FormInput from '../components/FormInput'

const LoadingButton = styled(_LoadingButton)`
  padding: 0.6rem 0;
  background-color: #f9d13e;
  color: #2363eb;
  font-weight: 500;

  &:hover {
    background-color: #ebc22c;
    transform: translateY(-2px);
  }
`

const LinkItem = styled(Link)`
  text-decoration: none;
  color: #2363eb;
  &:hover {
    text-decoration: underline;
  }
`

const loginSchema = object({
  email: string().min(1, 'Email address is required').email('Email Address is invalid'),
  password: string()
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters')
})

export type LoginInput = TypeOf<typeof loginSchema>

const LoginPage = () => {
  const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema)
  })

  // 👇 API Login Mutation
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
        <Grid item xs={8}>
          image
        </Grid>
        <Grid item xs={4}>
          <Box>
            <Typography variant="h3" gutterBottom>
              Welcome to Imagery! 👋
            </Typography>
            <Typography gutterBottom>Please sign-in to your account and start the adventure</Typography>

            <FormProvider {...methods}>
              <Box
                component="form"
                onSubmit={handleSubmit(onSubmitHandler)}
                noValidate
                autoComplete="off"
                maxWidth="27rem"
                width="100%"
                sx={{
                  backgroundColor: '#e5e7eb',
                  p: 3,
                  borderRadius: 2
                }}>
                <FormInput name="email" label="Email Address" type="email" />
                <FormInput name="password" label="Password" type="password" />

                <Typography sx={{ fontSize: '0.9rem', mb: '1rem', textAlign: 'right' }}>
                  <LinkItem to="/forgotpassword">Forgot Password?</LinkItem>
                </Typography>

                <LoadingButton
                  variant="contained"
                  sx={{ mt: 1 }}
                  fullWidth
                  disableElevation
                  type="submit"
                  loading={isLoading}>
                  Login
                </LoadingButton>

                <Typography sx={{ mt: 2 }}>
                  Need an account? <LinkItem to="/register">Sign Up</LinkItem>
                </Typography>
              </Box>
            </FormProvider>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default LoginPage

import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { object, string, TypeOf } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'

import { Box, Container, Typography, Grid, Alert, Link as MUILink } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Image } from 'mui-image'

import { createStyles, createComponents } from '../mui'
import { useLoginUserMutation } from '../redux/api/authApi'

import FormInput from '../components/FormInput'
import FormInputPassword from '../components/FormInputPassword'
import FormCheckbox from '../components/FormCheckbox'
import { SwitchTheme } from '../components/SwitchTheme'

import facebookSocialImage from '../assets/social/facebook.png'
import twitterSocialImage from '../assets/social/twitter.png'
import githubSocialImage from '../assets/social/github.png'
import googleSocialImage from '../assets/social/google.png'

const loginSchema = object({
  email: string().min(1, 'Email address is required').email('Email Address is invalid'),
  password: string()
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters')
})

export type LoginInput = TypeOf<typeof loginSchema>

const LoginPage = () => {
  const styles = createStyles()
  const { LinkItem } = createComponents()

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
        <Grid item xs={7}>
          {/*<Box sx={}></Box>*/}
        </Grid>

        <Grid item xs={5}>
          <Box>
            {/*<SwitchTheme />*/}

            <Typography variant="h5" gutterBottom>
              Welcome to Imagery! 👋
            </Typography>
            <Typography gutterBottom>Please sign-in to your account and start the adventure</Typography>

            <Alert icon={false} color="error" sx={{ my: 2 }}>
              Admin: <strong>admin_user@gmail.com</strong> / Password: <strong>password123</strong>
              <br />
              User: <strong>...</strong> / Password: <strong>...</strong>
            </Alert>

            <FormProvider {...methods}>
              <Box
                component="form"
                onSubmit={handleSubmit(onSubmitHandler)}
                noValidate
                autoComplete="off"
                maxWidth="27rem"
                width="100%">
                <FormInput name="email" label="Email" type="email" size="small" autoFocus />
                <FormInputPassword name="password" label="Password" size="small" />

                <Box sx={styles.flexBetweenCenter}>
                  <FormCheckbox name="remember" label="Remember Me" />

                  <LinkItem to="/forgotpassword">
                    <Typography>Forgot Password?</Typography>
                  </LinkItem>
                </Box>

                <LoadingButton variant="contained" fullWidth disableElevation type="submit" loading={isLoading}>
                  Login
                </LoadingButton>

                <Typography align="center" sx={{ my: 2 }}>
                  New on our platform? <LinkItem to="/register">Create an account</LinkItem>
                </Typography>
                <Typography align="center" sx={{ mb: 2 }}>
                  or
                </Typography>

                <Box sx={{ ...styles.flexCenterCenter, gap: 2 }}>
                  <MUILink href="#">
                    <Image src={facebookSocialImage} width="15px" duration={0} />
                  </MUILink>
                  <MUILink href="#">
                    <Image src={twitterSocialImage} width="15px" duration={0} />
                  </MUILink>
                  <MUILink href="#">
                    <Image src={githubSocialImage} width="15px" duration={0} />
                  </MUILink>
                  <MUILink href="#">
                    <Image src={googleSocialImage} width="15px" duration={0} />
                  </MUILink>
                </Box>
              </Box>
            </FormProvider>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default LoginPage

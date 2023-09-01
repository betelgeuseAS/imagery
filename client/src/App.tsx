import { useMemo } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'

import Layout from './components/layout'
import RequireUser from './components/requireUser'
import ProfilePage from './pages/profile.page'
import HomePage from './pages/home.page'
import LoginPage from './pages/login.page'
import RegisterPage from './pages/register.page'
import UnauthorizePage from './pages/unauthorize.page'
import AdminPage from './pages/admin.page'
import EmailVerificationPage from './pages/verifyemail.page'
import ResetPasswordPage from './pages/reset-password.page'
import ForgotPasswordPage from './pages/forgot-password.page'

import { createDesign } from './mui/theme'
import { RootState } from './redux/store'

import 'react-toastify/dist/ReactToastify.css'

const App = (): JSX.Element => {
  const themeMode = useSelector((state: RootState) => state.uiState.themeMode)
  const theme = useMemo(() => createDesign(themeMode), [themeMode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route element={<RequireUser allowedRoles={['user', 'admin']} />}>
            <Route path="profile" element={<ProfilePage />} />
          </Route>
          <Route element={<RequireUser allowedRoles={['admin']} />}>
            <Route path="admin" element={<AdminPage />} />
          </Route>
          <Route path="unauthorized" element={<UnauthorizePage />} />
        </Route>

        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="verifyemail" element={<EmailVerificationPage />}>
          <Route path=":verificationCode" element={<EmailVerificationPage />} />
        </Route>
        <Route path="forgotpassword" element={<ForgotPasswordPage />} />
        <Route path="resetpassword" element={<ResetPasswordPage />}>
          <Route path=":resetToken" element={<ResetPasswordPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App

import { FC, useMemo } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'

import { AuthLayout, DashboardLayout } from './containers'
import { LoginPage, RegisterPage, ForgotPasswordPage, EmailVerificationPage, ResetPasswordPage } from './pages'
import RequireUser from './components/requireUser'
import ProfilePage from './pages/profile.page'
import HomePage from './pages/home.page'
import UnauthorizePage from './pages/unauthorize.page'
import AdminPage from './pages/admin.page'

import { createDesign } from './mui'
import { RootState } from './redux/store'

import 'react-toastify/dist/ReactToastify.css'

const App: FC = (): JSX.Element => {
  const themeMode = useSelector((state: RootState) => state.uiState.themeMode)
  const theme = useMemo(() => createDesign(themeMode), [themeMode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer />

      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<HomePage />} />
          <Route element={<RequireUser allowedRoles={['user', 'admin']} />}>
            <Route path="profile" element={<ProfilePage />} />
          </Route>
          <Route element={<RequireUser allowedRoles={['admin']} />}>
            <Route path="admin" element={<AdminPage />} />
          </Route>
          <Route path="unauthorized" element={<UnauthorizePage />} />
        </Route>

        <Route path="/" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="verify_email" element={<EmailVerificationPage />}>
            <Route path=":verificationCode" element={<EmailVerificationPage />} />
          </Route>
          <Route path="forgot_password" element={<ForgotPasswordPage />} />
          <Route path="reset_password" element={<ResetPasswordPage />}>
            <Route path=":resetToken" element={<ResetPasswordPage />} />
          </Route>
        </Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App

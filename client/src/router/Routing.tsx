import React from 'react'
import { Routes, Route } from 'react-router-dom'

import restrictions from './restrictions'
import routes from './routes'

import {
  HomePage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  EmailVerificationPage,
  ResetPasswordPage,
  DashboardPage,
  ProfilePage
} from '../pages'
import { AuthLayout, DashboardLayout } from '../containers'
import RequireAuth from './RequireAuth'
import NotFound from './NotFound'

const Routing = () => {
  return (
    <Routes>
      <Route path={routes.Home.relativePath} element={<AuthLayout />}>
        <Route index element={<HomePage />} />
        <Route path={routes.Login.relativePath} element={<LoginPage />} />
        <Route path={routes.Register.relativePath} element={<RegisterPage />} />
        <Route path={routes.ForgotPassword.relativePath} element={<ForgotPasswordPage />} />
        <Route path={routes.ResetPassword.relativePath} element={<ResetPasswordPage />} />
        <Route path={routes.VerifyEmail.relativePath} element={<EmailVerificationPage />} />
      </Route>

      <Route element={<DashboardLayout />}>
        <Route path={routes.Dashboard.absolutePath}>
          <Route index element={<RequireAuth element={<DashboardPage />} restrictedTo={restrictions.none} />} />
          <Route
            path={routes.Profile.relativePath}
            element={<RequireAuth element={<ProfilePage />} restrictedTo={restrictions.none} />}
          />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default Routing

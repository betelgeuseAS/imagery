interface IRoutePath {
  relativePath: string
  absolutePath: string
}

interface IRoutes {
  Home: IRoutePath
  Login: IRoutePath
  Register: IRoutePath
  ForgotPassword: IRoutePath
  ResetPassword: IRoutePath
  VerifyEmail: IRoutePath

  Dashboard: IRoutePath
  Profile: IRoutePath

  NotFound: IRoutePath
}

const routes: IRoutes = {
  Home: { relativePath: '/', absolutePath: '/' },
  Login: { relativePath: 'login', absolutePath: '/login' },
  Register: { relativePath: 'register', absolutePath: '/register' },
  ForgotPassword: { relativePath: 'forgot-password', absolutePath: '/forgot-password' },
  ResetPassword: { relativePath: 'reset-password', absolutePath: '/reset-password' },
  VerifyEmail: { relativePath: 'verify-email', absolutePath: '/verify-email' },

  Dashboard: { relativePath: 'dashboard', absolutePath: '/dashboard' },
  Profile: { relativePath: 'profile', absolutePath: '/dashboard/profile' },

  NotFound: { relativePath: 'not-found', absolutePath: '/not-found' }
}

export default routes

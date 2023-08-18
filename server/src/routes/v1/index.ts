import express, { Router } from 'express'

import config from '../../config/config'
import docsRoute from './swagger.route'
import authRoute from './auth.route'
import userRoute from './user.route'

const router = express.Router()

interface IRoute {
  path: string
  route: Router
}

const defaultIRoute: IRoute[] = [
  {
    path: '/auth',
    route: authRoute
  },
  {
    path: '/users',
    route: userRoute
  }
]

const devIRoute: IRoute[] = [
  {
    path: '/docs',
    route: docsRoute
  }
]

defaultIRoute.forEach((route) => {
  router.use(route.path, route.route)
})

if (config.env === 'development') {
  devIRoute.forEach((route) => {
    router.use(route.path, route.route)
  })
}

export default router

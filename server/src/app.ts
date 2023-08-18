import express, { Express } from 'express'
import helmet from 'helmet'
import xss from 'xss-clean'
import ExpressMongoSanitize from 'express-mongo-sanitize'
import compression from 'compression'
import cors from 'cors'
import passport from 'passport'
import httpStatus from 'http-status'

import config from './config/config'
import { morgan } from './modules/logger'
import { jwtStrategy } from './modules/auth'
import { authLimiter } from './modules/utils'
import { ApiError, errorConverter, errorHandler } from './modules/errors'
import routes from './routes/v1'

const app: Express = express()

// Logger handlers
if (config.env !== 'test') {
  app.use(morgan.successHandler)
  app.use(morgan.errorHandler)
}

// Set security HTTP headers
app.use(helmet())

// Enable cors
app.use(cors())
app.options('*', cors())

// Parse json request body
app.use(express.json())

// Parse urlencoded request body
app.use(express.urlencoded({ extended: true }))

// Sanitize request data
app.use(xss())
app.use(ExpressMongoSanitize())

// gzip compression
app.use(compression())

// JWT (JSON Web Tokens) authentication
app.use(passport.initialize())
passport.use('jwt', jwtStrategy)

// Limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/v1/auth', authLimiter)
}

// v1 api routes
app.use('/v1', routes)

// Send back a 404 error for any unknown api request
app.use((_req, _res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'))
})

// Convert error to ApiError, if needed
app.use(errorConverter)

// Handle error
app.use(errorHandler)

export default app

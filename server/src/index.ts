import mongoose, { Mongoose } from 'mongoose'
import * as http from 'http'

import config from './config/config'
import app from './app'
import logger from './modules/logger/logger'

let server: http.Server

// Connect to DB
mongoose.connect(config.mongoose.url).then((connection: Mongoose) => {
  logger.info(`Connected to MongoDB on host ${connection.connection?.host}`)

  server = app.listen(config.port, () => {
    logger.info(`Server started on port ${config.port}`)
  })
})

// Process errors
const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed')
      process.exit(1)
    })
  } else {
    process.exit(1)
  }
}

const unexpectedErrorHandler = (error: string) => {
  logger.error(error)
  exitHandler()
}

process.on('uncaughtException', unexpectedErrorHandler)
process.on('unhandledRejection', unexpectedErrorHandler)

process.on('SIGTERM', () => {
  logger.info('SIGTERM received')

  if (server) server.close()
})

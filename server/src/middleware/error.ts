import { TErrorHandler } from '../types/handlers'

export const errorHandler: TErrorHandler = (err, req, res) => {
  const statusCode: number = res.statusCode ? res.statusCode : 500

  res.status(statusCode)

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  })
}

import { Request, Response, NextFunction } from 'express'

export type TExpressHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => void

export type TErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => void

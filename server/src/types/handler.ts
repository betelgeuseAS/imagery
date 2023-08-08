import { Request, Response, NextFunction } from 'express'

export type TAsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => void

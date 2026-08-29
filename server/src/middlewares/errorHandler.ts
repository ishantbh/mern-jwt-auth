import type { Request, Response, NextFunction } from 'express'
import { logger } from '../utils/logger.js'

export class AppError extends Error {
  statusCode: number
  isOperational: boolean

  constructor(message: string, statusCode = 500) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = true
    Error.captureStackTrace(this, this.constructor)
  }
}

export function notFoundHandler(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  next(new AppError(`Route ${req.originalUrl} not found`, 404))
}

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  const statusCode = err instanceof AppError ? err.statusCode : 500
  const message =
    err instanceof AppError ? err.message : 'Internal Server Error'

  logger.error({ err }, message)

  res.status(statusCode).json({
    status: 'error',
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  })
}

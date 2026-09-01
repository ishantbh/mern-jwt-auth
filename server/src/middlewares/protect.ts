import type { Request, Response, NextFunction } from 'express'
import { verifyAccessToken } from '../utils/jwt.js'
import { AppError } from './errorHandler.js'

export interface AuthedRequest extends Request {
  userId?: string
}

export function protect(
  req: AuthedRequest,
  _res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization

  if (!authHeader?.startsWith('Bearer ')) {
    return next(new AppError('Not authenticated', 401))
  }

  const token = authHeader.split(' ')[1]

  try {
    const payload = verifyAccessToken(token)
    req.userId = payload.userId
    next()
  } catch {
    next(new AppError('Invalid or expired token', 401))
  }
}

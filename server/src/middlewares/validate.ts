import type { Request, Response, NextFunction } from 'express'
import type { ZodType } from 'zod'
import { AppError } from './errorHandler.js'

export function validate(schema: ZodType) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body)

    if (!result.success) {
      const message = result.error.issues.map((i) => i.message).join(', ')
      return next(new AppError(message, 400))
    }

    req.body = result.data
    next()
  }
}

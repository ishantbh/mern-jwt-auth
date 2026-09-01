import type { Request, Response } from 'express'
import { User } from '../models/User.js'
import { generateAccessToken } from '../utils/jwt.js'
import { AppError } from '../middlewares/errorHandler.js'

export async function register(req: Request, res: Response) {
  const { username, email, password } = req.body

  if (!username || !email || !password) {
    throw new AppError('username, email, and password are required', 400)
  }

  const existing = await User.findOne({ $or: [{ email }, { username }] })
  if (existing) {
    throw new AppError('User with this email or username already exists', 409)
  }

  const user = await User.create({ username, email, password })

  const accessToken = generateAccessToken({ userId: user.id })

  res.status(201).json({
    user: { id: user.id, username: user.username, email: user.email },
    accessToken,
  })
}

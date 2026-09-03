import type { Request, Response } from 'express'
import { User } from '../models/User.js'
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../utils/jwt.js'
import { getRefreshCookieOptions } from '../utils/cookies.js'
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
  const refreshToken = generateRefreshToken({
    userId: user.id,
    tokenVersion: user.tokenVersion,
  })

  res.cookie('refreshToken', refreshToken, getRefreshCookieOptions())

  res.status(201).json({
    user: { id: user.id, username: user.username, email: user.email },
    accessToken,
  })
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body

  if (!email || !password) {
    throw new AppError('email and password are required', 400)
  }

  const user = await User.findOne({ email }).select('+password +tokenVersion')
  if (!user) {
    throw new AppError('Invalid credentials', 401)
  }

  const isMatch = await user.comparePassword(password)
  if (!isMatch) {
    throw new AppError('Invalid credentials', 401)
  }

  const accessToken = generateAccessToken({ userId: user.id })
  const refreshToken = generateRefreshToken({
    userId: user.id,
    tokenVersion: user.tokenVersion,
  })

  res.cookie('refreshToken', refreshToken, getRefreshCookieOptions())

  res.status(200).json({
    user: { id: user.id, username: user.username, email: user.email },
    accessToken,
  })
}

export async function refresh(req: Request, res: Response) {
  const token = req.cookies.refreshToken

  if (!token) {
    throw new AppError('No refresh token provided', 401)
  }

  let payload
  try {
    payload = verifyRefreshToken(token)
  } catch {
    throw new AppError('Invalid or expired refresh token', 401)
  }

  const user = await User.findById(payload.userId).select('+tokenVersion')
  if (!user || user.tokenVersion !== payload.tokenVersion) {
    throw new AppError('Invalid or expired refresh token', 401)
  }

  const newAccessToken = generateAccessToken({ userId: user.id })
  const newRefreshToken = generateRefreshToken({
    userId: user.id,
    tokenVersion: user.tokenVersion,
  })

  res.cookie('refreshToken', newRefreshToken, getRefreshCookieOptions())
  res.json({ accessToken: newAccessToken })
}

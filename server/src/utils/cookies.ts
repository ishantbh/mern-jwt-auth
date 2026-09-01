import { CookieOptions } from 'express'

export function getRefreshCookieOptions(): CookieOptions {
  const isProd = process.env.NODE_ENV === 'production'

  return {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'strict' : 'lax',
    path: '/api/auth',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  }
}

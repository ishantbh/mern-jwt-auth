import jwt from 'jsonwebtoken'

export interface JwtPayload {
  userId: string
}

function getEnv(key: string): string {
  const value = process.env[key]
  if (!value) throw new Error(`Missing required env var: ${key}`)
  return value
}

export function generateAccessToken(payload: JwtPayload): string {
  return jwt.sign(payload, getEnv('JWT_ACCESS_SECRET'), {
    expiresIn: (process.env.JWT_ACCESS_EXPIRY ??
      '15m') as jwt.SignOptions['expiresIn'],
  })
}

export function verifyAccessToken(token: string): JwtPayload {
  return jwt.verify(token, getEnv('JWT_ACCESS_SECRET')) as JwtPayload
}

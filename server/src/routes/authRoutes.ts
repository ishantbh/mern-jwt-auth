import { Router } from 'express'
import {
  register,
  login,
  refresh,
  logout,
  getMe,
} from '../controllers/authController.js'
import { protect } from '../middlewares/protect.js'
import { authLimiter } from '../middlewares/rateLimiter.js'
import { validate } from '../middlewares/validate.js'
import { registerSchema, loginSchema } from '../schemas/authSchemas.js'

const router = Router()

router.post('/register', authLimiter, validate(registerSchema), register)
router.post('/login', authLimiter, validate(loginSchema), login)
router.post('/refresh', refresh)
router.post('/logout', logout)

router.get('/me', protect, getMe)

export default router

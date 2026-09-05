import { Router } from 'express'
import {
  register,
  login,
  refresh,
  logout,
} from '../controllers/authController.js'
import { type AuthedRequest, protect } from '../middlewares/protect.js'
import { authLimiter } from '../middlewares/rateLimiter.js'

const router = Router()

router.post('/register', authLimiter, register)
router.post('/login', authLimiter, login)
router.post('/refresh', refresh)
router.post('/logout', logout)

router.get('/test-protected', protect, (req: AuthedRequest, res) => {
  res.json({ message: 'You are authenticated', userId: req.userId })
})

export default router

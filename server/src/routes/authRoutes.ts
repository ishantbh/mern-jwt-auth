import { Router } from 'express'
import {
  register,
  login,
  refresh,
  logout,
} from '../controllers/authController.js'
import { type AuthedRequest, protect } from '../middlewares/protect.js'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.post('/refresh', refresh)
router.post('/logout', logout)

router.get('/test-protected', protect, (req: AuthedRequest, res) => {
  res.json({ message: 'You are authenticated', userId: req.userId })
})

export default router

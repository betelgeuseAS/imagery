import express from 'express'

import { registerUser, loginUser, getMe } from '../controllers/user'
import { protect } from '../middleware/auth'

const router: express.Router = express.Router()

router.post('/register', registerUser) // * POST /api/users/register
router.post('/login', loginUser) // * POST /api/users/login
router.get('/me', protect, getMe) // * GET /api/users/me

export default router

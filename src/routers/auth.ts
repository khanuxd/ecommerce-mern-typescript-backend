import express from 'express'

import { addNewUser, authenticateUser } from '../controllers/auth'

const router = express.Router()

router.post('/register', addNewUser)
router.post('/login', authenticateUser)

export default router

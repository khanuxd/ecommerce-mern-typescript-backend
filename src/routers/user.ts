import express from 'express'
import { isLoggedIn, isUserAdmin } from '../controllers/verifyToken'

import {
  findAllUsers,
  findUserById,
  updateUser,
  removeUser,
} from '../controllers/user.js'

const router = express.Router()

// Every path we define here will get /api/v1 prefix
router.get('/', isLoggedIn, isUserAdmin, findAllUsers)
router.get('/:userId', isLoggedIn, isUserAdmin, findUserById)
router.put('/:userId', isLoggedIn, updateUser)
router.delete('/:userId', removeUser)

export default router

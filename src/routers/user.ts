import express from 'express'

import {
  addNewUser,
  findAllUsers,
  findUserById,
  updateUser,
  removeUser,
} from '../controllers/user.js'

const router = express.Router()

// Every path we define here will get /api/v1 prefix
router.get('/', findAllUsers)
router.get('/:userId', findUserById)
router.post('/register', addNewUser)
router.put('/:userId', updateUser)
router.delete('/:userId', removeUser)

export default router

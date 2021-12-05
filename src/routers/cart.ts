import express from 'express'

import {
  addNewCart,
  getCarts,
  findCartById,
  updateCart,
  removeCart,
} from '../controllers/cart'

const router = express.Router()

// Every path we define here will get /api/v1 prefix
router.get('/', getCarts)
router.get('/:cartId', findCartById)
router.post('/', addNewCart)
router.put('/:cartId', updateCart)
router.delete('/:cartId', removeCart)

export default router

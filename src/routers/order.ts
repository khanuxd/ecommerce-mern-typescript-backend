import express from 'express'

import {
  addNewOrder,
  findAllOrders,
  findOrderById,
  updateOrder,
  removeOrder,
} from '../controllers/order'

const router = express.Router()

// Every path we define here will get /api/v1 prefix
router.get('/', findAllOrders)
router.get('/:orderId', findOrderById)
router.post('/', addNewOrder)
router.put('/:orderId', updateOrder)
router.delete('/:orderId', removeOrder)

export default router

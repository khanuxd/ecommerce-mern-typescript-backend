import express from 'express'
import { isLoggedIn } from '../controllers/verifyToken'
import {
  addNewOrder,
  findAllOrders,
  findOrderById,
  updateOrder,
  removeOrder,
} from '../controllers/order'

const router = express.Router()

// Every path we define here will get /api/v1 prefix
router.get('/', isLoggedIn, findAllOrders)
router.get('/:orderId', isLoggedIn, findOrderById)
router.post('/', isLoggedIn, addNewOrder)
router.put('/:orderId', isLoggedIn, updateOrder)
router.delete('/:orderId', isLoggedIn, removeOrder)

export default router

/**
 * To be done
 *
 * find all orders by user id
 */

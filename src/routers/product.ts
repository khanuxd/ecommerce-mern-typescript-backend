import express from 'express'
import { isLoggedIn, isUserAdmin } from '../controllers/verifyToken'

import {
  addNewProduct,
  findAllProducts,
  findProductById,
  updateProduct,
  removeProduct,
} from '../controllers/product'

const router = express.Router()

// Every path we define here will get /api/v1 prefix
router.get('/', findAllProducts)
router.get('/:productId', findProductById)
router.post('/', isLoggedIn, isUserAdmin, addNewProduct)
router.put('/:productId', isLoggedIn, isUserAdmin, updateProduct)
router.delete('/:productId', isLoggedIn, isUserAdmin, removeProduct)

export default router

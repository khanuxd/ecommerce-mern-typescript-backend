import express from 'express'

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
router.post('/', addNewProduct)
router.put('/:productId', updateProduct)
router.delete('/:productId', removeProduct)

export default router

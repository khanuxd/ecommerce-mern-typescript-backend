import { Request, Response, NextFunction } from 'express'

import Product from '../models/Product'
import ProductService from '../services/product'
import { BadRequestError } from '../helpers/apiError'

// POST /products
export const addNewProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      title,
      description,
      category,
      variants,
      sizes,
      image,
      quantity,
      price,
    } = req.body

    const product = new Product({
      title,
      description,
      category,
      variants,
      sizes,
      image,
      quantity,
      price,
    })

    await ProductService.addNew(product)
    res.status(201).json(product)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /products
export const findAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allProducts = await ProductService.findAll()
    res.status(200).json(allProducts)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /products/:productId
export const findProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productId = req.params.productId
    const product = await ProductService.findById(productId)
    res.status(200).json(product)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// PUT /products/:productId
export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productId = req.params.productId
    const update = req.body
    const updatedProduct = await ProductService.updateById(productId, update)
    res.status(200).json(updatedProduct)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// DELETE /products/:productId
export const removeProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productId = req.params.productId
    await ProductService.removeById(productId)
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

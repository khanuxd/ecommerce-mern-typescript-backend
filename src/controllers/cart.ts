import { Request, Response, NextFunction } from 'express'

import Cart from '../models/Cart'
import CartService from '../services/cart'
import { BadRequestError } from '../helpers/apiError'

// POST /
export const addNewCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, products } = req.body
    const cart = new Cart({
      userId,
      products,
    })

    await CartService.addNew(cart)
    res.status(201).json(cart)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /
export const getCarts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allCarts = await CartService.findCart()
    res.status(200).json(allCarts)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /:cartId
export const findCartById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cartId = req.params.cartId
    const cart = await CartService.findById(cartId)
    res.status(200).json(cart)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// PUT /:cartId
export const updateCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cartId = req.params.cartId
    console.log(cartId)
    const update = req.body
    const updatedCart = await CartService.updateById(cartId, update)
    res.status(200).json(updatedCart)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// DELETE /:cartId
export const removeCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cartId = req.params.cartId
    await CartService.removeById(cartId)
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

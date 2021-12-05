import { Request, Response, NextFunction } from 'express'
// import bcrypt from 'bcrypt'

import User from '../models/User.js'
import UserService from '../services/user.js'
import { BadRequestError } from '../helpers/apiError'

// POST /register
export const addNewUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password, avatar, address, isAdmin, isBanned } =
      req.body

    const user = new User({
      name,
      email,
      password,
      avatar,
      address,
      isAdmin,
      isBanned,
    })

    // if (!name || !email || !password) {
    //   res.status(400).json({
    //     msg: 'Please enter required filelds',
    //   })
    // }

    await UserService.newUser(user)

    res.status(201).json(user)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /users
export const findAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allUsers = await UserService.findAll()
    res.status(200).json(allUsers)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /users/:userId
export const findUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId
    const user = await UserService.findById(userId)
    res.status(200).json(user)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
// PUT /users/:userId
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId
    const update = req.body
    const updatedUser = await UserService.updateById(userId, update)
    res.status(200).json(updatedUser)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// DELETE /users/:userId
export const removeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId
    await UserService.removeById(userId)
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

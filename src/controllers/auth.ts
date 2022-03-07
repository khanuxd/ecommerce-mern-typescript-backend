import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import User from '../models/User'
import AuthService from '../services/auth'
import { BadRequestError } from '../helpers/apiError'
import { JWT_SECRET } from '../util/secrets'

// POST /register
export const addNewUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password, address } = req.body
    const user = new User({
      name,
      email,
      password,
      address,
    })

    if (!name || !email || !password) {
      res.status(400).json({
        message: 'Please enter all required filelds',
      })
    }

    await AuthService.newUser(user)

    res.status(201).json(user)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError(`${error.message}`, error))
    } else {
      next(error)
    }
  }
}

// POST /login
export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body
    const user = await AuthService.authUser(email)

    //
    const userToken = { email: email, id: user._id } // generate a token after succesful login, but will not save anywhere for security purpose
    const accessToken = jwt.sign(userToken, JWT_SECRET)
    const bannedUser = user.isBanned

    if (!email || !password) {
      res.status(400).json({
        message: 'Please enter all required filelds',
      })
    }

    /* 
     if (!user || !correctPassword) {
      res.status(400).json({
        message: 'wrong',
      })
    }
    */

    const correctPassword =
      user === null ? false : await bcrypt.compare(password, user.password)
    if (!correctPassword) {
      return res.status(401).json({
        message: 'Password does not match',
      })
    }
    // sending to front end when login successful in the backend
    if (bannedUser) {
      res.status(200).send({
        message: 'You are banned! Please contact to admin.',
      })
    } else {
      res.status(200).send({
        accessToken,
        name: user.name,
        email: user.email,
        id: user._id,
        isAdmin: user.isAdmin,
        isBanned: user.isBanned,
        message: 'Login successful!',
      })
    }
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

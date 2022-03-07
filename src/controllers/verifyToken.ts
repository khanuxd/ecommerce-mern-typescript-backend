import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../util/secrets'
import AuthService from '../services/auth'

let user: any
export const isLoggedIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header('token')
  if (!token)
    return res.status(401).json({
      message: 'You are not authorized to complete this action',
    })
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded
    user = decoded
    next()
  } catch (error) {
    res.status(400).json({
      message: 'Authentication failed, Please try again',
    })
  }
}

export const isUserAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(user)
  const loggedInUser: any = Object.values(user)[0]
  const loggedInUserX = await AuthService.authUser(loggedInUser)
  if (loggedInUserX.isAdmin) {
    next()
  } else {
    res.status(400).json({
      message: 'Operation unsuccessful, you are not an admin!',
    })
  }
}

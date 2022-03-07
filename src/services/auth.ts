import User, { UserDocument } from '../models/User'
import { NotFoundError } from '../helpers/apiError'

const newUser = async (user: UserDocument): Promise<UserDocument> => {
  return user.save()
}

const authUser = async (email: string): Promise<UserDocument> => {
  const foundUser = await User.findOne({ email })

  if (!foundUser) {
    throw new NotFoundError(`User with ${email} does not exist`)
  }

  return foundUser
}

export default { newUser, authUser }

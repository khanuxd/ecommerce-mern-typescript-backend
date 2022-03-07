/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'
// import validator from 'validator'
import bcrypt from 'bcrypt'
import mongooseUniqueValidator from 'mongoose-unique-validator'

export type UserDocument = Document & {
  name: string
  email: string
  password: string
  address: string
  isAdmin: boolean
  isBanned: boolean
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [6, 'Password length is minimum 6 characters'],
    },
    address: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: [true, 'email {VALUE} already exists'],
//       lowercase: true,
//       validate: {
//         validator: (email: string) => validator.isEmail(email),
//         message: '{VALUE} is not a valid email',
//       },
//     },
//     password: {
//       type: String,
//       required: true,
//       minlength: [6, 'Password length is minimum 6 characters'],
//     },
//     address: {
//       type: String,
//     },
//     isAdmin: {
//       type: Boolean,
//       default: false,
//     },
//     isBanned: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   {
//     timestamps: true,
//   }
// )

userSchema.plugin(mongooseUniqueValidator, {
  message: 'email is already taken',
})

// hashing the password
userSchema.pre<UserDocument>('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
    next()
  } catch (error) {
    next(error as any)
  }
})

// // checking unique email
// userSchema.path('email').validate(async (email: string) => {
//   const emailCount = await mongoose.models.User.countDocuments({ email })
//   return !emailCount
// }, 'Email already exists')

export default mongoose.model<UserDocument>('User', userSchema)

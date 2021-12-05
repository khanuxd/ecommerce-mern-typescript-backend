/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'
import validator from 'validator'

export type UserDocument = Document & {
  name: string
  email: string
  password: string
  avatar: string
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
      unique: [true, 'email {VALUE} already exists'],
      lowercase: true,
      validate: {
        validator: (email: string) => validator.isEmail(email),
        message: '{VALUE} is not a valid email',
      },
    },
    password: {
      type: String,
      required: true,
      minlength: [6, 'Password length is minimum 6 characters'],
    },
    avatar: {
      type: String,
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

// userSchema.pre('save', ()=>{

// })

export default mongoose.model<UserDocument>('User', userSchema)

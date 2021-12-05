/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'

export type productInCart = {
  productId: mongoose.Types.ObjectId
  quantity: number
}

export type CartDocument = Document & {
  userId: mongoose.Types.ObjectId
  products: productInCart[]
}

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    products: [
      {
        productId: {
          type: mongoose.Types.ObjectId,
          ref: 'Product',
        },
        quantity: {
          type: Number,
          default: 1,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
)

export default mongoose.model<CartDocument>('Cart', cartSchema)

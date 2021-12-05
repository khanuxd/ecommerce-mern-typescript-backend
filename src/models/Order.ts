/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'

export type productInOrder = {
  ProductId: mongoose.Types.ObjectId
  quantity: number
}

export type OrderDocument = Document & {
  userId: mongoose.Types.ObjectId
  products: productInOrder[]
  amount: number
  status: string
}

export enum OrderStatus {
  PENDING = 'PENDING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  REJECTED = 'REJECTED',
}

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: OrderStatus,
      default: OrderStatus.PENDING,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model<OrderDocument>('Order', orderSchema)

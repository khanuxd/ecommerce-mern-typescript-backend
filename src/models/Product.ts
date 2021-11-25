/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'

export type ProductDocument = Document & {
  title: string
  description: string
  category: string
  variants: string[]
  sizes: string[]
  image: string
  quantity: number
  price: number
}

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      index: true,
      trim: true,
      required: [true, 'Title is required'],
      unique: [true, 'Title should be different from others'],
      minlength: 10,
      maxlength: 40,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    category: {
      type: String,
      required: true,
    },
    variants: [String],
    sizes: [String],
    image: {
      type: String,
      required: [true, 'Image is required'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [1, 'Quantity should not be less than 1'],
      set: (v: number) => Math.round(v),
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'Price cannot be negative'],
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model<ProductDocument>('Product', productSchema)

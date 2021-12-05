import Cart, { CartDocument } from '../models/Cart'
import { NotFoundError } from '../helpers/apiError'

const addNew = async (cart: CartDocument): Promise<CartDocument> => {
  return cart.save()
}

const findCart = async (): Promise<CartDocument[]> => {
  return Cart.find()
}

const findById = async (cartId: string): Promise<CartDocument> => {
  const foundCart = await Cart.findById(cartId)
  if (!foundCart) {
    throw new NotFoundError(`Cart ${cartId} not found`)
  }
  return foundCart
}

const updateById = async (
  cartId: string,
  update: Partial<CartDocument>
): Promise<CartDocument | null> => {
  const foundCart = await Cart.findByIdAndUpdate(cartId, update, { new: true })
  if (!foundCart) {
    throw new NotFoundError(`Cart ${cartId} not found`)
  }
  return foundCart
}

const removeById = async (cartId: string): Promise<CartDocument | null> => {
  const foundCart = await Cart.findByIdAndDelete(cartId)
  if (!foundCart) {
    throw new NotFoundError(`Cart ${cartId} not found`)
  }
  return foundCart
}

export default { addNew, findCart, findById, updateById, removeById }

import Order, { OrderDocument } from '../models/Order'
import { NotFoundError } from '../helpers/apiError'

const addNew = async (order: OrderDocument): Promise<OrderDocument> => {
  return order.save()
}

const findOrders = async (): Promise<OrderDocument[]> => {
  return Order.find()
}

const findOrderById = async (orderId: string): Promise<OrderDocument> => {
  const foundOrder = await Order.findById(orderId)
  if (!foundOrder) {
    throw new NotFoundError(`Order ${orderId} not found`)
  }
  return foundOrder
}

const updateById = async (
  orderId: string,
  update: Partial<OrderDocument>
): Promise<OrderDocument | null> => {
  const foundOrder = await Order.findByIdAndUpdate(orderId, update, {
    new: true,
  })
  if (!foundOrder) {
    throw new NotFoundError(`Order ${orderId} not found`)
  }
  return foundOrder
}

const removeById = async (orderId: string): Promise<OrderDocument> => {
  const foundOrder = await Order.findByIdAndDelete(orderId)

  if (!foundOrder) {
    throw new NotFoundError(`Order ${orderId} not found`)
  }

  return foundOrder
}

export default { addNew, findOrders, findOrderById, updateById, removeById }

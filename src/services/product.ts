import Product, { ProductDocument } from '../models/Product'
import { NotFoundError } from '../helpers/apiError'

const addNew = async (product: ProductDocument): Promise<ProductDocument> => {
  return product.save()
}

const findAll = async (): Promise<ProductDocument[]> => {
  return Product.find().sort({ createdAt: -1 })
}

const findById = async (productId: string): Promise<ProductDocument> => {
  const foundProduct = await Product.findById(productId)

  if (!foundProduct) {
    throw new NotFoundError(`Product ${productId} not found`)
  }

  return foundProduct
}

const updateById = async (
  productId: string,
  update: Partial<ProductDocument>
): Promise<ProductDocument | null> => {
  const foundProduct = await Product.findByIdAndUpdate(productId, update, {
    new: true,
  })

  if (!foundProduct) {
    throw new NotFoundError(`Product ${productId} not found`)
  }
  return foundProduct
}

const removeById = async (
  productId: string
): Promise<ProductDocument | null> => {
  const foundProduct = await Product.findByIdAndDelete(productId)

  if (!foundProduct) {
    throw new NotFoundError(`Product ${productId} not found`)
  }

  return foundProduct
}

export default { addNew, findAll, findById, updateById, removeById }

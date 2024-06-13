import express from 'express'
import {
  getAllProducts,
  getProductInfo,
} from '../../../database/shops/products/get'
import {
  updateProduct,
  updateProductInfo,
} from '../../../database/shops/products/patch'
import {
  deleteProduct,
  deleteProductInfo,
} from '../../../database/shops/products/delete'
import {
  createProduct,
  addProductInfo,
} from '../../../database/shops/products/post'
import { jwtProtect } from '../../middleware'

const router = express.Router()

router.post('/', jwtProtect, async (req, res) => {
  if (req.body.decoded.role != 'admin') {
    return res.status(403).send({ error: 'permission denied' })
  }
  const { name, brand, price, desc, imgurl, size, color, sold, count } =
    req.body
  try {
    const productId = await createProduct(name, brand, price, desc, imgurl)
    if (size || color || sold || count) {
      await addProductInfo(productId, size, color, sold, count)
    }
    res.status(200).json({ message: 'Success', product_id: productId })
  } catch (err) {
    res.status(500).json({ message: err })
  }
})

router.post('/:product_id', jwtProtect, async (req, res) => {
  if (req.body.decoded.role != 'admin') {
    return res.status(500).send({ error: 'permission denied' })
  }
  const { product_id } = req.params
  const { size, color, sold, count } = req.body
  try {
    const productStoreId = await addProductInfo(
      product_id,
      size,
      color,
      sold,
      count
    )
    res
      .status(200)
      .json({ message: 'Success', productStore_id: productStoreId })
  } catch (err) {
    res.status(500).json({ message: err })
  }
})

router.delete('/:product_id', jwtProtect, async (req, res) => {
  if (req.body.decoded.role != 'admin') {
    return res.status(500).send({ error: 'permission denied' })
  }
  const { product_id } = req.params
  try {
    await deleteProduct(product_id)
    res.status(200).json({ message: 'Delete product successfully' })
  } catch (err) {
    res.status(500).json({ message: err })
  }
})

router.delete(
  '/:product_id/:product_store_id',
  jwtProtect,
  async (req, res) => {
    if (req.body.decoded.role != 'admin') {
      return res.status(500).send({ error: 'permission denied' })
    }
    const { product_id, product_store_id } = req.params
    try {
      await deleteProductInfo(product_id, product_store_id)
      res
        .status(200)
        .json({ message: 'Delete a product information successfully' })
    } catch (err) {
      res.status(500).json({ message: err })
    }
  }
)

router.get('/', async (_req, res) => {
  try {
    const result = await getAllProducts()
    if (result.error) {
      return res.status(500).send(result.error)
    }
    res.status(200).json({ message: 'Success', productList: result.arr })
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving product' })
  }
})

router.get('/:product_id', async (req, res) => {
  const { product_id } = req.params
  try {
    const result = await getProductInfo(product_id)
    if (result.error) {
      return res.status(500).send(result.error)
    }
    res.status(200).json({ message: 'Success', productInfoList: result.arr })
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving product' })
  }
})

router.patch('/:product_id', jwtProtect, async (req, res) => {
  if (req.body.decoded.role != 'admin') {
    return res.status(500).send({ error: 'permission denied' })
  }
  const { product_id } = req.params
  const updates = req.body
  try {
    await updateProduct(product_id, updates)
    res.status(200).json({ message: 'Update successfully.' })
  } catch (err) {
    res.status(500).json({ message: err })
  }
})

router.patch('/:product_id/:product_store_id', jwtProtect, async (req, res) => {
  if (req.body.decoded.role != 'admin') {
    return res.status(500).send({ error: 'permission denied' })
  }
  const { product_id, product_store_id } = req.params
  const updates = req.body
  try {
    await updateProductInfo(product_id, product_store_id, updates)
    res.status(200).json({ message: 'Update successfully.' })
  } catch (err) {
    res.status(500).json({ message: err })
  }
})

export default router

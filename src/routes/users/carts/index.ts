import express from 'express'
import { jwtProtect } from '../../middleware'
import {
  addProduct2CartType,
  createCart,
  addProduct2Cart,
} from '../../../database/carts/post'
import { deleteCart, deleteProduct } from '../../../database/carts/delete'
import { getAllCarts, getAllProducts } from '../../../database/carts/get'
import { verify_cart } from '../../../database/carts/util'

const router = express.Router()

router.post('/', jwtProtect, async (req, res) => {
  const user_mail = req.body.decoded.mail

  const result = await createCart(user_mail)
  if (result.error) {
    return res.status(400).send(result.error)
  }
  return res.status(200).json({
    user_mail: result.user_mail,
    isdone: result.isdone,
    cart_id: result.id,
  })
})

router.post('/add', jwtProtect, async (req, res) => {
  const { cart_id, product_id, size, color, count } = req.body
  const user_mail = req.body.decoded.mail

  const new_product: addProduct2CartType = {
    cart_id,
    product_id,
    size,
    color,
    count,
  }
  const test = await verify_cart(user_mail, cart_id)

  if (test.error) {
    return res.status(400).send(test.error)
  }

  const result = await addProduct2Cart(new_product)

  if (result.error) {
    return res.status(400).send(result.error)
  }
  return res.status(200).json({
    cart_id: result.cart_id,
    product_id: result.product_id,
    size: result.size,
    color: result.color,
    count: result.count,
  })
})

router.get('/list', jwtProtect, async (req, res) => {
  const user_mail = req.body.decoded.mail

  const result = await getAllCarts(user_mail)
  // if (result.error) {
  //   return res.status(400).send(result.error)
  // }
  if (result.message) {
    return res.status(500).send(result.message)
  }

  return res.status(200).json({
    Carts_List: result.arr,
  })
})

router.get('/list-cart', jwtProtect, async (req, res) => {
  const cart_id = req.query.cart_id as string
  const user_mail = req.body.decoded.mail
  console.log(user_mail)

  const test = await verify_cart(user_mail, cart_id)

  if (test.error) {
    return res.status(400).send(test.error)
  }

  const result = await getAllProducts(cart_id)
  // if (result.error) {
  //   return res.status(400).send(result.error)
  // }
  if (result.message) {
    return res.status(500).send(result.message)
  }
  return res.status(200).json({
    Products_in_Cart_List: result.arr,
  })
})

router.delete('/', jwtProtect, async (req, res) => {
  const { cart_id } = req.body
  const user_mail = req.body.decoded.mail

  const test = await verify_cart(user_mail, cart_id)

  if (test.error) {
    return res.status(400).send(test.error)
  }

  const result = await deleteCart(cart_id)
  if (result.error) {
    return res.status(400).send(result.error)
  }
  return res.status(200).json({
    Deleted_Cart_id: result.cart_id,
  })
})

router.delete('/remove', jwtProtect, async (req, res) => {
  const { cart_id, product_id, size, color, count } = req.body
  const user_mail = req.body.decoded.mail

  const test = await verify_cart(user_mail, cart_id)

  if (test.error) {
    return res.status(400).send(test.error)
  }

  const result = await deleteProduct(cart_id, product_id, size, color, count)
  if (result.error) {
    return res.status(400).send(result.error)
  }

  return res.status(200).json({
    cart_id: result.cart_id,
    deleted_product_id: result.product_id,
    deleted_size: result.size,
    deleted_color: result.color,
    deleted_count: result.count,
  })
})

export default router

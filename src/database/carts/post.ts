import { query } from '../database'
/*export type NewCartType = {
    user_mail: string
    isdone: string
}*/

export async function createCart(user_mail: string) {
  const qstring =
    'insert into cart_t (user_mail, isdone) values ($1, $2) returning *'
  const res = await query(qstring, [user_mail, 'false'])
  if (res.rowCount === 0) {
    return { error: 'Cart not created' }
  }
  return {
    id: res.rows[0].id,
    user_mail: res.rows[0].user_mail,
    isdone: res.rows[0].isdone,
  }
}

export type addProduct2CartType = {
  cart_id: string
  product_id: string
  size: string
  color: string
  count: string
}
export async function addProduct2Cart(newProduct: addProduct2CartType) {
  // verify_cart(user_mail, newProduct.cart_id)

  const qstring =
    'insert into cart_contain_product (product_id, size, color, count, cart_id) values ($1, $2, $3, $4, $5) returning *'
  const res = await query(qstring, [
    newProduct.product_id,
    newProduct.size,
    newProduct.color,
    newProduct.count,
    newProduct.cart_id,
  ])
  if (res.rowCount === 0) {
    return { error: 'product not added' }
  }
  return {
    cart_id: res.rows[0].cart_id,
    product_id: res.rows[0].product_id,
    size: res.rows[0].size,
    color: res.rows[0].color,
    count: res.rows[0].count,
  }
}

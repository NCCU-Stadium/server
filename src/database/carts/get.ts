import { query } from '../database'

export async function getAllCarts(user_mail: string) {
  const qstring = 'select id from cart_t where user_mail = $1'
  const res = await query(qstring, [user_mail])

  if (res.rowCount === 0) {
    return { message: 'user does not have cart' }
    // return { error: 'user_mail not found' }
  }
  /*return {
        id: res.rows[0].id,
    }*/

  return { arr: res.rows }
}

export async function getAllProducts(cart_id: string) {
  const qstring =
    'select product_id, size, color, count from cart_contain_product where cart_id = $1'
  const res = await query(qstring, [cart_id])

  if (res.rowCount === 0) {
    return { message: 'cart is empty' } 
    /* return { error: 'cart_id not found' } */
  }
  /*return {
        product_id: res.rows[0].product_id,
        size: res.rows[0].size,
        color: res.rows[0].color,
        count: res.rows[0].count,
    }*/

  return { arr: res.rows }
}

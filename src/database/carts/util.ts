import { query } from '../database'

export async function verify_cart(user_mail: string, cart_id: string) {
  const qstring = 'select * from cart_t where user_mail = $1 and id = $2'
  const res = await query(qstring, [user_mail, cart_id])
  if (res.rowCount === 0) {
    return { error: 'Cart_id not matched' }
  }
  return {
    id: res.rows[0].id,
    user_mail: res.rows[0].user_mail,
  }
}

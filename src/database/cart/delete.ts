import { query } from '../database'


export async function deleteCart(cart_id:string) {
    const qstring =
        'delete from cart_t where id=$1 returning *'
    
    const res = await query(qstring, [cart_id])
    
    if (res.rowCount === 0) {
        return { error: 'Cart_id not found' }
    }
    return {
        cart_id: res.rows[0].id,
    }
}






export async function deleteProduct(cart_id: string, product_id: string, 
                                   size: string, color: string, count: string) {
    const qstring =
        'delete from cart_contain_product where product_id=$1 and size=$2 and color=$3 and count=$4 and cart_id = $5 returning *'
    const res = await query(qstring, [
        product_id,
        size,
        color,
        count,
        cart_id,
    ])

    if (res.rowCount === 0) {
        return { error: 'product not in cart' }
    }

    return {
        cart_id: res.rows[0].cart_id,
        product_id: res.rows[0].product_id,
        size: res.rows[0].size,
        color: res.rows[0].color,
        count: res.rows[0].count
    }
}

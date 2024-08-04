import { query } from '../../database'

export type product = {
  id: string
  name: string
  brand: string
  price: number
  desc: string
  imgurl: string[]
}

export type productInfo = {
  product_id: string
  size: string
  color: string
  count: number
  id: string
  sold: number
}

export const getAllProducts = async () => {
  const result = await query('SELECT * FROM product_t', [])
  if (result.rowCount == 0) {
    return { error: 'Products not found' }
  }
  return { arr: result.rows }
}

export const getProductInfo = async (product_id: string) => {
  const result = await query(
    'SELECT * FROM "productstore_t" WHERE product_id = $1',
    [product_id]
  )
  if (result.rowCount == 0) {
    return { error: 'ProductInfo not found' }
  }
  return { arr: result.rows }
}

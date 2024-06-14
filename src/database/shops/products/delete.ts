import { query } from '../../database'

export const deleteProduct = async (product_id: string) => {
  await query('DELETE FROM product_t WHERE id = $1', [product_id])
}

export const deleteProductInfo = async (
  product_id: string,
  product_store_id: string
) => {
  await query('DELETE FROM "productStore_t" WHERE product_id = $1 AND id = $2', [
    product_id,
    product_store_id,
  ])
}

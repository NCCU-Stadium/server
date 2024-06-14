import { query } from '../../database'

export const createProduct = async (
  name: string,
  brand: string,
  price: number,
  desc: string,
  imgurl: string[]
) => {
  const queryText = `
    INSERT INTO product_t (name, brand, price, "desc" ,imgurl)
    VALUES ($1, $2, $3, $4, ARRAY[$5])
    RETURNING id
  `
  const values = [name, brand, price, desc, imgurl]
  const result = await query(queryText, values)
  return result.rows[0].id
}

export const addProductInfo = async (
  product_id: string,
  size: string,
  color: string,
  sold: number,
  count: number
) => {
  const queryText = `
    INSERT INTO "productStore_t" (product_id, size, color, count, sold)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id
  `
  const values = [product_id, size, color, count, sold]
  const result = await query(queryText, values)
  return result.rows[0].id
}

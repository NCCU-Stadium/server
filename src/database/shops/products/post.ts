import { query } from '../../database'

export const createProduct = async (
  name: string,
  brand: string,
  price: number,
  desc: string,
  imgurl: string[]
) => {
  const queryText = `
    insert into product_t (name, brand, price, "desc") values ($1, $2, $3, $4) returning id
  `
  const values = [name, brand, price, desc]
  const result = await query(queryText, values)
  const queryInsertImg = `
    update product_t set imgurl = array_append(imgurl, $2) where id = $1 returning id
  `
  let res = null
  for (const url of imgurl) {
    res = await query(queryInsertImg, [result.rows[0].id, url])
  }
  if (res === null) return null
  return res.rows[0].id
}

export const addProductInfo = async (
  product_id: string,
  size: string,
  color: string,
  sold: number,
  count: number
) => {
  const queryText = `
    INSERT INTO "productstore_t" (product_id, size, color, count, sold)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id
  `
  const values = [product_id, size, color, count, sold]
  const result = await query(queryText, values)
  return result.rows[0].id
}

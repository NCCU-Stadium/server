import { query } from '../../database'

type updateProduct = {
  name?: string
  brand?: string
  price?: number
  desc?: string
  imgurl?: string[]
}

export const updateProduct = async (product_id: string, updates: any) => {
  const { decoded, ...temp } = updates
  updates = temp
  const fields = Object.keys(updates)
    .map((key, idx) => {
      if (key == 'desc') return `"${key}" = $${idx + 2}`
      else if (key == 'imgurl') return `${key} = ARRAY[$${idx + 2}]`
      else return `${key} = $${idx + 2}`
    })
    .join(', ')
  const values = Object.values(updates)
  // console.error(fields)
  await query(`UPDATE product_t SET ${fields} WHERE id = $1`, [
    product_id,
    ...values,
  ])
}

export const updateProductInfo = async (
  product_id: string,
  product_store_id: string,
  updates: any
) => {
  const { decoded, ...temp } = updates
  updates = temp
  const fields = Object.keys(updates)
    .map((key, idx) => `${key} = $${idx + 3}`)
    .join(', ')
  const values = Object.values(updates)
  await query(
    `UPDATE "productstore_t" SET ${fields} WHERE product_id = $1 AND id = $2`,
    [product_id, product_store_id, ...values]
  )
}

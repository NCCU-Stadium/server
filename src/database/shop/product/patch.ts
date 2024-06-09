import { query } from '../../database'

export const updateProduct = async (product_id: string, updates: any) => {
    const fields = Object.keys(updates).map((key, idx) => `${key} = $${idx + 2}`).join(', ');
    const values = Object.values(updates);
    await query(
        `UPDATE product_t SET ${fields} WHERE id = $1`,
        [product_id, ...values]
    );
};

export const updateProductInfo = async (product_id: string, product_store_id: string, updates: any) => {
    const fields = Object.keys(updates).map((key, idx) => `${key} = $${idx + 3}`).join(', ');
    const values = Object.values(updates);
    await query(
        `UPDATE productStore_t SET ${fields} WHERE product_id = $1 AND id = $2`,
        [product_id, product_store_id, ...values]
    );
};

import { query } from '../../database'

export const createProduct = async (name: string, brand: string, price: number, desc: string, imgurl: string[]) => {
    const result = await query(
        'INSERT INTO product_t (name, brand, price, desc, imgurl) VALUES ($1, $2, $3, $4, ARRAY $5) RETURNING id',
        [name, brand, String(price), desc, imgurl]
    );
    return result.rows[0].id;
};

export const addProductInfo = async (product_id: string, size: string, color: string, sold: number, count: number) => {
    const result = await query(
        'INSERT INTO productStore_t (product_id, size, color, count, sold) VALUES ($1, $2, $3, $4, $5) RETURNING id',
        [product_id, size, color, String(count), String(sold)]
    );
    return result.rows[0].id;
};


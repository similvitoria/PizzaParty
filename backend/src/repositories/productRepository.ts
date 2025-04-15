import pool from "../database";
import { Product } from "../schemas/product";

export class ProductRepository {
    async findAll(): Promise<Product[]> {
        const result = await pool.query('SELECT * FROM products');
        return result.rows;
    }

    async findById(id: number): Promise<Product> {
        const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
        return result.rows[0];
    }
}
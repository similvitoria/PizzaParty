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

    async create(data: Product) {
        const { name, price, category, description, image_path } = data;
        const result = await pool.query(
            `INSERT INTO products(name, description, category, image_path, price)
                VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [name, description, category, image_path, price]
        );
        return result.rows[0];
    }
}
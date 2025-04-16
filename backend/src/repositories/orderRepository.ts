import { log } from "console";
import pool from "../database";
import { Order } from "../schemas/order";

export class OrderRepository {
    async findAll(): Promise<Order[]> {
        const result = await pool.query('SELECT * FROM orders');
        return result.rows;
    }

    async findById(id: number): Promise<Order> {
        const result = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);
        return result.rows[0];
    }

    async create(data: Order): Promise<Order> {
        const { customer_id, product_ids, status, total_price, order_date } = data;
        const result = await pool.query(
            `INSERT INTO orders (customer_id, product_ids, status, total_price, order_date)
            VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [customer_id, product_ids, status, total_price, order_date]
        );
        return result.rows[0];
    }

    async update(id: number, data: Partial<Order>): Promise<Order | null> {
        const order: Order = await this.findById(id);
        if(!order) return null;

        console.log(order);
        console.log();
        console.log(data);
        
        
        

        const result = await pool.query(
            `UPDATE public.orders SET 
                customer_id = $1,
                total_price = $2,
                order_date = $3, 
                status = $4, 
                product_ids = $5
            WHERE id = $6`,
            [
                data.customer_id ?? order.customer_id,
                data.total_price ?? order.total_price,
                data.order_date ?? order.order_date,
                data.status ?? order.status,
                data.product_ids ?? order.product_ids,
                id
            ]
        );
        return result.rows[0];
    }

    async delete(id: number) {
        await pool.query('DELETE FROM orders WHERE id = $1', [id]);
    }
}
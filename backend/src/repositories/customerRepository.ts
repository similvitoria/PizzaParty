import pool from "../database";
import { Customer } from "../schemas/customers";

export class CustomerRepository {
    async findAll(): Promise<Customer[]> {
        const result = await pool.query('SELECT * FROM customers');
        return result.rows;
    }

    async findById(id: number): Promise<Customer> {
        const result = await pool.query('SELECT * FROM customers WHERE id = $1', [id]);
        return result.rows[0];
    }

    async findByEmail(email: string): Promise<Customer> {
        const result = await pool.query('SELECT * FROM customers WHERE email = $1', [email]);        
        return result.rows[0];
    }

    async create(data: Customer): Promise<Customer> {
        const {address, email, name, phone} = data;
        const result = await pool.query(
            `INSERT INTO public.customers(name, email, phone, address)
            VALUES ($1, $2, $3, $4) RETURNING *`,
            [name, email, phone, address]
        );
        return result.rows[0];
    }
}
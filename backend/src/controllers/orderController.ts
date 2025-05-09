import { Request, Response } from "express";
import { OrderRepository } from "../repositories/orderRepository";
import { Order, orderSchema, partialOrderSchema } from "../schemas/order";
import { ZodError } from "zod";
import { Customer, customerSchema } from "../schemas/customers";
import { CustomerRepository } from "../repositories/customerRepository";

const orderRepository = new OrderRepository();

export class OrderController {
    async getAll(req: Request, res: Response): Promise<any> {
        try {
            const orders = await orderRepository.findAll();
            return res.status(200).json(orders);
        } catch (error) {
            console.error('Erro ao buscar pedidos:', error);
            return res.status(500).json();
        }
    }

    async getById(req: Request, res: Response): Promise<any> {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        try {
            const order = await orderRepository.findById(id);
            if (!order) {
                return res.status(404).json({ message: 'Pedido não encontrado' });
            }
            return res.status(200).json(order);
        } catch (error) {
            console.error('Erro ao buscar pedido:', error);
            return res.status(500).json();
        }
    }

    async create(req: Request, res: Response): Promise<any> {
        const { customer, order } = req.body;

        
        
        const productsId = order.products.map((x: { id: any; }) => {
            return x.id;
        })
        
        
        try {
            const customerID = (await (new CustomerRepository()).findByEmail(customer.email)).id;
            
            const parsed = orderSchema.parse({
                customer_id: customerID,
                total_price: order.total_price,
                product_ids: productsId,
            });
            console.log(parsed);
            
            const newOrder = await orderRepository.create(parsed);
            return res.status(201).json(newOrder);
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({ message: 'Dados inválidos', errors: error.errors });
            }
            console.error('Erro ao criar pedido:', error);
            return res.status(500).json();
        }
    }

    async update(req: Request, res: Response): Promise<any> {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        try {
            const parsed = partialOrderSchema.parse(req.body);
            const updated = await orderRepository.update(id, parsed);
            if (!updated) {
                return res.status(404).json({ message: 'Pedido não encontrado' });
            }
            return res.status(200).json(updated);
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({ message: 'Dados inválidos', errors: error.errors });
            }
            console.error('Erro ao atualizar pedido:', error);
            return res.status(500).json();
        }
    }

    async delete(req: Request, res: Response): Promise<any> {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        try {
            await orderRepository.delete(id);
            return res.status(204).send();
        } catch (error) {
            console.error('Erro ao deletar pedido:', error);
            return res.status(500).json();
        }
    }
}
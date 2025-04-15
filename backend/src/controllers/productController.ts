import { Request, Response } from "express";

import { ZodError } from "zod";
import { ProductRepository } from "../repositories/productRepository";

const productRepository = new ProductRepository();

export class OrderController {
    async getAll(req: Request, res: Response) {
        try {
            const orders = await productRepository.findAll();
            return res.status(200).json(orders);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            return res.status(500).json();
        }
    }

    async getById(req: Request, res: Response) {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        try {
            const order = await productRepository.findById(id);
            if (!order) {
                return res.status(404).json({ message: 'produto não encontrado' });
            }
            return res.status(200).json(order);
        } catch (error) {
            console.error('Erro ao buscar produto:', error);
            return res.status(500).json();
        }
    }
}
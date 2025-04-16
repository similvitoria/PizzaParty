import { Request, Response } from "express";

import { ZodError } from "zod";
import { ProductRepository } from "../repositories/productRepository";
import { Product, productSchema } from "../schemas/product";

const productRepository = new ProductRepository();

export class ProductController {
    async getAll(req: Request, res: Response): Promise<any> {
        try {
            const products = await productRepository.findAll();
            return res.status(200).json(products);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            return res.status(500).json();
        }
    }

    async getById(req: Request, res: Response): Promise<any> {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        try {
            const product = await productRepository.findById(id);
            if (!product) {
                return res.status(404).json({ message: 'produto não encontrado' });
            }
            return res.status(200).json(product);
        } catch (error) {
            console.error('Erro ao buscar produto:', error);
            return res.status(500).json();
        }
    }

    async create(req: Request, res: Response): Promise<any> {
        try {
            const parsed = productSchema.parse(req.body);
            const newOrder = await productRepository.create(parsed);
            return res.status(201).json(newOrder);
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({ message: 'Dados inválidos', errors: error.errors });
            }
            console.error('Erro ao criar produto:', error);
            return res.status(500).json();
        }
    }
}
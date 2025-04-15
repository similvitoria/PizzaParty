import { Request, Response } from "express";
import { ZodError } from "zod";
import { CustomerRepository } from "../repositories/customerRepository";
import { customerSchema } from "../schemas/customers";

const customerRepository = new CustomerRepository();

export class CustomerController {
    async getAll(req: Request, res: Response) {
        try {
            const customers = await customerRepository.findAll();
            return res.status(200).json(customers);
        } catch (error) {
            console.error('Erro ao buscar clientes:', error);
            return res.status(500).json();
        }
    }

    async getById(req: Request, res: Response) {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        try {
            const customer = await customerRepository.findById(id);
            if (!customer) {
                return res.status(404).json({ message: 'Cliente não encontrado' });
            }
            return res.status(200).json(customer);
        } catch (error) {
            console.error('Erro ao buscar cliente:', error);
            return res.status(500).json();
        }
    }

    async create(req: Request, res: Response) {
        try {
            const parsed = customerSchema.parse(req.body);
            const newCustomer = await customerRepository.create(parsed);
            return res.status(201).json(newCustomer);
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({ message: 'Dados inválidos', errors: error.errors });
            }
            console.error('Erro ao criar cliente:', error);
            return res.status(500).json();
        }
    }
}
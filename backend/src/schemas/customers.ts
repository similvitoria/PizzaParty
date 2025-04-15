import { z } from 'zod'

export const customerSchema = z.object({
    name: z.string().min(1, 'Nome obrigatório'),
    email: z.string().email(),
    phone: z.string().min(8),
    address: z.string().min(5)
});

export type Customer = z.infer<typeof customerSchema>;
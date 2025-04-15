import { z } from 'zod'

export const orderSchema = z.object({
    customer_id: z.number().int().min(1),
    product_ids: z.array(z.number().int().min(1, 'ID do produto inválido')).min(1, 'Pelo menos um produto é obrigatório'),
    total_price: z.number().positive(),
    order_date: z.date().optional(),
    status: z.enum(['pending', 'confirmed', 'delivered', 'cancelled']).default('pending'),
});

export type Order = z.infer<typeof orderSchema>;
export const partialOrderSchema = orderSchema.partial();

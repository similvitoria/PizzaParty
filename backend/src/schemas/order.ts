import { z } from 'zod'
import { customerSchema } from './pizza';

export const orderSchema = z.object({
    customer: z.object(customerSchema)
});

export type order = z.infer<typeof orderSchema>;
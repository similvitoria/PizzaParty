import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, 'Nome da pizza é obrigatório').max(100),
  description: z.string().optional(),
  price: z.number().positive('Preço deve ser positivo').max(999.99),
  category: z.string().optional(),
  image_path: z.string().url('Caminho da imagem inválido').optional(),
});

export type Product = z.infer<typeof productSchema>;

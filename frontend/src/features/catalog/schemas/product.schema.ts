// src/features/catalog/schemas/product.schema.ts
import { z } from 'zod';

// Validación estricta para mitigar payloads malformados
export const registerVariantSchema = z.object({
  sku: z.string().min(4, 'El SKU debe tener al menos 4 caracteres').regex(/^[A-Z0-String0-9-]+$/, 'SKU con formato inválido (solo mayúsculas, números y guiones)'),
  price: z.number().positive('El precio debe ser un número mayor a 0'),
  stock: z.number().int().nonnegative('El stock no puede ser negativo'),
  attributes: z.record(z.string(), z.string().min(1, 'El atributo no puede estar vacío')),
});

export const registerProductSchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres').max(100, 'Nombre demasiado largo'),
  description: z.string().min(10, 'La descripción debe ser detallada (mínimo 10 caracteres)'),
  category: z.string().min(2, 'Debe seleccionar una categoría válida'),
  basePrice: z.number().positive('El precio base debe ser mayor a 0'),
  variants: z.array(registerVariantSchema).min(1, 'Debe inicializar al menos una variante de inventario'),
});

export type RegisterProductFormData = z.infer<typeof registerProductSchema>;
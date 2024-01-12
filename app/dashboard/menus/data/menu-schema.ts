import { z } from "zod";

// Convierte el schema de la tabla 'menus' a un esquema zod
export const taskSchema = z.object({
  id: z.any(),
  nombre: z.any(),
  descripcion: z.any(),
  precio: z.any(),
  precioOferta: z.any(),
  stock: z.any(),
  imagen: z.any(),
  tipo: z.any(),
  user_id: z.any(),
  createdAt: z.any(),
  updatedAt: z.any(),
})

export type Menu = z.infer<typeof menuSchema>;
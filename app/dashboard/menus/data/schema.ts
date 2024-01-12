import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
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

export type Task = z.infer<typeof taskSchema>

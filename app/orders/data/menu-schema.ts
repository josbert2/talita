import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  order_id: z.number(),
  table_number: z.number(),
  order_date: z.string(),
  status: z.string(),
  total_price: z.string(),
  special_instructions: z.string(),
  for_takeout: z.number(),
  method_payment: z.string(),
  client_id: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  id: z.number(),
  nombre: z.string(),
  apellido: z.string(),
  telefono: z.string(),
  direccion: z.string().nullable(),
  email: z.string().nullable(),
  password: z.string().nullable(),
  rut: z.string(),
});

export type Task = z.infer<typeof taskSchema>

import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  order_id: z.any(),
  table_number: z.any(),
  order_date:z.any(),
  status:z.any(),
  total_price:z.any(),
  special_instructions:z.any(),
  for_takeout: z.any(),
  method_payment:z.any(),
  client_id: z.any(),
  created_at:z.any(),
  updated_at:z.any(),
  id: z.any(),
  nombre:z.any(),
  apellido:z.any(),
  telefono:z.any(),
  direccion:z.any(),
  email:z.any(),
  password:z.any(),
  rut:z.any(),
});

export type Task = z.infer<typeof taskSchema>

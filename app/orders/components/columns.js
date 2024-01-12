"use client"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

import { labels, priorities, statuses } from "../data/data"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions.js"

import { Imagen } from "next/image"

const colorScheme = {
  "Pending": "bg-yellow-500",
  "Served": "bg-green-500",
  "Cancelled": "bg-red-500",
  "Completed": "bg-blue-500",
}

export const columns = [
  {
    accessorKey: "nombre",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
    cell: ({ row }) => {
      const label = labels.find(label => label.value === row.original.label)

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("nombre")} 
          </span>
        </div>
      )
    }
  },
  {
    accessorKey: "rut",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rut" />
    ),
    cell: ({ row }) => {
      const label = labels.find(label => label.value === row.original.label)

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("rut")} 
          </span>
        </div>
      )
    }
  },{
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {

    

      const label = labels.find(label => label.value === row.original.label)

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className={`max-w-[500px] truncate font-medium ${colorScheme[row.getValue("status")]} px-2 text-[11px] py-1 rounded-full text-white`}>
            {row.getValue("status")} 
          </span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {




    accessorKey: "total_price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Monto" />
    ),
    cell: ({ row }) => {
      const label = labels.find(label => label.value === row.original.label)

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("total_price")} 
          </span>
        </div>
      )
    }
  },
  {
    accessorKey: "method_payment",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Metodo de pago" />
    ),
    cell: ({ row }) => {
      const label = labels.find(label => label.value === row.original.label)

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("method_payment")} 
          </span>
        </div>
      )
    }
  },

]

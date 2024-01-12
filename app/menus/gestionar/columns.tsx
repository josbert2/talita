'use client'


import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { formatPriceChile, getCurrentDateTime } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
    id: string
    orderId: string
    date: string
    customer: string
    apellido: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
    total_price: number,
    rut: string,
  }

  
   
  export const columns: ColumnDef<Payment>[] = [
    {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
      accessorKey: "order_id",
      header: "ORDER ID",
    },
    {
      accessorKey: "order_date",
      header: "Fecha",
      cell: ({ row }) => {
        const date = row.getValue("order_date")
        const formatted = format(parseISO(date as any), 'dd MMM yyyy', { locale: es })
        return <div className="font-medium">{formatted}</div>
      },
      
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        console.log(row)
        const Statuses = {
          Cancelled: "bg-[#ff5c5c94]",
          Completed: "bg-[#10ac84]",
        }
        


        const status = row.getValue("status") 
      
        return <Badge className={Statuses[status as keyof typeof Statuses] + " py-1"}>
          {row.getValue("status")}
        </Badge>
      },
    },
    
    {
      accessorKey: "nombre",
      header: "Cliente",
      cell: ({ row }) => {
        const apellido = row.original.apellido ? row.original.apellido : ''
  
        return (
          <div className="flex items-center">
            <div>
              <div className="font-medium">{row.getValue("nombre") + ' ' + apellido}</div>
            
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: "rut",
      header: "Rut",
      cell: ({ row }) => {
        const rut = row.original.rut ? row.original.rut : ''
  
        return (
          <div className="flex items-center">
            <div>
              <div className="font-medium">{rut}</div>
            
            </div>
          </div>
        )
      },
    },
    /*{
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown className="w-4 h-4 ml-2" />
          </Button>
        )
      },
    }, */
    /*{
      accessorKey: "amount",
      header: () => <div className="text-right">Amount</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amount"))
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount)
   
        return <div className="font-medium text-right">{formatted}</div>
      },
    }, */
    {
      accessorKey: "total_price",
      header: () => <div className="text-right">Total</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("total_price"))
      
   
        return <div className="font-medium text-right">{formatPriceChile(amount )}</div>
      },
    },
    {
        id: "actions",
        cell: ({ row }) => {
          const payment = row.original
     
          return (
            <div className="flex justify-end">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="w-8 h-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={() => navigator.clipboard.writeText(payment.id)}
                    >
                      Copy payment ID
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      Editar menu
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Eliminar menu
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href={`/transaccion/${row.original.order_id}`}>
                        Ver detalles
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
            </div>
          )
        },
      },
  ]
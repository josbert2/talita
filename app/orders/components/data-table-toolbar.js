"use client"
import { Cross2Icon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "./data-table-view-options"

import { priorities, statuses } from "../data/data"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"

export function DataTableToolbar({ table }) {
  const isFiltered = table.getState().columnFilters.length > 0


  return (
    <div className="flex items-center justify-end">
      <div className="flex items-center flex-1 py-2  space-x-2 ">
        <Input
          placeholder="Filtrar por menu"
          value={table.getColumn("nombre")?.getFilterValue() ?? ""}
          onChange={event =>
            table.getColumn("nombre")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
      
      </div>
    
      {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Estados"
            options={statuses}
          />
      )}
      {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
      )}
      <DataTableViewOptions table={table} />
    </div>
  )
}

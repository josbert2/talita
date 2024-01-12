import React from 'react'



import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"
import { UserNav } from "./components/user-nav"
import { taskSchema } from "./data/schema"


async function getAllMenus () {
    const URL_API = 'https://talita-backend-dev-production.up.railway.app/api/'
    try {
        const response = await fetch(`${URL_API}orders/allOrders`, {
          cache: 'no-store'
        });
        if (!response.ok) throw new Error(response.statusText);
        const data = await response.json();
      
        return data
    }
    catch (error) {
        console.log(error);
    }
}



export default async function Page() {
  const menus = await getAllMenus()
  return (
    <div className='container'>
      

      
      <div className="flex-col flex-1 hidden h-full p-8 space-y-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div className="flex items-center space-x-2">
            <h1 class="scroll-m-20 text-xl font-bold tracking-tight">Gestión de ordenes</h1>
          </div>
        </div>
        <div class="bg-white  py-2">
          <DataTable data={menus} columns={columns} />
        </div>
      </div>

    </div>
  )
}


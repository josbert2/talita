'use client'
import React, { useEffect } from 'react'
import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"
async function getAllMenus() {
  const URL_API = 'http://localhost:3001/api/'
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








export default  async function Page() {
  const [data, setData] = React.useState([])

  useEffect(() => {
    getAllMenus().then((data) => {
      setData(data)
    })
  }, [])

  return (
    <div class="container">
        <div className="flex-col flex-1 hidden h-full p-8 space-y-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div className="flex items-center space-x-2">
            <h1 class="scroll-m-20 text-xl font-bold tracking-tight">Gestión de menus</h1>
          </div>
        </div>
        <div class="bg-white">
          <DataTable columns={columns} data={data} />
        </div>
      </div>

    </div>
  )
}

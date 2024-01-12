import React from 'react'
import Image from "next/image"


import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"
import { UserNav } from "./components/user-nav"






async function getAllMenus () {
    const URL_API = 'http://localhost:3001/api/'
    try {
        const response = await fetch(`${URL_API}menus`);
        if (!response.ok) throw new Error(response.statusText);
        const data = await response.json();
        console.log(data)
        return data
    }
    catch (error) {
        console.log(error);
    }
}



export default async function Page() {
  const menus = await getAllMenus()
  return (
    <div>
        <h1 class="scroll-m-20 text-xl font-bold tracking-tight">Gestión de menus</h1>

        <div className="md:hidden">
        <Image
          src="/examples/tasks-light.png"
          width={1280}
          height={998}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/examples/tasks-dark.png"
          width={1280}
          height={998}
          alt="Playground"
          className="hidden dark:block"
        />
      </div>
      <div className="flex-col flex-1 hidden h-full p-8 space-y-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <UserNav />
          </div>
        </div>
        <DataTable data={menus} columns={columns} />
      </div>

    </div>
  )
}


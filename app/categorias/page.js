'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'


import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import SvgIcon from '@/components/Icon'
import CartMenu from '@/components/CardMenus'



export default function Page() {

  const [categorias, setCategorias] = useState([])
  const [categoriaPerMenus, setCategoriaPerMenus] = useState([])


  const getAllCategorias = async (search = '') => {
    const URL_API = 'https://talita-backend-dev-production.up.railway.app/api/'
    try {
        const response = await fetch(`${URL_API}categorias`);
        if (!response.ok) throw new Error(response.statusText);
        const data = await response.json();
      
        setCategorias(data);
    }
    catch (error) {
        console.log(error);
    }
  }

  const getCategoriaPerMenus = async (search = '') => {
    const URL_API = 'https://talita-backend-dev-production.up.railway.app/api/'
    try {
        const response = await fetch(`${URL_API}categorias/perMenus`);
        if (!response.ok) throw new Error(response.statusText);
        const data = await response.json();
      
        setCategoriaPerMenus(data);
    }
    catch (error) {
        console.log(error);
    }
  }

  const editCategory = (id) => {
  
  }

  const deleteCategory = async (id) => {
    const URL_API = 'https://talita-backend-dev-production.up.railway.app/api/'
    const data = await fetch(`${URL_API}categorias/${id}`, {
        method: 'DELETE'
    })

    getAllCategorias();



  }

  useEffect(() => {
    getAllCategorias();
    getCategoriaPerMenus();
  }, [])



  return (
    <div className='container'>
      <div class="flex justify-end w-full pb-5 pt-5">
        <Button> 
          <Link href="/categorias/add">
            <div class="flex items-center">
              <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" 
              width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M8 12h8M12 16V8M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7Z" stroke="#FFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
              Añadir categorías
            </div>
          </Link>
        </Button>
      </div>
      <div class="bg-white rounded-lg">
        <Table variant="surface">
        
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead className="text-left">Productos</TableHead>
              <TableHead className="opacity-0">asdasdasdasd</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categorias.map((categoria) => (

              <>
                {categoria.deleted_categoria  != 1 && (
                  <>
                    <TableRow key={categoria.id}>
                      <TableCell className="font-medium">  {categoria.id_categoria}</TableCell>
                      <TableCell className="font-medium">  {categoria.nombre_categoria}</TableCell>
                      <TableCell className="font-medium">  {categoria.descripcion}</TableCell>
                      <TableCell className="font-medium">  {categoria.numero_de_productos}</TableCell>
                      <TableCell className="font-medium ">
                          <Button onClick={() => editCategory(categoria.id_categoria)}>
                              Editar
                          </Button> 

                          <Button variant="secondary" className="ml-2" onClick={() => deleteCategory(categoria.id_categoria)}>
                              Eliminar
                          </Button>                  
                      </TableCell>
                    </TableRow>
                  </>
                )}
              </>
            ))}
          </TableBody>
        </Table>
      </div>

      <div class="">
            {categoriaPerMenus.map((categoria, index) => (
                <div key={index}>
                    {categoria.productos.length > 0 && (
                      <>
                        <h1 className="flex items-center py-5 text-xl">
                          <div class="mr-2">
                            {SvgIcon({ name: categoria.categoria_svg_nombre })}
                          </div>
                          {categoria.categoria_nombre}
                        </h1>
                        <div class="grid grid-cols-5 gap-5">
                          <CartMenu menus={categoria.productos} />
                        </div>
                      </>
                    )}
                </div>
            ))}
      </div>

    
    

    </div>
  )
}


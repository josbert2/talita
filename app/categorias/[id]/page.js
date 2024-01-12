'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'




import AddToCart from '@/components/AddToCart'
import Loading from './loading'

export default function Page({ params }) {
  
  const ID = params.id
  const [menu, setMenu] = useState([])
  const [loading, setLoading] = useState(true);

  


  useEffect(() => {
    const getMenu = async () => {
      const URL_API = 'https://talita-backend-dev-production.up.railway.app/api/'
      try {
          const response = await fetch(`${URL_API}menus/${ID}`);
          if (!response.ok) throw new Error(response.statusText);
          const data = await response.json();
        
          setMenu(data);
          setLoading(false)
      }
      catch (error) {
          console.log(error);
      }
    }
    getMenu();
  }, [ID])

  return (
    <div>
        <div class="">
        
          {loading ? (
              <Loading />
          ) : (
            <div className='grid grid-cols-2 gap-6'>
              <div className="flex justify-center">
              {menu.imagen ? (
                  <div>
                    <Image class="rounded-lg" alt={menu.nombre} src={menu.imagen} width={400} height={400} />
                  </div>
              ) : (
                <div>
                  asd
                </div>
              )}
              
              </div>
              <div className="">
                <div className="relative flex items-center pt-10 bg-white" key={menu.id}>
                    <div className="flex-1 w-full pl-5">
                        <h1 className="text-3xl font-bold tracking-tight">{menu.nombre}</h1>
                        <p className="mt-5 text-sm text-gray-500">{menu.descripcion}</p>
                        <p class="pt-1">Precio: ${menu.precio}</p>
                        <p class="pt-2">
                          <span class="font-bold">Ingredientes: </span>
                          {menu.ingredientes}
                        </p>
                        <p class="pt-2">
                          <span class="font-bold">Tipo: </span>
                          {menu.tipo}
                        </p>
                        <div class="flex w-full pt-20">
                          <AddToCart showQty={false} product={menu} increasePerClick={true} />
                        </div>
                    </div>
                </div>
              </div>
            </div>
          )}
        </div>
          
    </div>
  )
}
import React from 'react'
import Image from 'next/image';  // Corrected import statement
import Link from 'next/link';  // Missing import
import { Badge } from "@/components/ui/badge";
import { formatPriceChile } from "@/lib/utils"

export default function CardMenus({ menus }) {
  return (
    <>
        {menus.map((menu) => (
            <Link key={menu.id} href={'/menus/' + menu.id }>
                <div className="relative flex flex-col bg-white border rounded-lg shadow hover:bg-gray-400/25" key={menu.id}>
                    <div className="rounded-lg header-img">
                        {menu.imagen ? (
                            <div class="w-full  h-40">
                                <Image class="rounded-r-lg w-full h-full  object-cover rounded-br-lg w-full h-full" alt={menu.nombre} src={menu.imagen} width={200} height={200} />
                            </div>
                        ) : (
                            <div>
                            asd
                            </div>
                        )}
                    </div>
                    <div className="flex-1 py-6 pt-3">
                        <div class="px-4">
                            <h2 className="mb-1 text-base">{menu.nombre}</h2>
                            <p className="mb-1 text-sm text-gray-400">{menu.descripcion}</p>
                            <p>Precio: {formatPriceChile(menu.precio)}</p>
                        </div>

                        <div class="flex justify-center pt-5">
                            <Badge  className="py-2" variant="outline">Añadir al carro</Badge>
                        </div>
                        
                    </div>
                    
                    
                </div>
            </Link>
            
        ))}
    </>
  )
}

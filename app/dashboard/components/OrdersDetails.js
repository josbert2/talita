import React, { useState } from 'react'
import Image from 'next/image'


export default function OrdersDetails({ data }) {

  console.log(data)

  return (
    <>
        <div class="px-4">
            <div class="bg-white mb-5 rounded-lg pt-3 mt-3">
                <div class="px-3 py-3 rounded-lg flex items-center">
                    <div class="w-full rounded-lg">
                        <div class="flex items-center w-full rounded-lg">
                            <div class="rounde-full w-14 h-14 mr-2">
                                <Image alt='Imagen' src={data.menu.imagen} width={150} height={150} className="w-full h-full p-1 rounded-full"/>
                            </div>
                            <div class="flex flex-col">
                                <h3 class="font-bold text-gray-800">{data.menu.nombre}</h3>
                                <h3 class="text-xs mt-1 text-gray-600">${data.menu.precio}</h3>
                            </div>
                            <div class="ml-auto"><div class="px-5 py-3 rounded-lg font-bold bg-gray-200">{data.quantity}</div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

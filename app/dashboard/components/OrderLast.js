'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
export default async function OrderLast() {
  const [ordersLast, setOrdersLast] = useState([]);
  const URL_API =  process.env.URL_API || 'http://localhost:3001/api/';
  const StatusColors = {
    "Ready": "ready-order",
    "Pending": "pending-order",
    "Served": "served-order",
    "Cancelled": "cancelled-order",
    
  }
  try {
        const response = await fetch(`${URL_API}/orders/dashboard/last`);
        if (!response.ok) throw new Error(response.statusText);
        const data = await response.json();
        setOrdersLast(data);
        
  } catch (error) {
        console.log(error);  
  }
  return (
    <div>
        asd
        {ordersLast.length > 0 ? (
            <>
                {ordersLast.map((order, index) => (
                    <>
                        <div class="">
                            <div class="bg-white rounde-lg ">
                                <div class="flex header-collapse">
                                    <div class="px-3 py-3 ">
                                        <div class="w-16 h-16 rounded-lg">
                                            <Image src='https://i.ibb.co/Y8V1gLW/2212121212-1.jpg'alt="Picture of the author" className="w-full h-full  rounded-lg" width={150} height={150} />
                                        </div>
                                    </div>
                                    <div class="py-3 flex w-full">
                                        <div class="border-r pr-5"> 
                                            <h4 class="font-bold">Orden N° {order.order_id}</h4>
                                            <p class="text-gray-600 text-xs mt-2">{order.order_date}</p>
                                            <p class="text-gray-600 text-xs ">Menus -</p>
                                        </div>
                                        
                                        <div class="border-r pr-5 pl-5 flex flex-col justify-center">
                                            
                                            <div class={`text-center px-2 text-xs py-2 rounded-full ${StatusColors[order.status]}`}>
                                                {order.status}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ))}
                
            </>
        ) : (
            <>

            </>
        )}  
    </div>
  )
}

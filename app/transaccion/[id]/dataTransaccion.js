
import { use } from 'react';
import { Button } from "@/components/ui/button"
import { formatToPesosChilenos } from "@/helpers/utils"
import { useState, useEffect } from 'react';
import Image from 'next/image'




async function getTransaccion(id) {
    const URL_API = 'http://localhost:3001/api/'
    const ID = id;
    try {
    
        const response = await fetch(`${URL_API}cartItemsByOrder/${ID}`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json'
            },
        });
        if (!response.ok) throw new Error(response.statusText);
        const data = await response.json();
        return data;

        
    }
    catch (error) {
        console.log(error);
    }
}




const formatDate = (date) => {
    const newDate = new Date(date);
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    const hours = newDate.getHours();
    const minutes = newDate.getMinutes();
    const seconds = newDate.getSeconds();

    // Asegurarse de que haya dos dígitos para los minutos y segundos
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${day}/${month}/${year} ${hours}:${formattedMinutes}:${formattedSeconds}`;
  }

const ComponentTransaccion = ({ id }) => {
  const dataId = id;
  const data = use(getTransaccion(id));
  const { total_price, id_user, id_order, order_date } = data || {};


  return (
    <>
        {data.orders.length != 0  ? (
            <>
                <div className='ml-[-64px] mr-[-64px] mt-[-16px]'>
                <div class="h-[300px] text-4xl font-light flex items-center flex-col justify-center text-white bg-[#159B78]">
                    <div class="px-4 py-7 text-center flex items-center justify-center">
                      
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-11 h-11">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                      </svg>
                      <span class="flex ml-3">Pedido creado con exito     </span>
                      
                    </div>
                    <div class="flex justify-center">
                      <Button>
                        Generar factura
                      </Button>
                    </div>
                  
                </div>
                <div class="absolute px-40 py-4 -mt-14 flex w-full">
                  <div class="bg-white rounded-lg shadow-lg w-full px-4 py-4">
                      <div class="px-10 pt-4 pb-4 border-b">
                        <div class="font-bold text-2xl flex items-center">
                          Pedido n°: {data.orders[0].id}
                          <div class="ml-auto flex flex-col">
                            Precio total: {formatToPesosChilenos(data.orders[0].total_price)}
                            <span class="flex items-center  text-xs mt-2 font-light ml-auto">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                              </svg>
                              <div class="ml-2 ">
                                {formatDate(data.orders[0].order_date)}
                              </div>
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div class="grid grid-cols-12">
                        <div class="px-10 pt-4 pb-4 col-span-8">
                            <h2 class="font-bold text-base flex items-center mb-5 text-gray-800"><span class="mr-2">Resumen del pedido</span> - <span class="text-neutral-500 text-xs ml-2 pt-0.5">5 menus</span>  </h2>
                            
                            {data.orderDetails.details.map((item) => (
                              <>  
                                  <div class="bg-gray-100 mb-5 rounded-lg">
                                      <div class="px-3 py-3 rounded-lg flex items-center">
                                        <div class="w-full rounded-lg">
                                          <div class="flex items-center w-full rounded-lg">
                                              <div class=" rounde-full w-14 h-14 mr-2">
                                                <Image src={item.menu_imagen} alt={item.menu_nombre} width={150} height={150} className="w-full h-full p-1 rounded-full" />
                                              </div>
                                              <div class="flex flex-col ">
                                                <h3 className='font-bold text-gray-800'>{item.menu_nombre}</h3>
                                                <h3 class="text-xs mt-1 text-gray-600">{formatToPesosChilenos(item.menu_precio)}</h3>
                                              </div>
                                              <div class="ml-auto">
                                                <div class="px-5 py-3 rounded-lg font-bold bg-gray-200">
                                                  {item.quantity}
                                                </div>
                                              </div>
                                          </div>
                                  
                                          
                                          
                                        </div>
                                      </div>
                                  </div>
                              </>
                            ))}
                        </div>
                        <div class="col-span-4">
                            <div class="px-10 pt-5">
                              <div class="font-bold text-gray-800 flex items-start flex-col border-b pb-4">
                                Forma de pago:
                                <span class="text-sm mt-1 font-light text-gray-500/80">
                                  {data.orders[0].method_payment}
                                </span>
                              </div>
                              <div class="font-bold text-gray-800 flex items-start flex-col pt-4 border-b pb-4">
                                Delivery:
                                <span class="text-sm mt-1 font-light text-gray-500/80">
                                {data.orders[0].for_takeout ? 'Para llevar' : 'Para comer en el local'}
                                </span>
                              </div>
                              <div class="font-bold text-gray-800 flex items-start flex-col pt-4 border-b pb-4">
                                Cliente
                                <div className="flex items-center w-full rounded-lg">
                                  <div className="mr-2 rounde-full w-14 h-14">
                                    
                                    <Image src='https://as1.ftcdn.net/v2/jpg/05/16/27/58/1000_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg' alt={data.orders[0].nombre} width={150} height={150} className="w-full h-full p-1 rounded-full" />
                                  </div>
                                  <div className="flex flex-col">
                                    <h3 className="font-bold text-gray-800">{data.orders[0].nombre} {data.orders[0].apellido}</h3>
                                    <h3 className="mt-1 text-xs text-gray-600">
                                      {data.orders[0].rut} - {data.orders[0].telefono}
                                    </h3>
                                  </div>
                                
                                </div>
                              </div>
                              <div class="font-bold text-gray-800 flex items-start flex-col pt-4">
                                Estado del pedido 
                                <div className="flex items-center w-full rounded-lg text-warning-500">
                                    <div class="text-sm font-light flex items-center">
                                      {data.orders[0].status === 'Pending' ? (
                                        <>
                                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M2.45 14.97c1.07 3.44 3.95 6.09 7.53 6.82M2.05 10.98A9.996 9.996 0 0 1 12 2c5.18 0 9.44 3.94 9.95 8.98M14.01 21.8c3.57-.73 6.44-3.35 7.53-6.78" stroke="#FF8A65" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                                          <span class="ml-2">Pendiente</span>
                                        </>
                                      ) : (
                                        <>
                                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                                          </svg>
                                          <span class="ml-2">{data.orders[0].status}</span>
                                        </>
                                      )}
                                      
                                    </div>
                                </div>
                              </div>
                            </div>
                        </div>
                      </div>
                  </div>
                </div>
            </div>
            </>
        ) : (
            <>
                <div className='ml-[-64px] mr-[-64px] mt-[-16px]'>
            
                        <div class="h-[300px] text-4xl font-light flex items-center flex-col justify-center text-white bg-[#ff8888]">
                            <div class="px-4 py-7 text-center flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-11 h-11">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                            </svg>
                            <span class="flex ml-3">Error, transacción no encontrada </span>
                            
                            </div>
                            <div class="flex justify-center">
                            <Button>
                                Volver
                            </Button>
                            </div>
                        
                        </div>
                        <div class="absolute px-40 py-4 -mt-14 flex w-full">
                        <div class="bg-white rounded-lg shadow-lg w-full px-4 py-4">
                            <div class="px-10 pt-4 pb-4 border-b">
                                
                            </div>
                            
                            <div class="grid grid-cols-12">
                                <div class="px-10 pt-4 pb-4 col-span-8">
                                    
                                </div>
                                <div class="col-span-4">
                                    
                                </div>
                            </div>
                        </div>
                        </div>
                </div>
            </>
        )}
     
    </>
  );
};

export default ComponentTransaccion;
'use client'
import React, { useState, useEffect, Suspense } from "react";
import Loading from './loading.js';
import { Card, Grid, Flex, BadgeDelta, Title, Metric, Text, BarChart, Subtitle } from "@tremor/react";
import Link from 'next/link'
import { Button } from "@/components/ui/button";
import { useSession } from 'next-auth/react'
import { Image } from 'next/image'
import OrdersDetails from './components/OrdersDetails.js';
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"



import { CaretSortIcon } from "@radix-ui/react-icons"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
 


import { formatPriceChile, getCurrentDateTime } from "@/lib/utils"
import OrderLast from "./components/OrderLast.js";



const repositories = ["@radix-ui/primitives", "@radix-ui/colors", "@stitches/react"];

    
export default function Page(){
    const { data: session, status } = useSession()
    const URL_API = 'http://localhost:3001/api/'
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [filter, setFilter] = useState(null);
    
    const [dataForToday, setDataForToday] = useState([]);


    const StatusColors = {
        "Ready": "ready-order",
        "Pending": "pending-order",
        "Served": "served-order",
        "Cancelled": "cancelled-order",
        
    }

    const StatusSvg = {
        "Ready": "ready-order",
        "Pending": "pending-order",
        "Served": "served-order",
        "Cancelled": "cancelled-order",

    }

    function formatToCLP(value) {
        return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);
    }

    const categories = [
        {
          title: "Sales",
          metric: "$ 12,699",
          metricPrev: "$ 9,456",
          delta: "34.3%",
          deltaType: "moderateIncrease",
        },
        {
          title: "Profit",
          metric: "$ 40,598",
          metricPrev: "$ 45,564",
          delta: "10.9%",
          deltaType: "moderateDecrease",
        },
        {
          title: "Customers",
          metric: "1,072",
          metricPrev: "856",
          delta: "25.3%",
          deltaType: "moderateIncrease",
        },
    ];

    const dataFormatter = (number) => {
        return "$ " + Intl.NumberFormat("us").format(number).toString();
    };
      

    const getMenusCount = async () => {
        try {
            const response = await fetch(URL_API + 'menus');
            if (!response.ok) throw new Error(response.statusText);
            const data = await response.json();

            setCount(data.length)
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
        
    }

    const getTotalPrice = async () => {
        try {
            const response = await fetch(URL_API + 'menus');
            if (!response.ok) throw new Error(response.statusText);
            const data = await response.json();
            
            let totalPrice = 0;
            

            data.map((menu) => {
                if (totalPrice == undefined) totalPrice = 0
                totalPrice += Number(menu.precio)
            })
        
            const precioFormatted = formatToCLP(Number(totalPrice));
            setTotalPrice(precioFormatted)
        } catch (error) {
            console.log(error);
        }
        
    }

    const getListOrders = async () => {
        try {
            const response = await fetch(URL_API + 'orders/dashboard',{
                cache: 'no-store'
            });
            if (!response.ok) throw new Error(response.statusText);
            const data = await response.json();
        
            setOrders(data.data)
            setFilteredOrders(data.data)
        
            
        } catch (error) {
            console.log(error);
        }
        
    }

    const handleMarcarPreparado = async (event, id) => {
        event.preventDefault();
        try {
            const response = await fetch(URL_API + 'orders/marcarPreparado', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id,
                    status: 'Ready'
                })
            });
            if (!response.ok) throw new Error(response.statusText);
            const data = await response.json();
    
            getListOrders();
        } catch (error) {
            console.log(error);
        }
    }

    const handleMarcarEntregado = async (event, id) => {
        event.preventDefault();
        try {
            const response = await fetch(URL_API + 'orders/marcarPreparado', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id,
                    status: 'Served'
                })
            });
            if (!response.ok) throw new Error(response.statusText);
            const data = await response.json();
        
            getListOrders();
            applyFilter('all')
        } catch (error) {
            console.log(error);
        }
    }
    const handleMarcarCancelado = async (event, id) => {
        event.preventDefault();
        try {
            const response = await fetch(URL_API + 'orders/marcarPreparado', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id,
                    status: 'Cancelled'
                })
            });
            if (!response.ok) throw new Error(response.statusText);
            const data = await response.json();
        
            getListOrders();
        } catch (error) {
            console.log(error);
        }
    }




    const calculateDeltaType = (delta) => {
        if (delta >= 5 && delta < 10) {
            return "moderateIncrease";
        } else if (delta >= 10) {
            return "significantIncrease";
        } else if (delta <= -5 && delta > -10) {
            return "moderateDecrease";
        } else if (delta <= -10) {
            return "significantDecrease";
        } else {
            return "noChange";
        }
    };

    const getAllPricePerDays = async () => {
        try {
            const response = await fetch(URL_API + 'dashboard/getPerDays');
            if (!response.ok) throw new Error(response.statusText);
            const data = await response.json();
    
            // Asegúrate de que los datos recibidos son un array.
            const dataArray = Array.isArray(data) ? data : Object.values(data);
    
            // Obtiene la fecha y hora actual en la zona horaria de Santiago.
            const santiagoOffset = -3; // Cambia a -3 para horario de verano si es necesario.
            const now = new Date();
            const santiagoTime = new Date(now.getTime() + (now.getTimezoneOffset() + santiagoOffset * 60) * 60000);

            // 

            var año = santiagoTime.getFullYear();
            var mes = ('0' + (santiagoTime.getMonth() + 1)).slice(-2); // Se suma 1 al mes porque los meses en JavaScript van de 0 a 11
            var dia = ('0' + santiagoTime.getDate()).slice(-2);
            var fechaFormateada = año + '-' + mes + '-' + dia;

            //
            //const formattedTodaySantiago = santiagoTime.toISOString().split('T')[0];
            const formattedTodaySantiago = fechaFormateada;

            console.log(formattedTodaySantiago)
    
            // Filtra los datos para obtener solo los de hoy, ajustando las fechas al horario de Santiago.
            const filteredData = dataArray.filter(item => {
                if (!item.date) {
                    console.error('Fecha inválida o falta la propiedad date en el elemento:', item);
                    return false;
                }
                const itemDateSantiago = new Date(item.date);
                return itemDateSantiago.toISOString().split('T')[0] === formattedTodaySantiago;
            });
    
            // Suponiendo que dataArray está ordenado por fecha, el último elemento sería el más reciente (hoy).
            const todayData = filteredData[filteredData.length - 1];
            const prevDayData = filteredData[filteredData.length - 2]; // El penúltimo sería el día anterior.
    
            let delta = null;
            let deltaType = 'noChange';
    
            if (prevDayData && todayData) {
                const todaySales = todayData.metric;
                const prevDaySales = prevDayData.metric;
    
                if (prevDaySales > 0) {
                    delta = ((todaySales - prevDaySales) / prevDaySales) * 100;
                    deltaType = delta > 0 ? 'increase' : 'decrease';
                } else if (prevDaySales === 0 && todaySales > 0) {
                    delta = 'N/A'; // o puedes poner texto como 'Inicio de ventas'
                    deltaType = 'increase';
                }
            }

            if (delta !== null) {
                deltaType = calculateDeltaType(delta);
            }
    
            // Aquí puedes actualizar el estado o realizar acciones adicionales con delta y deltaType.
    
            
            setDataForToday(filteredData);
    
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        
        getMenusCount();
        getTotalPrice();
        getListOrders();
        getAllPricePerDays();
        //getLastOrdersCompleteAndServed();
         // eslint-disable-next-line react-hooks/exhaustive-deps
        
    }, []);

    const [openStates, setOpenStates] = React.useState(repositories.map(() => false));

    const handleToggle = (index) => {
      const newOpenStates = [...openStates];
      newOpenStates[index] = !newOpenStates[index];
      setOpenStates(newOpenStates);
    };

    const applyFilter = (status) => {
        if (status === 'all') {
          setFilteredOrders(orders);
        } else {
          const filtered = orders.filter(order => order.status.toLowerCase() === status.toLowerCase());
    
          setFilteredOrders(filtered);
        }
        setFilter(status); // Actualiza el filtro seleccionado
      };
    


    function isTimeWithinLimit(orderTime, limitInMinutes) {
        var currentTime = new Date().getTime();
        var orderTimestamp = new Date(orderTime).getTime();
        var timeDifference = currentTime - orderTimestamp;
    
        // Obtener la fecha actual
        var currentDate = new Date().getDate();
    
        // Obtener la fecha de la orden
        var orderDate = new Date(orderTime).getDate();
    
        // Validar si la orden es del mismo día (24 de septiembre)
        var isSameDay = orderDate === 24 && currentDate === 24;
    
        // Calcular el límite de tiempo en milisegundos
        var limitInMillis = limitInMinutes * 60 * 1000;
    
        // Validar tanto la fecha como el tiempo dentro del límite
        var isWithinLimit = (orderTimestamp <= currentTime) && (timeDifference <= limitInMillis || isSameDay);
    
        return isWithinLimit;
    }

    function remainTimeInMinutes(updatedAt) {
        const now = new Date();
        const updated = new Date(updatedAt);
      
        // Calcula la diferencia en milisegundos
        const differenceMs = now - updated;
      
        // Convierte la diferencia a minutos
        const differenceMinutes = Math.floor(differenceMs / (1000 * 60));
      
        return differenceMinutes;
      }

    function setCompleteOrder(id) {
        try {
            const response = fetch(URL_API + 'orders/marcarPreparado', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id,
                    status: 'Completed'
                })
            });
            if (!response.ok) throw new Error(response.statusText);
            const data = response.json();
        
            getListOrders();
        } catch (error) {
            console.log(error);
        }
    }
      

      function orderToday(orders) {
        var ordersPendingToday = 0;
        var currentTime = new Date().getTime();
        var tenMinutesInMillis = 10 * 60 * 1000;  // 10 minutos en milisegundos
    
        orders.forEach(order => {
            var orderDate = new Date(order.order_date);
            var currentDate = new Date();
            // Verificar si la orden es para hoy, está pendiente y no ha sido servida
            if (orderDate.getDate() === currentDate.getDate()) {
                // Calcular el tiempo transcurrido en milisegundos
                var timeDifference = currentDate.getTime() - orderDate.getTime();
    
                // Verificar si han pasado más de 10 minutos
                if (timeDifference > tenMinutesInMillis) {
                    ordersPendingToday++;
                }
            }
        });
    
        return ordersPendingToday;
    }


    


    // Llamar a la función para contar las órdenes pendientes para hoy
    const chartdata = [
        {
          name: "Amphibians",
          "Precio": 2488,
        },
        {
          name: "Birds",
          "Precio": 1445,
        },
        {
          name: "Crustaceans",
          "Precio": 743,
        },
    ];
    const categoriesKPIS = [
        {
          title: "Sales",
          metric: "$ 12,699",
          metricPrev: "$ 9,456",
          delta: "34.3%",
          deltaType: "moderateIncrease",
        },
        {
          title: "Profit",
          metric: "$ 40,598",
          metricPrev: "$ 45,564",
          delta: "10.9%",
          deltaType: "moderateDecrease",
        },
        {
          title: "Customers",
          metric: "1,072",
          metricPrev: "856",
          delta: "25.3%",
          deltaType: "moderateIncrease",
        },
    ];

    const KPIShtml = (data, showDate = false) => {

        const DayAndMonth = () => {
            const dateObject = new Date();
            const month = dateObject.toLocaleString('default', { month: 'short' });
            const day = dateObject.toLocaleString('default', { day: '2-digit' });
            return `${day} ${month}`;
        };

        return (
            <>
                {data.map((item) => (
                    <Card key={item.title}>
                        <Flex alignItems="start">
                            <Text>Ventas Hoy - {DayAndMonth()}</Text>
                            <BadgeDelta deltaType={item.deltaType}>{item.delta}</BadgeDelta>
                        </Flex>
                        <Flex justifyContent="start" alignItems="baseline" className="space-x-3 truncate">
                            <Metric>{formatPriceChile(item.metric)}</Metric>
                            <Text className="truncate">from {formatPriceChile(item.metricPrev)} ayer</Text>
                            
                            
                        </Flex>
                    </Card>
                ))}
            </>
        )

    }
    
    return (

        <div className="container pt-2">
        
            <div class=" pb-10 pt-10">
                <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
                    {KPIShtml(dataForToday)}
                    <Card alignItems="center">
                        <Flex alignItems="start">
                            <Text className="text-lg font-bold">Fecha y hora</Text>
                            
                        </Flex>
                        <Flex justifyContent="start" alignItems="baseline" className="space-x-3 truncate">
                            <Text className="truncate">{getCurrentDateTime()}</Text>
                        </Flex>
                    </Card>
                </Grid>
            </div>
            {loading ? (
                <Loading />
            ) : (
                <div>
                    <div class="grid grid-cols-3 gap-10">
                        <div class="col-span-2">
                            <div class="flex items-center w-full">
                                <h3 className="pb-4 mt-12 text-2xl font-semibold tracking-tight border-b font-heading scroll-m-20 first:mt-0">Lista de ordenes</h3>
                                <div class="ml-auto">
                                    <Button>
                                        Ver todas las ordenes
                                    </Button>
                                </div>
                            </div>
                            <div class="">
                                <div class="py-3 flex items-center gap-5 mt-3">
                                    <button class="border rounded-full px-2 text-xs py-1 hover:bg-black hover:text-white transition-all " onClick={() => applyFilter('all')}>Mostrar Todo</button>
                                    <button class="border rounded-full px-2 text-xs py-1 hover:bg-black hover:text-white transition-all" onClick={() => applyFilter('pending')}>Pendientes</button>
                                    <button class="border rounded-full px-2 text-xs py-1 hover:bg-black hover:text-white transition-all"  onClick={() => applyFilter('completed')}>Completados</button>
                                    <button class="border rounded-full px-2 text-xs py-1 hover:bg-black hover:text-white transition-all" onClick={() => applyFilter('cancelled')}>Cancelados</button>
                                    <button class="border rounded-full px-2 text-xs py-1 hover:bg-black hover:text-white transition-all" onClick={() => applyFilter('served')}>Servidos</button>
                                    <button class="border rounded-full px-2 text-xs py-1 hover:bg-black hover:text-white transition-all" onClick={() => applyFilter('ready')}>Listos </button>
                                </div>
                        
                                <ScrollArea className="w-full px-2 py-2 rounded-md h-[500px]">
                                    <div class="flex flex-col gap-4">
                                            
                                    
                                            {orderToday(filteredOrders) > 0 ? (
                                                <>
                                                    {filteredOrders.map((order, index) => (
                                                        <>
                                                        
                                                            {isTimeWithinLimit(order.updated_at, 10) && order.status == 'Cancelled' && remainTimeInMinutes(order.updated_at) > 10 ? (
                                                                    <>

                                                                    </>
                                                            ) : (
                                                                <>
                                                                    {/**isTimeWithinLimit(order.updated_at, 10) */}
                                                                    {  order.status === 'Served' && remainTimeInMinutes(order.updated_at) > 10 ? (
                                                                        <>  

                                                                            {order.status === 'Served' ? (
                                                                                <>
                                                                                    {setCompleteOrder(order.order_id)}
                                                                                </>
                                                                            ) : (
                                                                                <>

                                                                                </>
                                                                            )}
                                                                        
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            {order.status === 'Completed' || order.status === 'Cancelled' && remainTimeInMinutes(order.updated_at) > 10 ? (
                                                                                <>

                                                                                </>
                                                                            ) : (
                                                                                <>
                                                                                    <Collapsible
                                                                                        key={index}
                                                                                        open={openStates[index]}
                                                                                        onOpenChange={() => handleToggle(index)}
                                                                                        className="space-y-2 collapse-active"
                                                                                    >
                                                                                        <div class="bg-white rounde-lg ">
                                                                                            <div class="flex header-collapse">
                                                                                                <div class="px-3 py-3  flex items-center relative mr-5 w-[110px]">
                                                                                                <Drawer>
                                                                                                <DrawerTrigger className="flex">
                                                                                                    {order.orderDetails.slice(0, 3).map((orderDetail, index) => (
                                                                                                        <>
                                                                                                        
                                                                                                            <div class="relative">
                                                                                                            
                                                                                                            
                                                                                                                    <Avatar className={index != 0 ? '-ml-6 border-2 border-white' : 'border-2 border-transparent'} >
                                                                                                                        <AvatarImage src={orderDetail.menu.imagen} alt="@shadcn" />
                                                                                                                        <AvatarFallback>CN</AvatarFallback>
                                                                                                                    </Avatar>    
                                                                                                            
                                                                                                                
                                                                                                                
                                                                                                            </div>
                                                                                                            {order.orderDetails.length > 3 && (
                                                                                                                <div class="absolute bottom-5 right-2">
                                                                                                                    <Badge variant="outline" className="px-1 py-1 bg-white">
                                                                                                                        {order.orderDetails.length - 3}+
                                                                                                                    </Badge>
                                                                                                                </div>
                                                                                                            )}

                                                                                                        </>
                                                                                                    ))}
                                                                                                </DrawerTrigger>
                                                                                                <DrawerContent>
                                                                                                    <div className="w-full max-w-sm mx-auto">
                                                                                                
                                                                                                        <DrawerHeader>
                                                                                                            <DrawerTitle>
                                                                                                                <h2 class="font-bold text-base flex items-center mb-1 text-gray-800">
                                                                                                                    <span class="mr-2">Resumen del pedido</span> - <span class="text-neutral-500 text-xs ml-2 pt-0.5">{order.orderDetails.length} menus</span>  
                                                                                                                </h2>
                                                                                                            </DrawerTitle>
                                                                                                
                                                                                                            <DrawerDescription>Precio total: {formatPriceChile(order.total_price)}</DrawerDescription>
                                                                                                            <DrawerDescription className="flex items-center">
                                                                                                                Estado del pedido:
                                                                                                                <div class={`text-center px-2 flex items-center text-xs ml-auto py-2 rounded-full ${StatusColors[order.status]}`}>
                                                                                                                    
                                                                                                                    {order.status}
                                                                                                                </div>
                                                                                                            </DrawerDescription>
                                                                                                        </DrawerHeader>
                                                                                                        <DrawerFooter>
                                                                                                        
                                                                                                            {order.orderDetails.map((item) => (
                                                                                                                <>  
                                                                                                                    <div class="bg-gray-100 mb-3 rounded-lg">
                                                                                                                        <div class="w-full rounded-lg">
                                                                                                                            <div class="flex items-center w-full rounded-lg">
                                                                                                                                <div class=" rounde-full w-11 h-11 py-1 px-1 ">
                                                                                                                                    <Image src={item.menu.imagen} alt="Picture of the author" className="w-full h-full  rounded-full" width={150} height={150} />
                                                                                                                                </div>
                                                                                                                                <div class="flex flex-col  ml-2">
                                                                                                                                    <h3 className='text-sm font-bold text-gray-800'>{item.menu.nombre}</h3>
                                                                                                                                    <h3 class="text-xs mt-1 text-gray-600">{formatPriceChile(item.menu.precio)}</h3>
                                                                                                                                </div>
                                                                                                                                <div class="ml-auto px-2 py-2">
                                                                                                                                    <div class="px-5 py-3 rounded-lg font-bold bg-gray-200">
                                                                                                                                    {item.quantity}
                                                                                                                                    </div>
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </>
                                                                                                            ))}

                                                                                                            <Button asChild>
                                                                                                                <Link href={`/transaccion/${order.order_id}`}>
                                                                                                                    Ver transacción
                                                                                                                </Link>
                                                                                                            </Button>
                                                                                                            <DrawerClose asChild>
                                                                                                            <Button variant="outline">Cancelar</Button>
                                                                                                            </DrawerClose>
                                                                                                        </DrawerFooter>
                                                                                                    </div>
                                                                                                </DrawerContent>
                                                                                            </Drawer>
                                                                                                    
                                                                                                    
                                                                                                </div>
                                                                                                <div class="py-3 grid grid-cols-4 w-full">
                                                                                                    <div class="border-r pr-5"> 
                                                                                                        <h4 class="font-bold">Orden N° {order.order_id}</h4>
                                                                                                        <p class="text-gray-600 text-xs mt-2">{order.order_date}</p>
                                                                                                        <p class="text-gray-600 text-xs ">Menus - {order.orderDetails.length}</p>
                                                                                                    </div>
                                                                                                    <div class="border-r pr-5 pl-5 flex flex-col justify-center">
                                                                                                        <h4 class="font-bold">{order.cliente.nombre} {order.cliente.apellido}</h4>
                                                                                                        <p class="text-gray-600 text-xs mt-2">{formatPriceChile(order.total_price)}  {order.for_takeout == 1 ? '- Delivery' : '- Sin delivery' }</p>
                                                                                                    </div>
                                                                                                    <div class="border-r pr-5 pl-5 flex flex-col justify-center">
                                                                                                        
                                                                                                        <div class={`text-center px-2 text-xs py-2 rounded-full ${StatusColors[order.status]}`}>
                                                                                                            {order.status}
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div class="ml-auto pr-4 flex items-center">
                                                                                                        <CollapsibleTrigger asChild>
                                                                                                            <Button variant="ghost" size="sm">
                                                                                                                <CaretSortIcon className="w-4 h-4" />
                                                                                                                <span className="sr-only">Toggle</span>
                                                                                                            </Button>
                                                                                                        </CollapsibleTrigger>
                                                                                                        {order.status === 'Pending' ? (
                                                                                                            <>
                                                                                                                
                                                                                                                <div class="bg-black rounded-lg px-2 py-2 mr-2 cursor-pointer" onClick={(event) => handleMarcarCancelado(event, order.order_id)}>
                                                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="m14 16.16-3.96-3.96M13.96 12.24 10 16.2M10 6h4c2 0 2-1 2-2 0-2-1-2-2-2h-4C9 2 8 2 8 4s1 2 2 2Z" stroke="#FF8A65" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16 4.02c3.33.18 5 1.41 5 5.98v6c0 4-1 6-6 6H9c-5 0-6-2-6-6v-6c0-4.56 1.67-5.8 5-5.98" stroke="#FF8A65" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                                                                                                                </div>

                                                                                                                <div class="bg-[#32ff7e] rounded-lg px-2 py-2 mr-2 cursor-pointer" data-id={order.order_id} onClick={(event) => handleMarcarPreparado(event, order.order_id)}>
                                                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                                                                        <path d="m17.35 9.05-2.34 7.54c-.56 1.79-3.07 1.82-3.66.04l-.7-2.07c-.19-.57-.64-1.03-1.21-1.21l-2.08-.7c-1.77-.59-1.74-3.12.05-3.66l7.54-2.35c1.48-.45 2.87.94 2.4 2.41Z" stroke="#FFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                                                                                                            </path>
                                                                                                                            <path d="M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7Z" stroke="#FFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                                                                                    </svg>
                                                                                                                </div>
                                                                                                    
                                                                                                            </>
                                                                                                            
                                                                                                        ) : order.status === 'Ready' ? (
                                                                                                            <>
                                                                                                                <Button data-id={order.order_id} onClick={(event) => handleMarcarEntregado(event, order.order_id)}>
                                                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="mr-2" viewBox="0 0 24 24" fill="none"><path d="M16.82 2H7.18C5.05 2 3.32 3.74 3.32 5.86v14.09c0 1.8 1.29 2.56 2.87 1.69l4.88-2.71c.52-.29 1.36-.29 1.87 0l4.88 2.71c1.58.88 2.87.12 2.87-1.69V5.86C20.68 3.74 18.95 2 16.82 2Z" stroke="#FF8A65" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="m9.59 11 1.5 1.5 4-4" stroke="#FF8A65" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                                                                                                                    Entragado
                                                                                                                </Button>
                                                                                                            </>
                                                                                                        ) :  order.status === 'Cancelled' ? (
                                                                                                                <>
                                                                                                                
                                                                                                                </>
                                                                                                        ) : (
                                                                                                        <>
                                                                                                            <small>Quedan <b>{remainTimeInMinutes(order.updated_at)}</b> minutos de <b>10</b> para que desaparezca</small>
                                                                                                        </>
                                                                                                        )}
                                                                                                        
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div class="">

                                                                                            </div>
                                                                                        </div>
                                                                                        <CollapsibleContent className="px-1 py-1 space-y-2 bg-gray-400/20 content-collapse">
                                                                                            {order.orderDetails.map((orderDetail, index) => (
                                                                                                <div  key={index}>
                                                                                                    <div className="flex items-center  rounded-[20px] px-4 py-2 font-mono text-sm text-white border  shadow-sm">
                                                                                                        <div class=" w-4 flex items-center justify-center h-full bg-red-500/20 rounded-lg">
                                                                                                            {index + 1}
                                                                                                        </div>
                                                                                                        <div class="ml-auto">
                                                                                                            {orderDetail.quantity * orderDetail.item_price} 
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    
                                                                                                    <OrdersDetails data={orderDetail} />
                                                                                                </div>
                                                                                            ))}
                                                                                        </CollapsibleContent>
                                                                                    </Collapsible>
                                                                                </>
                                                                            )}
                                                                        </>
                                                                    )}
                                                                </>
                                                            )}
                                                        
                                                        </>
                                                    ))}
                                                </>
                                            ) : (
                                                <>
                                                    No hay ordenes pendientes
                                                </>
                                            )}
                                    
                                        
                                            
                                        
                                    </div>
                                </ScrollArea>
                            </div>
                        </div>
                        <div class="">
                            <h3 class="pb-4 mt-12 text-2xl font-semibold tracking-tight border-b font-heading scroll-m-20 first:mt-0">Ultimas ordenes</h3>
                            <div class="">
                            <ScrollArea className="w-full px-2 py-2 rounded-md h-[500px]">
                                {/*    <OrderLast />  */}
                            </ScrollArea>     
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2>Menus disponibles: {count}</h2>
                        <div class="grid grid-cols-2 gap-6">
                            <div class="bg-white rounde-lg shadow">
                                <BarChart
                                    className="mt-6"
                                    data={chartdata}
                                    index="name"
                                    categories={["Number of threatened species"]}
                                    colors={["blue"]}
                                    valueFormatter={dataFormatter}
                                    yAxisWidth={48}
                                />
                                <div class="">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7Z" stroke="#FF8A65" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="m7.33 14.49 2.38-3.09c.34-.44.97-.52 1.41-.18l1.83 1.44c.44.34 1.07.26 1.41-.17l2.31-2.98" stroke="#FF8A65" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                                </div>
                                <h2>Precio total: {totalPrice}</h2>
                                
                            </div>
                            <div class="">
                                <h2 class="scroll-m-20 text-4xl font-bold tracking-tight">Productos mas vendidos</h2>
                            </div>
                        </div>
                    </div>
                    <div class="pt-5 grid grid-cols-3">
                        
                        <div class="col col-span-2">
                            
                            
                        </div>
                        <div class="">
                            
                        </div>
                    </div>

                </div>
            ) }

            
            
        </div>
    );
}


'use client'
import React, { useState, useEffect, useRef, Fragment } from 'react'
import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"

import { Card, Metric, Text, AreaChart, BadgeDelta, Flex, DeltaType, Grid, BarList, TextInput } from "@tremor/react";
import { formatPriceChile, getCurrentDateTime, formatDate } from "@/lib/utils"

import { CalendarIcon } from "@radix-ui/react-icons"
import { addDays, parse, format } from "date-fns"
import esLocale from 'date-fns/locale/es';
import { DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Dialog, Transition } from "@headlessui/react";
import { ArrowsExpandIcon } from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";


const pages = [
  {
    name: "/",
    value: 2019,
  },
  //...
  {
    name: "/about",
    value: 302,
  },
];



async function getAllMenus() {
  const URL_API =  process.env.URL_API || 'http://localhost:3001/api/';
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







const valueFormatter = (number) => `$${Intl.NumberFormat("us").format(number).toString()}`;


const TotalSellAndPorcent = (data) => {
  let totalVentas = 0;
  let porcentajeCrecimiento = 0;
  const porcentaje = []

  for (let i = 0; i < data.length; i++) {
    totalVentas += data[i].Ventas;

      if (i > 0) {
          const ventasMesAnterior = data[i - 1].Ventas;
          const ventasActual = data[i].Ventas;
      
          
          
          // Verificar si las ventas del mes anterior son mayores que cero
          if (ventasMesAnterior > 0) {
              // Calcular la diferencia en ventas
              const diferenciaVentas = ventasActual - ventasMesAnterior;

              // Calcular el porcentaje de crecimiento
              porcentajeCrecimiento = (diferenciaVentas / ventasMesAnterior) * 100;
              porcentaje.push(porcentajeCrecimiento)
          } else {
              // Manejar el caso donde las ventas del mes anterior son cero
              porcentajeCrecimiento = 0;
              porcentaje.push(porcentajeCrecimiento)
          }
      }
  }

  const resultadoFinal = {
      VentasTotales: totalVentas,
      PorcentajeCrecimiento: isNaN(porcentajeCrecimiento) ? '0' : porcentajeCrecimiento.toFixed(2),
  };



  return resultadoFinal
}






export default function Page({ className }) {
  const [dataOrders, setDataOrders] = useState([])
  const [dataTotalSellAll, setDataTotalSellAll] = useState(0)
  const [rangeTotal, setRangeTotal] = useState({})
  const [topMenus, setTopMenus] = useState([])

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const filteredpages = topMenus.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const  getTotalSellAll = async () => {
    const URL_API =  process.env.URL_API || 'http://localhost:3001/api/';
    try {
        const response = await fetch(`${URL_API}dashboard/getTotalSellAll`, {
          cache: 'no-store'
        });
        if (!response.ok) throw new Error(response.statusText);
        const data = await response.json();
      
        setDataTotalSellAll(data)
    }
    catch (error) {
        console.log(error);
    }
  }

  const TotalSellOrders = (data) => {
    if (!Array.isArray(data)) {
        console.error("El objeto data no es una matriz.");
        return 0;  // O algún otro valor predeterminado
    }
    console.log(data)
    return data.reduce((total, monthData) => total + (monthData.Ordenes || 0), 0);
  }

  const getRangeTotalSell = async (start, end) => {
    const URL_API =  process.env.URL_API || 'http://localhost:3001/api/';
    const parsedDate = parse(start, "EEEE, d 'de' MMMM 'de' yyyy", new Date(), { locale: esLocale });
    const formattedDate = format(parsedDate, 'yyyy-MM-dd');

    const parsedDate2 = parse(end, "EEEE, d 'de' MMMM 'de' yyyy", new Date(), { locale: esLocale });
    const formattedDate2 = format(parsedDate2, 'yyyy-MM-dd');
    try {
        const response = await fetch(`${URL_API}dashboard/getRangeTotalSell/${formattedDate}/${formattedDate2}`);
        if (!response.ok) throw new Error(response.statusText);
        const data = await response.json();
  
        setRangeTotal(data)

      
      
    }
    catch (error) {
        console.log(error);
    }
  }

  const getTotalMenus = async () => {
    const URL_API =  process.env.URL_API || 'http://localhost:3001/api/';
    try {
        const response = await fetch(`${URL_API}dashboard/getTopMenus`, {
          cache: 'no-store'
        });

        if (!response.ok) throw new Error(response.statusText);
        const data = await response.json();

        setTopMenus(data)



    } catch (error) {

    }
  }

  const [date, setDate] = React.useState({
    from: new Date(2023, 2, 1),
    to: addDays(new Date(), 0)
  })





  useEffect(() => {
    getTotalSellAll()
    getAllMenus().then((data) => {
      setDataOrders(data)
    })
    getRangeTotalSell(formatDate(date.from), formatDate(date.to))
    getTotalMenus()
  
    
  

  
  }, [])




  return (
    <div class="container">
        
        <div className="flex-col flex-1 hidden h-full p-8 space-y-8 md:flex">
        <div className="flex flex-col items-center justify-between space-y-2">
          <div class="flex justify-end w-full">
            <div className={cn("flex pt-5", className)}>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                      "w-[300px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                    
                  >
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, "LLL dd, y")} -{" "}
                          {format(date.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(date.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
              <Button
                className='ml-2'
                onClick={() => getRangeTotalSell(formatDate(date.from), formatDate(date.to))}
              >
                Buscar
              </Button>
            </div>
          </div>
          <div className="flex items-center w-full" >
            <h1 class="scroll-m-20 text-xl font-bold tracking-tight mb-0">Gestión de ordenes</h1>
            <div class="ml-auto">
                <div class="flex flex-col">
                  <Text className="text-right">Ventas totales</Text>
                  <Metric>{formatPriceChile(dataTotalSellAll)}</Metric>
                </div>
            </div>
          </div>
          
        </div>


        
                
        <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
            <Card key='Ventas'>
              <Flex alignItems="start">
                <Text>Ventas</Text>
                <BadgeDelta >{TotalSellAndPorcent(rangeTotal).PorcentajeCrecimiento}</BadgeDelta>
              </Flex>
              <Flex className="space-x-3 truncate" justifyContent="start" alignItems="baseline">
                <Metric>{formatPriceChile(TotalSellAndPorcent(rangeTotal).VentasTotales)}</Metric>
              </Flex>
              <AreaChart
                className="mt-6 h-28"
                data={rangeTotal}
                index="Month"
                valueFormatter={valueFormatter}
                categories={['Ventas']}
                colors={["blue"]}
                showXAxis={true}
                showGridLines={false}
                startEndOnly={true}
                showYAxis={false}
                showLegend={false}
              />
            </Card>
            <Card key='Ordenes'>
              <Flex alignItems="start">
                <Text>Ordenes</Text>
              </Flex>
              <Flex className="space-x-3 truncate" justifyContent="start" alignItems="baseline">
                <Metric>{TotalSellOrders(rangeTotal)}</Metric>
              </Flex>
              <AreaChart
                className="mt-6 h-28"
                data={rangeTotal}
                index="Month"
              
                categories={['Ordenes']}
                colors={["blue"]}
                showXAxis={true}
                showGridLines={false}
                startEndOnly={true}
                showYAxis={false}
                showLegend={false}
              />
            </Card>
            <Card className="max-w-xl mx-auto">
          <Flex alignItems="center" justifyContent="between">
            <Text className="text-base font-medium text-gray-700">Top Ordenes</Text>
            <Text className="uppercase">Menus</Text>
          </Flex>
          <BarList
            data={topMenus.slice(0, 5)}
            className="mt-8"
            showAnimation={false}
          
          />
          <Button
            icon={ArrowsExpandIcon}
            className="w-full mt-4 text-gray-500 bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300"
            onClick={openModal}
          >
            Ver más
          </Button>
        </Card>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900 bg-opacity-25" />
            </Transition.Child>
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex items-center justify-center min-h-full p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel
                    className="w-full max-w-xl p-6 overflow-hidden text-left align-middle transition-all transform bg-white ring-tremor shadow-tremor rounded-xl"
                  >
                    <Flex alignItems="center" justifyContent="between">
                      <Text className="text-base font-medium text-gray-700">Top Ordenes</Text>
                      <Text className="uppercase">Menus</Text>
                    </Flex>
                    <TextInput
                      icon={SearchIcon}
                      placeholder="Search..."
                      className="mt-6"
                      onChange={(event) => setSearchQuery(event.target.value)}
                    />
                    <div className="relative mt-4 h-[450px] overflow-y-scroll">
                      <BarList
                        data={filteredpages}
                        className="mr-4" // to give room for scrollbar
                        showAnimation={false}
                        valueFormatter={valueFormatter}
                      />
                      <div className="sticky inset-x-0 bottom-0 h-20 p-6 bg-gradient-to-t from-white to-transparent" />
                    </div>
                    <Button
                      className="w-full mt-2 text-gray-500 bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                      onClick={closeModal}
                    >
                      Regresar
                    </Button>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
            
        
        </Grid>
        {console.log(dataOrders)}
        <div class="bg-white">
          <DataTable columns={columns} data={dataOrders} />
        </div>
      </div>

    </div>
  )
}

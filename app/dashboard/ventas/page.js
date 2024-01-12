"use client"

import React, { useState, useEffect } from 'react'
import { Card, Title, AreaChart } from "@tremor/react";

const chartdata = [
  {
    date: "Jan 22",
    SemiAnalysis: 2890,
    "The Pragmatic Engineer": 2338,
  },
  {
    date: "Feb 22",
    SemiAnalysis: 2756,
    "The Pragmatic Engineer": 2103,
  },
  {
    date: "Mar 22",
    SemiAnalysis: 3322,
    "The Pragmatic Engineer": 2194,
  },
  {
    date: "Apr 22",
    SemiAnalysis: 3470,
    "The Pragmatic Engineer": 2108,
  },
  {
    date: "May 22",
    SemiAnalysis: 3475,
    "The Pragmatic Engineer": 1812,
  },
  {
    date: "Jun 22",
    SemiAnalysis: 3129,
    "The Pragmatic Engineer": 1726,
  },
];

const dataFormatter = (number) => {
  return "$ " + Intl.NumberFormat("us").format(number).toString();
};

export default function Page() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [totalSalesMothly, setTotalSalesMothly] = useState(0);




  const getAllSales = async () => {
    const URL_API = 'https://talita-backend-dev-production.up.railway.app/api/'
    const date = new Date();
    const currentMonth = date.getMonth() + 1; // +1 porque getMonth() devuelve meses de 0-11
    const currentYear = date.getFullYear();

    
    try {
      const response = await fetch(URL_API + 'ventas');
      if (!response.ok) throw new Error(response.statusText);
      const data = await response.json();
      console.log(data)
      setTotalPrice(data.total_ventas)
      setTotalSales(data.total_registros)
    } catch (error) {
      console.log(error);
    }
  }

  const mothlyToday = async () => {
    const date = new Date()
    const mothly = date.getMonth()
    const convertoText = mothly.toString()
    return convertoText
  }

  useEffect(() => {
    getAllSales()
  }, [])


  return (
    <div>
        <div class="pb-6 pt-4">
          <div class="grid grid-cols-4 gap-6">
            <div class="rounded-xl border bg-card text-card-foreground shadow">
                <div class="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                    <h3 class="tracking-tight text-sm font-medium">Total vendido</h3>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="h-4 w-4 text-muted-foreground">
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                </div>
                <div class="p-6 pt-0">
                    <div class="text-2xl font-bold">$ {totalPrice}</div>
                    <p class="text-xs text-muted-foreground">Ordenes: {totalSales}</p>
                </div>
            </div>
            <div class="rounded-xl border bg-card text-card-foreground shadow">
                <div class="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                    <h3 class="tracking-tight text-sm font-medium">Total vendido por el mes de junio </h3>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="h-4 w-4 text-muted-foreground">
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                </div>
                <div class="p-6 pt-0">
                    <div class="text-2xl font-bold">$ {totalPrice}</div>
                    <p class="text-xs text-muted-foreground">Ordenes: {totalSales}</p>
                </div>
            </div>
            <div class="rounded-xl border bg-card text-card-foreground shadow">
                <div class="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                    <h3 class="tracking-tight text-sm font-medium">Total vendido</h3>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="h-4 w-4 text-muted-foreground">
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                </div>
                <div class="p-6 pt-0">
                    <div class="text-2xl font-bold">$ {totalPrice}</div>
                    <p class="text-xs text-muted-foreground">Ordenes: {totalSales}</p>
                </div>
            </div>
            <div class="rounded-xl border bg-card text-card-foreground shadow">
                <div class="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                    <h3 class="tracking-tight text-sm font-medium">Total vendido</h3>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="h-4 w-4 text-muted-foreground">
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                </div>
                <div class="p-6 pt-0">
                    <div class="text-2xl font-bold">$ {totalPrice}</div>
                    <p class="text-xs text-muted-foreground">Ordenes: {totalSales}</p>
                </div>
            </div>
          </div>
          
        </div>
        <Card>
          <Title>Newsletter revenue over time (USD)</Title>
          <AreaChart
            className="mt-4 h-72"
            data={chartdata}
            index="date"
            categories={["SemiAnalysis", "The Pragmatic Engineer"]}
            colors={["indigo", "cyan"]}
            valueFormatter={dataFormatter}
          />
        </Card>
    </div>
  )
}

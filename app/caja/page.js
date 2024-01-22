'use client'
import React, { useState, useEffect, useRef, Fragment } from 'react'
import { Card, Grid, Metric, Text,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableBody,
  BadgeDelta
 } from "@tremor/react";




const categories = [
  {
    title: "Total vendido desde la ultima cuadratura",
    metric: "$ 23,456",
  },
  
];

const salesPeople = [
  {
    name: "Peter Doe",
    leads: 45,
    sales: "1,000,000",
    quota: "1,200,000",
    variance: "low",
    region: "Region A",
    delta: "overperforming",
    deltaType: "moderateIncrease",
  },
  {
    name: "Lena Whitehouse",
    leads: 35,
    sales: "900,000",
    quota: "1,000,000",
    variance: "low",
    region: "Region B",
    delta: "average",
    deltaType: "unchanged",
  },
  {
    name: "Phil Less",
    leads: 52,
    sales: "930,000",
    quota: "1,000,000",
    variance: "medium",
    region: "Region C",
    delta: "underperforming",
    deltaType: "moderateDecrease",
  },
  {
    name: "John Camper",
    leads: 22,
    sales: "390,000",
    quota: "250,000",
    variance: "low",
    region: "Region A",
    delta: "overperforming",
    deltaType: "increase",
  },
  {
    name: "Max Balmoore",
    leads: 49,
    sales: "860,000",
    quota: "750,000",
    variance: "low",
    region: "Region B",
    delta: "overperforming",
    deltaType: "increase",
  },
  {
    name: "Peter Moore",
    leads: 82,
    sales: "1,460,000",
    quota: "1,500,000",
    variance: "low",
    region: "Region A",
    delta: "average",
    deltaType: "unchanged",
  },
  {
    name: "Joe Sachs",
    leads: 49,
    sales: "1,230,000",
    quota: "1,800,000",
    variance: "medium",
    region: "Region B",
    delta: "underperforming",
    deltaType: "moderateDecrease",
  },
];

export default function Page({ className }) {



  return (
    <div class="container">
        
      <div className="flex-col flex-1 hidden h-full p-8 space-y-8 md:flex">
        <div className="flex flex-col items-center justify-between space-y-2">
          <div class="flex justify-end w-full">
          </div>
          <div className="flex items-center w-full" >
            <h1 class="scroll-m-20 text-xl font-bold tracking-tight mb-0">Cuadratura de caja</h1>
          </div>
        </div>
      </div>
        <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
          {categories.map((item) => (
            <Card key={item.title}>
              <Text>{item.title}</Text>
              <Metric>{item.metric}</Metric>
            </Card>
          ))}
        </Grid>
        <Card>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell></TableHeaderCell>
            <TableHeaderCell className="text-right"></TableHeaderCell>
            <TableHeaderCell className="text-right"></TableHeaderCell>
            <TableHeaderCell className="text-right"></TableHeaderCell>
            <TableHeaderCell className="text-right"></TableHeaderCell>
            <TableHeaderCell className="text-right"># Transaccion</TableHeaderCell>
            <TableHeaderCell className="text-right">Recaudacion Propia	</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
              <TableCell>TRX pagadas con efectivo (4)</TableCell>
              <TableCell className="text-right"></TableCell>
              <TableCell className="text-right"></TableCell>
              <TableCell className="text-right"></TableCell>
              <TableCell className="text-right">s</TableCell>
              <TableCell className="text-right">s</TableCell>
              <TableCell className="text-right">
                s
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>TRX pagadas con tarjeta de credito</TableCell>
              <TableCell className="text-right"></TableCell>
              <TableCell className="text-right"></TableCell>
              <TableCell className="text-right"></TableCell>
              <TableCell className="text-right">s</TableCell>
              <TableCell className="text-right">s</TableCell>
              <TableCell className="text-right">
                s
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>TRX pagadas con tarjeta de debito</TableCell>
              <TableCell className="text-right"></TableCell>
              <TableCell className="text-right"></TableCell>
              <TableCell className="text-right"></TableCell>
              <TableCell className="text-right">s</TableCell>
              <TableCell className="text-right">s</TableCell>
              <TableCell className="text-right">
                s
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>TRX pagadas con tarjeta</TableCell>
              <TableCell className="text-right"></TableCell>
              <TableCell className="text-right"></TableCell>
              <TableCell className="text-right"></TableCell>
              <TableCell className="text-right">s</TableCell>
              <TableCell className="text-right">s</TableCell>
              <TableCell className="text-right">
                s
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>TRX Totales</TableCell>
              <TableCell className="text-right"></TableCell>
              <TableCell className="text-right"></TableCell>
              <TableCell className="text-right"></TableCell>
              <TableCell className="text-right">s</TableCell>
              <TableCell className="text-right">s</TableCell>
              <TableCell className="text-right">
                s
              </TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </Card>

      <div class="bg-white rounded-lg">
        asd
      </div>
    </div>
  )
}

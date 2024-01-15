'use client'
import React, { useState } from 'react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { ReloadIcon } from "@radix-ui/react-icons"


export default function Page() {


    const [isLoading, setIsLoading] = useState(false);

    const handlerSubmit = async  (e) => {
        setIsLoading(true)
        const URL_API =  process.env.URL_API || 'http://localhost:3001/api/';
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const nombre = formData.get('nombre')
        const descripcion = formData.get('descripcion')
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Agrega un 0 inicial si el mes es menor a 10
        const day = String(date.getDate()).padStart(2, '0'); // Agrega un 0 inicial si el día es menor a 10
        const hours = String(date.getHours()).padStart(2, '0'); // Agrega un 0 inicial si la hora es menor a 10
        const minutes = String(date.getMinutes()).padStart(2, '0'); // Agrega un 0 inicial si los minutos son menores a 10
        const seconds = String(date.getSeconds()).padStart(2, '0'); // Agrega un 0 inicial si los segundos son menores a 10
        
        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        const createdAt = formattedDate
        const updatedAt = formattedDate
        
        
        const response = await fetch(URL_API + 'categorias', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
          body: JSON.stringify({ nombre, descripcion, createdAt, updatedAt /*session.user.id*/ })
            
        })

        if (response.ok) {
            const menu = await response.json()
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve()
                    setIsLoading(false)
                    toast.success("Categoria agregada con éxito")
                }, 3000)
            })

          
        }
    }

  return (
    <div class="container">
        <div class="flex w-full pb-5 pt-5">
            <h1 class="text-2xl font-bold">Agregar categoría</h1>
        </div>
        <div class="px-4 py-4">

          <Card className={cn("w-[380px] mx-auto")}>
            <CardHeader>
              <CardTitle>Agregar una nueva categoría</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <form onSubmit={handlerSubmit}>
                <div className=" rounded-mdr">

                    <div className="grid w-full max-w-sm items-center gap-1.5 mb-5">
                        <Label htmlFor="nombre">Nombre de la categoría</Label>
                        <Input id="nombre" name="nombre" type="text" />
                    </div>


                    <div className="grid w-full max-w-sm items-center gap-1.5 mb-5">
                        <Label htmlFor="nombre">Descripción</Label>
                        <Input id="descripcion"  name="descripcion" type="text" />
                    </div>



                  
                  
                  
                    
                        <div class="pt-5">
                            <Button type="submit" className="w-full" disabled={isLoading}>
                              {isLoading && (
                                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                              )}
                                Agregar categoría
                            </Button>
                        </div>
                    
                </div>
              </form>
            </CardContent>
            
          </Card>
        </div>
    </div>
  )
}

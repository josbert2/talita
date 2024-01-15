'use client'

import React, { useEffect, useState } from 'react'
import debounce from 'lodash/debounce';
import CartMenu from '../../components/CardMenus'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import Loading from '../loading'
import SvgIcon from './components/Icon'
import { Input } from "@/components/ui/input"
import { useDebounce } from "@/lib/utils"





const Page = () => {

    const [categorias, setCategorias] = useState([])
    const [loading, setLoading] = useState(true);
    const [filteredMenus, setFilteredMenus] = useState([]);
    const [search, setSearch] = useState('')
    const debouncedSearch = useDebounce(search, 500)

    const getMenus = async (search = '') => {
      const URL_API =  process.env.URL_API || 'http://localhost:3001/api/';
      try {
          const response = await fetch(`${URL_API}menus?q=${search}`);
          if (!response.ok) throw new Error(response.statusText);
          const data = await response.json();
          
          setFilteredMenus(data);
          setLoading(false)
      }
      catch (error) {
          console.log(error);
      }
    }

    const getAllCategorias = async (search = '') => {
      const URL_API =  process.env.URL_API || 'http://localhost:3001/api/';
      try {
          const response = await fetch(`${URL_API}categorias`);
          if (!response.ok) throw new Error(response.statusText);
          const data = await response.json();
      
          setCategorias(data); 
      } catch (error) {

      }
    }

    useEffect(() => {
      console.log(debouncedSearch)
      if (debouncedSearch) {
        getMenus(debouncedSearch)
      } else {
        getMenus()
      }
      getAllCategorias()
    }, [search, debouncedSearch])
    
    return (
      <>
        <div className='container'>
            <div class="grid grid-cols-12 gap-10 mt-10">
            
              <div class="col-span-3">
                  <div class="grid grid-cols-2 gap-5">
                    {categorias.map((categoria) => (
                      <div key={categoria.id} class="bg-white px-4 py-4 rounded-lg  flex flex-col">
                        <div class="flex items-center justify-center mb-3">
                          {SvgIcon({ name: categoria.svg_nombre_categoria })}
                        </div>
                        <div class=" text-center">
                          {categoria.nombre_categoria}
                        </div>
                        <div class="text-center text-xs justify-center flex items-center mt-auto text-blue-500">
                          ({categoria.numero_de_productos}) menus 
                        </div>
                      </div>
                    ))}
                  </div>
                  
              </div>
              <div class="col-span-9">
                <div class="pb-6 flex items-center">
                  <div className="flex items-center w-full max-w-sm space-x-2">
                    <div class="bg-white">
                    <Input type="text"  placeholder="Buscar menus" 
                      value={search}
                      onChange={(e) => {
                          setSearch(e.target.value);
                      }}
                    />
                    </div>
                    <Button type="submit" >Buscar</Button>
                  </div>
                  <div class="ml-auto flex items-center">
                  
                    <Button> 
                      <Link href="/menus/add">
                        <div class="flex items-center">
                          <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" 
                          width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M8 12h8M12 16V8M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7Z" stroke="#FFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                          Añadir menu 
                        </div>
                      </Link>
                    </Button>
                  </div>
                </div>
                <div class="grid grid-cols-4 gap-5">
                {loading ? (
                    <Loading />
                ) : (
                  <>
                    <CartMenu menus={filteredMenus} />
                  </>
                  
                  
                  )}
                </div>
              </div>

            </div>
        </div>
      </>
    )
}

export default Page
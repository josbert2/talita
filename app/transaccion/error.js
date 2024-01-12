'use client'
import React from 'react'
import { Button } from "@/components/ui/button"

export default function Error() {
  return (
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
  )
}

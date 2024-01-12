'use client'
import Image from 'next/image'
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center"
      style={{
        backgroundImage: "url('https://shop-redq.vercel.app/_next/static/images/grocery-f1565ac25de02b9295dccc2da13004ab.png')",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      >
        <div className=" flex item-center h-full font-extrabold text-2xl">
          Groceries Delivered in 90 Minute
        </div>
        <div className=" pt-4">
          <Button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            type="button"
          >
            Get Started
          </Button>
        </div>
      
    </main>
  )
}

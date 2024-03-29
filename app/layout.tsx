'use client'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

import Header from '../components/Header'
import Loading from './loading.js';
import { Toaster } from "../components/ui/sonner"
import Providers from './Providers'
import { StoreProvider } from './redux/StoreProvider'


const inter = Inter({ subsets: ['latin'] })

const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const customStyle: React.CSSProperties = {
    marginRight: 0,
  };
  const pathname = usePathname();
  return (
    
    <html lang="en">
      <body className={inter.className} style={customStyle}>
        <StoreProvider>
            <Providers>
                  {pathname !== '/signup' && pathname !== '/login' && pathname !== '/transaccion' ? (
                  <div className="">
                      <Header />
                      <div className="main-content">
                          <div >
                            <Suspense fallback={<Loading/>}>
                              {children}
                            </Suspense>
                          </div>
                          <Toaster />
                      </div>
                  </div>
                ) : (
                  <div>
                    {children}
                  </div>
                )}
            </Providers>
        </StoreProvider>
        <Toaster />
      </body>
    </html>
  )
}

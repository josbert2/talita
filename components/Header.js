'use client'

import React, { useEffect, useState } from 'react'
import Link from "next/link"

import { useSelector } from 'react-redux'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export default function Header() {
    const { data: session, status } = useSession()
    const { loading, cartItems } = useSelector((state) => state.cart)
    const [intNumberCart, setIntNumberCart] = useState(0);
    const pathname = usePathname()

    

    const rutasActivas = [
        '/dashboard/menus',
        '/dashboard/settings',
        '/dashboard/profile',
        // ... puedes agregar tantas rutas como necesites
    ];
    useEffect(() => {
        if (loading || !cartItems) {
            setIntNumberCart(0);
        } else {
            setIntNumberCart(cartItems.length > 0 ? cartItems.reduce((a, c) => a + c.qty, 0) : 0);
        }
    }, [loading, cartItems]);


    const isActive = rutasActivas.includes(pathname);


    return (
        <header className="sticky top-0 z-50 w-full border-b  supports-backdrop-blur:bg-background/60 bg-background/95 backdrop-blur">
            <div className="container flex items-center px-20 h-14">
                <div className="hidden mr-4 md:flex">
                    <a className="flex items-center mr-6 space-x-2" href="/">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        viewBox="0 0 256 256"
                        >
                        <path fill="none" d="M0 0H256V256H0z"></path>
                        <path
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="16"
                            d="M208 128L128 208"
                        ></path>
                        <path
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="16"
                            d="M192 40L40 192"
                        ></path>
                        </svg>
                        <span className="hidden font-bold sm:inline-block">Talita Restaurant</span>
                    </a>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        
                        
                        <Link activeClassName="active" className='transition-colors hover:text-foreground/80 text-foreground/60' href="/dashboard">
                            Dashboard
                        </Link>
                        <Link  activeClassName="active" className='transition-colors hover:text-foreground/80 text-foreground/60' href="/menus">
                            Menus
                        </Link>
                        <Link  activeClassName="active" className='transition-colors hover:text-foreground/80 text-foreground/60' href="/categorias">
                            Categorías
                        </Link>
                        <Link  activeClassName="active" className='transition-colors hover:text-foreground/80 text-foreground/60' href="/orders">
                            Ordenes
                        </Link>
                        <Link  activeClassName="active" className='transition-colors hover:text-foreground/80 text-foreground/60' href="/caja">
                            Caja
                        </Link>
                        
                    </nav>
                </div>
                <button
                    className="inline-flex items-center justify-center px-0 py-2 mr-2 text-base font-medium transition-colors rounded-md focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                    type="button"
                    aria-haspopup="dialog"
                    aria-expanded="false"
                    aria-controls="radix-:R15hja:"
                    data-state="closed"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        fill="none"
                        className="w-5 h-5"
                        viewBox="0 0 15 15"
                        >
                        <path
                            fill="currentColor"
                            fillRule="evenodd"
                            d="M8 2h5.5a.5.5 0 01.5.5v10a.5.5 0 01-.5.5H8V2zM7 2H1.5a.5.5 0 00-.5.5v10a.5.5 0 00.5.5H7V2zm-7 .5A1.5 1.5 0 011.5 1h12A1.5 1.5 0 0115 2.5v10a1.5 1.5 0 01-1.5 1.5h-12A1.5 1.5 0 010 12.5v-10z"
                            clipRule="evenodd"
                        ></path>
                        </svg>
                    <span className="sr-only">Toggle Menu</span>
                </button>
                <div className="flex items-center justify-between flex-1 space-x-2 md:justify-end">
                    <nav className="flex items-center">
                        {session ? (
                            <>
                                <div className="mr-4">
                                {session.user && (
                                    <div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>{session.user.nombre}</DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuLabel>Mi perfil</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>Mis ventas</DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>Configuraciones</DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Link href="api/auth/signout" className="text-red-500">
                                                        Cerrar sesión
                                                    </Link>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    
                                    
                                )}
                            </div>
                            </>
                        ) : (
                            <>
                                <div>
                                    <Link href="/login" className="px-5">
                                        <div
                                            className="inline-flex items-center justify-center px-0 py-2 text-sm font-medium transition-colors rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
                                        >
                                            Login
                                        </div>
                                    </Link>
                                    <Link href="/signup" className="px-5">
                                        <div
                                            className="inline-flex items-center justify-center px-0 py-2 text-sm font-medium transition-colors rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
                                        >
                                            Signup
                                        </div>
                                    </Link>
                                </div>
                            </>
                        )}
                        <div className="flex items-center">
                            <div class="border px-2 flex h-auto py-0.5 rounded-lg">
                            {intNumberCart}
                            </div>
                            <Link href="/cart" className="ml-4">
                                <Badge variant="outline">
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    >
                                    <path
                                        stroke="#FF8A65"
                                        d="M2 2h1.74c1.08 0 1.93.93 1.84 2l-.83 9.96a2.796 2.796 0 002.79 3.03h10.65c1.44 0 2.7-1.18 2.81-2.61l.54-7.5c.12-1.66-1.14-3.01-2.81-3.01H5.82M16.25 22a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5zm-8 0a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5zM9 8h12"
                                    ></path>
                                    </svg>
                                </Badge>
                            </Link>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}
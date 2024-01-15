'use client'
import { set } from 'lodash';
import React, { useState } from 'react'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function Page() {

    const [error, setError] = React.useState(null);
    const router = useRouter()

    const handlerSubmit =  async (e) => {
        e.preventDefault();
        setError(null)

        const formData = new FormData(e.currentTarget)
        const nombre = formData.get('nombre')
        const email = formData.get('email')
        const password = formData.get('password')
        const NewPassword = formData.get('password')

        console.log(nombre, email, password)

        const URL_API = process.env.URL_AUTH_API_PROJECT || 'http://localhost:3000/api/'

        try {
            const response = await fetch(URL_API + 'auth/signup', {
                method: 'POST',
                body: JSON.stringify({ nombre, email, password })
    
            })
            const data = await response.json()

            console.log(data)

            const restingSignin = await signIn('credentials', {
                fullname: data.fullname,
                email: data.message,
                password: NewPassword,
                redirect: false
            })

            if (restingSignin.ok){
                router.push('/dashboard')
            }
                


            console.log(restingSignin)

            
            if (data.message === "User already exists"){
                setError(data.message)
            }
        } catch (error) {
            console.log(error)
            setError(error)
        }

    }



    return (
            
        <div class="">
            <section class="bg-gray-50 dark:bg-gray-900">
                <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        
                        Flowbite    
                    </a>
                    <div class="">
                        {error && <p class="text-red-500">{error}</p>}
                    </div>
                    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <form class="space-y-4 md:space-y-6" onSubmit={handlerSubmit}>
                                <div>
                                    <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                                    <input type="text" name="nombre" id="text" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                                </div>
                                <div>
                                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                    <input type="email" name="email" id="email" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>

                                <div>
                                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>
                                
                                <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet? <a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Page
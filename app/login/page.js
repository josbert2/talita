'use client'
import { set } from 'lodash';
import React, { useState } from 'react'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

function Page() {

    const [error, setError] = React.useState(null);
    const router = useRouter()

    const handlerSubmit =  async (e) => {
        e.preventDefault();
        setError(null)

        const formData = new FormData(e.currentTarget)
        const email = formData.get('email')
        const password = formData.get('password')
        const NewPassword = formData.get('password')
        const login = true

        console.log( email, password)

        const URL_API =  process.env.URL_AUTH_API_PROJECT || 'http://localhost:3000/api/'

        try {
            const response = await fetch(URL_API + 'auth/signup', {
                method: 'POST',
                body: JSON.stringify({ email, password, login })
    
            })
            const data = await response.json()

            console.log(data)

            const restingSignin = await signIn('credentials', {
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
        <>
            <div class="h-screen">
                <div class="login-form-bx h-full">
                    <div class="container-fluid h-full">
                        <div class="grid grid-cols-12 h-full">
                            <div class="box-skew flex col-span-7">
                                <div class="authincation-content">
                                    <div class="mb-4">
                                        <h3 class="mb-1 font-bold text-4xl text-[#3d4465]">Bienvenido a Talita</h3>
                                        <form class="space-y-4 md:space-y-6 pt-10" onSubmit={handlerSubmit}>
                                            <div>
                                                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                                <input type="email" name="email" id="email" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                            </div>

                                            <div>
                                                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                                <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                            </div>

                                            <Button type="submit" className="w-full btn btn-primary btn-block">Ingresar</Button>
                                            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                                Don’t have an account yet? <a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                                            </p>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div class="box-skew1 flex col-span-5">
                                <div class="inner-content align-self-center">
                                
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>        
    
    )
}

export default Page
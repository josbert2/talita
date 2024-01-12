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
        const email = formData.get('email')
        const password = formData.get('password')
        const NewPassword = formData.get('password')
        const login = true

        console.log( email, password)

        const URL_API = 'http://localhost:3000/api/'

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
            
        <div class="">
            <svg xmlns="http://www.w3.org/2000/svg" width="1266" height="300" viewBox="0 0 1266 300" fill="none"><div xmlns="" id="in-page-channel-node-id" data-channel-name="in_page_channel_cBRjEt"/><link xmlns="" type="text/css" rel="stylesheet" id="dark-mode-custom-link"/><link xmlns="" type="text/css" rel="stylesheet" id="dark-mode-general-link"/><style xmlns="" lang="en" type="text/css" id="dark-mode-custom-style"/><style xmlns="" lang="en" type="text/css" id="dark-mode-native-style"/><style xmlns="" lang="en" type="text/css" id="dark-mode-native-sheet"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M78.8462 0H79.2022H209.202H209.905L209.674 0.66426L105.674 299.664L105.558 300H105.202H-24.2978H-25L-24.7703 299.336L78.7297 0.336445L78.8462 0ZM79.5582 1L-23.5956 299H104.847L208.499 1H79.5582ZM430.846 0H431.202H561.202H561.906L561.674 0.66426L457.674 299.664L457.558 300H457.202H327.702H327L327.23 299.336L430.73 0.336445L430.846 0ZM431.558 1L328.404 299H456.847L560.499 1H431.558ZM783.202 0H782.846L782.73 0.336445L679.23 299.336L679 300H679.702H809.202H809.558L809.674 299.664L913.674 0.66426L913.906 0H913.202H783.202ZM680.404 299L783.558 1H912.499L808.847 299H680.404ZM253.846 0H254.202H384.202H384.905L384.674 0.66426L280.674 299.664L280.558 300H280.202H150.702H150L150.23 299.336L253.73 0.336445L253.846 0ZM254.558 1L151.404 299H279.847L383.499 1H254.558ZM606.202 0H605.846L605.73 0.336445L502.23 299.336L502 300H502.702H632.202H632.558L632.674 299.664L736.674 0.66426L736.906 0H736.202H606.202ZM503.404 299L606.558 1H735.499L631.847 299H503.404ZM957.846 0H958.202H1088.2H1088.91L1088.67 0.66426L984.674 299.664L984.558 300H984.202H854.702H854L854.23 299.336L957.73 0.336445L957.846 0ZM958.558 1L855.404 299H983.847L1087.5 1H958.558ZM1135.2 0H1134.85L1134.73 0.336445L1031.23 299.336L1031 300H1031.7H1161.2H1161.56L1161.67 299.664L1265.67 0.66426L1265.91 0H1265.2H1135.2ZM1032.4 299L1135.56 1H1264.5L1160.85 299H1032.4Z" fill="url(#paint0_linear_232_216)" fill-opacity="0.1"/>
            <defs>
                <linearGradient id="paint0_linear_232_216" x1="620.453" y1="0" x2="620.453" y2="300" gradientUnits="userSpaceOnUse">
                <stop stop-color="#FF794F"/>
                <stop offset="1" stop-color="white" stop-opacity="0"/>
                </linearGradient>
            </defs>
            </svg>
            <section class="bg-gray-50 ">
                <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
                        Ingresar a Talita    
                    </a>
                    <div class="">
                        {error && <p class="text-red-500">{error}</p>}
                    </div>
                    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Ingresa en Talita
                            </h1>
                            <form class="space-y-4 md:space-y-6" onSubmit={handlerSubmit}>
                        
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
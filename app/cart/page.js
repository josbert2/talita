'use client'

import { useState, useEffect } from 'react'

import { addToCart, removeFromCart, clearCart } from '../redux/slices/cartSlice'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Cookies from 'js-cookie'
import MetodoPagoContainer from "@/components/MetodoDePagoContainer"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { validateRut } from "@/lib/utils"

import { formatToPesosChilenos } from "@/helpers/utils"



// It's not what I feel for you, it's what I don't feel for anyone else.
export default function CartPage() {
  const dispatch = useDispatch()
  const router = useRouter()
  const [delivery, setDelivery] = useState(false)
  const [isDeliverySelected, setIsDeliverySelected] = useState(false); // Inicialmente marcado
  const [loadingState, setLoadingState] = useState(false)
  const [rut, setRut] = useState('')
  const [cliente, setCliente] = useState({})

  const handleDeliveryClick = () => {
    setIsDeliverySelected(!isDeliverySelected);
  };
  const { loading, cartItems, itemsPrice } = useSelector((state) => state.cart)

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }))
  }


  const handleClearCart = () => {
    dispatch(clearCart());
  };

  

  const rutFormat = (rut) => {
    var actual = rut.replace(/^0+/, "");
    if (actual != '' && actual.length > 1) {
        var sinPuntos = actual.replace(/\./g, "");
        var actualLimpio = sinPuntos.replace(/-/g, "");
        var inicio = actualLimpio.substring(0, actualLimpio.length - 1);
        var rutPuntos = "";
        var i = 0;
        var j = 1;
        for (i = inicio.length - 1; i >= 0; i--) {
            var letra = inicio.charAt(i);
            rutPuntos = letra + rutPuntos;
            if (j % 3 == 0 && j <= inicio.length - 1) {
                rutPuntos = "." + rutPuntos;
            }
            j++;
        }
        var dv = actualLimpio.substring(actualLimpio.length - 1);
        rutPuntos = rutPuntos + "-" + dv;
    }
    setRut(rutPuntos)
    return rutPuntos;
  }

  const { toast } = useToast()

  const handleClient = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const nombre = formData.get('nombre');
    const apellido = formData.get('apellido');
    const rut = formData.get('rut');
    const telefono = formData.get('telefono');
    const sinRut = formData.get('sin-rut');

    if(nombre === '' || apellido === '' || rut === '' || telefono === ''){
      toast({
          title: "Debes completar todos los campos",
          description:  "Agrega uno para continuar",
          variant: "destructive",
          action: <ToastAction  onClick={(e) => setLoadingState(false)} altText="Agregar">Agregar</ToastAction>,
      })
      return false
    }

  
    if (sinRut != 'on') {
      if (!validateRut(rut)) {
        toast({
            title: "Rut invalido",
            description:  "Agrega uno para continuar",
            variant: "destructive",
            action: <ToastAction  onClick={(e) => setLoadingState(false)} altText="Agregar">Agregar</ToastAction>,
        })
        return false
      }
    }
    

    try {
      const URL = 'http://localhost:3001/api/cliente'
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          apellido,
          rut,
          telefono
        })
      })
      const data = await response.json()
      setCliente(data.cliente)
    

    } catch (error) {
      console.log(error);
    }

    
  }

  const removeCliente = () => {
    setCliente({})
  }

  const handlerSubmit =  async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const medioPago = formData.get('medio-pago');
    const delivery = isDeliverySelected
    const initialState = Cookies.get('cart')

    



  ? { ...JSON.parse(Cookies.get('cart')), loading: false }
  : {
      loading: true,
      cartItems: [],
      shippingAddress: {},
      paymentMethod: '',
    }

  

    const createAtWithHours = new Date().toISOString().slice(0, 19).replace('T', ' ')
    if (Object.keys(cliente).length === 0) {
      toast({
          title: "Debes incluir un cliente",
          description:  "Agrega uno para continuar",
          variant: "destructive",
          action: <ToastAction  onClick={(e) => setLoadingState(false)} altText="Agregar">Agregar</ToastAction>,
      })
      return false
    }
    

    const URL = 'http://localhost:3001/api/addOrder'
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "table_number": 5,
        "order_date": createAtWithHours,
        "status": "Pending",
        "total_price": itemsPrice,
        "special_instructions": "Sin sal",
        "for_takeout": delivery,
        client_id: cliente.insertId,
        method_payment: medioPago,
        cartItems,
        for_takeout: delivery,
        itemsPrice
      })
    })


    

    const data = await response.json()
  
    setTimeout(() => {
      const id = data.id
      setLoadingState(false)
    

      // remove cart from local storage
      handleClearCart()
      router.push(`/transaccion/${id}`)
    }, 2000)
  }


  const [selectedMetodoPago, setSelectedMetodoPago] = useState(null);

  const handleCheckout = (metodoPago) => {
    setSelectedMetodoPago(metodoPago);
  };

  const metodosPago = ['Debito', 'Efectivo', 'Transferencia'];
  const [hasMounted, setHasMounted] = useState(false)
  useEffect(() => setHasMounted(true), [])


  return (
    <div className='container'>
      <h1 className="text-xl pb-10 pt-10">Carrito de pedidos</h1>
      {hasMounted ? (
      <form onSubmit={handlerSubmit} class="">
        {loading ? (
          <div>Loading...</div>
        ) : cartItems.length === 0 ? (
          <div>
            Cart is empty. <Link href="/">Go shopping</Link>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-4 md:gap-5">
              <div className="overflow-x-auto bg-white rounde-lg md:col-span-3">
                <table className="min-w-full">
                  <thead className="border-b">
                    <tr>
                      <th className="p-5 text-left">Plato</th>
                      <th className="p-5 text-right">Cantidad</th>
                      <th className="p-5 text-right">Price</th>
                      <th className="p-5">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td>
                          <Link
                            href={`/product/${item.id}`}
                            className="flex items-center"
                          >
                            <Image
                              src={item.imagen}
                              alt={item.name}
                              width={100}
                              height={70}
                              className="p-1 rounded-lg"
                            ></Image>
                            <div class="ml-3">
                              <div class="">
                                {item.nombre}
                              </div>
                              <div class="text-xs text-gray-900/60">
                                {item.descripcion}
                              </div>
                            </div>
                          </Link>
                        </td>
                        <td className="flex justify-end p-5 text-right" data-qty={item.qty}>
                      
                          <select
                            className="flex items-center justify-between px-3 py-2 text-sm bg-transparent border rounded-md shadow-sm h-9 border-input ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 "
                            value={item.qty}
                            onChange={(e) =>
                              addToCartHandler(item, Number(e.target.value))
                            }
                          >
                            {[...Array(10).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </select> 

                        
                        </td>
                        <td className="p-5 text-right">{formatToPesosChilenos(item.precio)}</td>
                        <td className="p-5 text-center">
                          <button
                            className="default-button"
                            onClick={() => removeFromCartHandler(item.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div class="bg-white rounde-lg">
                <div className="p-5 card rounde-lg" >
                  <ul>
                    <li>
                      <div className="pb-3 text-xl">
                        Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)}) : 
                        <span class="ml-2">{formatToPesosChilenos(itemsPrice)}</span>
                      </div>
                    </li>
                    <li class="flex items-center">
                    
                      <div className="grid gap-1.5 leading-none">
                        <div class="flex items-center">
                          <label
                            htmlFor="terms1"
                            className="mr-2 text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Tiene delivery?
                          </label>
                          <button
                            type="button"
                            role="checkbox"
                            aria-checked={isDeliverySelected}
                            data-state={isDeliverySelected ? 'checked' : 'unchecked'}
                            className={`peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow 
                                        focus-visible:outline-none focus-visible:ring-1 
                                        focus-visible:ring-ring disabled:cursor-not-allowed 
                                        disabled:opacity-50 
                                        data-[state=${isDeliverySelected ? 'checked' : 'unchecked'}]:bg-primary 
                                        data-[state=${isDeliverySelected ? 'checked' : 'unchecked'}]:text-primary-foreground`}
                            onClick={handleDeliveryClick}  // Maneja el clic para cambiar el estado
                          >
                            <span
                              data-state={isDeliverySelected ? 'checked' : 'unchecked'}
                              className="flex items-center justify-center text-current"
                              style={{ pointerEvents: 'none' }}
                            >
                              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
                                <path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                              </svg>
                            </span>
                          </button>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Los pedidos con delivery tienen un costo adicional de $2.00
                        </p>
                      </div>
                

                    </li>
                    <li class="pt-5">
                      <label
                            htmlFor=""
                            className="mr-2 text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                        Selecciona metodo de pago
                      </label>
                      {metodosPago.map((metodo, index) => (
                        <MetodoPagoContainer
                          key={index}
                          metodoPago={metodo}
                          isActive={selectedMetodoPago === metodo}
                        />
                      ))}
                      <Button
                        
                        className="w-full primary-button"
                        onClick={(e) => setLoadingState(true)}
                  
                      >
                          {loadingState ? (
                            <div >
                              <div role="status">
                                  <svg aria-hidden="true" class="w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                  </svg>
                                  <span class="sr-only">Loading...</span>
                              </div>
                            </div>
                          ) : (
                            <div>
                              Finalizar orden
                            </div>
                          )}


                      
                        </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
          
          </>
          
          
        )}
      </form>
      ) : null}
      <div class="grid md:grid-cols-4 ">
        
        <div class="bg-white rounde-lg p-5 mt-4 md:col-span-3">
          {Object.keys(cliente).length > 0 ? (
              <>
                <h2 class="mb-4">Cliente agregado</h2>
                
                <div className="mb-5 bg-gray-100 rounded-lg">
                  <div className="flex items-center px-3 py-3 rounded-lg">
                    <div className="w-full rounded-lg">
                      <div className="flex items-center w-full rounded-lg">
                        <div className="mr-2 rounde-full w-14 h-14">

                          <Image src='https://as1.ftcdn.net/v2/jpg/05/16/27/58/1000_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg' alt={cliente.nombre} width={150} height={150} className="w-full h-full p-1 rounded-full" />
                        </div>
                        <div className="flex flex-col">
                          <h3 className="font-bold text-gray-800">{cliente.nombre} {cliente.apellido}</h3>
                          <h3 className="mt-1 text-xs text-gray-600">{cliente.rut} - {cliente.telefono}</h3>
                        </div>
                        <div className="ml-auto cursor-pointer " onClick={removeCliente}>
                            <div className="px-5 py-3 font-bold bg-gray-200 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
                                  <path d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98M8.5 4.97l.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3M18.85 9.14l-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14M10.33 16.5h3.33M9.5 12.5h5" stroke="#FF8A65" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                </>
          ) : (
            <>
              
              
              <h4 class="text-xl mb-5">Agregar cliente </h4>

              <form onSubmit={handleClient}>
                  <div class="grid grid-cols-2 gap-5">

                    <div class="flex items-center">
                      <div class="mr-4">
                          <Label class="mb-1">Rut del Cliente</Label>
                          <Input type="text"
                          value={rut}
                          name="rut"
                            onChange={(e) => rutFormat(e.target.value)} />
                      </div>
                      <div class="flex flex-col">  
                        <Label class="mb-1">Sin Rut?</Label>
                        <input type="checkbox" name="sin-rut" id="sin-rut" />
                      </div>
                    </div>
                    <div class="">
                        <Label class="mb-1">Teléfono del Cliente</Label>
                        <Input type="text"
                        name="telefono"
                          />
                    </div>
                    <div class="">
                        <Label class="mb-1">Nombre del Cliente</Label>
                        <Input type="text" name="nombre"/>
                    </div>
                    <div class="">
                        <Label class="mb-1">Apellido del Cliente</Label>
                        <Input name="apellido"/>
                    </div>
                    
                    <div class="opacity-0">
                        asdasd
                    </div>
                    <div class="">
                      <Button  className="w-full primary-button">
                          Agregar cliente
                      </Button>
                    </div>
                  </div>
              </form>
            
      
            </>
          )}
          
        </div>
      </div>
    </div>
  )
}
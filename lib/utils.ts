'use client'
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { useEffect, useState } from "react"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function validateRut(rut: string) {
  // Eliminar puntos y guiones
  rut = rut.replace(/\./g, '').replace(/-/g, '').toUpperCase();

  // Extraer dígito verificador
  const dv = rut.slice(-1);
  rut = rut.slice(0, -1);

  // Validar formato del rut
  if (!/^\d+$/.test(rut) || rut.length < 7) {
    return false;
  }

  // Calcular dígito verificador esperado
  let sum = 0;
  let multiplier = 2;
  for (let i = rut.length - 1; i >= 0; i--) {
    sum += parseInt(rut[i]) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }

  const expectedDV = 11 - (sum % 11);
  const calculatedDV = expectedDV === 11 ? '0' : expectedDV === 10 ? 'K' : expectedDV.toString();

  return calculatedDV === dv;
}

export const formatPriceChile = (price: number) => {
  // Verifica si el precio es un número
  if (typeof price !== 'number') {
    throw new Error('El precio debe ser un número.');
  }

  // Convierte el número a una cadena con formato de moneda
  const formattedPrice = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  }).format(price);

  return formattedPrice;
}

export const rutFormat = (rut: string) => {
  var actual = rut.replace(/^0+/, "");
  var rutPuntos = '';
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

  return rutPuntos;
}


export function getCurrentDateTime() {
  const currentDate = new Date();
  // Configurar la zona horaria para Chile (hora estándar de Chile)
  const options = { timeZone: 'America/Santiago', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  return currentDate.toLocaleDateString('es-ES', options);
}


export function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
      const handler = setTimeout(() => {
          setDebouncedValue(value);
      }, delay);

      return () => {
          clearTimeout(handler);
      };
  }, [value, delay]);

  return debouncedValue;
}


export function formatDate(date: string) {
  const fecha = new Date(date);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return fecha.toLocaleDateString('es-ES', options as any);

}


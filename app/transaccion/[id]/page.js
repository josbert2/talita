'use client'
import React, { useEffect, useState, Suspense } from 'react'
import DataTransaccion from './dataTransaccion'

export default function page({ params }) {
  const ID = params.id
  return (
    <>
      <DataTransaccion id={ID} />
    </>
    
  )
}
import Image from 'next/image'
import { Inter } from 'next/font/google'
import React from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className='home-page'>
      <h1>HOME PAGE</h1>
    </div>
  )
}

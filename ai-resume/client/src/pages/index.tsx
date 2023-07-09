import Image from 'next/image'
import { Inter } from 'next/font/google'
import NavBar from '../../components/NavBar'
import React, { ReactNode } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <div>
        <h1>HOME PAGE</h1>
      </div>
    </main>
  )
}

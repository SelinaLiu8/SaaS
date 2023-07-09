import Image from 'next/image'
import { Inter } from 'next/font/google'
import NavBar from '../../components/navbar/NavBar'
import React, { ReactNode } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <NavBar>
        
      </NavBar>
    </div>
  )
}

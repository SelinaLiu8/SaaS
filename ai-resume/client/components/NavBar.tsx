import Link from 'next/link';
import Image from 'next/image';
import { useContext, ReactNode, useState, useEffect } from 'react';
import { UserContext } from '../lib/context';
import { useUserData } from '../lib/hooks'; // Assuming the hook is defined here
import ProfileImg from './ProfileImg';
import DropdownMenu from './DropdownMenu';
import Login from './login'
import dynamic from 'next/dynamic'


// Top navbar
const Navbar = ({children}) => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/" className="btn-logo">CL.AI</Link>
        </li>
        <li>
          <Link href="/about">About Us</Link>
        </li>
        <li>
          <Link href="/subscription">Subscription</Link>
        </li>
        <li>
          <button>GENERATE</button>
        </li>
        <li>
          <Link href='/enter'><Login/></Link>
        </li>
      </ul>
    </nav>
  );
}

export default dynamic(() => Promise.resolve(Navbar), {ssr:false})

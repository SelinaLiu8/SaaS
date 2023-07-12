import Link from 'next/link';
import Image from 'next/image';
import { useContext, ReactNode, useState, useEffect } from 'react';
import { UserContext } from '../lib/context';
import { useUserData } from '../lib/hooks'; // Assuming the hook is defined here
import ProfileImg from './ProfileImg';
import DropdownMenu from './DropdownMenu';
import Login from './login'
import dynamic from 'next/dynamic'

interface LoginProps {
  className: string;
  children: ReactNode;
}



// Top navbar
const Navbar :React.FC<LoginProps> = ({ className, children }) => {
  return (
    <nav className="navbar">
      <ul>
        <li className='nav-list'>
          <Link href="/" className="logo nav-item">CL.AI</Link>
        </li>
        <li>
          <Link href="/about" className='nav-item'>About Us</Link>
        </li>
        <li>
          <Link href="/subscription" nav-item>Subscription</Link>
        </li>
        <li>
          <Link href="/" className="nav-item"><button className='btn generate-btn'>GENERATE</button></Link>
        </li>
        <li>
          <Login {...className} className='nav-item'>{children}</Login>
        </li>
      </ul>
      {children}
    </nav>
  );
}

export default dynamic(() => Promise.resolve(Navbar), {ssr:false})

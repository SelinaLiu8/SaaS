import Link from 'next/link';
import Image from 'next/image';
import { useContext, ReactNode } from 'react';
import { UserContext } from '../../lib/context';
import { useUserData } from '../../lib/hooks'; // Assuming the hook is defined here
import NavItem from '../Login/ProfileImg';
import DropdownMenu from '../Login/DropdownMenu';

// Top navbar
export default function Navbar({ children }: { children: ReactNode }) {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <a href="/home" className="btn-logo">
            CL.AI
          </a>
        </li>
        <li>

        </li>
      </ul>
    </nav>
  );
}

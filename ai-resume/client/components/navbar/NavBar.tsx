import Link from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';
import { UserContext } from '../../lib/context';
import { useUserData } from '../../lib/hooks'; // Assuming the hook is defined here
import NavItem from './NavItem';
import DropdownMenu from './DropdownMenu';

// Top navbar
export default function Navbar({ children }) {
  const { user, username } = useUserData();

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/">
            <button className="btn-logo">ResumAI</button>
          </Link>
        </li>

        {/* user is signed-in and has username */}
        {user && (
          <>
            <li className="push-left">
              <Link href="/admin">
                <button className="btn-blue">Generate Resume</button>
              </Link>
            </li>
            <li>
              <Link href="/enter">
                <button className="btn-blue">Log out</button>
              </Link>
            </li>
            <li>
              <NavItem icon={user?.photoURL ? <Image src={user?.photoURL} alt="User Profile" width={50} height={50} /> : <Image src={'/random-avatar.png'} alt="User Profile" width={50} height={50} />}>
                <DropdownMenu></DropdownMenu>
              </NavItem>
            </li>
          </>
        )}

        {/* user is not signed OR has not created username */}
        {!user && (
          <>
            <li>
              <Link href="/enter">
                <button className="btn-blue">Log in</button>
              </Link>
            </li>
            <li>
              <Link href="/join">
                <button className="btn-blue">Sign up</button>
              </Link>
            </li>
          </>
 
          
        )}
      </ul>
      {children}
    </nav>
  );
}

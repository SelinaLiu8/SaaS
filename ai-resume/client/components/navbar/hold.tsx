import Link from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';
import { UserContext } from '../../lib/context';
import { useUserData } from '../../lib/hooks'; // Assuming the hook is defined here

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
              <Link href={`/${username}`}>
                {user?.photoURL && (
                  <Image src={user.photoURL} alt={`${username}'s profile picture`} width={500} height={500} />
                ) || '/random-avatar.png'}
              </Link>
            </li>
          </>
        )}

        {/* user is not signed OR has not created username */}
        {!user && (
          <li>
            <Link href="/enter">
              <button className="btn-blue">Log in</button>
            </Link>
          </li>
        )}
      </ul>
      {children}
    </nav>
  );
}

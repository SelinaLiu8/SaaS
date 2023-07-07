import Link from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';
import { UserContext } from '../../lib/context';

// Top navbar
export default function Navbar({ children }) {
  const user = useContext(UserContext);
  console.log(user);

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/">
            <button className="btn-logo">ResumAI</button>
          </Link>
        </li>

        {/* user is signed-in and has username */}
        {user.user && (
          <>
            <li className="push-left">
              <Link href="/admin">
                <button className="btn-blue">Generate Resume</button>
              </Link>
            </li>
            <li>
              <Link href={`/${user}`}>
                {user && user.photoURL && <Image src={user.photoURL} alt={user} width={500} height={500}/>}
              </Link>
            </li>
            <li>
            <Link href="/enter">
              <button className="btn-blue">Log out</button>
            </Link>
          </li>
          </>
        )}

        {/* user is not signed OR has not created username */}
        {!user.user && (
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

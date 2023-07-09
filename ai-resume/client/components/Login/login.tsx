import Link from 'next/link';
import Image from 'next/image';
import { useContext, ReactNode } from 'react';
import { UserContext } from '../../lib/context';
import { useUserData } from '../../lib/hooks';
import ProfileItem from './ProfileImg';
import DropdownMenu from './DropdownMenu'; 

export default function Navbar({ children }: { children: ReactNode }) {
    const { user, username } = useUserData();
  
    return (
        <div>
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
                <ProfileItem icon={user?.photoURL ? <Image src={user?.photoURL} alt="User Profile" width={50} height={50} /> : <Image src={'/random-avatar.png'} alt="User Profile" width={50} height={50} />}/>
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
        </div>
    );
  }
import Link from 'next/link';
import Image from 'next/image';
import { useContext, ReactNode } from 'react';
import { UserContext } from '../lib/context';
import { useUserData } from '../lib/hooks';
import ProfileItem from './ProfileImg';
import DropdownMenu from './DropdownMenu'; 

export default function Login({ children }: { children: ReactNode }) {
    const { user, username } = useUserData();
    return (
        <div>
        {/* user is signed-in and has username */}
          {user && (
            <>
            <ul>
              <li>
                <Link href="/enter">
                  <button className="btn-blue">Log out</button>
                </Link>
              </li>
              <li>
                <ProfileItem icon={user?.photoURL ? <Image src={user?.photoURL} alt="User Profile" width={50} height={50} /> : <Image src={'/random-avatar.png'} alt="User Profile" width={50} height={50} />}/>
              </li>
            </ul>
            </>
          )}
  
          {/* user is not signed OR has not created username */}
          {!user && (
            <>
            <ul>
              <li>
                <Link href="/enter">
                  <button className="btn-blue">Log in</button>
                </Link>
              </li>
            </ul>
              {/* <li>
                <Link href="/join">
                  <button className="btn-blue">Sign up</button>
                </Link>
              </li> */}
            </>
          )}
        </div>
    );
  }
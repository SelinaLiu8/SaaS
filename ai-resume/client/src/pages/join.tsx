import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { UserContext } from '../../lib/context';
import SignUpButtonGoogle from '../../components/join/SignUpButtonGoogle';
import SignUpButtonEmail from '../../components/join/SignUpButtonEmail';

export default function Join() {
    const router = useRouter();
    const { user } = useContext(UserContext);
  
    useEffect(() => {
      if (user) {
        console.log('User is already signed in');
        router.push('/');
      }
    }, [user, router]);
  
    if (!user) {
      return (
        <main>
          <ul>
            <SignUpButtonGoogle />
            <SignUpButtonEmail />
          </ul>
        </main>
      );
    }

    return null;
}

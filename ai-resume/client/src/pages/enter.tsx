import { useContext } from 'react';
import { UserContext } from '../../lib/context';
import { useRouter } from 'next/router'; 
import SignInButton from '../../components/enter/SignInButton';
import SignInWithEmail from '../../components/enter/SignInWithEmail';
import SignOutButton from '../../components/enter/SignOutButton';

export default function Enter() {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const goToJoin = () => {
    router.push('/join'); // this will navigate to the '/join' route
  }

  return (
    <main>
      {user 
        ? <SignOutButton /> 
        : (
          <div>
            <SignInButton />
            <SignInWithEmail />
            <button onClick={goToJoin}>Join</button>
          </div>
        )}
    </main>
  );
}

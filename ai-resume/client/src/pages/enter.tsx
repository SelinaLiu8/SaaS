import { useContext, useEffect } from 'react';
import { UserContext } from '../../lib/context';
import { useRouter } from 'next/router'; 
import SignInButton from '../../components/enter/SignInButton';
import SignInWithEmail from '../../components/enter/SignInWithEmail';
import SignOutButton from '../../components/enter/SignOutButton';

export default function Enter() {
  const { user } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    // If the user is logged in, redirect to the home page or any other page
    if (user) {
      router.push('/'); // Redirect to the home page when the user is logged in
    }
  }, [user, router]);

  const goToJoin = () => {
    router.push('/join'); // this will navigate to the '/join' route
  }

  return (
    <div className='login-page'>
      <div className='login-box'>
        <div className='login-top'>
          <h1>Welcome to CL.AI</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
        </div>
        <div className='login-bottom'>
          <div className='login-left'>
            <SignInWithEmail />
          </div>
          <div className='login-right'>
            <SignInButton/>
          </div>
        </div>
        <div >
              <button onClick={goToJoin}>Join</button>
        </div>
      </div>
    </div>
  );
}


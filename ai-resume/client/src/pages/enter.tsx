import { auth, googleAuthProvider } from '../../lib/firebase';
import { signInWithPopup } from 'firebase/auth';
import Image from 'next/image';
import { useContext } from 'react';
import { UserContext } from '../../lib/context';

export default function Enter() {
  const user = useContext(UserContext);

  // 1. user signed out <SignInButton />
  // 2. user signed in, but missing username <UsernameForm />
  // 3. user signed in, has username <SignOutButton />
  return (
    <main>
      {user.user ? <SignOutButton /> : <SignInButton />}
    </main>
  );
}

// Sign in with Google button
function SignInButton() {
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleAuthProvider);

  };

  return (
    <button className="btn-google" onClick={signInWithGoogle}>
      <div style={{ position: 'relative', width: '50px', height: '50px', marginRight: '10px' }}>
        <Image src={'/google.png'} alt="Google sign-in" layout="fill" objectFit="contain"/>
      </div>
      <span>Sign in with Google</span>
    </button>
  );
}

function SignOutButton() {
  const signOut = async () => {
    try {
      await auth.signOut();
      console.log("Signed out successfully");
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  return <button onClick={signOut}>Sign Out</button>;
}

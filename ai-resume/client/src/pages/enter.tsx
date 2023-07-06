import { useEffect } from 'react'; // Added import for useEffect
import { auth, googleAuthProvider } from '../../lib/firebase';
import { signInWithPopup } from 'firebase/auth';

interface PropsType {
  // Define the required props and their types here
}

export default function Enter(props: PropsType) {
  const user = null;
  const username = null;

  // 1. user signed out <SignInButton />
  // 2. user signed in, but missing username <UsernameForm />
  // 3. user signed in, has username <SignOutButton />
  useEffect(() => {
    // Add code to listen for user authentication state changes here
    // You can update the 'user' and 'username' states accordingly
    // Example code: auth.onAuthStateChanged((user) => { /* update user and username states */ });
  }, []);

  return (
    <main>
      {user ? (
        !username ? <UsernameForm /> : <SignOutButton />
      ) : (
        <SignInButton />
      )}
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
      <img src={'google.png'} alt="Google logo" /> Sign in with Google
    </button>
  );
}

// Sign out button
function SignOutButton() {
  return <button onClick={() => auth.signOut()}>Sign Out</button>;
}

function UsernameForm() {
  return null;
}


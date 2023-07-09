import { auth, googleAuthProvider } from '../../lib/firebase';
import { signInWithPopup, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import Image from 'next/image';
import { useContext, useState } from 'react';
import { UserContext } from '../../lib/context';
import toast from 'react-hot-toast';

export default function Enter() {
  const { user } = useContext(UserContext);

  return (
    <main>
      {user ? <SignOutButton /> : <div><SignInButton /><SignInWithEmail /></div>}
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

// Sign in with Email
function SignInWithEmail() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signInWithEmail = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error signing in with email and password", error);
      toast.error("Failed to sign in. Check your email and password.");
    }
  };

  const resetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent.");
    } catch (error) {
      console.error("Error sending password reset email", error);
      toast.error("Failed to send password reset email. Check your email.");
    }
  };

  return (
    <form onSubmit={signInWithEmail}>
      <input name='email' type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input name='password' type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type='submit'>Sign In</button>
      <button onClick={resetPassword}>Reset Password</button>
    </form>
  );
}

function SignOutButton() {
  const signOut = async () => {
    try {
      await auth.signOut();
      toast.success("See you soon!",
      {
          position: 'top-right'
      });
    } catch (error) {
      console.error("Error signing out", error);
      toast.error("Failed to sign out.");
    }
  };

  return <button onClick={signOut}>Sign Out</button>;
}

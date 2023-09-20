import { useState } from 'react';
import { auth } from '../../lib/firebaseClient';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import toast from 'react-hot-toast';

export default function SignInWithEmail() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signInWithEmail = async (event: React.MouseEvent<HTMLButtonElement> ) => {
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
      <input className='signin-field' name='email' type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input className='signin-field' name='password' type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type='submit'>Sign In</button>
      <button onClick={resetPassword}>Reset Password</button>
    </form>
  );
}

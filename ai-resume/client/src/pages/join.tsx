import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth, googleAuthProvider } from '../../lib/firebase';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import Image from 'next/image';
import { UserContext } from '../../lib/context';
import { toast } from 'react-hot-toast';

export default function Join() {
    const router = useRouter();
    const { user } = useContext(UserContext);
  
    // Redirect users who are already signed in
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
  
    // If user is defined (signed in), we can return null or some loading state
    // The redirect logic inside useEffect will handle navigation
    return null;
}

// Sign up with Google button
function SignUpButtonGoogle() {
  const signUpWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleAuthProvider);
      // Add toast
      toast.success('Welcome! We hope you enjoy our project.',
            {
                position: 'top-right'
            });
    } catch (err) {
      // Add error toast
      toast.error(err.message);
    }
  };

  return (
    <button className="btn-google" onClick={signUpWithGoogle}>
      <div style={{ position: 'relative', width: '50px', height: '50px', marginRight: '10px' }}>
        <Image src={'/google.png'} alt="Google sign-in" layout="fill" objectFit="contain"/>
      </div>
      <span>Sign up with Google</span>
    </button>
  );
}

// Sign up with Email button
function SignUpButtonEmail() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const signUpWithEmail = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Add toast
      toast.success('Welcome! You have signed up successfully with Gmail.',
      {
          position: 'top-right'
      });
    } catch (err) {
      setError(err.message);
      // Add error toast
      toast.error(err.message);
    }
  };

  return (
    <div>
      <h2>Sign up with Email</h2>
      {error && <p>{error}</p>}
      <form onSubmit={signUpWithEmail}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

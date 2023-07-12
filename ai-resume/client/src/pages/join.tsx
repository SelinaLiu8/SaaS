import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth, googleAuthProvider } from '../../lib/firebase';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { updateProfile } from "firebase/auth";
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import Image from 'next/image';
import { UserContext } from '../../lib/context';
import { toast } from 'react-hot-toast';

// Initialize Firestore
const db = getFirestore();

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

function SignUpButtonGoogle() {
  const signUpWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      if (result.user) {
        const name = result.user.displayName.split(' ');
        const firstName = name[0];
        const lastName = name.length > 1 ? name[name.length - 1] : ''; // Assuming that if multiple names are provided, the last one is the "last name"

        // Save first and last names to Firestore
        await setDoc(doc(db, "users", result.user.uid), {
          firstName: firstName,
          lastName: lastName,
        });

        toast.success('Welcome! We hope you enjoy our project.',
            {
                position: 'top-right'
            });
      }
    } catch (err) {
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

function SignUpButtonEmail() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState(null);

  const signUpWithEmail = async (e) => {
    e.preventDefault();

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (cred.user) {
          await updateProfile(cred.user, {
              displayName: `${firstName} ${lastName}`,
          });

        // Save first and last names to Firestore
        await setDoc(doc(db, "users", cred.user.uid), {
          firstName: firstName,
          lastName: lastName,
        });

        toast.success('Welcome! You have signed up successfully with Email.',
        {
            position: 'top-right'
        });
      }
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  return (
    <div>
      <h2>Sign up with Email</h2>
      {error && <p>{error}</p>}
      <form onSubmit={signUpWithEmail}>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          required
        />
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

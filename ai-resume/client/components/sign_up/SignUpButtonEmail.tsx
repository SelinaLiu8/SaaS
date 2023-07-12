import { useState } from 'react';
import { auth } from '../../lib/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-hot-toast';

// Initialize Firestore
const db = getFirestore();

export default function SignUpButtonEmail() {
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

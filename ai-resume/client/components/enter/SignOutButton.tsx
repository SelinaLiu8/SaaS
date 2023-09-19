import React, { useState } from 'react';
import { auth } from '../../lib/firebaseClient';  // Assuming you import auth from firebaseClient
import toast from 'react-hot-toast';
import { createUserWithEmailAndPassword } from 'firebase/auth';  // Import as needed

export default function SignUpButtonEmail() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const signUpWithEmail = async (e: React.FormEvent<HTMLFormElement>) => {  // Type annotation here
    e.preventDefault();

    // Check if passwords match
    // ... (your logic here)

    try {
      // Assuming you're using Firebase for authentication
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Successfully signed up!");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
      toast.error("Failed to sign up.");
    }
  };

  return (
    <form onSubmit={signUpWithEmail}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Sign Up</button>
      {error && <p>{error}</p>}
    </form>
  );
}

import React from 'react';
import { auth, googleProvider } from './firebase';
import { signInWithPopup } from 'firebase/auth'; // Import signInWithPopup as a standalone function

const SignInButton = () => {
    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider); // Pass auth and googleProvider as arguments to signInWithPopup
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <button onClick={signInWithGoogle}>Sign in with Google</button>
    );
};

export default SignInButton;

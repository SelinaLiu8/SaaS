import React, { useEffect, useState } from 'react';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut as signOutOfFirebase } from 'firebase/auth';
import SignInButton from './SignInButton';

const auth = getAuth();
const provider = new GoogleAuthProvider();

const MyComponent = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user || null);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    const signIn = async () => {
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            setError(error.message);
        }
    };

    const signOut = async () => {
        try {
            await signOutOfFirebase(auth);
        } catch (error) {
            setError(error.message);
        }
    };

    if (error) {
        return (
            <div>
                <p>Error: {error}</p>
                <button onClick={() => setError(null)}>Clear Error</button>
            </div>
        );
    }

    if (user) {
        return (
            <div>
                <button onClick={signOut}>Sign Out</button>
                <h3>Hello {user.displayName}!</h3>
                <p>User ID: {user.uid}</p>
            </div>
        );
    } else {
        return (
            <div>
                <SignInButton signIn={signIn} />
            </div>
        );
    }
};

export const App = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch("/members")
            .then(res => res.json())
            .then(data => {
                setData(data);
                console.log(data);
            });
    }, []);

    return (
        <div>
            {data ? (
                data.members.map((member, index) => (
                    <p key={index}>{member}</p>
                ))
            ) : (
                <p>loading...</p>
            )}
        </div>
    );
};

export default MyComponent;
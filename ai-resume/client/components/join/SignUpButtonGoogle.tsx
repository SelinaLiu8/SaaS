import { auth, googleAuthProvider } from '../../lib/firebase';
import { signInWithPopup } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import Image from 'next/image';
import { toast } from 'react-hot-toast';

// Initialize Firestore
const db = getFirestore();

export default function SignUpButtonGoogle() {
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

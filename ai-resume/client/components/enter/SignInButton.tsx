import { auth, googleAuthProvider } from '../../lib/firebase';
import { signInWithPopup } from 'firebase/auth';
import Image from 'next/image';

export default function SignInButton() {
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

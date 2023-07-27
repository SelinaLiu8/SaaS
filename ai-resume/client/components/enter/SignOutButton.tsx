import { auth } from '../../lib/firebaseClient';
import toast from 'react-hot-toast';

export default function SignOutButton() {
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

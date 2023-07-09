import AuthCheck from '../../../components/AuthCheck';
import Image from 'next/image';

export default function AdminPostsPage(props) {
    const { user, username } = useUserData();
  return (
    <main>
      <AuthCheck>
        <p>Welcome to the Admin!</p>
        {user?.photoURL ? <Image src={user?.photoURL} alt="User Profile" width={50} height={50} /> : <Image src={'/random-avatar.png'} alt="User Profile" width={50} height={50} />}
      </AuthCheck>
    </main>
  );
}
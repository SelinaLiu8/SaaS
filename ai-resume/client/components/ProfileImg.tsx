import Image from 'next/image';

export default function UserProfileImage({ user }) {
    return user?.photoURL ? 
        <Image src={user?.photoURL} alt="User Profile" width={50} height={50} /> :
        <Image src={'/random-avatar.png'} alt="User Profile" width={50} height={50} />;
}
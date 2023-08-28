import { useContext } from 'react';
import Link from 'next/link';
import AuthCheck from '../../../components/AuthCheck';
import { useUserData } from '../../../lib/hooks';
import UserProfileImage from '../../../components/ProfileImg';
import ResetPasswordButton from '../../../components/ResetPassword';
import ResumeUploader from '../../../components/ResumeUploader';

export default function AdminPage(props) {
    const { user, username } = useUserData();

    return (
        <main>
            <AuthCheck>
                <UserProfileImage user={user} />
                <p>Email: {username || user?.email}</p>
                {
                    user?.providerData[0]?.providerId === 'password' && <ResetPasswordButton user={user} />
                }
                <button> 
                    <a href="/profile/" className="button-style">Back</a>
                </button>
            </AuthCheck>
        </main>
    );
}

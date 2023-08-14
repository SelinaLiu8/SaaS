import { useContext } from 'react';
import AuthCheck from '../../../components/AuthCheck';
import { useUserData } from '../../../lib/hooks';
import UserProfileImage from '../../../components/ProfileImg';
import ResetPasswordButton from '../../../components/ResetPassword';
import ResumeUploader from '../../../components/ResumeUploader';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { getFirestore, doc } from 'firebase/firestore';
import Link from 'next/link';

// Initialize Firestore
const db = getFirestore();

export default function AdminPage(props) {
    const { user, username } = useUserData();

    // Firestore document to fetch
    const userDoc = user && doc(db, "users", user.uid);
  
    // Fetch user data from Firestore
    const [userData] = useDocumentData(userDoc, {idField: 'id'});

    return (
        <main className='profile-page'>
            <AuthCheck>
                <div className="profile-top">
                    <div className="profile-top-item">
                        <p>Email: {username || user?.email}</p>
                    </div>
                    <div className="profile-top-item">
                        <UserProfileImage user={user} />
                    </div>
                    <div className='profile-top-item'>
                        <p>credit</p>
                    </div>
                </div>
                <p>Welcome to the Admin!</p>
                {userData && <p>Name: {userData?.firstName} {userData?.lastName}</p>}
                {
                  user && <ResumeUploader user={user} />
                }
                <button>
                    <Link href="/profile/settings">Settings</Link>
                </button>
            </AuthCheck>
        </main>
    );
}

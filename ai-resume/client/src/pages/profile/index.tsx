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
                {userData && <p>Name: {userData?.firstName} {userData?.lastName}</p>}
                <div className="custom-shape-divider-top-1689553257">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill"></path>
                    </svg>
                </div>
                <div className='profile-bottom'>
                    {
                    user && <ResumeUploader user={user} />
                    }
                    <button>
                        <Link href="/profile/settings">Settings</Link>
                    </button>
                </div>
            </AuthCheck>
        </main>
    );
}

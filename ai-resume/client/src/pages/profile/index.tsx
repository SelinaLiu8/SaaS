import { useContext } from 'react';
import AuthCheck from '../../../components/AuthCheck';
import { useUserData } from '../../../lib/hooks';
import UserProfileImage from '../../../components/ProfileImg';
import ResetPasswordButton from '../../../components/ResetPassword';
import ResumeUploader from '../../../components/ResumeUploader';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { getFirestore, doc } from 'firebase/firestore';

// Initialize Firestore
const db = getFirestore();

export default function AdminPage(props) {
    const { user, username } = useUserData();

    // Firestore document to fetch
    const userDoc = user && doc(db, "users", user.uid);
  
    // Fetch user data from Firestore
    const [userData] = useDocumentData(userDoc, {idField: 'id'});

    return (
        <main>
            <AuthCheck>
                <p>Welcome to the Admin!</p>
                <UserProfileImage user={user} />
                <p>Email: {username || user?.email}</p>
                <p>Credits: TODO</p> 
                {userData && <p>Name: {userData?.firstName} {userData?.lastName}</p>}
                {
                  user && <ResumeUploader user={user} />
                }
                <button>
                    <a href="/profile/settings">Settings</a>
                </button>
            </AuthCheck>
        </main>
    );
}

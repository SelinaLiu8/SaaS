import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import AuthCheck from '../../../components/AuthCheck';
import { useUserData } from '../../../lib/hooks';
import UserProfileImage from '../../../components/ProfileImg';
import ResetPasswordButton from '../../../components/ResetPassword';
import ResumeUploader from '../../../components/resume/ResumeUploader';
import { getFirestore, collection, doc, addDoc, getDocs, orderBy, limit } from 'firebase/firestore';
import { firestore } from "../../../lib/firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from "../../../lib/firebase";

export default function AdminPage(props) {
  const { user, username } = useUserData();
  const [documents, setDocuments] = useState<any[]>([]);
  useEffect(() => {
    console.log(user);
    async function fetchRecentDocuments() {
        // Get a reference to the user's document
        const userDoc = doc(firestore, 'users', user.uid);
        // Get a reference to the 'cover_letters' subcollection
        const coverLettersCollection = collection(userDoc, 'cover_letters');
        // Fetch all documents from the 'cover_letters' subcollection
        const coverLetterSnapshot = await getDocs(coverLettersCollection);
        // Map through documents and return their data
        setDocuments(coverLetterSnapshot.docs.map(doc => doc.data()));
    }
    if(user) fetchRecentDocuments();
  }, [user]);
  
  // Handle file upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    // create a reference to the storage bucket location
    const storageRef = ref(storage, `cover_letters/${user.uid}/${file.name}`);

    // create the file metadata
    const metadata = {
      contentType: 'application/pdf',
    };

    // upload the file to Firebase Storage
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    uploadTask.on('state_changed', 
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      }, 
      (error) => {
        // Handle unsuccessful uploads
        console.error(error);
      }, 
      () => {
        // Handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
        });
      }
    );
  };

  return (
    <main>
      <AuthCheck>
        <p>Welcome to the Admin!</p>
        <UserProfileImage user={user} />
        <p>Email: {username || user?.email}</p>
        {
          user?.providerData[0]?.providerId === 'password' && <ResetPasswordButton user={user} />
        }
        {
          user && <ResumeUploader user={user} />
        }
        {
          documents.length > 0 && (
            <Carousel>
              {
                documents.map((doc, index) => (
                  <div key={index}>
                    {/* Render your document content */}
                    <p>{doc.title}</p>
                    {/* <p>{doc.content}</p> */}
                  </div>
                ))
              }
            </Carousel>
          )
        }
        <label htmlFor="fileUpload" style={{display: 'inline-block', padding: '10px 20px', background: 'blue', color: 'white', cursor: 'pointer'}}>
          Upload Cover Letter
        </label>
        <input id="fileUpload" type="file" onChange={handleFileUpload} style={{display: 'none'}}/>
      </AuthCheck>
    </main>
  );
}

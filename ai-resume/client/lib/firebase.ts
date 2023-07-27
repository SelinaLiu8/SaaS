import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyABwAN3Xt-lpXjOscobZO_4iWl_Aaj7xbg",
    authDomain: "resumai-ai-resume-builder.firebaseapp.com",
    databaseURL: "https://resumai-ai-resume-builder-default-rtdb.firebaseio.com",
    projectId: "resumai-ai-resume-builder",
    storageBucket: "resumai-ai-resume-builder.appspot.com",
    messagingSenderId: "602286608644",
    appId: "1:602286608644:web:54a0aa7b96162619118051",
    measurementId: "G-XCQ62B6JF3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
export const googleAuthProvider = new GoogleAuthProvider();
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABwAN3Xt-lpXjOscobZO_4iWl_Aaj7xbg",
  authDomain: "resumai-ai-resume-builder.firebaseapp.com",
  projectId: "resumai-ai-resume-builder",
  storageBucket: "resumai-ai-resume-builder.appspot.com",
  messagingSenderId: "602286608644",
  appId: "1:602286608644:web:54a0aa7b96162619118051",
  measurementId: "G-XCQ62B6JF3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
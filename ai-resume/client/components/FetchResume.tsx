import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../lib/firebaseClient";

interface User {
  uid: string;
  // other properties that you might need
}

const fetchResume = async (user: User) => {  // <-- Change here
  const storageRef = ref(storage, `resume/${user.uid}/resume.pdf`);
  console.log("user", user.uid);
  console.log("path", storageRef);

  try {
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    console.error('No existing file found');
    return null;
  }
};

export default fetchResume;

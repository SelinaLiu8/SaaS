import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../lib/firebaseClient";

const fetchResume = async (user) => {
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

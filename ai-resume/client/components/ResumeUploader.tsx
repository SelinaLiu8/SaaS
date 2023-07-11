import { useState, useEffect } from 'react';
import { storage } from "../lib/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import fetchResume from './FetchResume';

function ResumeUploader({ user }) {
    const [isUploading, setUploading] = useState(false);
    const [downloadUrl, setDownloadUrl] = useState(null);
    let hasUploaded: boolean = false;
    // Fetch the resume link whenever the component mounts or user changes
    useEffect(() => {
        const fetchResumeLink = async () => {
            const url = await fetchResume(user);
            setDownloadUrl(url);
        };

        fetchResumeLink();
    }, [user]);

    const onFileChange = async (event) => {
        hasUploaded = true;
        const file = event.target.files[0];
        const storageRef = ref(storage, 'resume/' + user.uid + '/' + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        setUploading(true);

        uploadTask.on('state_changed', 
            (snapshot) => {
                // You can implement the functionality to track progress here
            }, 
            (error) => {
                console.error(error);
                setUploading(false);
            }, 
            () => {
                // Handle successful uploads on complete
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setDownloadUrl(downloadURL); // Update state with download URL
                    setUploading(false);
                });
            }
        );
    };

    return (
        <div className='box'>
            <input type="file" id="resume-upload" onChange={onFileChange} accept=".pdf" style={{display: 'none'}} />
            <label htmlFor="resume-upload" className="btn">Upload Resume</label>
            {isUploading && <p>Uploading...</p>}
            {hasUploaded && !isUploading && !downloadUrl && <p>Upload failed. Please try again.</p>}
            {!hasUploaded && !downloadUrl && <p>No resume uploaded yet.</p>}
            {!hasUploaded && downloadUrl && <p><a href={downloadUrl} target="_blank" rel="noopener noreferrer">View file</a></p>}
            {hasUploaded && downloadUrl && <p>File uploaded successfully. <a href={downloadUrl} target="_blank" rel="noopener noreferrer">View file</a></p>}
        </div>
    );
}

export default ResumeUploader;

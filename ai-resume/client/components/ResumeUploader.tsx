import { useState, useEffect } from 'react';
import { storage } from "../lib/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import fetchResume from './FetchResume';

function ResumeUploader({ user }) {
    const [isUploading, setIsUploading] = useState(false);
    const [downloadUrl, setDownloadUrl] = useState(null);
    const [useSavedResume, setUseSavedResume] = useState(false);
    let hasUploaded = false;

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

        setIsUploading(true);

        uploadTask.on('state_changed', 
            (snapshot) => {
                // You can implement the functionality to track progress here
            }, 
            (error) => {
                console.error(error);
                setIsUploading(false);
            }, 
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setDownloadUrl(downloadURL);
                    setIsUploading(false);
                });
            }
        );
    };

    const handleCheckboxChange = (event) => {
        setUseSavedResume(event.target.checked);
    };

    return (
        <div className='box'>
            <input type="file" id="resume-upload" onChange={onFileChange} accept=".pdf" style={{display: 'none'}} />
            <label htmlFor="resume-upload" className="btn">Upload Resume</label>
            
            {isUploading && <p>Uploading...</p>}
            {hasUploaded && !isUploading && !downloadUrl && <p>Upload failed. Please try again.</p>}
            
            {useSavedResume && downloadUrl && (
                <p>
                    Resume from saved file:
                    <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
                        View file
                    </a>
                </p>
            )}
            
            {!useSavedResume && !downloadUrl && <p>No resume uploaded yet.</p>}
            {!useSavedResume && downloadUrl && (
                <p>
                    Uploaded resume:
                    <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
                        View file
                    </a>
                </p>
            )}
        </div>
    );
}

export default ResumeUploader;


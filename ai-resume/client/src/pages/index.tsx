import Image from 'next/image'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import React, { useState, ChangeEvent, useRef, useEffect } from 'react'
import UseSavedResumeCheckbox from '../../components/UseSavedResume'
import firebase from 'firebase/app';
import { auth } from '../../lib/firebaseClient';
import 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../state_management/Store'
import { setSelfDescription, setJobDescription, setAdditionalInfo, setCoverLetter } from '../../state_management/Slice'

const inter = Inter({ subsets: ['latin'] })

const Home: React.FC = () => {
  const [useSavedResume, setUseSavedResume] = useState(false);
  const [isButton1Disabled, setIsButton1Disabled] = useState(true);
  const [isButton2Disabled, setIsButton2Disabled] = useState(true);
  const [isButton3Disabled, setIsButton3Disabled] = useState(true);

  const selfDescription = useSelector((state: RootState) => state.app.SelfDescription);
  const jobDescription = useSelector((state: RootState) => state.app.JobDescription);
  const additionalInfo = useSelector((state: RootState) => state.app.AddtionalInfo);
  const CLresponse = useSelector((state: RootState) => state.app.CoverLetter); 

  const dispatch = useDispatch();

  // Use useRef for storing refs to state values
  const additionalInfoRef = useRef(additionalInfo);
  const jobDescriptionRef = useRef(jobDescription);
  const selfDescriptionRef = useRef(selfDescription);
  const responseRef = useRef(CLresponse);

  // Update the refs whenever the Redux state changes
  useEffect(() => {
    additionalInfoRef.current = additionalInfo;
    jobDescriptionRef.current = jobDescription;
    selfDescriptionRef.current = selfDescription;
    responseRef.current = CLresponse;
  }, [additionalInfo, jobDescription, selfDescription, CLresponse]); // Include CLresponse in dependency array

  //resume handler
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUseSavedResume(event.target.checked);
  };

  //openai generate handler
  const handleGenerateClick = async () => {
    const user = auth.currentUser;
    const idToken = await user.getIdToken(true);
    const additionalInfoValue = additionalInfoRef.current;
    const jobDescriptionValue = jobDescriptionRef.current;
    console.log("wait");
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`,
      },
      body: JSON.stringify({
        additionalInfoValue,
        jobDescriptionValue,
        useSavedResume,
      }),
    });
  
    const data = await response.json();
    dispatch(setCoverLetter(data));
    // Handle the response data
    console.log(data);
    // console.log(responseRef.current);
  };

  //input boxes handler
  const handleSelfDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const self = event.target.value;

    dispatch(setSelfDescription(self));

    setIsButton1Disabled(self.trim() === '');
    setIsButton3Disabled(self.trim() === '' || jobDescriptionRef.current.trim() === '');

    console.log(selfDescriptionRef.current);
  }

  const handleJobDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const job = event.target.value;

    dispatch(setJobDescription(job));

    setIsButton2Disabled(job.trim() === '');
    setIsButton3Disabled(selfDescriptionRef.current.trim() === '' || job.trim() === '');

    console.log(jobDescriptionRef.current);
  }

  const handleAddDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const add = event.target.value;

    dispatch(setAdditionalInfo(add));
  }
  
  return (
    <div className='home-page' >
      <div className='home-top'>
        <h1 className='title home-title'><strong>COVER LETTER</strong> <br/>AI Generator</h1>
        <p className='home-statement'>READY TO GENERATE YOUR COVER LETTER IN UNDER A MINUTE TO BOOST YOUR CHANCES BY 30%?</p>
        <Link href='#step1' scroll={false} className='start-link'><button className='btn btn-blue home-btn start-btn'>Get Started Right Away!</button></Link>
      </div>
      <div className="custom-shape-divider-top-1689553257">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill"></path>
          </svg>
      </div>
      <div className='home-bottom'>
        <ul className='home-input-list'>
          <li className='cover-letter-steps' id='step1'>
            <h2>1</h2>
            <h3>Upload your resume <br/>or <br/>write a description of your background</h3>
            <div>
              <UseSavedResumeCheckbox
                isChecked={useSavedResume}
                onChange={handleCheckboxChange}
                useSavedResume={useSavedResume}
              />
              {/* Rest of your home page content */}
            </div>
            <textarea 
              name="self description" 
              id="self-description" 
              cols={100}
              rows={25}
              value={useSelector((state: RootState) => state.app.SelfDescription)}
              onChange={handleSelfDescription}
              ></textarea>
            <Link href='#step2' scroll={false}>
              <button
                className={`btn ${isButton1Disabled ? 'btn-disabled' : 'btn-pink'} home-btn`}
                disabled={isButton1Disabled}
              >Next</button>
            </Link>
          </li>
          <li className='cover-letter-steps' id='step2'>
            <h2>2</h2>
            <h3>Input job description</h3>
            <textarea 
              name="job description" 
              id="job-description" 
              cols={100}
              rows={25}
              value={useSelector((state: RootState) => state.app.JobDescription)}
              onChange={handleJobDescription}
              ></textarea>
            <Link href='#step3' scroll={false}>
              <button
                className={`btn ${isButton2Disabled ? 'btn-disabled' : 'btn-pink'} home-btn`}
                disabled={isButton2Disabled}
              >Next</button>
            </Link>
          </li>
          <li className='cover-letter-steps' id='step3'>
            <h2>3</h2>
            <h3>Additional comments to help with our AI</h3>
            <textarea 
              name="additional description" 
              id="add-description" 
              cols={100}
              rows={25}
              value={useSelector((state: RootState) => state.app.AddtionalInfo)}
              onChange={handleAddDescription}
              ></textarea>
            {/* <Link href='/coverletter-view' scroll={false}> */}
              <button
                  className={`btn ${isButton3Disabled ? 'btn-disabled' : 'btn-pink'} home-btn`}
                  disabled={isButton3Disabled}
                  onClick={handleGenerateClick}
                >Generate</button>
            {/* </Link> */}
          </li>
        </ul>
      </div>
      <div className="custom-shape-divider-top-1689553927">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
        </svg>
      </div>
    </div>
  )
}

export default Home;
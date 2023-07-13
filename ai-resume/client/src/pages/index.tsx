import Image from 'next/image'
import { Inter } from 'next/font/google'
import React, { useState } from 'react'
import UseSavedResumeCheckbox from '../../components/resume/UseSavedResume'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [useSavedResume, setUseSavedResume] = useState(false);

  const handleCheckboxChange = (event) => {
    setUseSavedResume(event.target.checked);
  };
  return (
    <div className='home-page'>
      <div className='home-top'>
        <h1 className='title home-title'><strong>COVER LETTER</strong> <br/>AI Generator</h1>
        <p className='home-statement'>READY TO GENERATE YOUR COVER LETTER IN UNDER A MINUTE TO BOOST YOUR CHANCES BY 30%?</p>
        <button className='btn btn-blue home-btn start-btn'>Get Started Right Away!</button>
      </div>
      <div className='home-bottom'>
        <ul className='home-input-list'>
          <li>
            <h2>1</h2>
            <p>Upload your resume <br/>or <br/>write a description of your background</p>
            <div>
              <UseSavedResumeCheckbox
                isChecked={useSavedResume}
                onChange={handleCheckboxChange}
                useSavedResume={useSavedResume}
              />
              {/* Rest of your home page content */}
            </div>
            <textarea name="self description" id="self-description" cols="50" rows="10"></textarea>
            <button className='btn btn-pink home-btn'>next</button>
          </li>
          <li>
            <h2>2</h2>
            <p>Input job description</p>
            <textarea name="job description" id="job-description" cols="50" rows="10"></textarea>
            <button className='btn btn-pink home-btn'>next</button>
          </li>
          <li>
            <h2>3</h2>
            <p>Additional comments to help with our AI</p>
            <textarea name="self description" id="self-description" cols="50" rows="10"></textarea>
            <button className='btn btn-pink home-btn'>Generate</button>
          </li>
        </ul>
      </div>
    </div>
  )
}

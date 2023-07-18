import Image from 'next/image'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import React, { useState } from 'react'
import UseSavedResumeCheckbox from '../../components/UseSavedResume'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [useSavedResume, setUseSavedResume] = useState(false);

  const handleCheckboxChange = (event) => {
    setUseSavedResume(event.target.checked);
  };
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
            <textarea name="self description" id="self-description" cols="100" rows="25"></textarea>
            <Link href='#step2' scroll={false}><button className='btn btn-pink home-btn'>next</button></Link>
          </li>
          <li className='cover-letter-steps' id='step2'>
            <h2>2</h2>
            <h3>Input job description</h3>
            <textarea name="job description" id="job-description" cols="100" rows="25"></textarea>
            <Link href='#step3' scroll={false}><button className='btn btn-pink home-btn'>next</button></Link>
          </li>
          <li className='cover-letter-steps' id='step3'>
            <h2>3</h2>
            <h3>Additional comments to help with our AI</h3>
            <textarea name="self description" id="self-description" cols="100" rows="25"></textarea>
            <button className='btn btn-pink home-btn'>Generate</button>
          </li>
        </ul>
      </div>
      <div className="custom-shape-divider-top-1689553927">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill"></path>
        </svg>
      </div>
    </div>
  )
}

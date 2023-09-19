import React, { useState, useEffect, useRef } from 'react'
import { RootState } from '../../state_management/Store';
import { useSelector, useDispatch } from 'react-redux'
import { setCoverLetter } from '../../state_management/Slice'


const coverletterView: React.FC = () => {
  const coverLetter = useSelector((state: RootState) => state.app.CoverLetter);

  return (
    <div className='coverletter-view-page'>
      <div className='coverletter-view'>
          <p className='coverletter-text'>{coverLetter}</p>
      </div>
      <p className='coverletter-p'>Your cover letter has been successfully generated!</p>
      <div className="download-btns">
          <button className='btn-pink'>Download as PDF</button>
          <button className='btn-pink'>Download as .DOCX</button>
          <button className='btn-pink'>Save to Google Doc</button>
      </div>
    </div>
  )
}

export default coverletterView;
import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { RootState } from '../../state_management/Store';


const coverletterView = () => {

  return (
    <div className='coverletter-view-page'>
      <div className='coverletter-view'>
          <p className='coverletter-text'>{}</p>
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
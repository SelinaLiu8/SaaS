import React from 'react'

export default function coverletterView() {
  return (
    <div className='coverletter-view-page'>
      <div className='coverletter-view'>
          <p className='coverletter-text'>Dear [Employer's Name], <br/><br/>I am writing to express my strong interest in the [Job Title] position at [Company Name], as advertised on [Job Board/Company Website]. With my background in [Your Field/Area of Expertise] and a passion for [Relevant Skills or Industry], I am confident in my ability to contribute significantly to the success of your team. Throughout my [X] years of experience in [Your Field], I have honed my skills in [Key Skills or Responsibilities]. My track record of [Notable Achievements or Projects] demonstrates my ability to deliver high-quality results and drive positive outcomes. I am eager to leverage my expertise to make a meaningful impact at [Company Name] and contribute to its continued growth and success. What excites me most about [Company Name] is its commitment to [Specific Values or Initiatives]. I deeply admire your company's dedication to [Company's Mission], and I believe my values align perfectly with the culture you have cultivated. I am eager to join a team of talented professionals who share my enthusiasm for [Industry or Product]. As a proactive and adaptable team player, I thrive in fast-paced environments where collaboration and innovation are valued. I am confident that my strong communication and problem-solving skills will enable me to excel in the dynamic and challenging projects that [Company Name] undertakes. I have attached my resume, which provides further details about my work history and qualifications. I would be grateful for the opportunity to discuss how my skills and experiences align with the needs of [Company Name] in an interview. Thank you for considering my application. I look forward to the possibility of contributing my skills and passion to [Company Name]. Please feel free to contact me at [Your Phone Number] or [Your Email Address] to arrange a convenient time to speak.<br/><br/>Sincerely,<br/>[Your Name]</p>
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
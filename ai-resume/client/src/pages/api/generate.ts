import { parsePDF } from './parsePDF';
import { Configuration, OpenAIApi } from 'openai';
import * as admin from 'firebase-admin';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://resumai-ai-resume-builder-default-rtdb.firebaseio.com',
    storageBucket: 'resumai-ai-resume-builder.appspot.com'
  });
}

export default async function handler(req, res) {
  if (req.method === 'POST' || req.method === 'GET') {
    try {
      const userId = req.headers.uid; // Extract user ID from the request's body
      console.log(req.headers);
      // Get the file from Firebase Storage
      const bucket = admin.storage().bucket();
      console.log(`resume/${userId}/resume.pdf`);
      const file = bucket.file(`resume/${userId}/resume.pdf`);
      const [dataBuffer] = await file.download();

      // Convert PDF to text
      const data = await parsePDF(dataBuffer);
      const resumeText = data.text;
  
      // Combine resumeText and additionalComments
      const fullContent = `I would like your to write a cover letter that will get the person with this reume:\n${resumeText}\n
      an interview for this job posting:\n${resumeText}\n You can only use the information in the resume to write the cover letter and
      these additional facts about the job canadate:\n${req.body.additionalComments}\n.`;
  
      // Use fullContent as a prompt to OpenAI API
      const chatCompletion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{
          role: "user", 
          content: `I would like your to write a cover letter that will get the person with this reume:\n${resumeText}\n
          an interview for this job posting:\n${resumeText}\n You can only use the information in the resume to write the cover letter.`,
        }],
      });
  
      res.status(200).json({ message: chatCompletion.data.choices[0].message });
  
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

import { parsePDF } from './parsePDF';
import { Configuration, OpenAIApi } from 'openai';
import admin from '../../../lib/firebaseAdmin';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed. This endpoint only accepts POST requests.` });
    return;
  }

  const idToken = req.headers.authorization ? req.headers.authorization.split('Bearer ')[1] : null;
  if (!idToken) {
    res.status(401).json({ error: 'Authorization header is missing or incorrectly formatted.' });
    return;
  }

  try {
    // Get the file from Firebase Storage
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid; // Here's the Firebase UID
    const bucket = admin.storage().bucket();
    const file = bucket.file(`resume/${uid}/resume.pdf`);
    const [dataBuffer] = await file.download();

    // Convert PDF to text
    const resumeText = await parsePDF(dataBuffer);

    // Get the job discription
    const { jobDescription } = req.body;

    // Get additional information
    const { additionalInfo } = req.body;

    // Combine resumeText and additionalComments
    const fullContent = `I would like your to write a cover letter that will get the person with this reume:\n${resumeText}\nan interview for this job posting:\n${jobDescription}\n You can only use the information in the resume to write the cover letter and
    these additional facts about the job canadate:\n${additionalInfo}\n`;

    res.status(200).json({ message: 'Testing mode. Further execution stopped.' });
    return;

    // Use fullContent as a prompt to OpenAI API
    const chatCompletion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{
        role: "user", 
        content: fullContent,
      }],
    });
    console.log("chat completion");
    res.status(200).json({ message: chatCompletion.data.choices[0].message });
    console.log(chatCompletion.data.choices[0].message);
  } catch (error) {
    res.status(500).json({ error: error.toString(), stack: error.stack });
  }
}

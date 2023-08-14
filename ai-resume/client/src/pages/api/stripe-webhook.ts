import { buffer } from 'micro';
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import admin from '../../../lib/firebaseAdmin'; // Import Firebase Admin SDK

console.log("start of webhook");

export const config = {
  api: {
    bodyParser: false,
  },
};

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY must be set');
}

if (!process.env.STRIPE_WEBHOOK_SECRET) {
  throw new Error('STRIPE_WEBHOOK_SECRET must be set');
}

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2022-11-15',
});

const webhook = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    console.log("in webhook");
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'] as string;

    let event;
    try {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.client_reference_id; // Assuming you've set the client_reference_id to the user's ID
        const numCredits = session.amount_total / 100; // Assuming 1 credit per dollar
    
        // Update the user's credit balance in Firestore
        const db = admin.firestore();
        const userRef = db.collection('users').doc(userId);
        await userRef.update({
          Credits: admin.firestore.FieldValue.increment(numCredits), // Update the "Credits" field
        });
    
        console.log(`Checkout session completed with ID: ${session.id}`);
        break;
    }

    // Return a response to acknowledge receipt of the event
    res.json({ received: true });
  }
  else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end("Method Not Allowed");
  }
};

export default webhook;

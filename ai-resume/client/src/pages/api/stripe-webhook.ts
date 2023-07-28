import Stripe from 'stripe';
import admin from '../../../lib/firebaseAdmin';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const webhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Retrieve the Checkout Session ID and the user ID from Firebase
    const db = admin.firestore();
    const doc = await db.collection('checkout_sessions').doc(session.id).get();
    const { userId, numCredits } = doc.data();

    // Update the user's credit balance in Firebase
    const userRef = db.collection('users').doc(userId);
    await userRef.update({
      credits: admin.firestore.FieldValue.increment(numCredits),
    });
  }

  res.status(200).send('Webhook received');
};

export default webhook;

import Stripe from 'stripe';
import admin from '../../../lib/firebaseAdmin';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const startCheckoutSession = async (req, res) => {
  const { userId, numCredits } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'Credits',
        },
        unit_amount: 100, // Set the price per credit here
      },
      quantity: numCredits,
    }],
    mode: 'payment',
    success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.origin}/cancel`,
  });

  // TODO: Store the Checkout Session ID and the user ID in Firebase
  const db = admin.firestore();
  await db.collection('checkout_sessions').doc(session.id).set({
    userId: userId,
    sessionId: session.id,
  });

  res.status(200).json({ sessionId: session.id });
};

export default startCheckoutSession;

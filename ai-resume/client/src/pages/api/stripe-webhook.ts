import { buffer } from 'micro';
import Stripe from 'stripe';
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

const stripe = new Stripe(stripeSecretKey, {});

const webhook = async (req, res) => {
  console.log("in webhook");
  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(buf.toString(), sig, webhookSecret);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    console.log("Successful checkout");
    const session = event.data.object;
    // TODO: Handle the checkout.session.completed event
    // You can retrieve relevant information from the session object
    // and perform actions like updating your database, sending emails, etc.

    console.log(`Checkout session completed with ID: ${session.id}`);
  }

  // Return a response to acknowledge receipt of the event
  res.status(200).send('Webhook received');
};

export default webhook;

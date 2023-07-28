import { auth } from '../../lib/firebaseClient';
import React, { useState } from 'react'
import 'firebase/auth';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Subscription() {
  const [numCredits, setNumCredits] = useState(0);

  const handleSubscribeClick = async () => {
    const stripe = await stripePromise;
    const user = auth.currentUser;
    const idToken = await user.getIdToken(true);
    const response = await fetch('/api/start-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`,
      },
      body: JSON.stringify({
        userId: user.uid, // Send the user's ID from your app
        numCredits: numCredits, // Send the number of credits to the API
      }),
    });
  
    const { sessionId } = await response.json();

    const { error } = await stripe.redirectToCheckout({ sessionId });
    if (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Subscription PAGE</h1>
      <input 
        type="number" 
        value={numCredits} 
        onChange={e => setNumCredits(parseInt(e.target.value))} 
        placeholder="Number of credits"
      />
      <button className='btn btn-pink home-btn' onClick={handleSubscribeClick}>Buy Credits</button>
    </div>
  )
}

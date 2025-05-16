import { Router } from 'express';
import Stripe from 'stripe';

const router = Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/payment-intent', async (req, res) => {
  console.log("💳 Recibida solicitud a /payment-intent", req.body);
  
  const { amount } = req.body; 

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card'],
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error al crear PaymentIntent:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;

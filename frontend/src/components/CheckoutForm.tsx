import { useState } from 'react';
import type { FormEvent } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      console.error('Stripe no está cargado.');
      return;
    }

    const res = await fetch('http://localhost:5000/api/stripe/payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: 1000 }),
    });

    const { clientSecret } = await res.json();

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      console.error('No se encontró el elemento CardElement.');
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
      if (result.paymentIntent?.status === 'succeeded') {
        setSuccess(true);
      }
    }
  };

  return success ? (
    <h2>¡Pago exitoso!</h2>
  ) : (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pagar
      </button>
    </form>
  );
}

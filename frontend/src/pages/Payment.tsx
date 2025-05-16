import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../components/CheckoutForm';

const stripePromise = loadStripe('pk_test_51RPBtSBVEg8HNgzVITcTfZrppJtMvF8a6PBJmpaghqsl3FoIZz8X8VkCNkCsE9zupNx8Z7lAWpr5qeFiUtR1Ov4Y00q9PBhA3X');

export default function Payment() {
  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Pagar con tarjeta</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}
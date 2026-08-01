"use client";

import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { getToken } from "@/lib/api/auth";

export default function CheckoutForm({ booking, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!stripe || !elements) return;

    setLoading(true);
    setError("");

    try {
      // Create payment intent
      const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

      const res = await fetch(`${BASE_URL}/create-payment-intent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ amount: booking.rent }),
      });
      const { clientSecret } = await res.json();

      // Confirm payment
      const { paymentIntent, error: stripeError } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: booking.tenantName,
              email: booking.tenantEmail,
            },
          },
        }
      );

      if (stripeError) {
        setError(stripeError.message);
        setLoading(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        onSuccess(paymentIntent.id);
      }
    } catch (err) {
      console.error(err);
      setError("Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="border border-gray-200 rounded-lg px-4 py-3">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "15px",
                color: "#111",
                "::placeholder": { color: "#aaa" },
              },
            },
          }}
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-black text-white text-sm font-semibold py-3 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
      >
        {loading ? "Processing..." : `Pay ৳${Number(booking.rent).toLocaleString()}`}
      </button>
    </form>
  );
}
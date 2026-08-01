"use client";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { updateBookingStatus } from "@/lib/api/bookings";
import { useRouter } from "next/navigation";

export default function PaymentModal({ booking, onClose }) {
  const router = useRouter();


  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );

  const handleSuccess = async (transactionId) => {
  try {
    // booking status + payment status update
    await updateBookingStatus(booking._id, "approved");
    
    // payment status paid করো
    await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/bookings/${booking._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ 
        paymentStatus: 'paid',
        transactionId,
      }),
    });

    toast.success("Payment successful! Booking confirmed.");
    onClose();
    router.push("/dashboard/bookings");
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Complete Payment</h2>
          <p className="text-sm text-gray-400 mt-1">{booking.propertyTitle}</p>
          <p className="text-2xl font-bold text-blue-600 mt-2">
            ৳{Number(booking.rent).toLocaleString()}
            <span className="text-sm font-normal text-gray-400 ml-1">/{booking.rentType}</span>
          </p>
        </div>

        {stripePromise ? (
          <Elements stripe={stripePromise}>
            <CheckoutForm booking={booking} onSuccess={handleSuccess} />
          </Elements>
        ) : (
          <p className="text-red-500 text-sm text-center">Stripe key missing!</p>
        )}

        <button
          onClick={onClose}
          className="w-full mt-3 border border-gray-200 text-sm text-gray-600 py-2.5 rounded-lg hover:bg-gray-50 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
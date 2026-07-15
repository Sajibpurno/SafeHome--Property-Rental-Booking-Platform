"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { getBookingsByEmail } from "@/lib/api/bookings";

const BookingPage = () => {
  const { data: session } = authClient.useSession();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.email) return;
    getBookingsByEmail(session.user.email)
      .then(setBookings)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [session]);

  if (loading) return <p className="text-gray-400 text-sm">Loading bookings...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Bookings</h2>

      {bookings.length === 0 ? (
        <div className="text-center py-20 text-gray-400 text-sm">
          No bookings yet.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">Property</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">Location</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">Move-in Date</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">Amount</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">Booking Status</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">Payment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50 transition">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={booking.propertyImage}
                        alt={booking.propertyTitle}
                        className="w-12 h-10 rounded-lg object-cover flex-shrink-0"
                      />
                      <span className="font-medium text-gray-800 line-clamp-1">
                        {booking.propertyTitle}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-500">{booking.location}</td>
                  <td className="px-5 py-4 text-gray-500">{booking.moveInDate || "—"}</td>
                  <td className="px-5 py-4 font-semibold text-gray-800">
                    ৳{Number(booking.rent).toLocaleString()}
                    <span className="text-xs text-gray-400 font-normal ml-1">/{booking.rentType}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full capitalize
                      ${booking.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : booking.status === "rejected"
                        ? "bg-red-100 text-red-600"
                        : "bg-yellow-100 text-yellow-700"}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full capitalize
                      ${booking.paymentStatus === "paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"}`}>
                      {booking.paymentStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
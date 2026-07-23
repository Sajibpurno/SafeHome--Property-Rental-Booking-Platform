"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { getBookingsByOwner, updateBookingStatus } from "@/lib/api/bookings";

const BookingRequestsPage = () => {
  const { data: session } = authClient.useSession();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.email) return;
    getBookingsByOwner(session.user.email)
      .then(setBookings)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [session]);

  const handleStatus = async (id, status) => {
    try {
      await updateBookingStatus(id, status);
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status } : b))
      );
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="text-gray-400 text-sm">Loading...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Booking Requests</h2>

      {bookings.length === 0 ? (
        <div className="text-center py-20 text-gray-400 text-sm">
          No booking requests yet.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">Property</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">Tenant</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">Move-in Date</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">Amount</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">Status</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50 transition">
                  {/* Property */}
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

                  {/* Tenant */}
                  <td className="px-5 py-4">
                    <p className="font-medium text-gray-800">{booking.tenantName}</p>
                    <p className="text-xs text-gray-400">{booking.tenantEmail}</p>
                  </td>

                  {/* Move-in Date */}
                  <td className="px-5 py-4 text-gray-500">{booking.moveInDate || "—"}</td>

                  {/* Amount */}
                  <td className="px-5 py-4 font-semibold text-gray-800">
                    ৳{Number(booking.rent).toLocaleString()}
                    <span className="text-xs text-gray-400 font-normal ml-1">/{booking.rentType}</span>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full capitalize
                      ${booking.status === "approved" ? "bg-green-100 text-green-700" :
                        booking.status === "rejected" ? "bg-red-100 text-red-600" :
                        "bg-yellow-100 text-yellow-700"}`}>
                      {booking.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    {booking.status === "pending" ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleStatus(booking._id, "approved")}
                          className="text-xs font-semibold px-3 py-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleStatus(booking._id, "rejected")}
                          className="text-xs font-semibold px-3 py-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400">No action</span>
                    )}
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

export default BookingRequestsPage;
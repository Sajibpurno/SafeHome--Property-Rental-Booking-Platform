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
      .then((data) => setBookings(Array.isArray(data) ? data : []))
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

  if (loading) return <p className="text-muted-foreground text-sm">Loading...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-6">Booking Requests</h2>

      {bookings.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground text-sm">
          No booking requests yet.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">Property</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">Tenant</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">Move-in Date</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">Amount</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">Status</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-muted transition">
                  {/* Property */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={booking.propertyImage}
                        alt={booking.propertyTitle}
                        className="w-12 h-10 rounded-lg object-cover flex-shrink-0"
                      />
                      <span className="font-medium text-foreground line-clamp-1">
                        {booking.propertyTitle}
                      </span>
                    </div>
                  </td>

                  {/* Tenant */}
                  <td className="px-5 py-4">
                    <p className="font-medium text-foreground">{booking.tenantName}</p>
                    <p className="text-xs text-muted-foreground">{booking.tenantEmail}</p>
                  </td>

                  {/* Move-in Date */}
                  <td className="px-5 py-4 text-muted-foreground">{booking.moveInDate || "—"}</td>

                  {/* Amount */}
                  <td className="px-5 py-4 font-semibold text-foreground">
                    ৳{Number(booking.rent).toLocaleString()}
                    <span className="text-xs text-muted-foreground font-normal ml-1">/{booking.rentType}</span>
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
                      <span className="text-xs text-muted-foreground">No action</span>
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
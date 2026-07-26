"use client";

import { useEffect, useState } from "react";
import { getAllBookingsAdmin } from "@/lib/api/admin";

const AllBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllBookingsAdmin()
      .then(setBookings)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-muted-foreground text-sm">Loading...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-6">All Bookings</h2>

      {bookings.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground text-sm">No bookings found.</div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">Property</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">Tenant</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">Move-in Date</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">Amount</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">Booking Status</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">Payment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-muted transition">
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
                  <td className="px-5 py-4">
                    <p className="font-medium text-foreground">{booking.tenantName}</p>
                    <p className="text-xs text-muted-foreground">{booking.tenantEmail}</p>
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">{booking.moveInDate || "—"}</td>
                  <td className="px-5 py-4 font-semibold text-foreground">
                    ৳{Number(booking.rent).toLocaleString()}
                    <span className="text-xs text-muted-foreground font-normal ml-1">/{booking.rentType}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full capitalize
                      ${booking.status === "approved" ? "bg-green-100 text-green-700" :
                        booking.status === "rejected" ? "bg-red-100 text-red-600" :
                        "bg-yellow-100 text-yellow-700"}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full capitalize
                      ${booking.paymentStatus === "paid" ? "bg-green-100 text-green-700" :
                        "bg-surface-2 text-muted-foreground"}`}>
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

export default AllBookingsPage;
"use client";

import { useState } from "react";
import { createBooking } from "@/lib/api/bookings";
import { authClient } from "@/lib/auth-client";
import { toast } from "@heroui/react";

export default function BookingModal({ property, onClose }) {
  const { data: session } = authClient.useSession();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    moveInDate: "",
    contactNumber: "",
    additionalNotes: "",
  });

  const handleBook = async (e) => {
    e.preventDefault();
    if (!session) return alert("Please login first!");

    setLoading(true);
    const payload = {
      ...form,
      propertyId: property._id,
      propertyTitle: property.title,
      propertyImage: property.imageUrl,
      location: property.location,
      rent: property.rent,
      rentType: property.rentType,
      tenantEmail: session.user.email,
      tenantName: session.user.name,
      status: "pending",
      paymentStatus: "unpaid",
    };

    try {
      const res = await createBooking(payload);
      if (res.insertedId) {
        toast.success("Booking successful!");
        onClose();
      } else {
        toast.error("Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-2xl">

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Booking Properties</h2>
          <p className="text-sm text-gray-400 mt-1">
            Make changes to your profile here. Click save when you are done.
          </p>
        </div>

        <form onSubmit={handleBook} className="flex flex-col gap-4">

          {/* Row 1: Name + Email */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">User Name</label>
              <input
                value={session?.user?.name || ""}
                readOnly
                className="w-full border border-gray-200 rounded-lg px-4 h-11 text-sm text-gray-600 bg-gray-50 outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">Email</label>
              <input
                value={session?.user?.email || ""}
                readOnly
                className="w-full border border-gray-200 rounded-lg px-4 h-11 text-sm text-gray-600 bg-gray-50 outline-none"
              />
            </div>
          </div>

          {/* Row 2: Phone + Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">Phone</label>
              <input
                type="tel"
                required
                placeholder="017XXXXXXXXX"
                value={form.contactNumber}
                onChange={(e) => setForm({ ...form, contactNumber: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-4 h-11 text-sm text-gray-700 outline-none focus:border-gray-400"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">Date</label>
              <input
                type="date"
                required
                value={form.moveInDate}
                onChange={(e) => setForm({ ...form, moveInDate: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-4 h-11 text-sm text-gray-700 outline-none focus:border-gray-400"
              />
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">Additional Notes</label>
            <textarea
              placeholder="Any special requirements..."
              rows={3}
              value={form.additionalNotes}
              onChange={(e) => setForm({ ...form, additionalNotes: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 outline-none resize-none focus:border-gray-400"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 border border-gray-200 text-sm text-gray-600 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-black text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
            >
              {loading ? "Booking..." : "Confirm Booking"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
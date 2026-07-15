"use client";

import { useState } from "react";
import BookingModal from "./BookingModal";
import { addFavorite } from "@/lib/api/favorites";
import { authClient } from "@/lib/auth-client";

export default function BookingBox({ property }) {
  const { data: session } = authClient.useSession();
  const [showModal, setShowModal] = useState(false);
  const [favLoading, setFavLoading] = useState(false);
  const [favAdded, setFavAdded] = useState(false);

  const handleFavorite = async () => {
    if (!session) return alert("Please login first!");
    setFavLoading(true);
    try {
      const payload = {
        propertyId: property._id,
        propertyTitle: property.title,
        propertyImage: property.imageUrl,
        location: property.location,
        rent: property.rent,
        rentType: property.rentType,
        tenantEmail: session.user.email,
      };
      const res = await addFavorite(payload);
      if (res.insertedId) {
        setFavAdded(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFavLoading(false);
    }
  };

  return (
    <>
      <div className="border border-gray-200 rounded-xl p-5 sticky top-6 flex flex-col gap-4">
        <p className="text-lg font-bold text-blue-600">
          ৳{Number(property.rent).toLocaleString()}
          <span className="text-sm font-normal text-gray-400 ml-1">/ {property.rentType}</span>
        </p>

        <button
          onClick={() => setShowModal(true)}
          className="w-full bg-black text-white text-sm font-semibold py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Book Now
        </button>

        <button
          onClick={handleFavorite}
          disabled={favLoading || favAdded}
          className={`w-full border text-sm py-3 rounded-lg transition font-medium
            ${favAdded
              ? "border-green-300 text-green-600 bg-green-50"
              : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}
        >
          {favAdded ? "✔ Added to Favorites" : favLoading ? "Adding..." : "Add to Favorites"}
        </button>

        <div className="flex flex-col gap-2 mt-1">
          {["Verified Property", "Secure Payment", "Instant Booking"].map((item) => (
            <div key={item} className="flex items-center gap-2 text-sm text-gray-500">
              <span className="text-green-500">✔</span>
              {item}
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <BookingModal property={property} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
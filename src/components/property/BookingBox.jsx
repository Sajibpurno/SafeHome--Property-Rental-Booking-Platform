"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BookingModal from "./BookingModal";
import PaymentModal from "./PaymentModal";
import { addFavorite } from "@/lib/api/favorites";
import { authClient } from "@/lib/auth-client";

export default function BookingBox({ property }) {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [favLoading, setFavLoading] = useState(false);
  const [favAdded, setFavAdded] = useState(false);

  const isOwner = session?.user?.email === property.ownerEmail;

  const handleBookNow = () => {
    if (!session) return router.push('/signin');
    if (isOwner) return alert("You cannot book your own property!");
    setShowModal(true);
  };

  const handlePayment = (booking) => {
    setCurrentBooking(booking);
    setShowPayment(true);
  };

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
      if (res.insertedId) setFavAdded(true);
    } catch (err) {
      console.error(err);
    } finally {
      setFavLoading(false);
    }
  };

  return (
    <>
      <div className="border border-border rounded-xl p-5 sticky top-6 flex flex-col gap-4">
        <p className="text-lg font-bold text-blue-600">
          ৳{Number(property.rent).toLocaleString()}
          <span className="text-sm font-normal text-muted-foreground ml-1">/ {property.rentType}</span>
        </p>

        <button
          onClick={handleBookNow}
          disabled={isOwner}
          className={`w-full text-sm font-semibold py-3 rounded-lg transition
            ${isOwner
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-black text-white hover:bg-gray-800"}`}
        >
          {isOwner ? "Your Property" : "Book Now"}
        </button>

        <button
          onClick={handleFavorite}
          disabled={favLoading || favAdded}
          className={`w-full border text-sm py-3 rounded-lg transition font-medium
            ${favAdded
              ? "border-green-300 text-green-600 bg-green-50"
              : "border-border text-muted-foreground hover:bg-muted"}`}
        >
          {favAdded ? "✔ Added to Favorites" : favLoading ? "Adding..." : "Add to Favorites"}
        </button>

        <div className="flex flex-col gap-2 mt-1">
          {["Verified Property", "Secure Payment", "Instant Booking"].map((item) => (
            <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="text-green-500">✔</span>
              {item}
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <BookingModal
          property={property}
          onClose={() => setShowModal(false)}
          onPayment={handlePayment}
        />
      )}

      {showPayment && currentBooking && (
        <PaymentModal
          booking={currentBooking}
          onClose={() => setShowPayment(false)}
        />
      )}
    </>
  );
}
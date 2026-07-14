"use client";

export default function BookingBox({ property }) {
  return (
    <div className="border border-gray-200 rounded-xl p-5 sticky top-6 flex flex-col gap-4">
      <p className="text-lg font-bold text-blue-600">
        ৳{Number(property.rent).toLocaleString()}
        <span className="text-sm font-normal text-gray-400 ml-1">/ {property.rentType}</span>
      </p>

      <button className="w-full bg-black text-white text-sm font-semibold py-3 rounded-lg hover:bg-gray-800 transition">
        Book Now
      </button>

      <button className="w-full border border-gray-200 text-sm text-gray-600 py-3 rounded-lg hover:bg-gray-50 transition">
        Add to Favorites
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
  );
}
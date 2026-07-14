"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { MapPin, BedDouble, Bath, Maximize2, Tag } from "lucide-react";
import { getPropertyById } from "@/lib/api/properties";
import BookingBox from "@/components/property/BookingBox";
import ReviewBox from "@/components/property/ReviewBox";

export default function PropertyDetailsPage() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPropertyById(id)
      .then(setProperty)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-400 text-sm">Loading...</div>;
  if (!property) return <div className="min-h-screen flex items-center justify-center text-gray-400 text-sm">Property not found.</div>;

  return (
    <div className="min-h-screen bg-white py-10 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Top: Image + Booking Box */}
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Left */}
          <div className="flex-1">
            {/* Image */}
            <div className="rounded-xl overflow-hidden h-72 w-full">
              <img src={property.imageUrl} alt={property.title} className="w-full h-full object-cover" />
            </div>

            {/* Title + Location */}
            <div className="mt-5">
              <h1 className="text-2xl font-bold text-gray-900">{property.title}</h1>
              <div className="flex items-center gap-1 text-blue-500 text-sm mt-1">
                <MapPin size={14} />
                <span>{property.location}</span>
              </div>
              <p className="text-gray-500 text-sm mt-3 leading-relaxed">{property.description}</p>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="border border-gray-100 rounded-lg p-3 flex items-center gap-2 text-sm text-gray-600">
                <BedDouble size={16} className="text-blue-500" />
                {property.bedrooms} Bedrooms
              </div>
              <div className="border border-gray-100 rounded-lg p-3 flex items-center gap-2 text-sm text-gray-600">
                <Bath size={16} className="text-blue-500" />
                {property.bathrooms} Bathrooms
              </div>
              <div className="border border-gray-100 rounded-lg p-3 flex items-center gap-2 text-sm text-gray-600">
                <Maximize2 size={16} className="text-blue-500" />
                {property.size} sqft
              </div>
              <div className="border border-gray-100 rounded-lg p-3 flex items-center gap-2 text-sm text-gray-600">
                <Tag size={16} className="text-blue-500" />
                {property.propertyType}
              </div>
            </div>

            {/* Amenities */}
            {property.amenities?.length > 0 && (
              <div className="mt-5 border border-gray-100 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-red-500 mb-3">🔴 Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {property.amenities.map((a) => (
                    <span key={a} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full flex items-center gap-1">
                      ✅ {a}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Extra Features */}
            {property.extraFeatures && (
              <div className="mt-4 border border-gray-100 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-orange-500 mb-2">🟠 Extra Features</h3>
                <p className="text-sm text-blue-500">{property.extraFeatures}</p>
              </div>
            )}
          </div>

          {/* Right — Booking Box */}
          <div className="w-full lg:w-72 flex-shrink-0">
            <BookingBox property={property} />
          </div>
        </div>

        {/* Review Box */}
        <div className="mt-10">
          <ReviewBox propertyId={id} />
        </div>

      </div>
    </div>
  );
}
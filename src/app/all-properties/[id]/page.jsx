"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { MapPin, BedDouble, Bath, Maximize2, Tag, ChevronLeft, ChevronRight } from "lucide-react";
import { getPropertyById } from "@/lib/api/properties";
import BookingBox from "@/components/property/BookingBox";
import ReviewBox from "@/components/property/ReviewBox";
import { motion, AnimatePresence } from "framer-motion";

export default function PropertyDetailsPage() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    getPropertyById(id)
      .then((data) => {
        setProperty(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-muted-foreground text-sm">Loading...</div>;
  if (!property) return <div className="min-h-screen flex items-center justify-center text-muted-foreground text-sm">Property not found.</div>;

  const images = property.images?.length ? property.images : [property.imageUrl];

  const handlePrev = () => setActiveImg(i => (i - 1 + images.length) % images.length);
  const handleNext = () => setActiveImg(i => (i + 1) % images.length);

  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <div className="max-w-5xl mx-auto">

        <div className="flex flex-col lg:flex-row gap-8">

          {/* Left */}
          <div className="flex-1">

            {/* Main Image */}
            <div className="relative rounded-xl overflow-hidden h-72 w-full bg-muted">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImg}
                  src={images[activeImg]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>

              {/* Prev/Next buttons */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition"
                  >
                    <ChevronRight size={18} />
                  </button>

                  {/* Image counter */}
                  <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                    {activeImg + 1} / {images.length}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                {images.map((img, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition
                      ${activeImg === i ? "border-blue-500" : "border-transparent"}`}
                  >
                    <img src={img} alt={`thumb-${i}`} className="w-full h-full object-cover" />
                  </motion.button>
                ))}
              </div>
            )}

            {/* Title + Location */}
            <div className="mt-5">
              <h1 className="text-2xl font-bold text-foreground">{property.title}</h1>
              <div className="flex items-center gap-1 text-blue-500 text-sm mt-1">
                <MapPin size={14} />
                <span>{property.location}</span>
              </div>
              <p className="text-muted-foreground text-sm mt-3 leading-relaxed">{property.description}</p>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="border border-border rounded-lg p-3 flex items-center gap-2 text-sm text-muted-foreground">
                <BedDouble size={16} className="text-blue-500" />
                {property.bedrooms} Bedrooms
              </div>
              <div className="border border-border rounded-lg p-3 flex items-center gap-2 text-sm text-muted-foreground">
                <Bath size={16} className="text-blue-500" />
                {property.bathrooms} Bathrooms
              </div>
              <div className="border border-border rounded-lg p-3 flex items-center gap-2 text-sm text-muted-foreground">
                <Maximize2 size={16} className="text-blue-500" />
                {property.size} sqft
              </div>
              <div className="border border-border rounded-lg p-3 flex items-center gap-2 text-sm text-muted-foreground">
                <Tag size={16} className="text-blue-500" />
                {property.propertyType}
              </div>
            </div>

            {/* Amenities */}
            {property.amenities?.length > 0 && (
              <div className="mt-5 border border-border rounded-lg p-4">
                <h3 className="text-sm font-semibold text-red-500 mb-3">🔴 Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {property.amenities.map((a) => (
                    <span key={a} className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full flex items-center gap-1">
                      ✅ {a}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Extra Features */}
            {property.extraFeatures && (
              <div className="mt-4 border border-border rounded-lg p-4">
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
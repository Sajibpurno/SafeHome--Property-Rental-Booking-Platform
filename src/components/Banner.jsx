"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import PropertySearchForm from "./form-store/PropertySearchForm";

const images = [
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
  "https://images.unsplash.com/photo-1590291127093-24b2232c51ec?q=80&w=1957&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
];

const Banner = () => {
  const [index, setIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const location = formData.get("location") || "";
    const type = formData.get("type") || "";
    const maxPrice = formData.get("maxPrice") || "";
    const minPrice = formData.get("minPrice") || "";

    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (type) params.set("propertyType", type.toLowerCase());
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (minPrice) params.set("minPrice", minPrice);

    router.push(`/all-properties?${params.toString()}`);
  };

  return (
    <section className="relative h-[800px] w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={images[index]}
            src={images[index]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>
      <div className="absolute inset-0 bg-black/50 z-10" />

      <div className="relative z-20 text-center text-white px-4 w-full">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg">Find Your Dream Home</h1>
        <p className="text-lg mb-10 opacity-90 font-medium">Book apartments, villas and houses with trusted owners across Bangladesh.</p>
        <PropertySearchForm handleSearch={handleSearch} />
      </div>
    </section>
  );
};

export default Banner;
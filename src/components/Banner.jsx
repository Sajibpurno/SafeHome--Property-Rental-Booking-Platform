"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Form, Button, SearchField } from "@heroui/react";
import { Search } from "lucide-react";

const images = [
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
  "https://images.unsplash.com/photo-1590291127093-24b2232c51ec?q=80&w=1957&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
];

const Banner = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log("Search Data:", Object.fromEntries(formData));
  };

  return (
    <section className="relative h-[800px] w-full flex items-center justify-center overflow-hidden">
      {/* Slider: popLayout use kora hoyeche jate transition-e kichu na thake */}
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

      {/* Content */}
      <div className="relative z-20 text-center text-white px-4 w-full">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg">Find Your Dream Home</h1>
        <p className="text-lg mb-10 opacity-90 font-medium">Book apartments, villas and houses with trusted owners across Bangladesh.</p>

        {/* Search Form */}
        <Form 
          onSubmit={handleSearch}
          className="bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/30 flex flex-col md:flex-row gap-2 items-center justify-between max-w-5xl mx-auto shadow-2xl"
        >
          <SearchField name="location" className="w-full md:w-1/4 px-2">
             <SearchField.Input placeholder="Location" className="placeholder:text-white/80 bg-transparent border-none focus:outline-none" />
          </SearchField>

          <div className="w-px h-8 bg-white/20 hidden md:block" />

          <SearchField name="type" className="w-full md:w-1/4 px-2">
             <SearchField.Input placeholder="Property Type" className="placeholder:text-white/80 bg-transparent border-none focus:outline-none" />
          </SearchField>

          <div className="w-px h-8 bg-white/20 hidden md:block" />

          <SearchField name="maxPrice" className="w-full md:w-1/6 px-2">
             <SearchField.Input placeholder="Max Price" className="placeholder:text-white/80 bg-transparent border-none focus:outline-none" />
          </SearchField>
          
          <SearchField name="minPrice" className="w-full md:w-1/6 px-2">
             <SearchField.Input placeholder="Min Price" className="placeholder:text-white/80 bg-transparent border-none focus:outline-none" />
          </SearchField>

          <Button type="submit" className="bg-[#1a1a1a] text-white rounded-full items-center flex px-8 h-12 hover:bg-black transition-all">
            <Search size={18} className="mr-2" /> Search
          </Button>
        </Form>
      </div>
    </section>
  );
};

export default Banner;
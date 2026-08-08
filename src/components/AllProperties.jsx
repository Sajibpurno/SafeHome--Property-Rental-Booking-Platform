"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { getAllProperties } from "@/lib/api/properties";
import { Button } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";

export default function AllProperties() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // URL Query Parameters থেকে ডাটা রিড করা
  const locationParam = searchParams.get("location") || "";
  const propertyTypeParam = searchParams.get("propertyType") || "";
  const minPriceParam = searchParams.get("minPrice") || "";
  const maxPriceParam = searchParams.get("maxPrice") || "";

  const [filters, setFilters] = useState({
    location: locationParam,
    propertyType: propertyTypeParam,
    maxPrice: maxPriceParam,
    minPrice: minPriceParam,
    sortBy: "",
  });

  // URL Param আপডেট হলে Input Box-গুলোতেও যেন সেই লেখাটি সাথে সাথে বসে যায়
  useEffect(() => {
    setFilters({
      location: searchParams.get("location") || "",
      propertyType: searchParams.get("propertyType") || "",
      maxPrice: searchParams.get("maxPrice") || "",
      minPrice: searchParams.get("minPrice") || "",
      sortBy: "",
    });
  }, [searchParams]);

  // Data Fetching
  useEffect(() => {
    setLoading(true);
    getAllProperties(currentPage, 12) // পেজ সাইজ একটু বাড়িয়ে দেয়া ভালো
      .then((data) => {
        setProperties(data?.properties || []);
        setTotalPages(data?.totalPages || 1);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [currentPage]);

  const handleReset = () => {
    setFilters({ location: "", propertyType: "", maxPrice: "", minPrice: "", sortBy: "" });
    router.push("/all-properties"); // URL ক্লিয়ার করা
  };

  // Safe Matching Filter Engine
  const filtered = properties
    .filter((p) => {
      // 1. Location Search
      if (filters.location) {
        const propLocation = p?.location?.toLowerCase() || "";
        const searchLocation = filters.location.toLowerCase().trim();
        if (!propLocation.includes(searchLocation)) return false;
      }

      // 2. Property Type Search (Case Mismatch Fix)
      if (filters.propertyType) {
        const propType = (p?.propertyType || p?.type || "").toLowerCase().trim();
        const searchType = filters.propertyType.toLowerCase().trim();
        if (propType !== searchType) return false;
      }

      // 3. Price Filter (Supports 'rent' or 'monthlyRent' fields)
      const rentPrice = Number(p?.rent || p?.monthlyRent || 0);

      if (filters.minPrice && rentPrice < Number(filters.minPrice)) return false;
      if (filters.maxPrice && rentPrice > Number(filters.maxPrice)) return false;

      return true;
    })
    .sort((a, b) => {
      const priceA = Number(a?.rent || a?.monthlyRent || 0);
      const priceB = Number(b?.rent || b?.monthlyRent || 0);

      if (filters.sortBy === "low") return priceA - priceB;
      if (filters.sortBy === "high") return priceB - priceA;
      return 0;
    });

  return (
    <div className="min-h-screen bg-background">
      {/* Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto px-4 pt-10 pb-4"
      >
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <div className="flex flex-wrap gap-3">
            {/* Location Input */}
            <div className="flex items-center gap-2 border border-border rounded-lg px-3 h-11 flex-1 min-w-[140px]">
              <MapPin size={15} className="text-muted-foreground" />
              <input
                type="text"
                placeholder="Location"
                value={filters.location}
                onChange={(e) => setFilters((prev) => ({ ...prev, location: e.target.value }))}
                className="text-sm outline-none w-full text-foreground placeholder:text-muted-foreground bg-transparent"
              />
            </div>

            {/* Property Type Dropdown */}
            <select
              value={filters.propertyType}
              onChange={(e) => setFilters((prev) => ({ ...prev, propertyType: e.target.value }))}
              className="border border-border rounded-lg px-3 h-11 text-sm text-muted-foreground outline-none flex-1 min-w-[140px] bg-card cursor-pointer capitalize"
            >
              <option value="">All Property Types</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="House">House</option>
              <option value="Office">Office</option>
              <option value="Studio">Studio</option>
            </select>

            {/* Min Price */}
            <div className="flex items-center gap-2 border border-border rounded-lg px-3 h-11 flex-1 min-w-[120px]">
              <span className="text-muted-foreground text-sm">৳</span>
              <input
                type="number"
                placeholder="Min price"
                value={filters.minPrice}
                onChange={(e) => setFilters((prev) => ({ ...prev, minPrice: e.target.value }))}
                className="text-sm outline-none w-full text-foreground placeholder:text-muted-foreground bg-transparent"
              />
            </div>

            {/* Max Price */}
            <div className="flex items-center gap-2 border border-border rounded-lg px-3 h-11 flex-1 min-w-[120px]">
              <span className="text-muted-foreground text-sm">৳</span>
              <input
                type="number"
                placeholder="Max price"
                value={filters.maxPrice}
                onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: e.target.value }))}
                className="text-sm outline-none w-full text-foreground placeholder:text-muted-foreground bg-transparent"
              />
            </div>

            {/* Sort Dropdown */}
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters((prev) => ({ ...prev, sortBy: e.target.value }))}
              className="border border-border rounded-lg px-3 h-11 text-sm text-muted-foreground outline-none flex-1 min-w-[130px] bg-card cursor-pointer"
            >
              <option value="">Sort By</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>

          <div className="flex justify-end mt-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleReset}
              className="border border-border text-sm text-muted-foreground px-4 py-2 rounded-lg hover:bg-muted transition"
            >
              Reset Filters
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Cards List */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full"
            />
          </div>
        ) : filtered.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-muted-foreground text-sm py-20"
          >
            No properties found matching your criteria.
          </motion.p>
        ) : (
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filtered.map((property) => (
                <motion.div
                  key={property._id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 },
                  }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="bg-card border border-border rounded-xl overflow-hidden flex flex-col shadow-sm hover:shadow-xl hover:border-blue-300 transition-shadow"
                >
                  <div className="h-48 w-full overflow-hidden bg-muted">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                      src={property.imageUrl || property.images?.[0] || "/placeholder.jpg"}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5 flex flex-col gap-2 flex-1">
                    <h3 className="text-base font-semibold text-foreground line-clamp-1">{property.title}</h3>
                    <div className="flex items-center gap-1 text-muted-foreground text-sm">
                      <span>📍</span>
                      <span className="line-clamp-1">{property.location}</span>
                    </div>
                    <p className="text-blue-600 font-semibold text-sm">
                      ৳{Number(property.rent || property.monthlyRent || 0).toLocaleString()} /{property.rentType || "Month"}
                    </p>
                    <Button
                      onClick={() => router.push(`/all-properties/${property._id}`)}
                      className="mt-auto bg-black text-white text-sm font-medium py-2.5 rounded-lg hover:bg-gray-800 transition w-full cursor-pointer"
                    >
                      View Detail
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted disabled:opacity-40 transition"
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 rounded-lg text-sm font-medium transition ${
                  currentPage === page
                    ? "bg-black text-white"
                    : "border border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted disabled:opacity-40 transition"
            >
              <ChevronRight size={16/>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
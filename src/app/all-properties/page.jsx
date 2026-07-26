"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { getAllProperties } from "@/lib/api/properties";
import { Button } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";

export default function AllProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    location: "",
    propertyType: "",
    maxPrice: "",
    minPrice: "",
    sortBy: "",
  });

  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    getAllProperties(currentPage, 6)
      .then((data) => {
        setProperties(data.properties || []);
        setTotalPages(data.totalPages || 1);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [currentPage]);

  const handleReset = () => {
    setFilters({ location: "", propertyType: "", maxPrice: "", minPrice: "", sortBy: "" });
  };

  const filtered = properties
    .filter((p) => {
      if (filters.location && !p.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
      if (filters.propertyType && p.propertyType !== filters.propertyType) return false;
      if (filters.minPrice && Number(p.rent) < Number(filters.minPrice)) return false;
      if (filters.maxPrice && Number(p.rent) > Number(filters.maxPrice)) return false;
      return true;
    })
    .sort((a, b) => {
      if (filters.sortBy === "low") return Number(a.rent) - Number(b.rent);
      if (filters.sortBy === "high") return Number(b.rent) - Number(a.rent);
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
            <div className="flex items-center gap-2 border border-border rounded-lg px-3 h-11 flex-1 min-w-[140px]">
              <MapPin size={15} className="text-muted-foreground" />
              <input
                type="text"
                placeholder="Location"
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                className="text-sm outline-none w-full text-foreground placeholder:text-muted-foreground bg-transparent"
              />
            </div>
            <select
              value={filters.propertyType}
              onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
              className="border border-border rounded-lg px-3 h-11 text-sm text-muted-foreground outline-none flex-1 min-w-[140px] bg-card cursor-pointer"
            >
              <option value="">Property Type</option>
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="house">House</option>
              <option value="office">Office</option>
            </select>
            <div className="flex items-center gap-2 border border-border rounded-lg px-3 h-11 flex-1 min-w-[120px]">
              <span className="text-muted-foreground text-sm">৳</span>
              <input
                type="number"
                placeholder="Max price"
                value={filters.maxPrice}
                onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                className="text-sm outline-none w-full text-foreground placeholder:text-muted-foreground bg-transparent"
              />
            </div>
            <div className="flex items-center gap-2 border border-border rounded-lg px-3 h-11 flex-1 min-w-[120px]">
              <span className="text-muted-foreground text-sm">৳</span>
              <input
                type="number"
                placeholder="Min price"
                value={filters.minPrice}
                onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                className="text-sm outline-none w-full text-foreground placeholder:text-muted-foreground bg-transparent"
              />
            </div>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
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

      {/* Cards */}
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
            No properties found.
          </motion.p>
        ) : (
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filtered.map((property) => (
                <motion.div
                  key={property._id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 }
                  }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="bg-card border border-border rounded-xl overflow-hidden flex flex-col shadow-sm hover:shadow-xl hover:border-blue-300 transition-shadow"
                >
                  <div className="h-48 w-full overflow-hidden bg-surface-2">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                      src={property.imageUrl}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5 flex flex-col gap-2 flex-1">
                    <h3 className="text-base font-semibold text-foreground">{property.title}</h3>
                    <div className="flex items-center gap-1 text-muted-foreground text-sm">
                      <span>📍</span>
                      <span>{property.location}</span>
                    </div>
                    <p className="text-blue-600 font-semibold text-sm">
                      ৳{Number(property.rent).toLocaleString()} /{property.rentType}
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
                className={`w-9 h-9 rounded-lg text-sm font-medium transition
                  ${currentPage === page
                    ? "bg-black text-white"
                    : "border border-border text-muted-foreground hover:bg-muted"}`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted disabled:opacity-40 transition"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
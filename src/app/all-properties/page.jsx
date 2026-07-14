"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin } from "lucide-react";
import { getAllProperties } from "@/lib/api/properties";

export default function AllProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    location: "",
    propertyType: "",
    maxPrice: "",
    minPrice: "",
    sortBy: "",
  });

  const router = useRouter();

  useEffect(() => {
    getAllProperties()
      .then((data) => setProperties(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

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
    <div className="min-h-screen bg-white">

      {/* Filter Bar */}
      <div className="max-w-5xl mx-auto px-4 pt-10 pb-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex flex-wrap gap-3">
            {/* Location */}
            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 h-11 flex-1 min-w-[140px]">
              <MapPin size={15} className="text-gray-400" />
              <input
                type="text"
                placeholder="Location"
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                className="text-sm outline-none w-full text-gray-700 placeholder:text-gray-400"
              />
            </div>

            {/* Property Type */}
            <select
              value={filters.propertyType}
              onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
              className="border border-gray-200 rounded-lg px-3 h-11 text-sm text-gray-600 outline-none flex-1 min-w-[140px] bg-white"
            >
              <option value="">Property Type</option>
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="house">House</option>
              <option value="office">Office</option>
            </select>

            {/* Max Price */}
            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 h-11 flex-1 min-w-[120px]">
              <span className="text-gray-400 text-sm">৳</span>
              <input
                type="number"
                placeholder="Max price"
                value={filters.maxPrice}
                onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                className="text-sm outline-none w-full text-gray-700 placeholder:text-gray-400"
              />
            </div>

            {/* Min Price */}
            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 h-11 flex-1 min-w-[120px]">
              <span className="text-gray-400 text-sm">৳</span>
              <input
                type="number"
                placeholder="Min price"
                value={filters.minPrice}
                onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                className="text-sm outline-none w-full text-gray-700 placeholder:text-gray-400"
              />
            </div>

            {/* Sort By */}
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
              className="border border-gray-200 rounded-lg px-3 h-11 text-sm text-gray-600 outline-none flex-1 min-w-[130px] bg-white"
            >
              <option value="">Sort By</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>

          {/* Reset */}
          <div className="flex justify-end mt-3">
            <button
              onClick={handleReset}
              className="border border-gray-200 text-sm text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        {loading ? (
          <p className="text-center text-gray-400 text-sm">Loading properties...</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-400 text-sm py-20">No properties found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((property) => (
              <div
                key={property._id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-blue-300"
              >
                {/* Image */}
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={property.imageUrl}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Body */}
                <div className="p-5 flex flex-col gap-2 flex-1">
                  <h3 className="text-base font-semibold text-gray-900">{property.title}</h3>

                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <span>📍</span>
                    <span>{property.location}</span>
                  </div>

                  <p className="text-blue-600 font-semibold text-sm">
                    ৳{Number(property.rent).toLocaleString()} /{property.rentType}
                  </p>

                  <button
                    onClick={() => router.push(`/allProperties/${property._id}`)}
                    className="mt-auto bg-black text-white text-sm font-medium py-2.5 rounded-lg hover:bg-gray-800 transition w-full"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
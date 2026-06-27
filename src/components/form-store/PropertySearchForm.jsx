"use client";

import { useState, useRef, useEffect } from "react";
import { Search, MapPin, ChevronDown } from "lucide-react";

const PropertySearchForm = ({ handleSearch }) => {
  const [propertyType, setPropertyType] = useState("Apartment");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const propertyOptions = ["Apartment", "Office", "House", "Villa", "Studio"];

  // ড্রপডাউনের বাইরে ক্লিক করলে তা বন্ধ করার জন্য
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full px-4 py-8">
      <form
        onSubmit={handleSearch}
        className="bg-white/10 backdrop-blur-xl p-4 rounded-xl border border-white/20 flex flex-col md:flex-row gap-3 items-center justify-between max-w-6xl mx-auto shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]"
      >
        {/* 1. Location Input */}
        <div className="w-full md:flex-1 bg-white h-14 rounded-xl flex items-center px-4 gap-2 border border-gray-100">
          <MapPin size={20} className="text-gray-400 flex-shrink-0" />
          <input
            type="text"
            name="location"
            placeholder="Location"
            className="w-full bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
          />
        </div>

        {/* 2. Property Type Custom Dropdown */}
        <div ref={dropdownRef} className="w-full md:flex-1 relative">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full bg-white h-14 rounded-xl  flex items-center justify-between px-5 text-sm text-gray-800 border border-gray-100 md:border-l-0 md:border-r-0"
          >
            <span className={propertyType ? "text-gray-800" : "text-gray-400"}>
              {propertyType || "Property Type"}
            </span>
            <ChevronDown size={18} className={`text-gray-400 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {/* Hidden Input for Form Data submission */}
          <input type="hidden" name="type" value={propertyType} />

          {/* Dropdown Menu Options */}
          {isDropdownOpen && (
            <div className="absolute top-full left-0 w-full bg-white mt-2 rounded-xl shadow-xl border border-gray-100 py-1 z-50 max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-150">
              {propertyOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setPropertyType(option);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-5 py-3 text-sm transition-colors ( ${
                    propertyType === option
                      ? "bg-emerald-50 text-emerald-600 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 3. Max Price Input */}
        <div className="w-full md:w-[18%] bg-white h-14 rounded-xl flex items-center px-4 gap-2 border border-gray-100 md:border-r-0">
          <span className="text-gray-400 font-medium text-base">$</span>
          <input
            type="number"
            name="maxPrice"
            placeholder="Max price"
            className="w-full bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>

        {/* 4. Min Price Input */}
        <div className="w-full md:w-[18%] bg-white h-14 rounded-xl flex items-center px-4 gap-2 border border-gray-100">
          <span className="text-gray-400 font-medium text-base">$</span>
          <input
            type="number"
            name="minPrice"
            placeholder="Min price"
            className="w-full bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>

        {/* 5. Search Button */}
        <button
          type="submit"
          className="w-full md:w-auto bg-[#111111] text-white rounded-xl flex items-center justify-center gap-2 px-8 h-14 hover:bg-black active:scale-[0.98] transition-all font-medium text-sm flex-shrink-0"
        >
          <Search size={18} />
          Search
        </button>
      </form>
    </div>
  );
};

export default PropertySearchForm;
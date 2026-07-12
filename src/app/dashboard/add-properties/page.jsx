"use client";

import React, { useState } from "react";

const amenitiesList = ["WiFi", "Parking", "Air Conditioning", "Lift", "Security", "Generator", "Gym", "Swimming Pool"];

const AddPropertyForm = () => {
  const [amenities, setAmenities] = useState([]);
  const [errors, setErrors] = useState({});

  const toggleAmenity = (item) => {
    setAmenities((prev) =>
      prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const newErrors = {};
    if (!data.title) newErrors.title = "Property title is required";
    if (!data.location) newErrors.location = "Location is required";
    if (!data.propertyType) newErrors.propertyType = "Property type is required";
    if (!data.rentType) newErrors.rentType = "Rent type is required";
    if (!data.rent) newErrors.rent = "Monthly rent is required";
    if (!data.size) newErrors.size = "Property size is required";
    if (!data.bedrooms) newErrors.bedrooms = "Bedrooms is required";
    if (!data.bathrooms) newErrors.bathrooms = "Bathrooms is required";
    if (!data.imageUrl) newErrors.imageUrl = "Image URL is required";
    if (!data.description) newErrors.description = "Description is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const payload = {
      ...data,
      amenities,
      status: "pending",
    };

    console.log("Submitting payload:", payload);

    // TODO: call your server action here
    // const res = await createProperty(payload);
  };

  const inputClass = `w-full border rounded-lg px-4 h-12 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-gray-400 transition`;
  const labelClass = `text-sm font-semibold text-gray-700 mb-1 block`;
  const errorClass = `text-xs text-red-500 mt-1`;

  return (
    <div className="min-h-screen bg-white py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-xl p-8 shadow-sm">

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Row 1: Title + Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Property Title</label>
              <input name="title" placeholder="Luxury Apartment in Dhaka" className={`${inputClass} ${errors.title ? "border-red-400" : "border-gray-300"}`} />
              {errors.title && <p className={errorClass}>{errors.title}</p>}
            </div>
            <div>
              <label className={labelClass}>Location</label>
              <input name="location" placeholder="Khulna, Bangladesh" className={`${inputClass} ${errors.location ? "border-red-400" : "border-gray-300"}`} />
              {errors.location && <p className={errorClass}>{errors.location}</p>}
            </div>
          </div>

          {/* Row 2: Property Type + Rent Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Property Type</label>
              <select name="propertyType" defaultValue="" className={`${inputClass} ${errors.propertyType ? "border-red-400" : "border-gray-300"} bg-white`}>
                <option value="" disabled>Select Type</option>
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
                <option value="house">House</option>
                <option value="office">Office</option>
              </select>
              {errors.propertyType && <p className={errorClass}>{errors.propertyType}</p>}
            </div>
            <div>
              <label className={labelClass}>Rent Type</label>
              <select name="rentType" defaultValue="" className={`${inputClass} ${errors.rentType ? "border-red-400" : "border-gray-300"} bg-white`}>
                <option value="" disabled>Select Rent Type</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
              {errors.rentType && <p className={errorClass}>{errors.rentType}</p>}
            </div>
          </div>

          {/* Row 3: Rent + Size */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Monthly Rent</label>
              <input name="rent" type="number" placeholder="15000" className={`${inputClass} ${errors.rent ? "border-red-400" : "border-gray-300"}`} />
              {errors.rent && <p className={errorClass}>{errors.rent}</p>}
            </div>
            <div>
              <label className={labelClass}>Property Size (sqft)</label>
              <input name="size" type="number" placeholder="1200" className={`${inputClass} ${errors.size ? "border-red-400" : "border-gray-300"}`} />
              {errors.size && <p className={errorClass}>{errors.size}</p>}
            </div>
          </div>

          {/* Row 4: Bedrooms + Bathrooms */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Bedrooms</label>
              <input name="bedrooms" type="number" placeholder="2" className={`${inputClass} ${errors.bedrooms ? "border-red-400" : "border-gray-300"}`} />
              {errors.bedrooms && <p className={errorClass}>{errors.bedrooms}</p>}
            </div>
            <div>
              <label className={labelClass}>Bathrooms</label>
              <input name="bathrooms" type="number" placeholder="2" className={`${inputClass} ${errors.bathrooms ? "border-red-400" : "border-gray-300"}`} />
              {errors.bathrooms && <p className={errorClass}>{errors.bathrooms}</p>}
            </div>
          </div>

          {/* Row 5: Extra Features + Image URL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Extra Features</label>
              <input name="extraFeatures" placeholder="Balcony, Pet Friendly, Rooftop, CCTV" className={`${inputClass} border-gray-300`} />
            </div>
            <div>
              <label className={labelClass}>Image URL</label>
              <input name="imageUrl" placeholder="Cloudinary / Imgbb URL" className={`${inputClass} ${errors.imageUrl ? "border-red-400" : "border-gray-300"}`} />
              {errors.imageUrl && <p className={errorClass}>{errors.imageUrl}</p>}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className={labelClass}>Description</label>
            <textarea
              name="description"
              rows={4}
              placeholder="Write property details..."
              className={`w-full border rounded-lg px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-gray-400 transition resize-none ${errors.description ? "border-red-400" : "border-gray-300"}`}
            />
            {errors.description && <p className={errorClass}>{errors.description}</p>}
          </div>

          {/* Amenities */}
          <div>
            <label className={labelClass}>Amenities</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-3 gap-x-4 mt-2">
              {amenitiesList.map((item) => (
                <label key={item} className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={amenities.includes(item)}
                    onChange={() => toggleAmenity(item)}
                    className="w-4 h-4 accent-blue-600"
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="bg-black text-white text-sm font-semibold px-8 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              Add Property
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddPropertyForm;
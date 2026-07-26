"use client";

import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";

const amenitiesList = ["WiFi", "Parking", "Air Conditioning", "Lift", "Security", "Generator", "Gym", "Swimming Pool"];

const AddPropertyForm = () => {
  const { data: session } = authClient.useSession();
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
      createdAt: new Date(),
      ownerEmail: session?.user?.email,
      ownerName: session?.user?.name,
    };

    try {
      const res = await fetch("http://localhost:5000/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (result.insertedId) {
        alert("Property added successfully!");
        e.target.reset();
        setAmenities([]);
      } else {
        alert("Something went wrong. Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Make sure backend is running.");
    }
  };

  const inputClass = `w-full border rounded-lg px-4 h-12 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-ring transition`;
  const labelClass = `text-sm font-semibold text-foreground mb-1 block`;
  const errorClass = `text-xs text-red-500 mt-1`;

  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <div className="max-w-5xl mx-auto bg-card border border-border rounded-xl p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Property Title</label>
              <input name="title" placeholder="Luxury Apartment in Dhaka" className={`${inputClass} ${errors.title ? "border-red-400" : "border-border"}`} />
              {errors.title && <p className={errorClass}>{errors.title}</p>}
            </div>
            <div>
              <label className={labelClass}>Location</label>
              <input name="location" placeholder="Khulna, Bangladesh" className={`${inputClass} ${errors.location ? "border-red-400" : "border-border"}`} />
              {errors.location && <p className={errorClass}>{errors.location}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Property Type</label>
              <select name="propertyType" defaultValue="" className={`${inputClass} ${errors.propertyType ? "border-red-400" : "border-border"} bg-card`}>
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
              <select name="rentType" defaultValue="" className={`${inputClass} ${errors.rentType ? "border-red-400" : "border-border"} bg-card`}>
                <option value="" disabled>Select Rent Type</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
              {errors.rentType && <p className={errorClass}>{errors.rentType}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Monthly Rent</label>
              <input name="rent" type="number" placeholder="15000" className={`${inputClass} ${errors.rent ? "border-red-400" : "border-border"}`} />
              {errors.rent && <p className={errorClass}>{errors.rent}</p>}
            </div>
            <div>
              <label className={labelClass}>Property Size (sqft)</label>
              <input name="size" type="number" placeholder="1200" className={`${inputClass} ${errors.size ? "border-red-400" : "border-border"}`} />
              {errors.size && <p className={errorClass}>{errors.size}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Bedrooms</label>
              <input name="bedrooms" type="number" placeholder="2" className={`${inputClass} ${errors.bedrooms ? "border-red-400" : "border-border"}`} />
              {errors.bedrooms && <p className={errorClass}>{errors.bedrooms}</p>}
            </div>
            <div>
              <label className={labelClass}>Bathrooms</label>
              <input name="bathrooms" type="number" placeholder="2" className={`${inputClass} ${errors.bathrooms ? "border-red-400" : "border-border"}`} />
              {errors.bathrooms && <p className={errorClass}>{errors.bathrooms}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Extra Features</label>
              <input name="extraFeatures" placeholder="Balcony, Pet Friendly, Rooftop, CCTV" className={`${inputClass} border-border`} />
            </div>
            <div>
              <label className={labelClass}>Image URL</label>
              <input name="imageUrl" placeholder="Cloudinary / Imgbb URL" className={`${inputClass} ${errors.imageUrl ? "border-red-400" : "border-border"}`} />
              {errors.imageUrl && <p className={errorClass}>{errors.imageUrl}</p>}
            </div>
          </div>

          <div>
            <label className={labelClass}>Description</label>
            <textarea
              name="description"
              rows={4}
              placeholder="Write property details..."
              className={`w-full border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-ring transition resize-none ${errors.description ? "border-red-400" : "border-border"}`}
            />
            {errors.description && <p className={errorClass}>{errors.description}</p>}
          </div>

          <div>
            <label className={labelClass}>Amenities</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-3 gap-x-4 mt-2">
              {amenitiesList.map((item) => (
                <label key={item} className="flex items-center gap-2 cursor-pointer text-sm text-foreground">
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

          <div>
            <button type="submit" className="bg-black text-white text-sm font-semibold px-8 py-3 rounded-lg hover:bg-gray-800 transition">
              Add Property
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddPropertyForm;
"use client";

import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { X, Upload } from "lucide-react";
import { getToken } from "@/lib/api/auth";

const amenitiesList = ["WiFi", "Parking", "Air Conditioning", "Lift", "Security", "Generator", "Gym", "Swimming Pool"];

const AddPropertyForm = () => {
  const { data: session } = authClient.useSession();
  const [amenities, setAmenities] = useState([]);
  const [errors, setErrors] = useState({});
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const toggleAmenity = (item) => {
    setAmenities((prev) =>
      prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item]
    );
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);

    try {
      const uploaded = await Promise.all(
        files.map(async (file) => {
          const formData = new FormData();
          formData.append("image", file);
          const res = await fetch(
            `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
            { method: "POST", body: formData }
          );
          const data = await res.json();
          return {
            url: data.data.url,
            deleteUrl: data.data.delete_url,
            preview: data.data.display_url,
          };
        })
      );
      setImages((prev) => [...prev, ...uploaded]);
    } catch (err) {
      console.error(err);
      alert("Image upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
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
    if (images.length === 0) newErrors.images = "At least one image is required";
    if (!data.description) newErrors.description = "Description is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const payload = {
      ...data,
      amenities,
      images: images.map((img) => img.url),
      imageUrl: images[0]?.url,
      status: "pending",
      createdAt: new Date(),
      ownerEmail: session?.user?.email,
      ownerName: session?.user?.name,
    };

    try {
      const token = getToken();
      console.log("token:", token);

      const res = await fetch("http://localhost:5000/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      console.log("result:", result);

      if (result.insertedId) {
        alert("Property added successfully!");
        e.target.reset();
        setAmenities([]);
        setImages([]);
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

          <div>
            <label className={labelClass}>Extra Features</label>
            <input name="extraFeatures" placeholder="Balcony, Pet Friendly, Rooftop, CCTV" className={`${inputClass} border-border`} />
          </div>

          {/* Image Upload */}
          <div>
            <label className={labelClass}>Property Images</label>
            <label className={`flex flex-col items-center justify-center w-full h-36 border-2 border-dashed rounded-xl cursor-pointer transition
              ${errors.images ? "border-red-400 bg-red-50" : "border-border hover:border-blue-400 hover:bg-blue-50/30"}`}>
              <div className="flex flex-col items-center gap-2">
                {uploading ? (
                  <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Upload size={24} className="text-gray-400" />
                    <p className="text-sm text-gray-500">Click to upload images</p>
                    <p className="text-xs text-gray-400">PNG, JPG, WEBP (multiple allowed)</p>
                  </>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
                disabled={uploading}
              />
            </label>
            {errors.images && <p className={errorClass}>{errors.images}</p>}

            {/* Previews */}
            {images.length > 0 && (
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mt-4">
                {images.map((img, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={img.preview}
                      alt={`upload-${index}`}
                      className="w-full h-20 object-cover rounded-lg border border-border"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                    >
                      <X size={12} />
                    </button>
                    {index === 0 && (
                      <span className="absolute bottom-1 left-1 text-[10px] bg-blue-600 text-white px-1.5 py-0.5 rounded">
                        Main
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
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
            <button
              type="submit"
              disabled={uploading}
              className="bg-black text-white text-sm font-semibold px-8 py-3 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
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
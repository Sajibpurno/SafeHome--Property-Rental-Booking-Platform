"use client";

import { useState } from "react";
import { X, Upload } from "lucide-react";
import { getToken } from "@/lib/api/auth";

const amenitiesList = ["WiFi", "Parking", "Air Conditioning", "Lift", "Security", "Generator", "Gym", "Swimming Pool"];

export default function EditPropertyModal({ property, onClose, onUpdate }) {
  const [form, setForm] = useState({
    title: property.title || "",
    location: property.location || "",
    propertyType: property.propertyType || "",
    rentType: property.rentType || "",
    rent: property.rent || "",
    size: property.size || "",
    bedrooms: property.bedrooms || "",
    bathrooms: property.bathrooms || "",
    extraFeatures: property.extraFeatures || "",
    description: property.description || "",
  });
  const [amenities, setAmenities] = useState(property.amenities || []);
  const [images, setImages] = useState(
    property.images?.length
      ? property.images.map(url => ({ url, preview: url }))
      : property.imageUrl ? [{ url: property.imageUrl, preview: property.imageUrl }] : []
  );
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleAmenity = (item) => {
    setAmenities(prev =>
      prev.includes(item) ? prev.filter(a => a !== item) : [...prev, item]
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
          return { url: data.data.url, preview: data.data.display_url };
        })
      );
      setImages(prev => [...prev, ...uploaded]);
    } catch (err) {
      alert("Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    const payload = {
      ...form,
      amenities,
      images: images.map(img => img.url),
      imageUrl: images[0]?.url,
    };

    try {
      const res = await fetch(`${BASE_URL}/properties/${property._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (result.modifiedCount > 0) {
        onUpdate({ ...property, ...payload });
      } else {
        alert("Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      alert("Server error.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full border border-border rounded-lg px-4 h-11 text-sm text-foreground outline-none focus:border-ring transition bg-card";
  const labelClass = "text-xs font-semibold text-muted-foreground mb-1 block";

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center px-4 py-8">
      <div className="bg-card rounded-2xl w-full max-w-3xl shadow-2xl max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-bold text-foreground">Edit Property</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Property Title</label>
              <input value={form.title} onChange={e => setForm({...form, title: e.target.value})}
                className={inputClass} placeholder="Luxury Apartment" />
            </div>
            <div>
              <label className={labelClass}>Location</label>
              <input value={form.location} onChange={e => setForm({...form, location: e.target.value})}
                className={inputClass} placeholder="Dhaka, Bangladesh" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Property Type</label>
              <select value={form.propertyType} onChange={e => setForm({...form, propertyType: e.target.value})}
                className={`${inputClass} bg-card`}>
                <option value="">Select Type</option>
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
                <option value="house">House</option>
                <option value="office">Office</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Rent Type</label>
              <select value={form.rentType} onChange={e => setForm({...form, rentType: e.target.value})}
                className={`${inputClass} bg-card`}>
                <option value="">Select Rent Type</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className={labelClass}>Rent</label>
              <input type="number" value={form.rent} onChange={e => setForm({...form, rent: e.target.value})}
                className={inputClass} placeholder="15000" />
            </div>
            <div>
              <label className={labelClass}>Size (sqft)</label>
              <input type="number" value={form.size} onChange={e => setForm({...form, size: e.target.value})}
                className={inputClass} placeholder="1200" />
            </div>
            <div>
              <label className={labelClass}>Bedrooms</label>
              <input type="number" value={form.bedrooms} onChange={e => setForm({...form, bedrooms: e.target.value})}
                className={inputClass} placeholder="2" />
            </div>
            <div>
              <label className={labelClass}>Bathrooms</label>
              <input type="number" value={form.bathrooms} onChange={e => setForm({...form, bathrooms: e.target.value})}
                className={inputClass} placeholder="2" />
            </div>
          </div>

          <div>
            <label className={labelClass}>Extra Features</label>
            <input value={form.extraFeatures} onChange={e => setForm({...form, extraFeatures: e.target.value})}
              className={inputClass} placeholder="Balcony, CCTV..." />
          </div>

          {/* Image Upload */}
          <div>
            <label className={labelClass}>Property Images</label>
            <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-blue-400 transition">
              {uploading ? (
                <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Upload size={20} className="text-gray-400" />
                  <p className="text-xs text-gray-400 mt-1">Click to upload</p>
                </>
              )}
              <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
            </label>
            {images.length > 0 && (
              <div className="grid grid-cols-4 md:grid-cols-6 gap-2 mt-3">
                {images.map((img, i) => (
                  <div key={i} className="relative group">
                    <img src={img.preview} className="w-full h-16 object-cover rounded-lg border border-border" />
                    <button type="button" onClick={() => setImages(prev => prev.filter((_, idx) => idx !== i))}
                      className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                      <X size={10} />
                    </button>
                    {i === 0 && <span className="absolute bottom-0.5 left-0.5 text-[9px] bg-blue-600 text-white px-1 rounded">Main</span>}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className={labelClass}>Description</label>
            <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})}
              rows={3} placeholder="Write property details..."
              className="w-full border border-border rounded-lg px-4 py-3 text-sm text-foreground outline-none resize-none focus:border-ring transition bg-card" />
          </div>

          <div>
            <label className={labelClass}>Amenities</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-2 gap-x-4 mt-1">
              {amenitiesList.map(item => (
                <label key={item} className="flex items-center gap-2 cursor-pointer text-sm text-foreground">
                  <input type="checkbox" checked={amenities.includes(item)}
                    onChange={() => toggleAmenity(item)} className="w-4 h-4 accent-blue-600" />
                  {item}
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 border border-border text-sm text-muted-foreground py-2.5 rounded-lg hover:bg-muted transition">
              Cancel
            </button>
            <button type="submit" disabled={loading || uploading}
              className="flex-1 bg-black text-white text-sm font-semibold py-2.5 rounded-lg hover:bg-gray-800 transition disabled:opacity-50">
              {loading ? "Updating..." : "Update Property"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
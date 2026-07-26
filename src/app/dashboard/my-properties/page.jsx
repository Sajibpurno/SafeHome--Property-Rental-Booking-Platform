"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { getPropertiesByOwner } from "@/lib/api/properties";
import { Trash2, Pencil } from "lucide-react";
import Link from "next/link";

const OwnerMyProperties = () => {
  const { data: session } = authClient.useSession();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.email) return;
    getPropertiesByOwner(session.user.email)
      .then(setProperties)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [session]);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this property?")) return;
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/properties/${id}`, {
        method: "DELETE",
      });
      setProperties((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="text-muted-foreground text-sm">Loading properties...</p>;

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground mb-6">My Properties</h2>
        <Link href="/dashboard/add-properties">
        <button type="submit" className="bg-black text-white text-sm font-semibold px-6 py-2 rounded-lg hover:bg-gray-800 transition">
              Add Property
        </button>
        </Link>
      </div>

      {properties.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground text-sm">
          No properties found. Add your first property!
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">Property</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">Location</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">Type</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">Rent</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">Status</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {properties.map((property) => (
                <tr key={property._id} className="hover:bg-muted transition">
                  {/* Property */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={property.imageUrl}
                        alt={property.title}
                        className="w-12 h-10 rounded-lg object-cover flex-shrink-0"
                      />
                      <span className="font-medium text-foreground line-clamp-1">
                        {property.title}
                      </span>
                    </div>
                  </td>

                  {/* Location */}
                  <td className="px-5 py-4 text-muted-foreground">{property.location}</td>

                  {/* Type */}
                  <td className="px-5 py-4 text-muted-foreground capitalize">{property.propertyType}</td>

                  {/* Rent */}
                  <td className="px-5 py-4 font-semibold text-foreground">
                    ৳{Number(property.rent).toLocaleString()}
                    <span className="text-xs text-muted-foreground font-normal ml-1">/{property.rentType}</span>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full capitalize
                      ${property.status === "approved" ? "bg-green-100 text-green-700" :
                        property.status === "rejected" ? "bg-red-100 text-red-600" :
                        "bg-yellow-100 text-yellow-700"}`}>
                      {property.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => alert("Update coming soon!")}
                        className="flex items-center gap-1 text-blue-500 hover:text-blue-700 text-xs font-medium transition"
                      >
                        <Pencil size={14} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(property._id)}
                        className="flex items-center gap-1 text-red-500 hover:text-red-700 text-xs font-medium transition"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OwnerMyProperties;
"use client";

import { useEffect, useState } from "react";
import { getAllPropertiesAdmin, updatePropertyStatus, deleteProperty } from "@/lib/api/admin";
import { Trash2 } from "lucide-react";

const VerifyPropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllPropertiesAdmin()
      .then(setProperties)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleStatus = async (id, status) => {
    try {
      await updatePropertyStatus(id, { status });
      setProperties((prev) =>
        prev.map((p) => (p._id === id ? { ...p, status } : p))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this property?")) return;
    try {
      await deleteProperty(id);
      setProperties((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="text-gray-400 text-sm">Loading...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">All Properties</h2>

      {properties.length === 0 ? (
        <div className="text-center py-20 text-gray-400 text-sm">No properties found.</div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">Property</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">Owner</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">Location</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">Rent</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">Status</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {properties.map((property) => (
                <tr key={property._id} className="hover:bg-gray-50 transition">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={property.imageUrl}
                        alt={property.title}
                        className="w-12 h-10 rounded-lg object-cover flex-shrink-0"
                      />
                      <span className="font-medium text-gray-800 line-clamp-1">{property.title}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-gray-700 font-medium">{property.ownerName || "—"}</p>
                    <p className="text-xs text-gray-400">{property.ownerEmail || "—"}</p>
                  </td>
                  <td className="px-5 py-4 text-gray-500">{property.location}</td>
                  <td className="px-5 py-4 font-semibold text-gray-800">
                    ৳{Number(property.rent).toLocaleString()}
                    <span className="text-xs text-gray-400 font-normal ml-1">/{property.rentType}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full capitalize
                      ${property.status === "approved" ? "bg-green-100 text-green-700" :
                        property.status === "rejected" ? "bg-red-100 text-red-600" :
                        "bg-yellow-100 text-yellow-700"}`}>
                      {property.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      {property.status !== "approved" && (
                        <button
                          onClick={() => handleStatus(property._id, "approved")}
                          className="text-xs font-semibold px-3 py-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition"
                        >
                          Approve
                        </button>
                      )}
                      {property.status !== "rejected" && (
                        <button
                          onClick={() => handleStatus(property._id, "rejected")}
                          className="text-xs font-semibold px-3 py-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                        >
                          Reject
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(property._id)}
                        className="flex items-center gap-1 text-red-500 hover:text-red-700 text-xs font-medium transition"
                      >
                        <Trash2 size={14} />
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

export default VerifyPropertiesPage;
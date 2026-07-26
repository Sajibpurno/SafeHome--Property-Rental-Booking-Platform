"use client";

import { useEffect, useState } from "react";
import { getAllPropertiesAdmin, updatePropertyStatus, deleteProperty } from "@/lib/api/admin";
import { Trash2, ChevronLeft, ChevronRight } from "lucide-react";

const VerifyPropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    getAllPropertiesAdmin(currentPage, 10)
      .then((data) => {
        setProperties(data.properties || []);
        setTotalPages(data.totalPages || 1);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [currentPage]);

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

  if (loading) return <p className="text-muted-foreground text-sm">Loading...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-6">All Properties</h2>

      {properties.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground text-sm">No properties found.</div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">Property</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">Owner</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">Location</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">Rent</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">Status</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {properties.map((property) => (
                  <tr key={property._id} className="hover:bg-muted transition">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={property.imageUrl}
                          alt={property.title}
                          className="w-12 h-10 rounded-lg object-cover flex-shrink-0"
                        />
                        <span className="font-medium text-foreground line-clamp-1">{property.title}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-foreground font-medium">{property.ownerName || "—"}</p>
                      <p className="text-xs text-muted-foreground">{property.ownerEmail || "—"}</p>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">{property.location}</td>
                    <td className="px-5 py-4 font-semibold text-foreground">
                      ৳{Number(property.rent).toLocaleString()}
                      <span className="text-xs text-muted-foreground font-normal ml-1">/{property.rentType}</span>
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6">
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
        </>
      )}
    </div>
  );
};

export default VerifyPropertiesPage;
"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { getFavoritesByEmail, removeFavorite } from "@/lib/api/favorites";
import { MapPin, Trash2 } from "lucide-react";

const FavoritesPage = () => {
  const { data: session } = authClient.useSession();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.email) return;
    getFavoritesByEmail(session.user.email)
      .then(setFavorites)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [session]);

  const handleRemove = async (id) => {
    try {
      await removeFavorite(id);
      setFavorites((prev) => prev.filter((f) => f._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="text-muted-foreground text-sm">Loading favorites...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-6">My Favorites</h2>

      {favorites.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground text-sm">
          No favorites yet.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">Property</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">Location</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">Amount</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {favorites.map((fav) => (
                <tr key={fav._id} className="hover:bg-muted transition">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={fav.propertyImage}
                        alt={fav.propertyTitle}
                        className="w-12 h-10 rounded-lg object-cover flex-shrink-0"
                      />
                      <span className="font-medium text-foreground line-clamp-1">
                        {fav.propertyTitle}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin size={13} />
                      {fav.location}
                    </div>
                  </td>
                  <td className="px-5 py-4 font-semibold text-foreground">
                    ৳{Number(fav.rent).toLocaleString()}
                    <span className="text-xs text-muted-foreground font-normal ml-1">/{fav.rentType}</span>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => handleRemove(fav._id)}
                      className="flex items-center gap-1 text-red-500 hover:text-red-700 text-xs font-medium transition"
                    >
                      <Trash2 size={14} />
                      Remove
                    </button>
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

export default FavoritesPage;
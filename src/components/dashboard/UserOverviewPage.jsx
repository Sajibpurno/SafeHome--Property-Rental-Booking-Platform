import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { getBookingsByEmail } from "@/lib/api/bookings";
import { getFavoritesByEmail } from "@/lib/api/favorites";
import { CalendarDays, Heart, Home, User } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#f59e0b", "#22c55e", "#ef4444"];

const UserOverviewPage = () => {
  const { data: session } = authClient.useSession();
  const [bookings, setBookings] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.email) return;
    Promise.all([
      getBookingsByEmail(session.user.email),
      getFavoritesByEmail(session.user.email),
    ]).then(([b, f]) => {
      setBookings(b);
      setFavorites(f);
      setLoading(false);
    });
  }, [session]);

  const pending = bookings.filter((b) => b.status === "pending").length;
  const approved = bookings.filter((b) => b.status === "approved").length;
  const rejected = bookings.filter((b) => b.status === "rejected").length;

  const chartData = [
    { name: "Pending", value: pending },
    { name: "Approved", value: approved },
    { name: "Rejected", value: rejected },
  ].filter((d) => d.value > 0);

  const recentBookings = bookings.slice(0, 4);

  if (loading) return <p className="text-muted-foreground text-sm">Loading...</p>;

  return (
    <div className="flex flex-col gap-8">

      {/* Welcome */}
      <div className="bg-gray-900 rounded-xl px-8 py-6">
        <h2 className="text-2xl font-bold text-white">
          Welcome Back 👋
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Manage your bookings, favorite properties, and profile from your dashboard.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Bookings", value: bookings.length, icon: CalendarDays, color: "text-blue-600 bg-blue-50" },
          { label: "Favorites", value: favorites.length, icon: Heart, color: "text-pink-500 bg-pink-50" },
          { label: "Active Rentals", value: approved, icon: Home, color: "text-green-600 bg-green-50" },
          { label: "Profile Status", value: "Complete", icon: User, color: "text-purple-600 bg-purple-50" },
        ].map((stat) => (
          <div key={stat.label} className="bg-card border border-border rounded-xl p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon size={18} />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Chart + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Pie Chart */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-base font-bold text-foreground mb-4">Booking Status</h3>
          {chartData.length === 0 ? (
            <p className="text-muted-foreground text-sm text-center py-10">No booking data yet.</p>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {chartData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Recent Bookings */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-base font-bold text-foreground mb-4">Recent Bookings</h3>
          {recentBookings.length === 0 ? (
            <p className="text-muted-foreground text-sm">No bookings yet.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {recentBookings.map((b) => (
                <div key={b._id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition">
                  <img
                    src={b.propertyImage}
                    alt={b.propertyTitle}
                    className="w-12 h-10 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{b.propertyTitle}</p>
                    <p className="text-xs text-muted-foreground">{b.location}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full capitalize flex-shrink-0
                    ${b.status === "approved" ? "bg-green-100 text-green-700" :
                      b.status === "rejected" ? "bg-red-100 text-red-600" :
                      "bg-yellow-100 text-yellow-700"}`}>
                    {b.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default UserOverviewPage;
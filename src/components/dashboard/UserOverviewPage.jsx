import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { getBookingsByEmail } from "@/lib/api/bookings";
import { getFavoritesByEmail } from "@/lib/api/favorites";
import { CalendarDays, Heart, Home, User } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ScaleLoader
 } from "react-spinners";

const COLORS = ["#f59e0b", "#22c55e", "#ef4444"];

const UserOverviewPage = () => {
  const { data: session } = authClient.useSession();
  const userName = session?.user?.name || "User";
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

  if (loading) {
      return <div className="h-screen flex flex-col items-center justify-center bg-muted text-muted-foreground font-medium"><ScaleLoader
 size={100} /><p>Loading Overview...</p></div>;
    }

  return (
    <div className="flex flex-col gap-8">

      {/* Welcome */}
      <div className="bg-gray-900 rounded-xl px-8 py-6">
        <h2 className="text-2xl font-bold text-white">
          Welcome Back 👋 {userName}
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

     {/* Recent Activity Card */}
      <div className="bg-card border border-border rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] p-6 space-y-4">
        <h3 className="text-base font-bold text-foreground">Recent Activity</h3>
        <ul className="space-y-3.5">
          <li className="text-sm text-muted-foreground flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground"></span>
            Booked a 2-bedroom apartment in Dhaka.
          </li>
          <li className="text-sm text-muted-foreground flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground"></span>
            Added <span className="font-medium text-foreground">&quot;Luxury Family Flat&quot;</span> to favorites.
          </li>
          <li className="text-sm text-muted-foreground flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground"></span>
            Updated profile information.
          </li>
          <li className="text-sm text-muted-foreground flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground"></span>
            Viewed 5 new rental properties.
          </li>
        </ul>
      </div>
      
    </div>
  );
};

export default UserOverviewPage;
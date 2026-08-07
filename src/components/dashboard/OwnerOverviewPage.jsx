"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { CalendarDays, DollarSign, Home } from "lucide-react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { getToken } from "@/lib/api/auth";

const OwnerOverviewPage = () => {
  const { data: session } = authClient.useSession();
  const [stats, setStats] = useState({ totalEarnings: 0, totalProperties: 0, totalBookings: 0 });
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.email) return;
    const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    fetch(`${BASE_URL}/bookings/owner-earnings/${session.user.email}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then(res => 
    {console.log("status:", res.status);
    return res.json();}
      )
      .then(data => {
        console.log("earnings data:", data);
        setStats({
          totalEarnings: data.totalEarnings || 0,
          totalProperties: data.totalProperties || 0,
          totalBookings: data.totalBookings || 0,
        });
        setChartData(data.chartData || []);
        setLoading(false);
      })
      .catch(console.error);
  }, [session]);

  if (loading) return <p className="text-muted-foreground text-sm">Loading...</p>;

  return (
    <div className="flex flex-col gap-8">
      <div className="bg-gray-900 rounded-xl px-8 py-6">
        <h2 className="text-2xl font-bold text-white">Owner Dashboard 🏠</h2>
        <p className="text-muted-foreground text-sm mt-1">Manage your properties, bookings, and earnings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Total Earnings", value: `৳${stats.totalEarnings.toLocaleString()}`, icon: DollarSign, color: "text-green-600 bg-green-50" },
          { label: "Total Properties", value: stats.totalProperties, icon: Home, color: "text-blue-600 bg-blue-50" },
          { label: "Total Bookings", value: stats.totalBookings, icon: CalendarDays, color: "text-purple-600 bg-purple-50" },
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

      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-base font-bold text-foreground mb-6">Monthly Earnings</h3>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip formatter={(val) => `৳${val.toLocaleString()}`} />
            <Line type="monotone" dataKey="earnings" stroke="#2563eb" strokeWidth={2.5} dot={{ r: 4, fill: "#2563eb" }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OwnerOverviewPage;
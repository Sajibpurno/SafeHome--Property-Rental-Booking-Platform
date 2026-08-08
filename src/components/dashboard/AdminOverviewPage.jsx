"use client";

import { useEffect, useState } from "react";
import { getAllUsers, getAllPropertiesAdmin, getAllBookingsAdmin } from "@/lib/api/admin";
import { getToken } from "@/lib/api/auth";
import { Users, Home, CalendarDays, UserCheck } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from "recharts";
import { ScaleLoader } from "react-spinners";

const AdminOverviewPage = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOwners: 0,
    totalProperties: 0,
    totalBookings: 0,
  });
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    Promise.all([
      getAllUsers(),
      getAllPropertiesAdmin(),
      getAllBookingsAdmin(),
      fetch(`${BASE_URL}/admin/earnings`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      }).then(res => res.json()),
    ]).then(([users, properties, bookings, earnings]) => {
      setStats({
        totalUsers: users.filter((u) => u.role?.toLowerCase() === "tenant" || u.role?.toLowerCase() === "user" || !u.role).length,
        totalOwners: users.filter((u) => u.role?.toLowerCase() === "owner").length,
        totalProperties: Array.isArray(properties) ? properties.length : (properties.properties?.length || 0),
        totalBookings: Array.isArray(bookings) ? bookings.length : 0,
      });
      setChartData(earnings.chartData || []);
      setLoading(false);
    }).catch(console.error);
  }, []);

  if (loading){
      return <div className="h-screen flex flex-col items-center justify-center bg-muted text-muted-foreground font-medium"><ScaleLoader
 size={100} /><p>Loading Overview...</p></div>;
    }

  return (
    <div className="flex flex-col gap-6">

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: stats.totalUsers, icon: Users, color: "text-blue-500 bg-blue-50" },
          { label: "Total Owners", value: stats.totalOwners, icon: UserCheck, color: "text-green-500 bg-green-50" },
          { label: "Total Properties", value: stats.totalProperties, icon: Home, color: "text-orange-500 bg-orange-50" },
          { label: "Total Bookings", value: stats.totalBookings, icon: CalendarDays, color: "text-purple-500 bg-purple-50" },
        ].map((stat) => (
          <div key={stat.label} className="bg-card border border-border rounded-xl p-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
              <stat.icon size={22} />
            </div>
          </div>
        ))}
      </div>

      {/* Monthly Earnings Chart */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-base font-bold text-foreground mb-6">Monthly Earnings</h3>
        {chartData.every(d => d.earnings === 0) ? (
          <p className="text-muted-foreground text-sm text-center py-10">No earnings data yet.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} barSize={60}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip formatter={(val) => `৳${val.toLocaleString()}`} />
              <Bar dataKey="earnings" fill="#111827" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

    </div>
  );
};

export default AdminOverviewPage;
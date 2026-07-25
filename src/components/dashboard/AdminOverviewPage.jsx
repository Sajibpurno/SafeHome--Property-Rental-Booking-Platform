"use client";

import { useEffect, useState } from "react";
import { getAllUsers, getAllPropertiesAdmin, getAllBookingsAdmin } from "@/lib/api/admin";
import { Users, Home, CalendarDays, UserCheck } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from "recharts";

const monthlyData = [
  { month: "Jan", earnings: 1000 },
  { month: "Feb", earnings: 1600 },
  { month: "Mar", earnings: 1500 },
  { month: "Apr", earnings: 2300 },
  { month: "May", earnings: 3000 },
  { month: "Jun", earnings: 2800 },
];

const AdminOverviewPage = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOwners: 0,
    totalProperties: 0,
    totalBookings: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getAllUsers(),
      getAllPropertiesAdmin(),
      getAllBookingsAdmin(),
    ]).then(([users, properties, bookings]) => {
      setStats({
        totalUsers: users.filter((u) => u.role === "user" || !u.role).length,
        totalOwners: users.filter((u) => u.role === "owner").length,
        totalProperties: properties.length,
        totalBookings: bookings.length,
      });
      setLoading(false);
    });
  }, []);

  if (loading) return <p className="text-gray-400 text-sm">Loading...</p>;

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
          <div key={stat.label} className="bg-white border border-gray-200 rounded-xl p-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
              <stat.icon size={22} />
            </div>
          </div>
        ))}
      </div>

      {/* Monthly Earnings Chart */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-base font-bold text-gray-900 mb-6">Monthly Earnings</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData} barSize={60}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip formatter={(val) => `৳${val.toLocaleString()}`} />
            <Bar dataKey="earnings" fill="#111827" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default AdminOverviewPage;
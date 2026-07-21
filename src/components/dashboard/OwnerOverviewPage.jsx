"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { CalendarDays, DollarSign, Home } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const OwnerOverviewPage = () => {
  const { data: session } = authClient.useSession();

  const [stats] = useState({
    totalEarnings: 125000,
    totalProperties: 5,
    totalBookings: 12,
  });

  const [chartData] = useState([
    { month: "Jan", earnings: 8000 },
    { month: "Feb", earnings: 12000 },
    { month: "Mar", earnings: 9000 },
    { month: "Apr", earnings: 15000 },
    { month: "May", earnings: 11000 },
    { month: "Jun", earnings: 18000 },
    { month: "Jul", earnings: 14000 },
    { month: "Aug", earnings: 20000 },
    { month: "Sep", earnings: 16000 },
    { month: "Oct", earnings: 13000 },
    { month: "Nov", earnings: 19000 },
    { month: "Dec", earnings: 22000 },
  ]);

  return (
    <div className="flex flex-col gap-8">

      {/* Welcome */}
      <div className="bg-gray-900 rounded-xl px-8 py-6">
        <h2 className="text-2xl font-bold text-white">Owner Dashboard 🏠</h2>
        <p className="text-gray-400 text-sm mt-1">
          Manage your properties, bookings, and earnings.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Total Earnings", value: `৳${stats.totalEarnings.toLocaleString()}`, icon: DollarSign, color: "text-green-600 bg-green-50" },
          { label: "Total Properties", value: stats.totalProperties, icon: Home, color: "text-blue-600 bg-blue-50" },
          { label: "Total Bookings", value: stats.totalBookings, icon: CalendarDays, color: "text-purple-600 bg-purple-50" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">{stat.label}</p>
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon size={18} />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Monthly Earnings Chart */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-base font-bold text-gray-900 mb-6">Monthly Earnings</h3>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip formatter={(val) => `৳${val.toLocaleString()}`} />
            <Line
              type="monotone"
              dataKey="earnings"
              stroke="#2563eb"
              strokeWidth={2.5}
              dot={{ r: 4, fill: "#2563eb" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default OwnerOverviewPage;
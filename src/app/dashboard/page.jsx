"use client";

import { authClient } from "@/lib/auth-client";
import { Calendar, Heart, Home, UserCheck } from "lucide-react";

export default function DashboardOverview() {
  const { data: session } = authClient.useSession();
  const userName = session?.user?.name || "User";

  const stats = [
    { label: "Total Bookings", value: "12", icon: Calendar, color: "text-blue-600" },
    { label: "Favorites", value: "8", icon: Heart, color: "text-rose-600" },
    { label: "Active Rentals", value: "2", icon: Home, color: "text-emerald-600" },
    { label: "Profile Status", value: "Completed", icon: UserCheck, color: "text-indigo-600" },
  ];

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Welcome Banner */}
      <div className="bg-[#111111] text-white p-8 rounded-2xl shadow-sm space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome Back 👋, {userName}
        </h1>
        <p className="text-sm text-zinc-400 font-light">
          Manage your bookings, favorite properties, and profile from your dashboard.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white border border-gray-100 p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col justify-between h-36">
              <div className="flex justify-between items-start">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">{stat.label}</span>
                <Icon size={20} className={stat.color} />
              </div>
              <span className="text-3xl font-bold text-gray-950 tracking-tight">{stat.value}</span>
            </div>
          );
        })}
      </div>

      {/* Recent Activity Card */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] p-6 space-y-4">
        <h3 className="text-base font-bold text-gray-900">Recent Activity</h3>
        <ul className="space-y-3.5">
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
            Booked a 2-bedroom apartment in Dhaka.
          </li>
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
            Added <span className="font-medium text-gray-900">&quot;Luxury Family Flat&quot;</span> to favorites.
          </li>
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
            Updated profile information.
          </li>
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
            Viewed 5 new rental properties.
          </li>
        </ul>
      </div>
    </div>
  );
}
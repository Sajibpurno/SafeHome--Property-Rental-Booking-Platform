"use client";

import { authClient } from "@/lib/auth-client";
import { Users, ShieldCheck, AlertCircle, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  const { data: session } = authClient.useSession();
  const userName = session?.user?.name || "Admin";

  const stats = [
    { label: "Total Users", value: "1,240", icon: Users, color: "text-blue-600" },
    { label: "Pending Verifications", value: "7", icon: AlertCircle, color: "text-rose-600" },
    { label: "Verified Properties", value: "412", icon: ShieldCheck, color: "text-emerald-600" },
    { label: "Platform Revenue", value: "$12,840", icon: TrendingUp, color: "text-indigo-600" },
  ];

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="bg-[#111111] text-white p-8 rounded-2xl shadow-sm space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Admin Control Center 🛡️</h1>
        <p className="text-sm text-zinc-400 font-light">Overview of platform growth, approvals, and system logs.</p>
      </div>

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
    </div>
  );
}
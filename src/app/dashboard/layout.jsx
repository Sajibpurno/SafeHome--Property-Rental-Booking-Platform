"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { LayoutDashboard, CalendarDays, Heart, User, Home, LogOut } from "lucide-react";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <div className="h-screen flex items-center justify-center bg-gray-50 text-gray-500 font-medium">Loading Dashboard...</div>;
  }

  // ইউজার রোল ডিফাইন করা (Default: user)
  const role = session?.user?.role || "user";

  // রোল অনুযায়ী সাইডবার মেনু ডাইনামিক করা
  const menuItems = {
    user: [
      { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
      { label: "My Bookings", href: "/dashboard/bookings", icon: CalendarDays },
      { label: "Favorites", href: "/dashboard/favorites", icon: Heart },
      { label: "Profile", href: "/dashboard/profile", icon: User },
    ],
    owner: [
      { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
      { label: "My Properties", href: "/dashboard/properties", icon: Home },
      { label: "Bookings Received", href: "/dashboard/bookings", icon: CalendarDays },
      { label: "Profile", href: "/dashboard/profile", icon: User },
    ],
    admin: [
      { label: "Admin Overview", href: "/dashboard", icon: LayoutDashboard },
      { label: "Manage Users", href: "/dashboard/users", icon: User },
      { label: "Verify Properties", href: "/dashboard/verify", icon: Home },
    ]
  };

  const currentLinks = menuItems[role] || menuItems.user;

  return (
    <div className="flex h-screen bg-[#f8f9fa] overflow-hidden font-sans text-black">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0f1115] text-zinc-400 flex flex-col justify-between p-6 flex-shrink-0">
        <div>
          {/* Back Home Button */}
          <Link href="/" className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors mb-8 font-medium">
            <span>🏠</span> Back To Home
          </Link>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {currentLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-[#2563eb] text-white shadow-lg shadow-blue-600/10"
                      : "hover:bg-zinc-900 hover:text-white"
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer/Logout section */}
        <div className="border-t border-zinc-800 pt-4 flex flex-col gap-3">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-white text-xs font-bold capitalize">
              {session?.user?.name?.charAt(0)}
            </div>
            <div className="truncate">
              <p className="text-xs text-white font-medium truncate">{session?.user?.name}</p>
              <p className="text-[10px] text-zinc-500 capitalize">{role} Account</p>
            </div>
          </div>
          <button
            onClick={() => authClient.signOut({ fetchOptions: { onSuccess: () => router.push("/") } })}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-rose-400 hover:bg-rose-950/20 hover:text-rose-300 transition-all text-left w-full"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Render Area */}
      <main className="flex-1 overflow-y-auto p-8 lg:p-10">
        {children}
      </main>
    </div>
  );
}
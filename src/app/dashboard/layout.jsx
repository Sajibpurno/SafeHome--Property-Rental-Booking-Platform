"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { LayoutDashboard, CalendarDays, Heart, User, Home, LogOut, PlusCircleIcon, Menu, X } from "lucide-react";
import { HashLoader} from "react-spinners";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (isPending) {
    return <div className="h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-500 font-medium"><HashLoader size={100} /><p>Loading Dashboard...</p></div>;
  }

  const role = session?.user?.role?.toLowerCase() || "user";

  const menuItems = {
    user: [
      { label: "Overview", href: "/dashboard/overview", icon: LayoutDashboard },
      { label: "My Bookings", href: "/dashboard/bookings", icon: CalendarDays },
      { label: "Favorites", href: "/dashboard/favorites", icon: Heart },
      { label: "Profile", href: "/dashboard/profile", icon: User },
    ],
    owner: [
      { label: "Overview", href: "/dashboard/overview", icon: LayoutDashboard },
      { label: "Add Property", href: "/dashboard/add-properties", icon: PlusCircleIcon },
      { label: "My Properties", href: "/dashboard/my-properties", icon: Home },
      { label: "Bookings Received", href: "/dashboard/bookings", icon: CalendarDays },
      { label: "Profile", href: "/dashboard/profile", icon: User },
    ],
    admin: [
      { label: "Admin Overview", href: "/dashboard/overview", icon: LayoutDashboard },
      { label: "Manage Users", href: "/dashboard/users", icon: User },
      { label: "Verify Properties", href: "/dashboard/verify", icon: Home },
    ],
  };

  const currentLinks = menuItems[role] || menuItems.user;

  return (
    <div className="flex h-screen bg-[#f8f9fa] overflow-hidden font-sans text-black">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-full w-64 bg-[#0f1115] text-zinc-400 flex-shrink-0 z-30 transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="flex flex-col justify-between h-full p-6">
          <div>
            {/* Mobile close */}
            <div className="flex items-center justify-between mb-8">
              <Link
                href="/"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors font-medium"
              >
                <span>🏠</span> Back To Home
              </Link>
              <button
                className="text-zinc-400 hover:text-white lg:hidden"
                onClick={() => setSidebarOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            {/* Nav links */}
            <nav className="space-y-1.5">
              {currentLinks.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
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

          {/* Footer */}
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
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Mobile topbar */}
        <div className="lg:hidden flex items-center justify-between bg-[#0f1115] px-4 py-3 flex-shrink-0">
          <button onClick={() => setSidebarOpen(true)} className="text-zinc-400 hover:text-white">
            <Menu size={22} />
          </button>
          <span className="text-white text-sm font-semibold">Dashboard</span>
          <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-white text-xs font-bold capitalize">
            {session?.user?.name?.charAt(0)}
          </div>
        </div>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
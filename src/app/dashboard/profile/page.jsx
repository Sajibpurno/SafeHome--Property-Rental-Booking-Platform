"use client";

import { authClient } from "@/lib/auth-client";
import { User, Mail, ShieldAlert, Calendar } from "lucide-react";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="flex h-96 items-center justify-center text-gray-500 font-medium">
        Loading Profile...
      </div>
    );
  }


  const user = session?.user || {
    name: "Programming-Hero Instructor",
    email: "tenant@gmail.com",
    image: null,
    role: "tenant",
    createdAt: "2026-06-11",
  };

  const userRole = (user.role || "tenant").toLowerCase();

  const joinDate = user.createdAt 
    ? new Date(user.createdAt).toISOString().split('T')[0] 
    : "2026-06-11";

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden pb-12">
      {/* 1. Top Gradient Banner */}
      <div className="h-48 w-full bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600" />

      {/* 2. Profile Image & Name Header */}
      <div className="relative flex flex-col items-center -mt-20 mb-8">
        <div className="w-36 h-36 rounded-full border-4 border-white bg-gray-200 shadow-md overflow-hidden flex items-center justify-center">
          {user.image ? (
            <img
              src={user.image}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          ) : (

            <img
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop"
              alt="Default Avatar"
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* User Name & Role Pill Badge */}
        <h2 className="text-3xl font-bold text-gray-900 mt-4 tracking-tight">
          {user.name}
        </h2>
        <span className="mt-2 px-4 py-1 bg-black text-white text-xs font-semibold rounded-full tracking-wide capitalize">
          {userRole}
        </span>
      </div>

      {/* 3. Information Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 lg:px-12">
        
        {/* Card 1: Full Name */}
        <div className="bg-white border border-gray-200/80 p-5 rounded-2xl flex items-center gap-4 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
          <div className="p-3 bg-gray-50 rounded-xl text-gray-700">
            <User size={22} />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-400">Full Name</p>
            <p className="text-sm font-bold text-gray-800 mt-0.5">{user.name}</p>
          </div>
        </div>

        {/* Card 2: Email Address */}
        <div className="bg-white border border-gray-200/80 p-5 rounded-2xl flex items-center gap-4 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
          <div className="p-3 bg-gray-50 rounded-xl text-gray-700">
            <Mail size={22} />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-400">Email Address</p>
            <p className="text-sm font-bold text-gray-800 mt-0.5">{user.email}</p>
          </div>
        </div>

        {/* Card 3: Role */}
        <div className="bg-white border border-gray-200/80 p-5 rounded-2xl flex items-center gap-4 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
          <div className="p-3 bg-gray-50 rounded-xl text-gray-700">
            <ShieldAlert size={22} />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-400">Role</p>
            <p className="text-sm font-bold text-gray-800 mt-0.5 capitalize">{userRole}</p>
          </div>
        </div>

        {/* Card 4: Member Since */}
        <div className="bg-white border border-gray-200/80 p-5 rounded-2xl flex items-center gap-4 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
          <div className="p-3 bg-gray-50 rounded-xl text-gray-700">
            <Calendar size={22} />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-400">Member Since</p>
            <p className="text-sm font-bold text-gray-800 mt-0.5">{joinDate}</p>
          </div>
        </div>

      </div>
    </div>
  );
}
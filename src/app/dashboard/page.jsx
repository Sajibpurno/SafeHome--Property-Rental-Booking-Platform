"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import OwnerDashboard from "@/components/dashboard/OwnerDashboard";
import AdminDashboard from "@/components/dashboard/AdminDashboard";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  
  if (isPending) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500 font-medium">
        Loading Overview...
      </div>
    );
  }

  // ২. লগইন না থাকলে সাইন-ইন পেজে পাঠিয়ে দেওয়া
  if (!session) {
    router.push("/signin");
    return null;
  }

  // ৩. ইউজারের রোল চেক করা (ছোট হাতের অক্ষরে রূপান্তর করে নেওয়া নিরাপদ)
  const role = session?.user?.role?.toLowerCase() || "user";

  // 🎯 রোল অনুযায়ী সঠিক স্ক্রিনটি রিটার্ন করা
  if (role === "admin") return <AdminDashboard />;
  if (role === "owner") return <OwnerDashboard />;
  
  // ডিফল্ট বা সাধারণ ইউজার (Tenant) হলে এটি দেখাবে
  return <DashboardOverview />;
}
"use client";

import { authClient } from "@/lib/auth-client";
import UserOverviewPage from "@/components/dashboard/UserOverviewPage";
import OwnerOverviewPage from "@/components/dashboard/OwnerOverviewPage";

export default function OverviewPage() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) return null;

  const role = session?.user?.role?.toLowerCase();

  if (role === "owner") return <OwnerOverviewPage />;
  return <UserOverviewPage />;
}
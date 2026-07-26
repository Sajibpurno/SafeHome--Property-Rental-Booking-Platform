"use client";

import { useEffect } from "react";
import { ThemeProvider } from "next-themes";
import { authClient } from "@/lib/auth-client";
import { generateToken, getToken } from "@/lib/api/auth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ClientWrapper({ children }) {
  const { data: session } = authClient.useSession();

  useEffect(() => {
    if (session?.user && !getToken()) {
      generateToken({
        email: session.user.email,
        role: session.user.role,
      });
    }
  }, [session]);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <Navbar />
      {children}
      <Footer />
    </ThemeProvider>
  );
}

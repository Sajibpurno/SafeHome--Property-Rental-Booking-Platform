"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "../lib/auth-client";

const Navbar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();

  return (
    <header className="w-full bg-white border-b border-gray-100 font-sans sticky top-0 z-50">
      <nav className="mx-auto flex h-20 container items-center justify-between px-6 lg:px-8">
        
        {/* Left Side: Logo */}
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold text-emerald-600">
            SafeHome
          </Link>
        </div>

        {/* Middle: Navigation Links (Desktop) */}
        <div className="hidden md:flex items-center gap-8 text-gray-600 font-medium">
          <Link href="/" className="hover:text-emerald-600 transition-colors">
            Home
          </Link>
          <Link
            href="/all-properties"
            className="hover:text-emerald-600 transition-colors"
          >
            All Properties
          </Link>
          <Link
            href="/services"
            className="hover:text-emerald-600 transition-colors"
          >
            Services
          </Link>
          <Link
            href="/blog"
            className="hover:text-emerald-600 transition-colors"
          >
            Blog
          </Link>
          {session ? <Link
            href="/dashboard"
            className="hover:text-emerald-600 transition-colors"
          >
            Dashboard
          </Link> : null}
        </div>

        {/* Right Side: Auth Buttons & Profile (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          {isPending ? (
            <div className="w-24 h-10 rounded-lg bg-gray-100 animate-pulse" />
          ) : session ? (
            // Logged In State
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-gray-100 pr-3 pl-1 py-1 rounded-full border border-gray-200">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm overflow-hidden">
                  {session.user.image ? (
                    <img 
                      src={session.user.image} 
                      alt={session.user.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    session.user.name?.charAt(0).toUpperCase()
                  )}
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {session.user.name}
                </span>
              </div>
              <button
                onClick={() =>
                  authClient.signOut({
                    fetchOptions: { onSuccess: () => router.push("/") },
                  })
                }
                className="px-4 py-2 text-sm text-green-600 bg-green-50 hover:bg-green-100 rounded-lg font-medium transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            // Logged Out State
            <div className="flex items-center gap-3">
              <Link
                href="/signin"
                className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-all"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-6 py-2 bg-gray-50 text-emerald-600 rounded-lg font-medium hover:bg-gray-100 transition-all border border-gray-200"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-gray-600 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 p-6 space-y-4">
          <div className="flex flex-col space-y-3">
            <Link onClick={() => setIsMenuOpen(false)} href="/" className="block text-gray-600 hover:text-emerald-600">
              Home
            </Link>
            <Link
              onClick={() => setIsMenuOpen(false)}
              href="/all-properties"
              className="block text-gray-600 hover:text-emerald-600"
            >
              All Properties
            </Link>
            <Link
              onClick={() => setIsMenuOpen(false)}
              href="/services"
              className="block text-gray-600 hover:text-emerald-600"
            >
              Services
            </Link>
            <Link
              onClick={() => setIsMenuOpen(false)}
              href="/blog"
              className="block text-gray-600 hover:text-emerald-600"
            >
              Blog
            </Link>
            
            { session ? <Link
            href="/dashboard"
            className="hover:text-emerald-600 transition-colors"
          >
            Dashboard
          </Link> : null}
          </div>
          
          <hr className="border-gray-100" />

          {/* Auth Section (Mobile) */}
          <div className="pt-2 flex flex-col gap-3">
            {isPending ? (
              <div className="w-full h-10 rounded-lg bg-gray-100 animate-pulse" />
            ) : session ? (
              // Logged In Mobile
              <>
                <div className="flex items-center gap-3 px-2 py-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold overflow-hidden">
                    {session.user.image ? (
                      <img 
                        src={session.user.image} 
                        alt={session.user.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      session.user.name?.charAt(0).toUpperCase()
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{session.user.name}</p>
                    <p className="text-xs text-gray-500">{session.user.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    authClient.signOut({
                      fetchOptions: { onSuccess: () => router.push("/") },
                    });
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-center py-2.5 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100"
                >
                  Sign Out
                </button>
              </>
            ) : (
              // Logged Out Mobile
              <>
                <Link
                  onClick={() => setIsMenuOpen(false)}
                  href="/signin"
                  className="w-full text-center py-2.5 bg-emerald-600 text-white rounded-lg font-medium"
                >
                  Login
                </Link>
                <Link
                  onClick={() => setIsMenuOpen(false)}
                  href="/register"
                  className="w-full text-center py-2.5 bg-gray-50 text-emerald-600 rounded-lg font-medium border border-gray-200"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
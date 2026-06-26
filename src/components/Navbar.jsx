"use client";

import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
          <Link href="/all-properties" className="hover:text-emerald-600 transition-colors">All Properties</Link>
          <Link href="/services" className="hover:text-emerald-600 transition-colors">Services</Link>
          <Link href="/blog" className="hover:text-emerald-600 transition-colors">Blog</Link>
        </div>

        {/* Right Side: Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link 
            href="/login" 
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

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-gray-600">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 p-6 space-y-4">
          <Link href="/" className="block text-gray-600 hover:text-emerald-600">Home</Link>
          <Link href="/all-properties" className="block text-gray-600 hover:text-emerald-600">All Properties</Link>
          <Link href="/services" className="block text-gray-600 hover:text-emerald-600">Services</Link>
          <Link href="/blog" className="block text-gray-600 hover:text-emerald-600">Blog</Link>
          <div className="pt-4 flex flex-col gap-3">
            <Link href="/login" className="text-center py-2 bg-emerald-600 text-white rounded-lg">Login</Link>
            <Link href="/register" className="text-center py-2 bg-gray-100 text-emerald-600 rounded-lg">Register</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
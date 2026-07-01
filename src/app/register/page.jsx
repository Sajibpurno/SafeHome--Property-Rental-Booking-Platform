"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";

const SignUpForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState({ type: null, message: "" });
  const [isLoading, setIsLoading] = useState(false);
  
  // 👑 ডিফল্ট রোল Tenant সিলেক্ট থাকবে
  const [role, setRole] = useState("Tenant");

  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    setStatus({ type: null, message: "" });

    if (!user.name || !user.email || !user.password) {
      setStatus({ type: "error", message: "Please fill in all required fields." });
      return;
    }
    if (user.password.length < 6) {
      setStatus({ type: "error", message: "Password must be at least 6 characters long." });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        email: user.email,
        password: user.password,
        name: user.name,
        image: user.userImg || undefined,
        role: role, // এখানে "Tenant" অথবা "Owner" পাস হবে
      });

      if (error) {
        setStatus({ type: "error", message: error.message || "An authentication error occurred." });
      } else {
        setStatus({ type: "success", message: "Account created successfully! Redirecting..." });
        e.target.reset();
        router.push(redirectTo);
      }
    } catch {
      setStatus({ type: "error", message: "Network error. Please check your connection." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin =async () => {
      await authClient.signIn.social({
      provider: "google",
      callbackURL: '/',
      });
    }

  return (
    <section className="w-full min-h-screen bg-[#f8f9fa] flex items-center justify-center px-4 py-12 font-sans relative">

      {/* Alert Messages */}
      {status.type && (
        <div className={`absolute top-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border max-w-sm animate-in fade-in duration-300 ${
          status.type === "success"
            ? "bg-green-50 border-green-200 text-green-700"
            : "bg-red-50 border-red-200 text-red-700"
        }`}>
          <span className="text-sm font-medium">{status.message}</span>
          <button type="button" onClick={() => setStatus({ type: null, message: "" })} className="ml-auto hover:opacity-70 text-xs font-bold">✕</button>
        </div>
      )}

      {/* Form Card */}
      <div className="w-full max-w-[420px] bg-white rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 space-y-6">

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-black flex justify-center items-center gap-2">
            Create Account 🚀
          </h1>
          <p className="text-sm text-gray-500">Join Property Rental Platform</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Full Name */}
          <div>
            <input
              type="text"
              name="name"
              disabled={isLoading}
              placeholder="Full Name"
              className="w-full h-12 rounded-xl bg-white border border-gray-200 px-4 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all disabled:opacity-50"
            />
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              disabled={isLoading}
              placeholder="Email"
              className="w-full h-12 rounded-xl bg-white border border-gray-200 px-4 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all disabled:opacity-50"
            />
          </div>

          {/* Photo URL */}
          <div>
            <input
              type="text"
              name="userImg"
              disabled={isLoading}
              placeholder="Photo URL (Direct or ImgBB link)"
              className="w-full h-12 rounded-xl bg-white border border-gray-200 px-4 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all disabled:opacity-50"
            />
          </div>

          {/* Password */}
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              disabled={isLoading}
              placeholder="Password"
              className="w-full h-12 rounded-xl bg-white border border-gray-200 pl-4 pr-12 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all disabled:opacity-50"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors">
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          {/* 🎯 কাস্টম টেইলউইন্ড রেডিও বাটন (পাশাপাশি থাকবে এবং সিলেক্টেড ডট দেখাবে) */}
          <div className="flex flex-col gap-2 pt-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Register As</label>
            <div className="flex items-center gap-6 mt-1">
              
              {/* Tenant (Renter) Option */}
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input
                    type="radio"
                    name="role"
                    value="Tenant"
                    checked={role === "Tenant"}
                    onChange={() => setRole("Tenant")}
                    className="sr-only" // ডিফল্ট ব্রাউজার রেডিও হাইড করার জন্য
                  />
                  {/* বাইরের গোল বৃত্ত */}
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                    role === "Tenant" ? "border-black bg-black" : "border-gray-300 bg-white group-hover:border-gray-400"
                  }`}>
                    {/* ভেতরের সাদা ডট (সিলেক্ট হলে দেখাবে) */}
                    {role === "Tenant" && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </div>
                <span className="text-sm text-gray-700 font-medium select-none">Tenant (Renter)</span>
              </label>

              {/* Property Owner Option */}
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input
                    type="radio"
                    name="role"
                    value="Owner"
                    checked={role === "Owner"}
                    onChange={() => setRole("Owner")}
                    className="sr-only"
                  />
                  {/* বাইরের গোল বৃত্ত */}
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                    role === "Owner" ? "border-black bg-black" : "border-gray-300 bg-white group-hover:border-gray-400"
                  }`}>
                    {/* ভেতরের সাদা ডট (সিলেক্ট হলে দেখাবে) */}
                    {role === "Owner" && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </div>
                <span className="text-sm text-gray-700 font-medium select-none">Property Owner</span>
              </label>

            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 rounded-xl bg-[#111111] text-white font-medium text-base hover:bg-black active:scale-[0.99] transition-all mt-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center py-1">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink-0 mx-4 text-gray-400 text-xs uppercase tracking-wider">OR</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {/* Google Button */}
        <button onClick={handleGoogleLogin}
          type="button"
          disabled={isLoading}
          className="w-full h-12 rounded-xl bg-white border border-gray-200 text-black font-semibold text-sm hover:bg-gray-50 active:scale-[0.99] transition-all disabled:opacity-50 flex items-center justify-center gap-3"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Continue with Google
        </button>

        {/* Footer Link */}
        <div className="text-center text-sm text-gray-700">
          Already have an account?{" "}
          <Link href={`/signin?redirect=${redirectTo}`} className="text-[#0066FF] hover:underline transition-all">
            Login
          </Link>
        </div>

      </div>
    </section>
  );
};

export default SignUpForm;
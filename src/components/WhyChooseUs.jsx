"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Wallet, Headphones } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      title: "100% Verified Listings",
      description:
        "Every property on our platform is physically visited and verified by our field agents.",
    },
    {
      icon: <Wallet className="w-6 h-6 text-emerald-400" />,
      title: "Secure Digital Payments",
      description:
        "Automated rent collection and digital receipts for total transparency.",
    },
    {
      icon: <Headphones className="w-6 h-6 text-emerald-400" />,
      title: "24/7 Expert Support",
      description:
        "Dedicated relationship managers to assist with move-ins and maintenance.",
    },
  ];

  return (
    <section className="relative overflow-hidden py-24 px-6 sm:px-10 lg:px-16 bg-[#0B3B2C] dark:bg-zinc-900 dark:border-y dark:border-zinc-800 text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* Left Side: Title & Feature List */}
        <div className="space-y-10">
          <div className="space-y-4">
            <h2 className="font-heading text-4xl sm:text-5xl tracking-tight leading-tight">
              Why Rent with <br />
              <span className="text-emerald-400">SafeHome?</span>
            </h2>
          </div>

          <div className="space-y-6">
            {features.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="flex items-start gap-4"
              >
                <div className="p-3 rounded-full bg-white/10 dark:bg-zinc-800 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/10 dark:border-zinc-700">
                  {item.icon}
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-semibold text-white tracking-wide">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-300 dark:text-zinc-400 leading-relaxed max-w-md">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side: Image with background shape and floating motion */}
        <div className="relative flex justify-center lg:justify-end items-center">
          
          {/* Background shape - rotated, oversized so right/bottom has no visible edge */}
          <div 
            className="absolute rounded-[3rem] overflow-hidden dark:hidden"
            style={{
              width: "130%",
              height: "150%",
              top: "-10%",
              left: "10%",
              background: "linear-gradient(270deg, rgba(11,59,44,0.3) 0%, #1a6b4f 60%, #1e7a58 100%)",
              transform: "rotate(-4deg)",
              zIndex: 0,
            }}
          />

          {/* Dark mode version of the background shape - grayish tone */}
          <div 
            className="absolute rounded-[3rem] overflow-hidden hidden dark:block"
            style={{
              width: "130%",
              height: "150%",
              top: "-10%",
              left: "10%",
              background: "linear-gradient(270deg, rgba(24,24,27,0.3) 0%, #27272a 60%, #3f3f46 100%)",
              transform: "rotate(-4deg)",
              zIndex: 0,
            }}
          />

          {/* Main image container with floating animation */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 w-full max-w-lg rounded-[2.5rem] overflow-hidden p-3 bg-[#0e4433] dark:bg-zinc-800 -rotate-6 border border-white/20 dark:border-zinc-700 shadow-2xl dark:shadow-black/50 duration-500 hover:scale-105"
          >
            <img
              src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1000&auto=format&fit=crop"
              alt="SafeHome Port View"
              className="w-full h-[360px] sm:h-[400px] object-cover rounded-[1.8rem]"
            />
          </motion.div>

        </div>

      </div>
    </section>
  );
}
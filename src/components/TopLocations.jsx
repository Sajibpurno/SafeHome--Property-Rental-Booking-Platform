"use client";

import React from "react";
import { motion } from "framer-motion";

export default function TopLocations() {
  const locations = [
    {
      city: "Dhaka",
      properties: "450+ Active Properties",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAFkz6ilDjPemeE1PlCb4wymb8xw6VJWsph6IdmE2YCrteWM7ikK4QJpa4R0DgGkuyiCzaY82dPMgOTMnXYzPv0cd71gybwMjqFcug5qDsbeRG9vU5V29UiPyI87XbeJ67p22bzj2D65Ez7ZjIJRHAKz1Tm1K2s06a2CvBS0xbipmiODBXvbuRCn3DNWOlESoLbjYuTwDFLBvR1bYsE7g2DT6LpVOAQfHgk1R7XhFb84CoOYxbhb2PJ",
    },
    {
      city: "Sylhet",
      properties: "120+ Active Properties",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBbpIo0wev3ojwspGeHJci8peKOQlLoPdAUtcOdORH7GD0AbE30mW5HM-gueqz_UpQIUWkYaYGqeEkI4uWFRPh8bDDZ1WnMAXrxHQUwohvCXNeoXdeICn4uij884FBhtNFWeTQOFUT87LinR0gWPN80OvKETkfGoe3fKZS0MjBvA48vcgI8UekP5qgAAcm-KIF-WrEoscZNB4puPDK41EmP5uJRdIIuzpoVlaNe4H_jI59a-caK0azh",
    },
    {
      city: "Chittagong",
      properties: "230+ Active Properties",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAMOVM3S44hTkYO0PdnzRx13JHGa-Hyw_MPTvmQN4fnlwjP1y4vXm-E266k_OeNzHYA9HfME9ZSNzHkltzTm-Bg9gxzBIhu4ngiEffGbiOBuTIMGg1RMsaIE1vehdWWXbE4TsbXV6JjThI9795CrBXqtiSFFFVFuAnzM6HKPToUNm_QYua5mREwAFN54Wxe0ev-z2YvH5CeE-eCzImzlWajKFwUOl65QPBdiexRLt0OnSqCZk1g-VsZ",
    },
  ];

  return (
    <section className="relative py-20 px-6 sm:px-10 lg:px-16 bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Top Locations
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-500 dark:text-zinc-400">
            Find the perfect neighborhood that fits{" "}
            <span className="text-emerald-500 font-medium">your lifestyle.</span>
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {locations.map((loc, index) => (
            <motion.div
              key={loc.city}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
              whileHover={{ y: -6 }}
              className="group relative h-[300px] rounded-2xl overflow-hidden shadow-lg cursor-pointer"
            >
              {/* Image */}
              <motion.img
                src={loc.image}
                alt={loc.city}
                className="absolute inset-0 w-full h-full object-cover"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-white text-xl font-semibold tracking-wide">
                  {loc.city}
                </h3>
                <p className="text-emerald-400 text-xs font-medium mt-1 uppercase tracking-wider">
                  {loc.properties}
                </p>
              </div>

              {/* Subtle border on hover */}
              <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-white/30 transition-all duration-300" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
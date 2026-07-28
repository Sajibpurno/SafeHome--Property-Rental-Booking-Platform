"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function ClientExperiences() {
  const reviews = [
    {
      name: "Rahat Hossain",
      role: "Tech Consultant",
      avatarBg: "bg-emerald-800 text-white",
      initials: "RH",
      review:
        "SafeHome made moving to Dhaka effortless. The property was exactly as described, and the paperless contract was so convenient.",
    },
    {
      name: "Sara Karim",
      role: "Creative Director",
      avatarBg: "bg-blue-100 text-blue-700",
      initials: "SK",
      review:
        "The support team is incredible. They helped me negotiate terms and handled all the legal checks. Truly premium service.",
    },
    {
      name: "Tanvir Ahmed",
      role: "Software Engineer",
      avatarBg: "bg-amber-100 text-amber-700",
      initials: "TA",
      review:
        "Finding a verified apartment without paying brokerage fees was amazing. Highly recommend SafeHome to everyone!",
    },
  ];

  return (
    <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#F4F7FE] dark:bg-background transition-colors overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-14">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <motion.h2
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="font-heading text-3xl sm:text-4xl text-foreground font-bold tracking-tight"
          >
            Client Experiences
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-sm text-muted-foreground"
          >
            Hear from some of our 5,000+ satisfied tenants.
          </motion.p>
        </div>

        {/* Cards Grid with Smooth Independent Motion */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30, scale: 0.98 }} // দূরত্ব কমানো হয়েছে যাতে ধাক্কা লাগার ফিল না হয়
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.7, 
                delay: index * 0.15, 
                ease: [0.25, 1, 0.5, 1] // স্মুথ ইজিং যা ধাক্কা খাওয়া আটকাবে
              }}
              whileHover={{ y: -6 }}
              className="bg-card border border-border/60 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-sm text-foreground/80 leading-relaxed italic">
                  &ldquo;{item.review}&rdquo;
                </p>
              </div>

              {/* User Profile Info */}
              <div className="flex items-center gap-3 pt-6 mt-6 border-t border-border/40">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${item.avatarBg}`}
                >
                  {item.initials}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">
                    {item.name}
                  </h4>
                  <p className="text-xs text-muted-foreground">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
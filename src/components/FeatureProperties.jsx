"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoIosArrowRoundForward } from "react-icons/io";
import { getAllProperties } from "@/lib/api/properties";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";

export default function FeatureProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true); // এখানে setLoading আছে
  const router = useRouter();

  useEffect(() => {
    setLoading(true); // এখানে ঠিকমতো setLoading ব্যবহার করা হয়েছে
    getAllProperties(1, 6)
      .then((data) => {
        setProperties(data.properties || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false)); // এখানেও ঠিক আছে
  }, []);

  return (
    <section className="py-20 sm:py-24 px-6 sm:px-8 lg:px-10 bg-background transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Header with Title and See More Link */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-14 gap-6">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground font-medium">
              Featured
            </p>
            <h2 className="font-heading text-4xl sm:text-[2.75rem] text-foreground tracking-tight leading-tight">
              Popular Properties
            </h2>
          </div>
          <Link
            href="/all-properties"
            className="inline-flex items-center gap-3 px-7.5 py-3.5 bg-foreground text-background dark:bg-white dark:text-black text-xs font-semibold uppercase tracking-[0.2em] rounded-full hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 group cursor-pointer"
          >
            <span>See more</span>
            <IoIosArrowRoundForward className="text-xl transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Loading / Cards Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full"
            />
          </div>
        ) : properties.length === 0 ? (
          <p className="text-center text-muted-foreground text-sm py-20">
            No properties found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 items-start">
            {properties.map((property) => (
              <motion.div
                key={property._id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="bg-card border border-border rounded-xl overflow-hidden flex flex-col shadow-sm hover:shadow-xl hover:border-blue-400 transition-shadow"
              >
                <div className="h-48 w-full overflow-hidden bg-muted">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                    src={property.imageUrl}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 flex flex-col gap-2 flex-1">
                  <h3 className="text-base font-semibold text-foreground">
                    {property.title}
                  </h3>
                  <div className="flex items-center gap-1 text-muted-foreground text-sm">
                    <span>📍</span>
                    <span>{property.location}</span>
                  </div>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm">
                    ৳{Number(property.rent).toLocaleString()} /{property.rentType}
                  </p>
                  <Button
                    onClick={() => router.push(`/all-properties/${property._id}`)}
                    className="mt-auto bg-black dark:bg-white text-white dark:text-black text-sm font-medium py-2.5 rounded-lg hover:opacity-90 transition w-full cursor-pointer"
                  >
                    View Detail
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
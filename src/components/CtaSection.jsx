"use client";

import React from "react";
import { motion } from "framer-motion";

export default function CtaSection() {
  return (
    <section className="relative py-24 px-6 sm:px-10 lg:px-16 bg-white dark:bg-zinc-950 overflow-hidden">
      <div className="max-w-3xl mx-auto text-center">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white leading-tight"
        >
          Ready to find your <br />
          <span className="italic text-emerald-600 dark:text-emerald-400">
            perfect sanctuary?
          </span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-5 text-sm sm:text-base text-slate-500 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed"
        >
          Join the thousands of families already living in their dream homes
          secured through SafeHome.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3.5 rounded-full bg-[#0B3B2C] dark:bg-emerald-700 text-white text-sm font-medium shadow-lg hover:shadow-xl transition-shadow"
          >
            Start Exploring Properties
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3.5 rounded-full bg-sky-50 dark:bg-zinc-800 text-sky-600 dark:text-sky-400 text-sm font-medium border border-sky-100 dark:border-zinc-700 hover:bg-sky-100 dark:hover:bg-zinc-700 transition-colors"
          >
            Contact Our Agents
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
}
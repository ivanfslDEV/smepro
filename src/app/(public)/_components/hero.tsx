"use client";

import { motion } from "framer-motion";

export function Hero() {
  const handleScroll = () => {
    const el = document.getElementById("professionals");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white">
      {/* Soft spotlight gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.15),transparent_70%)]"></div>

      {/* Elegant moving gradient veil */}
      <motion.div
        className="absolute inset-0 opacity-60 bg-[linear-gradient(115deg,#10b981_0%,#34d399_50%,#10b981_100%)] mix-blend-overlay"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
        style={{ backgroundSize: "200% 200%" }}
      />

      {/* Floating blurred glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[1200px] h-[1200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-t from-emerald-500/5 to-transparent blur-3xl"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 px-6 text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-semibold tracking-tight leading-tight bg-gradient-to-br from-white via-emerald-100 to-emerald-400 bg-clip-text text-transparent">
          All the best businesses,
          <br className="hidden sm:block" /> in one place
        </h1>

        <motion.p
          className="mt-8 text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Connecting you to top-rated professionals, trusted services, and local
          favorites. Fast, simple, and all in one place
        </motion.p>

        {/* Scroll Button */}
        <motion.button
          onClick={handleScroll}
          className="mt-12 px-8 py-4 text-lg font-medium rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-105"
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.98 }}
        >
          Find Professionals ↓
        </motion.button>
      </motion.div>

      {/* Decorative ambient line */}
      <motion.div
        className="absolute bottom-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent"
        animate={{ opacity: [0.2, 0.8, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </section>
  );
}

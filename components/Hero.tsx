"use client";

import { motion, type MotionValue } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   Hero — receives scroll-driven motion values from parent.
   No self-animations on the section root — those are controlled
   externally by CinematicTransition.
───────────────────────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

export function Hero() {
  return (
    <section
      id="hero"
      className="relative h-full w-full overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* ─── Layer 0: Dark fallback ─── */}
      <div className="absolute inset-0 z-[0] bg-background" />

      {/* ─── Layer 1: Video Background ─── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 z-[1] w-full h-full object-cover"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* ─── Layer 2: Warm cinematic overlay ─── */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(10,8,3,0.3) 35%, rgba(10,8,3,0.35) 65%, rgba(0,0,0,0.65) 100%)",
        }}
      />

      {/* ─── Centered hero content ─── */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        {/* Label */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.4}
          className="text-xl sm:text-2xl tracking-[0.35em] uppercase text-foreground/40 font-light mb-6 sm:mb-8"
        >
          Software Developer
        </motion.p>

        {/* ─── Massive Name ─── */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="hero-name text-center"
        >
          <span className="block text-foreground">SHASHANK</span>
          <span className="block text-foreground">SINGH</span>
        </motion.h1>
      </div>

      {/* ─── Bottom: Location + Scroll indicator ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4"
      >
        <div className="flex items-center gap-2.5">
          <span className="text-sm sm:text-base tracking-[0.3em] uppercase text-foreground/35 font-light">
            Located in India
          </span>
          <IndiaFlag />
        </div>

        <div className="flex flex-col items-center gap-2">
          <span className="text-xs sm:text-sm tracking-[0.25em] uppercase text-foreground/25 font-light">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <svg
              width="14"
              height="20"
              viewBox="0 0 14 20"
              fill="none"
              className="text-foreground/25"
            >
              <path
                d="M7 1V19M7 19L1 13M7 19L13 13"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* ─── Minimal India flag SVG ─── */
function IndiaFlag() {
  return (
    <svg
      width="18"
      height="12"
      viewBox="0 0 30 20"
      className="opacity-40"
      role="img"
      aria-label="India"
    >
      <rect width="30" height="6.67" fill="#FF9933" />
      <rect y="6.67" width="30" height="6.67" fill="#FFFFFF" />
      <rect y="13.33" width="30" height="6.67" fill="#138808" />
      <circle
        cx="15"
        cy="10"
        r="2"
        fill="none"
        stroke="#000080"
        strokeWidth="0.4"
      />
    </svg>
  );
}

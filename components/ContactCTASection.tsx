"use client";

import { useRef, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "framer-motion";
import Link from "next/link";

/* ──────────────────────────────────────────────────────────────
   MagneticCTA — magnetic drag wrapper tuned for the giant button.
   Same physics model as NavItem / SelectedWork MagneticItem,
   but with a configurable `strength` multiplier so the huge CTA
   button doesn't fly around like a nav link.

     normX = clamp((cursorX - cx) / (halfWidth), -1, 1)
     rawX  = normX × width × horizTravel × strength
     Spring: stiffness 200 / damping 20 / mass 0.7

   ────────────────────────────────────────────────────────────── */
function MagneticCTA({
  children,
  strength = 0.35,
  className,
  style,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rafId = useRef<number>(0);
  const hovering = useRef(false);
  const dims = useRef({ w: 1, h: 1 });

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 200, damping: 20, mass: 0.7 });
  const springY = useSpring(rawY, { stiffness: 200, damping: 20, mass: 0.7 });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!hovering.current || !ref.current) return;
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        const rect = ref.current!.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const normX = Math.max(
          -1,
          Math.min(1, (e.clientX - cx) / (rect.width / 2)),
        );
        const normY = Math.max(
          -1,
          Math.min(1, (e.clientY - cy) / (rect.height / 2)),
        );
        const { w, h } = dims.current;
        rawX.set(normX * w * 0.5 * strength);
        rawY.set(normY * h * 0.22 * strength);
      });
    },
    [rawX, rawY, strength],
  );

  function onEnter() {
    hovering.current = true;
    if (ref.current) {
      const r = ref.current.getBoundingClientRect();
      dims.current = { w: r.width, h: r.height };
    }
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
  }

  function onLeave() {
    hovering.current = false;
    window.removeEventListener("mousemove", handleMouseMove);
    cancelAnimationFrame(rafId.current);
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={className}
      style={{ x: springX, y: springY, willChange: "transform", ...style }}
    >
      {children}
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────
   ContactCTASection — cinematic scroll-triggered takeover.

   Scroll behaviour:
     • Panel starts at y = "100%" (fully below)
     • As user scrolls the section into view, panel rises to y = "10%"
       (covers ~90% of viewport)
     • On scroll-up the spring configuration ensures fast retreat

   No position:fixed, no extra viewport padding. Lives in normal
   document flow.
   ────────────────────────────────────────────────────────────── */
export function ContactCTASection() {
  const sectionRef = useRef<HTMLElement>(null);

  /* Track scroll progress of the section through the viewport */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 0.15"],
  });

  /* Panel Y: 100% → 10%  (rises to cover 90vh) */
  const panelY = useTransform(scrollYProgress, [0, 1], ["100%", "10%"]);

  /* Smooth spring for fast retreat on scroll-up */
  const smoothPanelY = useSpring(panelY, {
    stiffness: 300,
    damping: 40,
    mass: 0.8,
  });

  /* Fade in content once panel is mostly visible */
  const contentOpacity = useTransform(scrollYProgress, [0.4, 0.75], [0, 1]);
  const contentScale = useTransform(scrollYProgress, [0.4, 0.75], [0.92, 1]);

  return (
    <section
      ref={sectionRef}
      id="contact-cta"
      style={{
        position: "relative",
        overflow: "hidden",
        /* Section height determines scroll distance for animation */
        minHeight: "100vh",
      }}
    >
      {/* Takeover panel — rises from below */}
      <motion.div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          minHeight: "90vh",
          y: smoothPanelY,
          willChange: "transform",

          /* Black stage styling */
          background: "#000000",
          borderRadius: "32px 32px 0 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Subtle radial glow for depth */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 70% 50% at 50% 60%, rgba(255,255,255,0.03) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Subheading — subtle, positioned near top */}
        <motion.p
          style={{
            position: "absolute",
            top: "10%",
            left: "50%",
            x: "-50%",
            fontFamily: "'Space Grotesk', 'Inter', sans-serif",
            fontSize: "clamp(16px, 2vw, 22px)",
            color: "rgba(255,255,255,0.75)",
            letterSpacing: "0.02em",
            textAlign: "center",
            opacity: contentOpacity,
            scale: contentScale,
            willChange: "opacity, transform",
            whiteSpace: "nowrap",
          }}
        >
          Ready to level up your project ?
        </motion.p>

        {/* Massive CTA button with magnetic behaviour */}
        <motion.div
          style={{
            opacity: contentOpacity,
            scale: contentScale,
            willChange: "opacity, transform",
          }}
        >
          <MagneticCTA strength={0.35}>
            <Link
              href="/contact"
              style={{
                width: "min(90vw, 1400px)",
                height: "clamp(220px, 32vh, 320px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "28px",
                border: "1px solid rgba(255,255,255,0.25)",
                background: "transparent",
                cursor: "pointer",
                textDecoration: "none",
                transition:
                  "border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "rgba(255,255,255,0.5)";
                el.style.background = "rgba(255,255,255,0.04)";
                el.style.boxShadow =
                  "0 0 80px rgba(255,255,255,0.06), inset 0 0 80px rgba(255,255,255,0.02)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "rgba(255,255,255,0.25)";
                el.style.background = "transparent";
                el.style.boxShadow = "none";
              }}
            >
              {/* Poster-scale text */}
              <span
                style={{
                  fontFamily: "'Anton', 'Bebas Neue', sans-serif",
                  fontSize: "clamp(72px, 10vw, 180px)",
                  lineHeight: 0.9,
                  letterSpacing: "0.02em",
                  color: "transparent",
                  WebkitTextStroke: "1.5px white",
                  textTransform: "uppercase",
                  userSelect: "none",
                  textAlign: "center",
                  padding: "0 1rem",
                }}
              >
                GET IN TOUCH !!!
              </span>
            </Link>
          </MagneticCTA>
        </motion.div>
      </motion.div>
    </section>
  );
}

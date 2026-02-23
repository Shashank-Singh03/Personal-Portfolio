"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   CinematicTransition — root scroll orchestrator.

   Z-INDEX LAYERING (from spec):
     z-0   global background
     z-10  hero section
     z-20  about section panel (rising) — the green slab background
     z-30  purple SVG thread (belongs to about, inside panel)
     z-40  about content (glass cards etc.)
     z-50  UI chrome (navbar — handled by SideNav)

   PANEL RISE MECHANICS:
     • The panel occupies absolute inset: 0 of the sticky frame
     • It slides UP via translateY: "100%" → "0%" (GPU transform only)
     • Side breathing room is achieved via left/right MotionValues: 48px → 0px
     • Border-radius also smoothly reduces: 28px → 0px
     • NO layout-thrashing CSS properties (top/bottom/width) are animated

   SCROLL ARCHITECTURE:
     • 200vh outer div = scroll distance budget
     • sticky inner (100vh) = the viewport-locked cinematic frame
     • ALL effects from ONE useScroll progress value (0 → 1)
───────────────────────────────────────────────────────────── */

interface CinematicTransitionProps {
  heroContent: React.ReactNode;
  /**
   * Render prop: receives the scroll-bound threadPathLength MotionValue.
   * The thread SVG must be rendered INSIDE the panel (not globally)
   * so it's invisible until the panel enters the viewport.
   */
  aboutContent: (threadPathLength: MotionValue<number>) => React.ReactNode;
  /** Fired when scroll progress ≥ 0.8 — signals About content should animate in */
  onAboutDominant?: (dominant: boolean) => void;
}

export function CinematicTransition({
  heroContent,
  aboutContent,
  onAboutDominant,
}: CinematicTransitionProps) {
  const outerRef = useRef<HTMLDivElement>(null);

  /**
   * scrollYProgress: 0 when sticky div is at top of viewport,
   * 1 when outerRef has been scrolled its full height (200vh - 100vh = 100vh).
   */
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  /* ══════════════════════════════════════════
     HERO EXIT — starts late, finishes last
     progress 0→0.55: stays near 1 (hero is dominant)
     progress 0.55→0.9: fades to 0
  ══════════════════════════════════════════ */
  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 0.55, 0.9],
    [1, 0.92, 0]
  );
  const heroScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 0.93]
  );
  const heroRotateX = useTransform(
    scrollYProgress,
    [0, 1],
    ["0deg", "5deg"]
  );

  /* ══════════════════════════════════════════
     ABOUT PANEL — GPU-only transforms
  ══════════════════════════════════════════ */

  /**
   * Primary rise: translateY moves the FULL-SIZE panel from
   * "100%" (entirely off-screen below) to "0%" (flush at top).
   * This is GPU-only — no layout impact.
   */
  const panelTranslateY = useTransform(
    scrollYProgress,
    [0, 1],
    ["100%", "0%"]
  );

  /**
   * Side breathing room — left + right offset.
   * Phase A (0→0.45): 48px side gap → panel floats with visible margins
   * Phase B (0.45→0.78): 48px→0px → panel expands to full bleed
   */
  const panelSideGap = useTransform(
    scrollYProgress,
    [0, 0.45, 0.78],
    ["48px", "32px", "0px"]
  );

  /**
   * Border radius: prominent rounding while floating, square when full-bleed
   */
  const panelRadius = useTransform(
    scrollYProgress,
    [0, 0.45, 0.78],
    ["24px", "14px", "0px"]
  );

  /* ══════════════════════════════════════════
     GREEN ATMOSPHERIC WASH
  ══════════════════════════════════════════ */
  const washOpacity = useTransform(
    scrollYProgress,
    [0.25, 0.88],
    [0, 0.94]
  );

  /* ══════════════════════════════════════════
     PURPLE THREAD
     threadStart: 0.5 = panel covers ~50% of viewport
     threadEnd:   0.92 = near full takeover
  ══════════════════════════════════════════ */
  const threadPathLength = useTransform(
    scrollYProgress,
    [0.5, 0.92],
    [0, 1]
  );

  /* Signal parent when About is dominant (content animations trigger) */
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (onAboutDominant) onAboutDominant(v >= 0.80);
  });

  return (
    /* ─── 200vh scroll budget container ─── */
    <div
      ref={outerRef}
      style={{ height: "200vh", position: "relative" }}
    >
      {/* ─── Sticky viewport-locked cinematic frame ─── */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          perspective: "1400px",
          perspectiveOrigin: "50% 40%",
        }}
      >
        {/* ══ LAYER z-10 — HERO (recedes + fades) ══
            Wrapped in motion.div so transforms come from MotionValues.
            The section itself is position:absolute filling this frame. */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            opacity: heroOpacity,
            scale: heroScale,
            rotateX: heroRotateX,
            transformStyle: "preserve-3d",
            willChange: "transform, opacity",
          }}
        >
          {heroContent}
        </motion.div>

        {/* ══ LAYER z-15 — Green atmospheric wash
            Sits between hero and about panel.
            Intensifies as hero fades & panel rises.  ══ */}
        <motion.div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 15,
            pointerEvents: "none",
            opacity: washOpacity,
            background:
              "radial-gradient(ellipse 100% 80% at 50% 35%, oklch(0.20 0.08 130) 0%, oklch(0.14 0.05 130) 50%, oklch(0.10 0.03 130) 100%)",
            willChange: "opacity",
          }}
        />

        {/* ══ LAYER z-20 — About panel (the glass slab that rises) ══
            Position: absolute inset:0 in the sticky frame = full-size container.
            GPU translateY slides it into view.
            Side gaps via left/right MotionValues (smooth, no width recalc).
            Overflow hidden so thread & content are both clipped to panel bounds. */}
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: panelSideGap,
            right: panelSideGap,
            zIndex: 20,
            translateY: panelTranslateY,
            borderRadius: panelRadius,
            overflow: "hidden",
            background:
              "radial-gradient(ellipse 110% 80% at 50% 25%, oklch(0.18 0.07 130) 0%, oklch(0.13 0.05 130) 50%, oklch(0.09 0.03 130) 100%)",
            willChange: "transform",
          }}
        >
          {/*
            Thread (z-30) and content (z-40) both live inside this panel.
            Thread is below content — visually behind the glass cards.
            Neither is visible until the panel rises into view (overflow:hidden clips them).
          */}
          {aboutContent(threadPathLength)}
        </motion.div>
      </div>
    </div>
  );
}

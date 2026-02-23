"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/*
  PeelTransition — fixed layering
  ─────────────────────────────────
  Root cause of previous dark flash:
    • sticky frame was transparent → dark body visible when white+green canvases
      were both near 0 opacity simultaneously.
    • No green wrapper in page.tsx → seam gaps showed dark body.

  Fix:
    • Sticky frame has BASE background = light green (no dark can bleed through).
    • White canvas fades in at 0.5% (not 8%) — covers transition on first frame.
    • No separate green canvas needed (sticky frame IS the green).
    • Cap slides off top; white canvas wipes then disappears revealing green frame.

  LAYER STACK (bottom → top):
    z-0  Sticky frame itself: oklch(0.86 0.20 130) — always visible
    z-10 White canvas  → opacity 0→1 at 0.5%, fades out at 70%
    z-20 About Me cap  → slides up with curved SVG bottom edge, willChange:transform
*/
export function PeelTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef      = useRef<SVGPathElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /*
    Curve control-point Y (SVG objectBoundingBox, 0–1):
      1.00 = flat bottom (no concave curve)
      0.72 = deepest concave (center scoops 28% upward)
    Keyframes: flat → deep at 35% → relaxing at 68% → flat
  */
  const controlY = useTransform(
    scrollYProgress,
    [0, 0.35, 0.68, 1.0],
    [1.0, 0.72, 0.96, 1.0],
  );

  /* Cap slides upward: 0 → -100% (fully off screen) */
  const capY = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);

  /*
    White canvas — "press" layer that creates the clean-wipe feel.
    Activates at 0.5% (near immediately) to prevent any dark bleed.
    Fades out at 75% progress (green frame is fully visible beneath).
  */
  const whiteOpacity = useTransform(
    scrollYProgress,
    [0, 0.005, 0.72, 0.90],
    [0,   1,    1,    0  ],
  );

  /* Direct DOM attribute mutation — zero React re-renders on scroll frames */
  useEffect(() => {
    return controlY.on("change", (y) => {
      pathRef.current?.setAttribute(
        "d",
        `M 0 0 L 1 0 L 1 1 Q 0.5 ${y.toFixed(4)} 0 1 Z`,
      );
    });
  }, [controlY]);

  return (
    /* 200vh outer: 100vh of actual scroll travel */
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{ height: "200vh", position: "relative" }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          /*
            BASE COLOR = SelectedWork green.
            This is always visible beneath white canvas and cap.
            Eliminates every possible dark frame.
          */
          background: "oklch(0.86 0.20 130)",
        }}
      >
        {/* z-10: White canvas — clean wipe over the green base */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            background: "#ffffff",
            opacity: whiteOpacity,
            pointerEvents: "none",
          }}
        />

        {/* SVG clip definition */}
        <svg
          aria-hidden="true"
          style={{
            position: "absolute",
            width: 0,
            height: 0,
            overflow: "visible",
            pointerEvents: "none",
          }}
        >
          <defs>
            <clipPath id="peel-cap-clip" clipPathUnits="objectBoundingBox">
              {/* Initial d = flat rectangle. Mutated directly by controlY listener. */}
              <path ref={pathRef} d="M 0 0 L 1 0 L 1 1 Q 0.5 1 0 1 Z" />
            </clipPath>
          </defs>
        </svg>

        {/* z-20: About Me cap — dark green, curved bottom, slides upward */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 20,
            /*
              Exact gradient from CinematicTransition About panel.
              Seamless visual seam — cap looks identical to the real About Me.
            */
            background:
              "radial-gradient(ellipse 110% 80% at 50% 25%, oklch(0.18 0.07 130) 0%, oklch(0.13 0.05 130) 50%, oklch(0.09 0.03 130) 100%)",
            clipPath: "url(#peel-cap-clip)",
            y: capY,
            willChange: "transform",
          }}
        />
      </div>
    </div>
  );
}

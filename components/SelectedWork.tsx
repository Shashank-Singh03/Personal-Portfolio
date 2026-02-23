"use client";

import Link from "next/link";
import { useRef, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";

/*
  MagneticItem — reusable magnetic drag wrapper.
  Exact same physics model as NavItem.tsx:

    normX = clamp((cursorX - cx) / (elemWidth  / 2), -1, 1)
    normY = clamp((cursorY - cy) / (elemHeight / 2), -1, 1)

    rawX = normX × elemWidth  × 0.50   (50% width  horizontal travel)
    rawY = normY × elemHeight × 0.22   (22% height vertical  travel)

    Spring: stiffness 200 / damping 20 / mass 0.7 → lagging elastic feel.

  Dimensions cached at hover-start. RAF-throttled mousemove listener.
  Spring returns to (0,0) on leave — no hard reset.
*/
function MagneticItem({
  children,
  style,
  className,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}) {
  const ref      = useRef<HTMLDivElement>(null);
  const rafId    = useRef<number>(0);
  const hovering = useRef(false);
  const dims     = useRef({ w: 1, h: 1 });

  const rawX    = useMotionValue(0);
  const rawY    = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 200, damping: 20, mass: 0.7 });
  const springY = useSpring(rawY, { stiffness: 200, damping: 20, mass: 0.7 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!hovering.current || !ref.current) return;
    cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      const rect = ref.current!.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      const normX = Math.max(-1, Math.min(1, (e.clientX - cx) / (rect.width  / 2)));
      const normY = Math.max(-1, Math.min(1, (e.clientY - cy) / (rect.height / 2)));
      const { w, h } = dims.current;
      rawX.set(normX * w * 0.50);   /* 50% width  */
      rawY.set(normY * h * 0.22);   /* 22% height */
    });
  }, [rawX, rawY]);

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

/* ─────────────────────────────────────────────────────────── */

const PROJECTS = [
  {
    id: "pixel-fits",
    name: "Pixel Fits",
    label: "AI Fashion Agent",
    year: "2025",
    href: "/projects/pixel-fits",
  },
  {
    id: "code-studio",
    name: "Code Studio",
    label: "Cloud AI IDE",
    year: "2025",
    href: "/projects/code-studio",
  },
  {
    id: "distributed-task-queue",
    name: "Task Orchestrator",
    label: "Distributed Systems",
    year: "2025",
    href: "/projects/distributed-task-queue",
  },
  {
    id: "api-gateway",
    name: "API Gateway",
    label: "High-Throughput Backend",
    year: "2025",
    href: "/projects/api-gateway",
  },
] as const;

export function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef    = useRef<SVGPathElement>(null);

  /* Scroll progress: 0 when section bottom enters viewport → 1 when section top at viewport top */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });

  /* Cap Y: 0% → -100% (slides off screen top) */
  const capY = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);

  /* Curve control-point Y (SVG objectBoundingBox): 1.0=flat, 0.72=deepest concave */
  const controlY = useTransform(
    scrollYProgress,
    [0, 0.30, 0.70, 1.0],
    [1.0, 0.72, 0.96, 1.0],
  );

  /* Heading slide-in from left */
  const headingX       = useTransform(scrollYProgress, [0.15, 0.55], ["-110vw", "0vw"]);
  const headingOpacity = useTransform(scrollYProgress, [0.12, 0.40], [0, 1]);

  /* Per-row opacity + Y — declared at top-level (Rules of Hooks) */
  const r0o = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);
  const r1o = useTransform(scrollYProgress, [0.40, 0.60], [0, 1]);
  const r2o = useTransform(scrollYProgress, [0.45, 0.65], [0, 1]);
  const r3o = useTransform(scrollYProgress, [0.50, 0.70], [0, 1]);
  const r0y = useTransform(scrollYProgress, [0.35, 0.55], [28, 0]);
  const r1y = useTransform(scrollYProgress, [0.40, 0.60], [28, 0]);
  const r2y = useTransform(scrollYProgress, [0.45, 0.65], [28, 0]);
  const r3y = useTransform(scrollYProgress, [0.50, 0.70], [28, 0]);
  const rowMotion = [
    { opacity: r0o, y: r0y },
    { opacity: r1o, y: r1y },
    { opacity: r2o, y: r2y },
    { opacity: r3o, y: r3y },
  ];

  /* CTA fade-in */
  const footerOpacity = useTransform(scrollYProgress, [0.65, 0.85], [0, 1]);

  /* Direct SVG path mutation — no re-render on scroll */
  useEffect(() => {
    return controlY.on("change", (y) => {
      pathRef.current?.setAttribute(
        "d",
        `M 0 0 L 1 0 L 1 1 Q 0.5 ${y.toFixed(4)} 0 1 Z`,
      );
    });
  }, [controlY]);

  return (
    <section
      ref={sectionRef}
      id="selected-work"
      style={{
        minHeight: "100svh",
        background: "oklch(0.86 0.20 130)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "clamp(3rem, 8vh, 6rem) clamp(1.5rem, 6vw, 5rem)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Depth gradient */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          background:
            "radial-gradient(ellipse 90% 60% at 20% 50%, oklch(0.91 0.16 130) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* SVG clip for About Me cap */}
      <svg
        aria-hidden="true"
        style={{ position: "absolute", width: 0, height: 0, overflow: "visible", pointerEvents: "none" }}
      >
        <defs>
          <clipPath id="sw-cap-clip" clipPathUnits="objectBoundingBox">
            <path ref={pathRef} d="M 0 0 L 1 0 L 1 1 Q 0.5 1 0 1 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* z-20: About Me cap — dark-green, curved bottom, slides up */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 20,
          background:
            "radial-gradient(ellipse 110% 80% at 50% 25%, oklch(0.18 0.07 130) 0%, oklch(0.13 0.05 130) 50%, oklch(0.09 0.03 130) 100%)",
          clipPath: "url(#sw-cap-clip)",
          y: capY,
          willChange: "transform",
          pointerEvents: "none",
        }}
      />

      {/* Content (z-1) */}
      <div
        style={{
          maxWidth: "70rem",
          marginInline: "auto",
          width: "100%",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/*
          HEADING — scroll-driven x slide + magnetic wobble stacked.
          MagneticItem outer: wobble x/y.
          motion.h2 inner: scroll-driven x slide + opacity.
          CSS transforms compose — both work independently.
        */}
        <div style={{ display: "inline-block", marginBottom: "clamp(3rem, 6vw, 5rem)" }}>
          <motion.h2
            style={{
              fontFamily: "'Anton', 'Impact', sans-serif",
              fontSize: "clamp(64px, 7vw, 120px)",
              letterSpacing: "-0.01em",
              lineHeight: 0.9,
              color: "rgba(0,0,0,0.88)",
              WebkitTextStroke: "1.5px rgba(0,0,0,0.65)",
              willChange: "transform, opacity",
              userSelect: "none",
              x: headingX,
              opacity: headingOpacity,
              margin: 0,
            }}
          >
            SELECTED ✺ WORK
          </motion.h2>
        </div>

        {/* Project rows */}
        <div style={{ width: "100%" }}>
          {PROJECTS.map((project, index) => {
            const { opacity, y } = rowMotion[index];
            return (
              /*
                Outer motion.div: scroll-driven opacity + y entrance.
                MagneticItem inside: wobble on hover.
                Link is the actual clickable element.
              */
              <motion.div key={project.id} style={{ opacity, y }}>
                <MagneticItem>
                  <Link
                    href={project.href}
                    style={{ textDecoration: "none", display: "block", color: "inherit" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "28px 0",
                        cursor: "pointer",
                        transition: "opacity 0.22s ease",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLDivElement).style.opacity = "0.5";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLDivElement).style.opacity = "1";
                      }}
                    >
                      {/* Left: index + name */}
                      <div style={{ display: "flex", alignItems: "center", gap: "1.4rem" }}>
                        <span
                          style={{
                            fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                            fontSize: "13px",
                            letterSpacing: "0.12em",
                            color: "rgba(0,0,0,0.35)",
                            flexShrink: 0,
                            minWidth: "2.2rem",
                            userSelect: "none",
                          }}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span
                          style={{
                            fontFamily: "'Anton', 'Impact', sans-serif",
                            fontSize: "clamp(28px, 3vw, 50px)",
                            letterSpacing: "-0.01em",
                            lineHeight: 1,
                            color: "rgba(0,0,0,0.9)",
                          }}
                        >
                          {project.name}
                        </span>
                      </div>

                      {/* Right: tag + year */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-end",
                          gap: "0.2rem",
                          flexShrink: 0,
                          marginLeft: "1.5rem",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                            fontSize: "13px",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color: "rgba(0,0,0,0.65)",
                          }}
                        >
                          {project.label}
                        </span>
                        <span
                          style={{
                            fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                            fontSize: "12px",
                            letterSpacing: "0.06em",
                            color: "rgba(0,0,0,0.35)",
                          }}
                        >
                          {project.year}
                        </span>
                      </div>
                    </div>
                  </Link>
                </MagneticItem>

                {/* Divider — not after last row */}
                {index < PROJECTS.length - 1 && (
                  <div
                    style={{
                      height: "1px",
                      background: "rgba(0,0,0,0.12)",
                      width: "100%",
                    }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* CTA button — fadein + magnetic wobble */}
        <motion.div
          style={{
            marginTop: "clamp(2.5rem, 5vh, 4rem)",
            opacity: footerOpacity,
          }}
        >
          <MagneticItem style={{ display: "inline-block" }}>
            <Link
              href="/projects"
              style={{
                fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                fontSize: "18px",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(0,0,0,0.88)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "14px 28px",
                borderRadius: "999px",
                border: "1.5px solid rgba(0,0,0,0.25)",
                background: "transparent",
                transition: "border-color 0.25s ease, background 0.25s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "rgba(0,0,0,0.55)";
                el.style.background  = "rgba(0,0,0,0.05)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "rgba(0,0,0,0.25)";
                el.style.background  = "transparent";
              }}
            >
              View All Projects
              <span style={{ fontSize: "20px", lineHeight: 1 }}>→</span>
            </Link>
          </MagneticItem>
        </motion.div>
      </div>
    </section>
  );
}

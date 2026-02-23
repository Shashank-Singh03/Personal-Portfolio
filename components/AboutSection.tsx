"use client";

import { useState, useRef, type CSSProperties } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";
import { CinematicTransition } from "./CinematicTransition";
import { Hero } from "./Hero";
import Image from "next/image";

/* ─────────────────────────────────────────────────────────────
   ORGANIC KNOT PATH — viewBox 0 0 100 200
   Wide sweep: left x reaches -8 (SS card zone), right tail x~83 (stats column)
   Geometry is locked per spec — do not shrink.
───────────────────────────────────────────────────────────── */
const ORGANIC_KNOT =
  "M 50 0 " +
  "C 51 16, 58 26, 66 40 " +
  "C 74 54, 80 70, 74 86 " +
  "C 68 100, 50 110, 28 104 " +
  "C 8 98, -8 78, -4 58 " +
  "C 0 40, 20 30, 40 40 " +
  "C 54 48, 64 62, 62 76 " +
  "C 60 90, 70 104, 76 120 " +
  "C 80 132, 84 144, 83 160";

/* ─────────────────────────────────────────────────────────────
   PurpleThread — FLAT MATTE PAINT STROKE. No glow. No filter.
   Single motion.path. Crisp edges. Like paint on a wall.
───────────────────────────────────────────────────────────── */
function PurpleThread({ pathLengthMV }: { pathLengthMV: MotionValue<number> }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "clamp(380px, 70vw, 980px)",
        height: "78%",
        zIndex: 30,
        pointerEvents: "none",
        overflow: "visible",
      }}
    >
      <svg
        viewBox="0 0 100 200"
        preserveAspectRatio="xMidYTop meet"
        style={{ width: "100%", height: "100%", overflow: "visible" }}
        fill="none"
      >
        {/*
          FLAT MATTE STROKE — no defs, no filter, no glow.
          A thick painted ribbon. Bold, clean, dead flat.
          strokeWidth 7 gives visual dominance without bloom.
          vector-effect="non-scaling-stroke" keeps physical px consistent.
        */}
        <motion.path
          d={ORGANIC_KNOT}
          stroke="#7c4dbe"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          fill="none"
          style={{ pathLength: pathLengthMV }}
        />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   GlassCard — cursor-follow spotlight glow.
   useMotionValue + useSpring. Zero state. 60fps.
───────────────────────────────────────────────────────────── */
function GlassCard({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: CSSProperties;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);
  const springX = useSpring(rawX, { stiffness: 160, damping: 24, mass: 0.5 });
  const springY = useSpring(rawY, { stiffness: 160, damping: 24, mass: 0.5 });
  const mxPct = useTransform(springX, (v) => `${v * 100}%`);
  const myPct = useTransform(springY, (v) => `${v * 100}%`);
  const rawGlow = useMotionValue(0);
  const glowOpacity = useSpring(rawGlow, { stiffness: 100, damping: 18 });
  const spotlightBg = useTransform([mxPct, myPct], ([x, y]) =>
    `radial-gradient(circle at ${x} ${y}, rgba(34,197,94,0.14) 0%, rgba(34,197,94,0.07) 22%, transparent 50%)`
  );

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width);
    rawY.set((e.clientY - rect.top) / rect.height);
  }

  return (
    <motion.div
      ref={cardRef}
      className="about-glass-card"
      onMouseMove={onMouseMove}
      onMouseEnter={() => rawGlow.set(1)}
      onMouseLeave={() => rawGlow.set(0)}
      style={{ ...style, position: "relative", overflow: "hidden", isolation: "isolate" }}
    >
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0, zIndex: 1,
          pointerEvents: "none", opacity: glowOpacity,
          background: spotlightBg, willChange: "background, opacity",
        }}
      />
      <div style={{ position: "relative", zIndex: 2, height: "100%", color: "white", display: "flex", flexDirection: "column" }}>
        {children}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Logo Marquee — infinite horizontal loop, GPU transform only.
   Logos duplicated for seamless wrap. No easing — pure linear.
───────────────────────────────────────────────────────────── */
const TECH_LOGOS = [
  { slug: "react",      label: "React" },
  { slug: "nextdotjs", label: "Next.js" },
  { slug: "typescript", label: "TypeScript" },
  { slug: "angular",    label: "Angular" },
  { slug: "java",       label: "Java" },
  { slug: "spring",     label: "Spring" },
  { slug: "postgresql", label: "PostgreSQL" },
  { slug: "docker",     label: "Docker" },
  { slug: "git",        label: "Git" },
  { slug: "figma",      label: "Figma" },
  { slug: "tailwindcss", label: "Tailwind" },
  { slug: "javascript", label: "JavaScript" },
];

function LogoMarquee() {
  /* Double the logo array for the seamless loop */
  const logos = [...TECH_LOGOS, ...TECH_LOGOS];

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "none",
        borderRadius: "100px",
        background: "rgba(4, 18, 9, 0.7)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.07)",
        overflow: "hidden",
        padding: "18px 28px",
        /* GPU-only */
        willChange: "transform",
      }}
    >
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 28,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "2.2rem",
          paddingInline: "2rem",
          width: "max-content",
          willChange: "transform",
        }}
      >
        {logos.map((logo, i) => (
          <div
            key={`${logo.slug}-${i}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              flexShrink: 0,
              opacity: 0.75,
              userSelect: "none",
              transform: "scale(1.15)",
            }}
          >
            <img
              src={`https://cdn.simpleicons.org/${logo.slug}/ffffff`}
              alt={logo.label}
              width={20}
              height={20}
              draggable={false}
              style={{ display: "block" }}
            />
            <span
              style={{
                fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                fontSize: "0.78rem",
                letterSpacing: "0.08em",
                color: "rgba(255,255,255,0.7)",
                fontWeight: 500,
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              {logo.label}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Animation variants
───────────────────────────────────────────────────────────── */
const headerEnter: Variants = {
  hidden: { x: "-110vw", opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};

const bentoContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.08 } },
};

const bentoItem: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

/* ─────────────────────────────────────────────────────────────
   Card base — transparent green, crisp border, no fog.
───────────────────────────────────────────────────────────── */
const glass: CSSProperties = {
  background: "rgba(4, 18, 9, 0.55)",
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
  borderRadius: "1.5rem",
};

/* ─────────────────────────────────────────────────────────────
   AboutContent — rendered inside the rising panel.
───────────────────────────────────────────────────────────── */
function AboutContent({
  active,
  threadPathLength,
}: {
  active: boolean;
  threadPathLength: MotionValue<number>;
}) {
  return (
    <div style={{ position: "relative", height: "100%", zIndex: 0, color: "white" }}>

      {/* z-30: Thread — flat matte paint stroke */}
      <PurpleThread pathLengthMV={threadPathLength} />

      {/* z-40: Content — 70% centered column, white text root */}
      <div
        className="flex flex-col h-full py-10 sm:py-14"
        style={{
          position: "relative",
          zIndex: 40,
          maxWidth: "70%",
          marginInline: "auto",
          paddingInline: "clamp(0.5rem, 1.5vw, 1.5rem)",
          color: "white",
        }}
      >
        {/* ── HEADER ── */}
        <motion.h2
          variants={headerEnter}
          initial="hidden"
          animate={active ? "visible" : "hidden"}
          style={{
            fontFamily: "'Anton', 'Impact', sans-serif",
            fontSize: "clamp(2.6rem, 8.5vw, 7.5rem)",
            letterSpacing: "-0.025em",
            lineHeight: 0.9,
            color: "white",
            WebkitTextStroke: "1.5px rgba(255,255,255,0.9)",
            marginBottom: "clamp(1.2rem, 3vw, 2.2rem)",
            willChange: "transform, opacity",
            userSelect: "none",
          }}
        >
          ABOUT ❋ ME
        </motion.h2>

        {/* ── BENTO GRID ── */}
        <motion.div
          variants={bentoContainer}
          initial="hidden"
          animate={active ? "visible" : "hidden"}
          className="bento-responsive"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridTemplateRows: "1fr 1fr",
            gap: "clamp(0.7rem, 1.2vw, 1.2rem)",
            flex: 1,
            fontFamily: "'Space Grotesk', 'Inter', sans-serif",
            color: "white",
          }}
        >
          {/* 1. Left Pillar — Profile Image (col1 row1-2) */}
          <motion.div variants={bentoItem} style={{ gridColumn: "1 / 2", gridRow: "1 / 3", willChange: "transform, opacity" }}>
            <GlassCard
              style={{
                ...glass,
                height: "100%",
                aspectRatio: "3 / 4",
                padding: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                background: "linear-gradient(155deg, rgba(15,42,24,0.8) 0%, rgba(6,20,12,0.8) 100%)",
              }}
            >
              {/* Profile image */}
              <div
                className="profile-image-slot"
                style={{
                  width: "100%",
                  flex: 1,
                  borderRadius: "18px",
                  overflow: "hidden",
                  position: "relative",
                  zIndex: 3,
                }}
              >
                <img
                  src="/images/projects/mypicture.jpg"
                  alt="Shashank Singh"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "18px",
                    display: "block",
                  }}
                />
              </div>
            </GlassCard>
          </motion.div>

          {/* 2. Main Bio (col2-3 row1) */}
          <motion.div variants={bentoItem} style={{ gridColumn: "2 / 4", gridRow: "1 / 2", willChange: "transform, opacity" }}>
            <GlassCard style={{
              ...glass,
              height: "100%",
              padding: "clamp(1rem, 2vh, 1.5rem) clamp(1.2rem, 2vw, 1.8rem)",
              display: "flex",
              flexDirection: "column",
            }}>
              {/* Heading — scales with viewport, dominates the card */}
              <p style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(1.5rem, 2.8vw, 2.4rem)",
                fontWeight: 700,
                letterSpacing: "0.02em",
                marginBottom: "clamp(0.6rem, 1.5vh, 1rem)",
                color: "rgba(140,255,180,0.9)",
                lineHeight: 1.1,
              }}>
                Who I Am
              </p>
              {/* Body — flex:1 fills remaining vertical space */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: "clamp(0.4rem, 0.8vh, 0.6rem)" }}>
                <p style={{
                  fontSize: "clamp(0.88rem, 1.15vw, 1.08rem)",
                  lineHeight: 1.75,
                  color: "rgba(255,255,255,0.9)",
                }}>
                  A dedicated software developer with a passion for building scalable applications and solving complex problems. From concept to deployment, I bring discipline and precision to every line of code.
                </p>
                <p style={{
                  fontSize: "clamp(0.82rem, 1.05vw, 1rem)",
                  lineHeight: 1.75,
                  color: "rgba(255,255,255,0.55)",
                }}>
                  Specializing in full-stack development with React, Angular, Java, and modern web technologies.
                </p>
              </div>
            </GlassCard>
          </motion.div>

          {/* 3. Right Stats Pillar (col4 row1-2) */}
          <motion.div variants={bentoItem} style={{ gridColumn: "4 / 5", gridRow: "1 / 3", willChange: "transform, opacity" }}>
            <GlassCard style={{
              ...glass,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
              justifyContent: "space-evenly",
              padding: "clamp(1rem, 2vh, 1.5rem) clamp(0.8rem, 1.2vw, 1.4rem)",
            }}>
              {[
                { value: "7+", label: "Months Experience" },
                { value: "3+", label: "Projects Completed" },
                { value: "1K+", label: "Commits Pushed" },
              ].map((s, i, arr) => (
                <div key={s.label} style={{
                  /* Each row takes equal share of card height */
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: "clamp(0.5rem, 0.8vw, 0.9rem)",
                  /* Subtle divider between rows */
                  borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                }}>
                  {/* Number — scales relative to viewport, constrained to column */}
                  <div style={{
                    fontFamily: "'Anton', sans-serif",
                    fontSize: "clamp(2rem, 4.5vw, 3.8rem)",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                    color: "rgba(140,255,180,0.9)",
                    flexShrink: 0,
                    minWidth: "3.2ch",
                  }}>
                    {s.value}
                  </div>
                  {/* Label — em-relative to parent, no max-width */}
                  <div style={{
                    fontSize: "clamp(0.65rem, 0.9vw, 0.85rem)",
                    lineHeight: 1.35,
                    color: "rgba(255,255,255,0.6)",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    textAlign: "left",
                  }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </GlassCard>
          </motion.div>

          {/* 4. Role: Forward Deployment Engineer (col2 row2) */}
          <motion.div variants={bentoItem} style={{ gridColumn: "2 / 3", gridRow: "2 / 3", willChange: "transform, opacity" }}>
            <GlassCard style={{ ...glass, height: "100%", padding: "1.2rem 1.3rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", height: "100%", justifyContent: "center" }}>
                <div style={{
                  width: "1.9rem", height: "1.9rem",
                  borderRadius: "0.55rem",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.8rem",
                  background: "oklch(0.7 0.3 130 / 0.12)",
                  border: "1px solid oklch(0.7 0.3 130 / 0.25)",
                  color: "white",
                  flexShrink: 0,
                  marginBottom: "4px",
                }}>✦</div>
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "clamp(22px, 2vw, 30px)",
                  fontWeight: 700,
                  lineHeight: 1.2,
                  marginBottom: "10px",
                  color: "white",
                  letterSpacing: "0.02em",
                }}>
                  Forward Deployment Engineer
                </div>
                <div style={{
                  fontSize: "clamp(14px, 1vw, 16px)",
                  lineHeight: 1.6,
                  opacity: 0.75,
                  color: "rgba(255,255,255,0.85)",
                }}>
                  Bridges product, engineering, and customer needs to deliver production-ready solutions.<br />
                  Focused on rapid iteration, system reliability, and real-world deployment impact.
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* 5. Role: Full Stack Developer (col3 row2) */}
          <motion.div variants={bentoItem} style={{ gridColumn: "3 / 4", gridRow: "2 / 3", willChange: "transform, opacity" }}>
            <GlassCard style={{ ...glass, height: "100%", padding: "1.2rem 1.3rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", height: "100%", justifyContent: "center" }}>
                <div style={{
                  width: "1.9rem", height: "1.9rem",
                  borderRadius: "0.55rem",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.8rem",
                  background: "oklch(0.7 0.3 200 / 0.12)",
                  border: "1px solid oklch(0.7 0.3 200 / 0.25)",
                  color: "white",
                  flexShrink: 0,
                  marginBottom: "4px",
                }}>⟡</div>
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "clamp(22px, 2vw, 30px)",
                  fontWeight: 700,
                  lineHeight: 1.2,
                  marginBottom: "10px",
                  color: "white",
                  letterSpacing: "0.02em",
                }}>
                  Full Stack Developer
                </div>
                <div style={{
                  fontSize: "clamp(14px, 1vw, 16px)",
                  lineHeight: 1.6,
                  opacity: 0.75,
                  color: "rgba(255,255,255,0.85)",
                }}>
                  Builds scalable end-to-end applications across modern web stacks.<br />
                  Emphasizes performance, clean architecture, and maintainable systems.
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>

        {/* ── Bottom — Logo Marquee — full width, tight ── */}
        <div
          aria-label="Tech stack"
          style={{
            marginTop: "24px",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LogoMarquee />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SkillCard inner layout — all white text
───────────────────────────────────────────────────────────── */
function SkillCard({ emoji, title, hue, detail }: { emoji: string; title: string; hue: number; detail: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", height: "100%", justifyContent: "flex-start" }}>
      <div style={{
        width: "1.9rem", height: "1.9rem",
        borderRadius: "0.55rem",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "0.8rem",
        background: `oklch(0.7 0.3 ${hue} / 0.12)`,
        border: `1px solid oklch(0.7 0.3 ${hue} / 0.25)`,
        color: "white",
        flexShrink: 0,
      }}>
        {emoji}
      </div>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.78rem", fontWeight: 600, color: "white", letterSpacing: "0.02em" }}>
        {title}
      </div>
      <div style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.50)", lineHeight: 1.55 }}>
        {detail}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   AboutSection — public export
───────────────────────────────────────────────────────────── */
export function AboutSection() {
  const [dominant, setDominant] = useState(false);

  return (
    <CinematicTransition
      heroContent={<Hero />}
      aboutContent={(threadPathLength) => (
        <AboutContent active={dominant} threadPathLength={threadPathLength} />
      )}
      onAboutDominant={setDominant}
    />
  );
}

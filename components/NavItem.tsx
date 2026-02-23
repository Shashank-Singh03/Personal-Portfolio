"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export interface NavItemProps {
  name: string;
  href: string;
  isActive: boolean;
  onClick?: () => void;
}

const EASE_OUT = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

/*
  NavItem — distance-based magnetic drag.

  Motion model:
    normalizedX = clamp((cursorX - centerX) / (elemWidth  / 2), -1, 1)
    normalizedY = clamp((cursorY - centerY) / (elemHeight / 2), -1, 1)

    rawX = normalizedX × elemWidth  × 0.50   (50% width horizontal travel)
    rawY = normalizedY × elemHeight × 0.22   (22% height vertical travel)

  Spring feel: stiffness 200 / damping 20 / mass 0.7 → lagging, elastic.

  Lines are children of the same motion.a so they always translate together.
*/
export function NavItem({ name, href, isActive, onClick }: NavItemProps) {
  const linkRef     = useRef<HTMLAnchorElement>(null);
  const textRef     = useRef<HTMLSpanElement>(null);
  const rafId       = useRef<number>(0);
  const hovering    = useRef(false);
  const elemDims    = useRef({ w: 1, h: 1 });   // cached at hover-start

  const [linesVisible, setLinesVisible] = useState(false);
  const lineWidthMV = useMotionValue(56);

  /* Spring — stiffness/damping tuned for premium magnetic lag */
  const rawX    = useMotionValue(0);
  const rawY    = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 200, damping: 20, mass: 0.7 });
  const springY = useSpring(rawY, { stiffness: 200, damping: 20, mass: 0.7 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!hovering.current || !linkRef.current) return;
    cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      const rect = linkRef.current!.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;

      /* Normalize to [-1, 1] using live rect so resize-safe */
      const normX = Math.max(-1, Math.min(1, (e.clientX - cx) / (rect.width  / 2)));
      const normY = Math.max(-1, Math.min(1, (e.clientY - cy) / (rect.height / 2)));

      /* Scale by cached element dimensions measured at hover start */
      const { w, h } = elemDims.current;
      rawX.set(normX * w * 0.50);   /* 50% width  horizontal */
      rawY.set(normY * h * 0.22);   /* 22% height vertical   */
    });
  }, [rawX, rawY]);

  function onEnter() {
    hovering.current = true;
    setLinesVisible(true);

    /* Cache dimensions for scale math */
    if (linkRef.current) {
      const r = linkRef.current.getBoundingClientRect();
      elemDims.current = { w: r.width, h: r.height };
    }
    if (textRef.current) {
      lineWidthMV.set(textRef.current.offsetWidth * 0.5);
    }
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
  }

  function onLeave() {
    hovering.current = false;
    setLinesVisible(false);
    window.removeEventListener("mousemove", handleMouseMove);
    cancelAnimationFrame(rafId.current);
    /* Spring returns to (0,0) — no hard snap */
    rawX.set(0);
    rawY.set(0);
  }

  const lineAnimate = linesVisible
    ? { scaleX: 1, opacity: 1 }
    : { scaleX: 0, opacity: 0 };
  const lineTrans = { duration: 0.25, ease: EASE_OUT };

  return (
    <motion.a
      ref={linkRef as React.RefObject<HTMLAnchorElement>}
      href={href}
      onClick={onClick}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      aria-current={isActive ? "page" : undefined}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1.4rem",
        textDecoration: "none",
        userSelect: "none",
        cursor: "pointer",
        willChange: "transform",
        x: springX,
        y: springY,
      }}
    >
      {/* LEFT line — originX:1 grows leftward */}
      <motion.span
        aria-hidden="true"
        animate={lineAnimate}
        transition={lineTrans}
        style={{
          display: "block",
          width: lineWidthMV,
          height: "1.5px",
          borderRadius: "2px",
          background: "rgba(255,255,255,0.88)",
          flexShrink: 0,
          originX: 1,
        }}
      />

      {/* Text label */}
      <span
        ref={textRef}
        style={{
          fontFamily: "'Anton', 'Impact', sans-serif",
          fontSize: "clamp(2.8rem, 7.5vw, 6.5rem)",
          letterSpacing: "-0.02em",
          lineHeight: 0.95,
          color: linesVisible || isActive ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.42)",
          display: "block",
          flexShrink: 0,
          transition: "color 0.18s ease-out",
        }}
      >
        {name.toUpperCase()}
      </span>

      {/* RIGHT line — originX:0 grows rightward */}
      <motion.span
        aria-hidden="true"
        animate={lineAnimate}
        transition={lineTrans}
        style={{
          display: "block",
          width: lineWidthMV,
          height: "1.5px",
          borderRadius: "2px",
          background: "rgba(255,255,255,0.88)",
          flexShrink: 0,
          originX: 0,
        }}
      />
    </motion.a>
  );
}

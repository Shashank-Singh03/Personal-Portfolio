"use client";

import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useScrollContext } from "./ScrollContext";
import { sectionVariants } from "./variants";

/* ════════════════════════════════════════════
   AppShell — Full-page cinematic scroll engine
   ════════════════════════════════════════════ */
export function AppShell({ children }: { children: React.ReactNode }) {
  const sections = useMemo(() => React.Children.toArray(children), [children]);
  const total = sections.length;

  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [dir, setDir] = useState<"down" | "up">("down");
  const [animating, setAnimating] = useState(false);
  const [scanner, setScanner] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const touchY = useRef(0);
  const reducedMotion = useReducedMotion();

  /* Sync state to shared context so SideNav can read it */
  const { setScrollState } = useScrollContext();
  useEffect(() => {
    setScrollState(active, total);
  }, [active, total, setScrollState]);

  /* ─── Go to section ─── */
  const goTo = useCallback(
    (idx: number) => {
      if (animating || idx === active || idx < 0 || idx >= total) return;
      const d = idx > active ? "down" : "up";
      setAnimating(true);
      setDir(d);
      setPrev(active);

      if (!reducedMotion) {
        setTimeout(() => setScanner(true), 200);
        setTimeout(() => setScanner(false), 700);
      }
      setTimeout(() => setActive(idx), 300);
      setTimeout(() => {
        setPrev(null);
        setAnimating(false);
      }, 1100);
    },
    [active, animating, total, reducedMotion]
  );

  /* ─── Wheel ─── */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let lastTrigger = 0;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (animating) return;
      if (Math.abs(e.deltaY) < 30) return;
      const now = Date.now();
      if (now - lastTrigger < 800) return;
      lastTrigger = now;
      if (e.deltaY > 0) goTo(active + 1);
      else goTo(active - 1);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [active, animating, goTo]);

  /* ─── Touch ─── */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onStart = (e: TouchEvent) => {
      touchY.current = e.touches[0].clientY;
    };
    const onEnd = (e: TouchEvent) => {
      const diff = touchY.current - e.changedTouches[0].clientY;
      if (Math.abs(diff) < 60) return;
      if (diff > 0) goTo(active + 1);
      else goTo(active - 1);
    };

    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchend", onEnd);
    };
  }, [active, goTo]);

  /* ─── Keyboard ─── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        goTo(active + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        goTo(active - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, goTo]);

  /* ─── Variant resolver ─── */
  const getVariant = (i: number) => {
    if (i === active) return "active";
    if (i === prev) return dir === "down" ? "exitDown" : "exitUp";
    return i > active ? "hiddenBelow" : "hiddenAbove";
  };

  return (
    <div
      ref={containerRef}
      style={{
        height: "100vh",
        width: "100%",
        overflow: "hidden",
        position: "relative",
        perspective: "1200px",
        perspectiveOrigin: "50% 50%",
      }}
    >
      {sections.map((child, i) => {
        const isVisible = i === active || i === prev;
        return (
          <motion.div
            key={i}
            variants={sectionVariants}
            animate={getVariant(i)}
            initial={false}
            style={{
              position: "absolute",
              inset: 0,
              height: "100vh",
              transformStyle: "preserve-3d",
              transformOrigin: "50% 50%",
              overflow: "hidden",
              pointerEvents: i === active && !animating ? "auto" : "none",
              visibility: isVisible ? "visible" : "hidden",
            }}
          >
            {child}
          </motion.div>
        );
      })}

      {/* Scanner Line */}
      {scanner && (
        <motion.div
          initial={{ y: dir === "down" ? "-5vh" : "105vh" }}
          animate={{ y: dir === "down" ? "105vh" : "-5vh" }}
          transition={{ duration: 0.5, ease: "linear" }}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "2px",
            background:
              "linear-gradient(90deg, transparent 5%, oklch(0.65 0.25 290) 30%, oklch(0.75 0.3 290) 50%, oklch(0.65 0.25 290) 70%, transparent 95%)",
            boxShadow:
              "0 0 20px oklch(0.7 0.25 290 / 0.6), 0 0 60px oklch(0.7 0.25 290 / 0.2)",
            pointerEvents: "none",
            zIndex: 100,
          }}
        />
      )}

      {/* Section dots */}
      <div className="fixed left-5 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
        {sections.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to section ${i + 1}`}
            className={`
              w-2 h-2 rounded-full transition-all duration-300
              ${i === active ? "bg-primary scale-150" : "bg-foreground/20 hover:bg-foreground/40"}
            `}
          />
        ))}
      </div>
    </div>
  );
}

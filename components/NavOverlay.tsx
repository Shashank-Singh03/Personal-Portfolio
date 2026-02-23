"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence, useMotionValue, useSpring, type Variants } from "framer-motion";
import { X } from "lucide-react";
import { NavItem } from "./NavItem";

/* ─── Route map ────────────────────────────────────────────── */
const NAV_LINKS = [
  { name: "Home",       href: "/",           samePageId: "hero"  },
  { name: "About",      href: "/#about",     samePageId: "about" },
  { name: "Skills",     href: "/skills",     samePageId: null    },
  { name: "Projects",   href: "/projects",   samePageId: null    },
  { name: "Experience", href: "/experience", samePageId: null    },
  { name: "Contact",    href: "/contact",    samePageId: null    },
] as const;

/* ─── Social links ─────────────────────────────────────────── */
const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/shashank-kumar-singh-9856b1392/", external: true  },
  { label: "GitHub",   href: "https://github.com/Shashank-Singh03",                   external: true  },
  { label: "Contact",  href: "/contact",                                               external: false },
] as const;

const EASE_OUT = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

/*
  SocialLink — distance-based magnetic drag, scaled-down version.

  Max travel:
    horizontal: 25% of element width
    vertical:   13% of element height

  Weaker than main nav (50%/22%) to preserve visual hierarchy.
*/

function SocialLink({ label, href, external, onNavigate }: {
  label: string;
  href: string;
  external: boolean;
  onNavigate: () => void;
}) {
  const linkRef  = useRef<HTMLAnchorElement>(null);
  const rafId    = useRef<number>(0);
  const hovering = useRef(false);
  const elemDims = useRef({ w: 1, h: 1 });
  const [hovered, setHovered] = useState(false);

  const rawX    = useMotionValue(0);
  const rawY    = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 200, damping: 22, mass: 0.6 });
  const springY = useSpring(rawY, { stiffness: 200, damping: 22, mass: 0.6 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!hovering.current || !linkRef.current) return;
    cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      const rect = linkRef.current!.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      const normX = Math.max(-1, Math.min(1, (e.clientX - cx) / (rect.width  / 2)));
      const normY = Math.max(-1, Math.min(1, (e.clientY - cy) / (rect.height / 2)));
      const { w, h } = elemDims.current;
      rawX.set(normX * w * 0.25);   /* 25% width  */
      rawY.set(normY * h * 0.13);   /* 13% height */
    });
  }, [rawX, rawY]);

  function onEnter() {
    hovering.current = true;
    setHovered(true);
    if (linkRef.current) {
      const r = linkRef.current.getBoundingClientRect();
      elemDims.current = { w: r.width, h: r.height };
    }
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
  }

  function onLeave() {
    hovering.current = false;
    setHovered(false);
    window.removeEventListener("mousemove", handleMouseMove);
    cancelAnimationFrame(rafId.current);
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <motion.a
      ref={linkRef as React.RefObject<HTMLAnchorElement>}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onClick={(e) => {
        if (!external) {
          e.preventDefault();
          onNavigate();
        }
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        position: "relative",
        display: "inline-block",
        textDecoration: "none",
        cursor: "pointer",
        willChange: "transform",
        x: springX,
        y: springY,
      }}
    >
      <span
        style={{
          fontFamily: "'Anton', 'Impact', sans-serif",
          /* 3× from previous 0.68rem → 2.04rem, rounded up to 2.1rem */
          fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
          letterSpacing: "0.04em",
          color: hovered ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.6)",
          transition: "color 0.18s ease-out",
          display: "block",
          lineHeight: 1.05,
        }}
      >
        {label.toUpperCase()}
      </span>

      {/* Underline sweep — left to right, scaleX 0→1 */}
      <motion.span
        aria-hidden="true"
        animate={hovered ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 0.2, ease: EASE_OUT }}
        style={{
          position: "absolute",
          left: 0,
          bottom: "-2px",
          width: "100%",
          height: "1.5px",
          background: "rgba(255,255,255,0.85)",
          borderRadius: "2px",
          originX: 0, /* grows left → right */
        }}
      />
    </motion.a>
  );
}

/* ─── NavOverlay ────────────────────────────────────────────── */
interface NavOverlayProps {
  open: boolean;
  onClose: () => void;
}

export function NavOverlay({ open, onClose }: NavOverlayProps) {
  const pathname = usePathname();
  const router   = useRouter();

  /* Body scroll lock */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  /* ESC to close */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  /* Navigate and close — smooth scroll for same-page IDs */
  function navigate(href: string, samePageId: string | null) {
    onClose();
    if (samePageId && pathname === "/") {
      const el = document.getElementById(samePageId);
      if (el) { el.scrollIntoView({ behavior: "smooth" }); return; }
    }
    setTimeout(() => router.push(href), 120);
  }

  /* Variants */
  const easeIn = [0.55, 0, 1, 0.45] as [number, number, number, number];

  const overlayVariants: Variants = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.25, ease: EASE_OUT } },
    exit:    { opacity: 0, transition: { duration: 0.20, ease: easeIn  } },
  };

  const listVariants: Variants = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
    exit:    { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
  };

  const itemVariants: Variants = {
    hidden:  { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0,  transition: { duration: 0.28, ease: EASE_OUT } },
    exit:    { opacity: 0, y: -14, transition: { duration: 0.15, ease: easeIn  } },
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-label="Navigation menu"
          aria-modal="true"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            background: "#000",      /* solid black — matches site dark theme */
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* Faint depth wash */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(8,20,12,0.5) 0%, transparent 100%)",
              pointerEvents: "none",
            }}
          />

          {/* ── X Close button — top-right ── */}
          <button
            onClick={onClose}
            aria-label="Close navigation"
            style={{
              position: "absolute",
              top: "1.5rem",
              right: "1.5rem",
              width: "2.75rem",
              height: "2.75rem",
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 20,
              color: "rgba(255,255,255,0.65)",
              transition: "background 0.18s, color 0.18s",
            }}
            onMouseEnter={(e) => {
              const b = e.currentTarget;
              b.style.background = "rgba(255,255,255,0.1)";
              b.style.color = "rgba(255,255,255,1)";
            }}
            onMouseLeave={(e) => {
              const b = e.currentTarget;
              b.style.background = "rgba(255,255,255,0.05)";
              b.style.color = "rgba(255,255,255,0.65)";
            }}
          >
            <X style={{ width: "1.1rem", height: "1.1rem" }} />
          </button>

          {/* ── Centered nav stack ── */}
          <motion.nav
            variants={listVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            aria-label="Full screen navigation"
            style={{
              position: "relative",
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              /* Previous 1.25rem × 1.15 = ~1.44rem */
              gap: "clamp(0.5rem, 2.2vh, 1.45rem)",
            }}
          >
            {NAV_LINKS.map((link) => (
              <motion.div key={link.name} variants={itemVariants}>
                <NavItem
                  name={link.name}
                  href={link.href}
                  isActive={pathname === link.href}
                  onClick={() => navigate(link.href, link.samePageId ?? null)}
                />
              </motion.div>
            ))}
          </motion.nav>

          <div
            style={{
              position: "absolute",
              bottom: "clamp(36px, 5vh, 52px)",
              right: "clamp(36px, 4vw, 52px)",
              zIndex: 20,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "0.6rem",
            }}
          >
            {/* Subheading label — same size as links, lighter opacity */}
            <div
              style={{
                fontFamily: "'Anton', 'Impact', sans-serif",
                fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
                letterSpacing: "0.1em",
                color: "rgba(255,255,255,0.45)",
                lineHeight: 1,
              }}
            >
              Social Media
            </div>

            {/* Social links — horizontal row */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "2.4rem",       /* 38px at 16px base — consistent, no wrapping */
                flexWrap: "nowrap",
              }}
            >
              {SOCIAL_LINKS.map((sl) => (
                <SocialLink
                  key={sl.label}
                  label={sl.label}
                  href={sl.href}
                  external={sl.external}
                  onNavigate={() => {
                    onClose();
                    setTimeout(() => router.push(sl.href), 100);
                  }}
                />
              ))}
            </div>
          </div>

          {/* ── Branding whisper — bottom-left ── */}
          <div
            style={{
              position: "absolute",
              bottom: "clamp(36px, 5vh, 52px)",
              left: "clamp(36px, 4vw, 52px)",
              fontFamily: "'Space Grotesk', 'Inter', sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.16)",
              whiteSpace: "nowrap",
              zIndex: 10,
            }}
          >
            Shashank Singh · Portfolio
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

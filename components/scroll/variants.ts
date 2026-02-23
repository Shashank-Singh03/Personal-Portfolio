import type { Variants } from "framer-motion";

/* ─── Section tilt + exit/enter ─── */
export const sectionVariants: Variants = {
  active: {
    opacity: 1,
    scale: 1,
    rotateX: 0,
    y: 0,
    transition: { duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] },
  },
  exitDown: {
    opacity: 0,
    scale: 0.92,
    rotateX: 4,
    y: -40,
    transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] },
  },
  exitUp: {
    opacity: 0,
    scale: 0.92,
    rotateX: -4,
    y: 40,
    transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] },
  },
  hiddenBelow: {
    opacity: 0,
    scale: 1.04,
    rotateX: -2,
    y: 30,
    transition: { duration: 0 },
  },
  hiddenAbove: {
    opacity: 0,
    scale: 1.04,
    rotateX: 2,
    y: -30,
    transition: { duration: 0 },
  },
};

/* ─── Bento card stagger ─── */
export const bentoItemVariants: Variants = {
  hidden: { opacity: 0, y: 25, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: 0.15 + i * 0.1,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

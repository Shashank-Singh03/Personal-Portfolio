"use client";

/**
 * HeroTypographyBackground
 *
 * Large-block typographic poster composition. ~12 massive hollow words
 * deliberately positioned like an editorial poster layout.
 *
 * Strategy: Controlled absolute positioning with a hand-tuned layout map.
 * Words are placed in distinct zones to guarantee zero overlaps.
 * Center safe zone is kept lighter for the hero name to dominate.
 *
 * Font stack: Inter (grotesk), Oswald (condensed), Georgia (accent)
 * Size tiers: XXL (~12vw), XL (~8vw), L (~5vw)
 * DOM nodes: 12 total (extremely lightweight)
 */

type SizeTier = "xxl" | "xl" | "l";
type FontStyle = "grotesk" | "condensed" | "accent";

interface LayoutBlock {
  text: string;
  tier: SizeTier;
  font: FontStyle;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  rotate: boolean;
  hideOnMobile?: boolean;
}

/**
 * Layout map — each word occupies a distinct zone.
 *
 * Zone diagram (hero canvas):
 *
 *  ┌─── TYPESCRIPT (xxl) ────────┬── KAFKA (l,vert) ──┐
 *  │                             │                     │
 *  ├─── BACKEND (xl) ───────────┤                     │
 *  │                             │  PYTHON (xl,vert)  │
 *  │  FRONTEND (l,vert)   [ CENTER SAFE ZONE ]        │
 *  │                                                   │
 *  │  SCALABLE  (xl) ──────── DOCKER (l) ─────────────│
 *  │  システム (l)        MICROSERVICES (l)             │
 *  │                              FASTAPI (xl,vert)   │
 *  ├─── JAVA (xxl) ──────── AWS (l) ──────────────────┤
 *  └──────────────────────────────────────────────────┘
 */
const layoutItems: LayoutBlock[] = [
  // ─── TOP BAND ───
  {
    text: "TYPESCRIPT",
    tier: "xxl",
    font: "condensed",
    top: "1%",
    left: "-2%",
    rotate: false,
  },
  {
    text: "KAFKA",
    tier: "l",
    font: "accent",
    top: "1%",
    right: "1%",
    rotate: true,
    hideOnMobile: true,
  },

  // ─── LEFT COLUMN ───
  {
    text: "BACKEND",
    tier: "xl",
    font: "grotesk",
    top: "19%",
    left: "-1%",
    rotate: false,
  },
  {
    text: "FRONTEND",
    tier: "l",
    font: "condensed",
    top: "35%",
    left: "-1%",
    rotate: true,
    hideOnMobile: true,
  },

  // ─── RIGHT COLUMN ───
  {
    text: "PYTHON",
    tier: "xl",
    font: "grotesk",
    top: "22%",
    right: "-3%",
    rotate: true,
  },
  {
    text: "DOCKER",
    tier: "l",
    font: "accent",
    top: "55%",
    right: "2%",
    rotate: false,
  },

  // ─── LOWER BAND ───
  {
    text: "SCALABLE",
    tier: "xl",
    font: "condensed",
    top: "62%",
    left: "5%",
    rotate: false,
    hideOnMobile: true,
  },
  {
    text: "MICROSERVICES",
    tier: "l",
    font: "grotesk",
    top: "68%",
    right: "3%",
    rotate: false,
    hideOnMobile: true,
  },

  // ─── BOTTOM BAND ───
  {
    text: "JAVA",
    tier: "xxl",
    font: "condensed",
    bottom: "1%",
    left: "2%",
    rotate: false,
  },
  {
    text: "AWS",
    tier: "l",
    font: "grotesk",
    bottom: "12%",
    left: "42%",
    rotate: false,
  },
  {
    text: "FASTAPI",
    tier: "xl",
    font: "condensed",
    bottom: "1%",
    right: "3%",
    rotate: true,
  },

  // ─── ACCENT ───
  {
    text: "システム",
    tier: "l",
    font: "accent",
    top: "73%",
    left: "2%",
    rotate: false,
  },
];

const tierClass: Record<SizeTier, string> = {
  xxl: "poster-tier-xxl",
  xl: "poster-tier-xl",
  l: "poster-tier-l",
};

const fontClass: Record<FontStyle, string> = {
  grotesk: "poster-font-grotesk",
  condensed: "poster-font-condensed",
  accent: "poster-font-accent",
};

export function HeroTypographyBackground() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none select-none z-[1]"
      aria-hidden="true"
    >
      {layoutItems.map((item, i) => (
        <span
          key={i}
          className={`
            poster-word
            ${tierClass[item.tier]}
            ${fontClass[item.font]}
            ${item.rotate ? "poster-rotated" : ""}
            ${item.hideOnMobile ? "hidden md:block" : ""}
          `}
          style={{
            top: item.top,
            bottom: item.bottom,
            left: item.left,
            right: item.right,
          }}
        >
          {item.text}
        </span>
      ))}
    </div>
  );
}

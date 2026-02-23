"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * HeroSideNav
 * 
 * A minimal vertical navigation cluster positioned on the right side
 * of the hero section. Visible only on large screens (lg+).
 * Does NOT replace the global Nav — this is a hero-only affordance.
 */

const heroNavLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
] as const;

export function HeroSideNav() {
  const pathname = usePathname();

  return (
    <nav
      className="absolute right-6 xl:right-10 top-1/2 -translate-y-1/2 z-10 hidden lg:flex flex-col items-end gap-6"
      aria-label="Hero quick navigation"
    >
      {heroNavLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`
              text-xs tracking-[0.2em] uppercase transition-all duration-300
              hover:text-primary hover:tracking-[0.3em]
              ${isActive
                ? "text-primary font-medium"
                : "text-muted-foreground/60 font-light"
              }
            `}
          >
            <span className="flex items-center gap-3">
              <span
                className={`
                  block h-px transition-all duration-300
                  ${isActive ? "w-8 bg-primary" : "w-4 bg-muted-foreground/30 group-hover:w-6"}
                `}
              />
              {link.name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

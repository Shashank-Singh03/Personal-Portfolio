"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { NavOverlay } from "./NavOverlay";

const navigation = [
  { name: "Home",         href: "/" },
  { name: "About",        href: "/#about" },
  { name: "Skills",       href: "/skills" },
  { name: "Experience",   href: "/experience" },
  { name: "Projects",     href: "/projects" },
  { name: "Achievements", href: "/achievements" },
  { name: "Contact",      href: "/contact" },
] as const;

/* ════════════════════════════════════════════
   SideNav — collapses to FAB when scrolled past hero.
   FAB click → NavOverlay (full-screen green, animated)
   ════════════════════════════════════════════ */
export function SideNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* Collapse after scrolling past ~80vh */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* On non-home pages, always show FAB */
  const collapsed = pathname !== "/" || scrolled;

  return (
    <>
      {/* ─── Expanded side nav labels (hero, desktop only) ─── */}
      <nav
        className={`
          fixed right-6 xl:right-10 top-1/2 -translate-y-1/2 z-50
          hidden lg:flex flex-col items-end gap-6
          transition-all duration-500
          ${collapsed ? "opacity-0 pointer-events-none translate-x-4" : "opacity-100 translate-x-0"}
        `}
        aria-label="Main navigation"
      >
        {navigation.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className={`
              text-base tracking-[0.2em] uppercase transition-colors duration-300 font-light
              ${pathname === link.href ? "text-primary" : "text-foreground/40 hover:text-foreground/80"}
            `}
          >
            {link.name}
          </a>
        ))}
      </nav>

      {/* ─── FAB button — opens NavOverlay ─── */}
      <button
        onClick={() => setMenuOpen(true)}
        className={`
          fixed top-6 right-6 z-[150] w-12 h-12 rounded-full nav-fab
          flex items-center justify-center transition-all duration-500
          ${collapsed && !menuOpen ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"}
        `}
        aria-label="Open navigation"
      >
        <Menu className="w-5 h-5 text-foreground/80" />
      </button>

      {/* ─── Full-screen premium overlay ─── */}
      <NavOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

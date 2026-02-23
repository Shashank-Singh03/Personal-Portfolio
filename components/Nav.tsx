"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Home,
  User,
  Zap,
  Briefcase,
  Code,
  Trophy,
  Mail,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/about", icon: User },
  { name: "Skills", href: "/skills", icon: Zap },
  { name: "Experience", href: "/experience", icon: Briefcase },
  { name: "Projects", href: "/projects", icon: Code },
  { name: "Achievements", href: "/achievements", icon: Trophy },
  { name: "Contact", href: "/contact", icon: Mail },
];

export function Nav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);

  /* Hide navbar while hero section is in viewport */
  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) {
      setShowNav(true);
      return;
    }

    const handleScroll = () => {
      setShowNav(window.scrollY > hero.offsetHeight * 0.6);
    };

    handleScroll(); // initial check
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`
        sticky top-0 z-50 w-full border-b backdrop-blur
        transition-all duration-500
        ${
          showNav
            ? "bg-background/95 border-border supports-[backdrop-filter]:bg-background/60 opacity-100 translate-y-0"
            : "bg-transparent border-transparent opacity-0 -translate-y-4 pointer-events-none"
        }
      `}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <span className="text-sm font-bold">SS</span>
            </div>
            <span className="hidden font-bold sm:inline-block">
              Shashank Singh
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors
                    chalk-effect
                    ${
                      isActive
                        ? "text-primary active"
                        : "text-muted-foreground hover:text-foreground"
                    }
                  `}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 steel-plate">
              <SheetHeader>
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-4 mt-8">
                <div className="flex items-center space-x-2 px-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                    <span className="text-sm font-bold">SS</span>
                  </div>
                  <span className="font-bold">Shashank Singh</span>
                </div>

                <nav className="flex flex-col space-y-2 px-4">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`
                          flex items-center space-x-3 px-3 py-3 text-sm font-medium rounded-md transition-colors
                          ${
                            isActive
                              ? "bg-primary/10 text-primary border-l-2 border-primary"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                          }
                        `}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

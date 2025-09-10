import Link from "next/link";
import { Github, Linkedin, Code, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/Shashank-Singh03",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/shashanksingh",
    icon: Linkedin,
  },
  {
    name: "LeetCode",
    href: "https://leetcode.com/u/Shxshxnk_/",
    icon: Code,
  },
  {
    name: "Email",
    href: "shashankksingh09@gmail.com",
    icon: Mail,
  },
];

const quickLinks = [
  { name: "About", href: "/about" },
  { name: "Skills", href: "/skills" },
  { name: "Projects", href: "/projects" },
  { name: "Achievements", href: "/achievements" },
  { name: "Contact", href: "/contact" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <span className="text-sm font-bold">SS</span>
              </div>
              <span className="font-bold text-lg">Shashank Singh</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Full-stack software developer building powerful applications with 
              gym-level dedication and precision.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Get In Touch
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Ready to lift your project to the next level?</p>
              <Link
                href="/contact"
                className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors"
              >
                Spot me on your next project
              </Link>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Shashank Singh. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built with Next.js, TypeScript, and Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Github, FileText, Mail, Sparkles } from "lucide-react";
import Link from "next/link";
import { bentoItemVariants } from "./scroll/variants";

const bentoCards = [
  {
    title: "Resume",
    description: "Download my latest resume — a snapshot of my skills, experience, and what I bring to the table.",
    icon: FileText,
    href: "/resume.pdf",
    external: true,
    span: "row-span-2",
  },
  {
    title: "GitHub",
    description: "Explore my open-source work, side projects, and contributions.",
    icon: Github,
    href: "https://github.com/Shashank-Singh03",
    external: true,
    span: "col-span-2",
  },
  {
    title: "Get in Touch",
    description: "Have a project idea or want to collaborate? Let's talk.",
    icon: Mail,
    href: "/contact",
    external: false,
    span: "",
  },
  {
    title: "Interests",
    description: "UX design, public policy, distributed systems, and building tools that matter.",
    icon: Sparkles,
    href: "/about",
    external: false,
    span: "",
  },
] as const;

/* ════════════════════════════════════════════
   FinalBentoSection — Glass grid last screen
   ════════════════════════════════════════════ */
export function FinalBentoSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <section className="h-screen flex flex-col items-center justify-center px-4 sm:px-8 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 60%, oklch(0.14 0.04 130) 0%, oklch(0.07 0.01 130) 70%, oklch(0.05 0 0) 100%)",
        }}
      />

      {/* Content */}
      <div ref={ref} className="relative z-10 w-full max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs tracking-[0.4em] uppercase text-primary/60 text-center mb-3"
        >
          Connect
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-4xl font-light text-foreground/90 text-center mb-10 tracking-tight"
        >
          Let&apos;s Build Together
        </motion.h2>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[180px]">
          {bentoCards.map((card, i) => {
            const Icon = card.icon;
            const Wrapper = card.external ? "a" : Link;
            const extraProps = card.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {};

            return (
              <motion.div
                key={card.title}
                custom={i}
                variants={bentoItemVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className={`bento-card group ${card.span}`}
              >
                <Wrapper
                  href={card.href}
                  className="flex flex-col justify-between h-full p-6"
                  {...(extraProps as Record<string, string>)}
                >
                  <div>
                    <div className="p-2.5 bg-primary/10 rounded-xl w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {card.title}
                    </h3>
                    <p className="text-sm text-foreground/50 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                  <div className="text-primary/40 text-xs tracking-wider uppercase mt-3 group-hover:text-primary/70 transition-colors">
                    {card.external ? "Open ↗" : "View →"}
                  </div>
                </Wrapper>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  description?: string;
  className?: string;
  containerClassName?: string;
  id?: string;
  variant?: "default" | "alternate";
}

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export function Section({
  children,
  title,
  subtitle,
  description,
  className,
  containerClassName,
  id,
  variant = "default",
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 sm:py-24 relative",
        variant === "alternate" && "bg-card/30",
        className
      )}
    >
      <div className={cn("container mx-auto px-4 sm:px-6 lg:px-8", containerClassName)}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          {/* Section Header */}
          {(title || subtitle || description) && (
            <div className="max-w-3xl mx-auto text-center mb-16">
              {subtitle && (
                <motion.div variants={itemVariants}>
                  <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                    {subtitle}
                  </span>
                </motion.div>
              )}
              
              {title && (
                <motion.h2
                  variants={itemVariants}
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6"
                >
                  {title}
                </motion.h2>
              )}
              
              {description && (
                <motion.p
                  variants={itemVariants}
                  className="text-lg text-muted-foreground leading-relaxed"
                >
                  {description}
                </motion.p>
              )}
            </div>
          )}

          {/* Section Content */}
          <motion.div variants={itemVariants}>
            {children}
          </motion.div>
        </motion.div>
      </div>

      {/* Background Decoration */}
      {variant === "alternate" && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -right-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        </div>
      )}
    </section>
  );
}

// Predefined section variants for common use cases
export function HeroSection({ children, className, ...props }: Omit<SectionProps, "variant">) {
  return (
    <Section
      variant="default"
      className={cn("min-h-screen flex items-center", className)}
      {...props}
    >
      {children}
    </Section>
  );
}

export function ContentSection({ children, className, ...props }: Omit<SectionProps, "variant">) {
  return (
    <Section
      variant="default"
      className={cn("py-20", className)}
      {...props}
    >
      {children}
    </Section>
  );
}

export function AlternateSection({ children, className, ...props }: Omit<SectionProps, "variant">) {
  return (
    <Section
      variant="alternate"
      className={cn("py-20", className)}
      {...props}
    >
      {children}
    </Section>
  );
}

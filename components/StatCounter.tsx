"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface StatCounterProps {
  value: number;
  label: string;
  description?: string;
  prefix?: string;
  suffix?: string;
  duration?: number;
  delay?: number;
  className?: string;
  variant?: "default" | "large" | "compact";
}

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

function AnimatedNumber({ 
  value, 
  duration = 2, 
  prefix = "", 
  suffix = "" 
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, isInView, value]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.floor(latest)}${suffix}`;
      }
    });

    return unsubscribe;
  }, [springValue, prefix, suffix]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
}

const containerVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

const glowVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: [0, 0.5, 0],
    scale: [0.8, 1.2, 0.8],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
};

export function StatCounter({
  value,
  label,
  description,
  prefix = "",
  suffix = "",
  duration = 2,
  delay = 0,
  className,
  variant = "default",
}: StatCounterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  const sizeClasses = {
    compact: "p-4",
    default: "p-6",
    large: "p-8",
  };

  const textSizeClasses = {
    compact: {
      value: "text-2xl sm:text-3xl",
      label: "text-sm",
      description: "text-xs",
    },
    default: {
      value: "text-3xl sm:text-4xl lg:text-5xl",
      label: "text-sm sm:text-base",
      description: "text-xs sm:text-sm",
    },
    large: {
      value: "text-4xl sm:text-5xl lg:text-6xl",
      label: "text-base sm:text-lg",
      description: "text-sm",
    },
  };

  return (
    <motion.div
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay }}
      className={cn(
        "relative text-center steel-plate gym-shadow rounded-lg overflow-hidden group",
        sizeClasses[variant],
        className
      )}
    >
      {/* Background Glow Effect */}
      <motion.div
        variants={glowVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="absolute inset-0 bg-primary/5 rounded-lg"
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Animated Counter */}
        <motion.div
          className={cn(
            "font-bold text-primary mb-2 tabular-nums",
            textSizeClasses[variant].value
          )}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
          transition={{ 
            delay: delay + 0.3, 
            duration: 0.6, 
            ease: "easeOut" 
          }}
        >
          {isInView ? (
            <AnimatedNumber
              value={value}
              duration={duration}
              prefix={prefix}
              suffix={suffix}
            />
          ) : (
            `${prefix}0${suffix}`
          )}
        </motion.div>

        {/* Label */}
        <motion.div
          className={cn(
            "font-semibold text-foreground mb-1",
            textSizeClasses[variant].label
          )}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ 
            delay: delay + 0.5, 
            duration: 0.4, 
            ease: "easeOut" 
          }}
        >
          {label}
        </motion.div>

        {/* Description */}
        {description && (
          <motion.div
            className={cn(
              "text-muted-foreground leading-tight",
              textSizeClasses[variant].description
            )}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ 
              delay: delay + 0.7, 
              duration: 0.4, 
              ease: "easeOut" 
            }}
          >
            {description}
          </motion.div>
        )}
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
    </motion.div>
  );
}

// Predefined stat counter variants
interface StatsGridProps {
  stats: Array<{
    value: number;
    label: string;
    description?: string;
    prefix?: string;
    suffix?: string;
  }>;
  variant?: "default" | "large" | "compact";
  columns?: 2 | 3 | 4;
  className?: string;
}

export function StatsGrid({ 
  stats, 
  variant = "default", 
  columns = 4,
  className 
}: StatsGridProps) {
  const gridClasses = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={cn(
      "grid gap-4 sm:gap-6",
      gridClasses[columns],
      className
    )}>
      {stats.map((stat, index) => (
        <StatCounter
          key={`${stat.label}-${index}`}
          value={stat.value}
          label={stat.label}
          description={stat.description}
          prefix={stat.prefix}
          suffix={stat.suffix}
          delay={index * 0.1}
          variant={variant}
        />
      ))}
    </div>
  );
}

// Achievement-style counter with gym metaphors
interface AchievementCounterProps {
  value: number;
  label: string;
  achievement: string;
  icon?: React.ReactNode;
  className?: string;
}

export function AchievementCounter({
  value,
  label,
  achievement,
  icon,
  className,
}: AchievementCounterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, rotateY: -90 }}
      animate={isInView ? { opacity: 1, rotateY: 0 } : { opacity: 0, rotateY: -90 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        "relative p-6 steel-plate gym-shadow rounded-lg text-center group",
        "hover:scale-105 transition-all duration-300",
        className
      )}
    >
      {/* Icon */}
      {icon && (
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-primary/10 rounded-full text-primary">
            {icon}
          </div>
        </div>
      )}

      {/* Counter */}
      <div className="text-4xl font-bold text-primary mb-2">
        {isInView ? (
          <AnimatedNumber value={value} suffix="+" />
        ) : (
          "0+"
        )}
      </div>

      {/* Label */}
      <div className="font-semibold text-foreground mb-1">
        {label}
      </div>

      {/* Achievement */}
      <div className="text-sm text-muted-foreground">
        {achievement}
      </div>

      {/* Neon glow on hover */}
      <div className="absolute inset-0 rounded-lg bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}

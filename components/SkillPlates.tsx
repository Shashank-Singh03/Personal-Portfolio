"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { skillCategories, proficiencyLevels } from "@/content/skills";
import { type Skill } from "@/lib/validators";
import { cn } from "@/lib/utils";

interface SkillPlatesProps {
  skills: Skill[];
  showProgress?: boolean;
  variant?: "plates" | "cards" | "compact";
}

const plateVariants = {
  hidden: { opacity: 0, scale: 0.8, rotateY: -180 },
  visible: (index: number) => ({
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: {
      duration: 0.6,
      delay: index * 0.1,
      ease: "easeOut" as const,
    },
  }),
  hover: {
    scale: 1.05,
    rotateY: 5,
    transition: {
      duration: 0.2,
      ease: "easeOut" as const,
    },
  },
};

const progressVariants = {
  hidden: { width: 0 },
  visible: (level: number) => ({
    width: `${level}%`,
    transition: {
      duration: 1.5,
      delay: 0.5,
      ease: "easeOut" as const,
    },
  }),
};

function getPlateSizeClass(level: number): string {
  if (level >= 90) return "w-20 h-20 sm:w-24 sm:h-24"; // Expert - Large plate
  if (level >= 80) return "w-16 h-16 sm:w-20 sm:h-20"; // Advanced - Medium plate
  if (level >= 70) return "w-14 h-14 sm:w-16 sm:h-16"; // Intermediate - Small plate
  return "w-12 h-12 sm:w-14 sm:h-14"; // Beginner/Learning - Extra small plate
}

function getProficiencyInfo(level: number) {
  return proficiencyLevels.find(p => level >= p.min && level <= p.max) || proficiencyLevels[4];
}

function getCategoryColor(category: Skill["category"]): string {
  const categoryInfo = skillCategories.find(cat => cat.value === category);
  return categoryInfo?.color || "oklch(0.7 0.3 130)";
}

export function SkillPlates({ skills, showProgress = true, variant = "plates" }: SkillPlatesProps) {
  if (variant === "compact") {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            custom={index}
            variants={plateVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="steel-plate p-4 rounded-lg gym-shadow">
              <div className="text-sm font-medium mb-1">{skill.name}</div>
              <div className="text-xs text-muted-foreground mb-2">
                {getProficiencyInfo(skill.level).label}
              </div>
              {showProgress && (
                <Progress
                  value={skill.level}
                  className="h-1"
                  style={{
                    "--progress-background": getCategoryColor(skill.category),
                  } as React.CSSProperties}
                />
              )}
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (variant === "cards") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill, index) => {
          const proficiency = getProficiencyInfo(skill.level);
          return (
            <motion.div
              key={skill.name}
              custom={index}
              variants={plateVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
              className="steel-plate p-6 rounded-lg gym-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">{skill.name}</h3>
                <Badge
                  variant="secondary"
                  style={{
                    backgroundColor: `${getCategoryColor(skill.category)}20`,
                    color: getCategoryColor(skill.category),
                  }}
                >
                  {proficiency.label}
                </Badge>
              </div>
              
              {skill.description && (
                <p className="text-sm text-muted-foreground mb-4">
                  {skill.description}
                </p>
              )}
              
              {showProgress && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Proficiency</span>
                    <span className="text-primary font-medium">{skill.level}%</span>
                  </div>
                  <Progress
                    value={skill.level}
                    className="h-2"
                    style={{
                      "--progress-background": getCategoryColor(skill.category),
                    } as React.CSSProperties}
                  />
                </div>
              )}
              
              {skill.yearsOfExperience && (
                <div className="mt-4 text-xs text-muted-foreground">
                  {skill.yearsOfExperience} year{skill.yearsOfExperience !== 1 ? 's' : ''} experience
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    );
  }

  // Default plates variant - weight plate style
  return (
    <div className="flex flex-wrap justify-center items-end gap-4 sm:gap-6 lg:gap-8 min-h-[300px]">
      {skills.map((skill, index) => {
        const proficiency = getProficiencyInfo(skill.level);
        const plateSize = getPlateSizeClass(skill.level);
        
        return (
          <motion.div
            key={skill.name}
            custom={index}
            variants={plateVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true }}
            className="flex flex-col items-center group cursor-pointer"
          >
            {/* Weight Plate */}
            <div
              className={cn(
                "relative rounded-full steel-plate gym-shadow border-4 border-border",
                "flex items-center justify-center mb-3 transition-all duration-300",
                "group-hover:neon-border",
                plateSize
              )}
              style={{
                borderColor: getCategoryColor(skill.category),
                background: `linear-gradient(135deg, 
                  oklch(0.2 0 0) 0%, 
                  oklch(0.15 0 0) 50%, 
                  oklch(0.25 0 0) 100%)`,
              }}
            >
              {/* Inner circle with skill level */}
              <div className="text-center">
                <div className="text-xs sm:text-sm font-bold text-primary">
                  {skill.level}
                </div>
                <div className="text-xs text-muted-foreground">
                  {proficiency.label.slice(0, 3)}
                </div>
              </div>
              
              {/* Plate weight label */}
              <div 
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                style={{
                  backgroundColor: getCategoryColor(skill.category),
                  color: "oklch(0.1 0 0)",
                }}
              >
                {Math.floor(skill.level / 10)}
              </div>
            </div>
            
            {/* Skill Name */}
            <div className="text-center">
              <div className="font-medium text-sm group-hover:text-primary transition-colors">
                {skill.name}
              </div>
              <div className="text-xs text-muted-foreground">
                {skill.category.charAt(0).toUpperCase() + skill.category.slice(1)}
              </div>
            </div>
            
            {/* Progress Bar (optional) */}
            {showProgress && (
              <motion.div
                className="w-full max-w-[80px] mt-2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="h-1 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    custom={skill.level}
                    variants={progressVariants}
                    className="h-full rounded-full"
                    style={{
                      backgroundColor: getCategoryColor(skill.category),
                    }}
                  />
                </div>
              </motion.div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

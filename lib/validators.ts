import { z } from "zod";

// Site configuration schema
export const siteConfigSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  tagline: z.string().min(1, "Tagline is required"),
  description: z.string().min(1, "Description is required"),
  email: z.string().email("Valid email is required"),
  location: z.string().min(1, "Location is required"),
  social: z.object({
    github: z.string().url("Valid GitHub URL required"),
    linkedin: z.string().url("Valid LinkedIn URL required"),
    leetcode: z.string().url("Valid LeetCode URL required").optional(),
    website: z.string().url("Valid website URL required").optional(),
  }),
  seo: z.object({
    title: z.string().min(1, "SEO title is required"),
    description: z.string().min(1, "SEO description is required"),
    keywords: z.array(z.string()).min(1, "At least one keyword is required"),
    ogImage: z.string().optional(),
  }),
  theme: z.object({
    primaryColor: z.string().min(1, "Primary color is required"),
    accentColor: z.string().min(1, "Accent color is required"),
  }),
});

// Project schema
export const projectSchema = z.object({
  id: z.string().min(1, "Project ID is required"),
  title: z.string().min(1, "Project title is required"),
  description: z.string().min(1, "Project description is required"),
  summary: z.string().min(1, "Project summary is required"),
  image: z.string().optional(),
  technologies: z.array(z.string()).min(1, "At least one technology is required"),
  category: z.enum(["web", "mobile", "desktop", "api", "tool", "other"]),
  status: z.enum(["completed", "in-progress", "planned", "archived"]),
  featured: z.boolean().default(false),
  links: z.object({
    github: z.string().url("Valid GitHub URL required").optional(),
    live: z.string().url("Valid live URL required").optional(),
    demo: z.string().url("Valid demo URL required").optional(),
  }),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  highlights: z.array(z.string()).default([]),
  metrics: z.object({
    users: z.number().optional(),
    stars: z.number().optional(),
    downloads: z.number().optional(),
    performance: z.string().optional(),
  }).optional(),
});

// Skill schema
export const skillSchema = z.object({
  name: z.string().min(1, "Skill name is required"),
  category: z.enum(["frontend", "backend", "database", "devops", "tools", "soft"]),
  level: z.number().min(0).max(100, "Skill level must be between 0 and 100"),
  icon: z.string().optional(),
  description: z.string().optional(),
  yearsOfExperience: z.number().min(0).optional(),
});

// Achievement schema
export const achievementSchema = z.object({
  id: z.string().min(1, "Achievement ID is required"),
  title: z.string().min(1, "Achievement title is required"),
  description: z.string().min(1, "Achievement description is required"),
  date: z.string().min(1, "Achievement date is required"),
  category: z.enum(["certification", "award", "milestone", "contribution", "recognition"]),
  icon: z.string().optional(),
  link: z.string().url("Valid URL required").optional(),
  metric: z.object({
    value: z.string().min(1, "Metric value is required"),
    label: z.string().min(1, "Metric label is required"),
  }).optional(),
});

// Contact form schema
export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().email("Valid email is required"),
  subject: z.string().min(1, "Subject is required").max(200, "Subject must be less than 200 characters"),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000, "Message must be less than 1000 characters"),
});

// Calculator schemas
export const oneRMCalculatorSchema = z.object({
  weight: z.number().min(1, "Weight must be greater than 0").max(1000, "Weight must be less than 1000"),
  reps: z.number().int().min(1, "Reps must be at least 1").max(50, "Reps must be less than 50"),
});

export const bmiCalculatorSchema = z.object({
  weight: z.number().min(1, "Weight must be greater than 0").max(500, "Weight must be less than 500"),
  height: z.number().min(50, "Height must be at least 50cm").max(300, "Height must be less than 300cm"),
  unit: z.enum(["metric", "imperial"]).default("metric"),
});

// Experience schema
export const experienceSchema = z.object({
  id: z.string().min(1, "Experience ID is required"),
  company: z.string().min(1, "Company name is required"),
  role: z.string().min(1, "Role is required"),
  duration: z.string().min(1, "Duration is required"),
  location: z.string().min(1, "Location is required"),
  bullets: z.array(z.string()).min(1, "At least one bullet point is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
});

// Type exports
export type SiteConfig = z.infer<typeof siteConfigSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Skill = z.infer<typeof skillSchema>;
export type Achievement = z.infer<typeof achievementSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type ContactForm = z.infer<typeof contactFormSchema>;
export type OneRMCalculator = z.infer<typeof oneRMCalculatorSchema>;
export type BMICalculator = z.infer<typeof bmiCalculatorSchema>;

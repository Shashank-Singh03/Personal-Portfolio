import { siteConfigSchema, type SiteConfig } from "@/lib/validators";

const siteConfig: SiteConfig = {
  name: "Shashank Kumar Singh",
  role: "Software Developer",
  tagline: "Lifting Code, Shipping Gains",
  description: "Full-stack software developer with a passion for building scalable applications and solving complex problems. I approach coding with the same dedication and discipline as a serious athlete approaches their training.",
  email: "shankksinghwork@gmail.com",
  location: "India",
  social: {
    github: "https://github.com/Shashank-Singh03",
    linkedin: "https://www.linkedin.com/in/shashank-kumar-singh-9856b1392",
    leetcode: "https://leetcode.com/u/Shxshxnk_/",
    website: "https://shashanksingh.dev",
  },
  seo: {
    title: "Shashank Singh - Software Developer",
    description: "Full-stack software developer specializing in React, Angular, Java and modern web technologies. Building powerful applications with gym-level dedication.",
    keywords: [
      "software developer",
      "full-stack developer",
      "React developer",
      "Next.js developer",
      "TypeScript developer",
      "Angular Developer",
      "web development",
      "JavaScript",
      "Node.js",
      "Python",
      "Java",
    ],
    ogImage: "/images/og-image.jpg",
  },
  theme: {
    primaryColor: "oklch(0.7 0.3 130)", // Neon green
    accentColor: "oklch(0.7 0.3 200)",  // Neon blue
  },
};

// Validate the configuration at runtime
const validatedConfig = siteConfigSchema.parse(siteConfig);

export { validatedConfig as siteConfig };

// Additional site constants
export const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Skills", href: "/skills" },
  { name: "Projects", href: "/projects" },
  { name: "Achievements", href: "/achievements" },
  { name: "Contact", href: "/contact" },
] as const;

export const quickStats = [
  {
    label: "Months of Experience",
    value: "7+",
    description: "Building software solutions",
  },
  {
    label: "Projects Completed",
    value: "20+",
    description: "From concept to deployment",
  },
  {
    label: "Technologies Mastered",
    value: "10+",
    description: "Frontend, backend, and tools",
  },
  {
    label: "Code Commits",
    value: "1000+",
    description: "Consistent daily progress",
  },
] as const;

export const techStack = {
  frontend: [
    "React",
    "Angular",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
    "Vue.js",
  ],
  backend: [
    "Node.js",
    "Python",
    "Express.js",
    "FastAPI",
    "PostgreSQL",
    "MongoDB",
    "Java",
  ],
  tools: [
    "Git",
    "Docker",
    "AWS",
    "Vercel",
    "Figma",
    "VS Code",
  ],
  learning: [
    "Rust",
    "Go",
    "GraphQL",
    "Three.js",
  ],
} as const;

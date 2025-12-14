import { skillSchema, type Skill } from "@/lib/validators";

const skills: Skill[] = [
  // Frontend
  {
    name: "React",
    category: "frontend",
    level: 95,
    icon: "react",
    description: "Advanced React development with hooks, context, and performance optimization",
    
  },
  {
    name: "Angular",
    category: "frontend",
    level: 88,
    icon: "angular",
    description: "Enterprise-grade frontend framework for building scalable applications",
   
  },
  {
    name: "Next.js",
    category: "frontend",
    level: 90,
    icon: "nextjs",
    description: "Full-stack React framework with SSR, SSG, and API routes",
   
  },
  {
    name: "TypeScript",
    category: "frontend",
    level: 92,
    icon: "typescript",
    description: "Type-safe JavaScript development with advanced type patterns",
  
  },
  {
    name: "Tailwind CSS",
    category: "frontend",
    level: 92,
    icon: "tailwind",
    description: "Utility-first CSS framework for rapid UI development",
   
  },
  {
    name: "Vue.js",
    category: "frontend",
    level: 75,
    icon: "vue",
    description: "Progressive JavaScript framework with composition API",
   
  },
  {
    name: "PrimeNG",
    category: "frontend",
    level: 82,
    icon: "primeng",
    description: "Rich UI component library for Angular applications",
   
  },
  {
    name: "Framer Motion",
    category: "frontend",
    level: 80,
    icon: "framer",
    description: "Production-ready motion library for React",
   
  },

  // Backend
  {
    name: "Java",
    category: "backend",
    level: 90,
    icon: "java",
    description: "Enterprise-grade object-oriented programming for scalable backend systems",
    
  },
  {
    name: "Spring Boot",
    category: "backend",
    level: 85,
    icon: "spring",
    description: "Production-ready framework for building microservices with Java",
    
  },
  {
    name: "Node.js",
    category: "backend",
    level: 88,
    icon: "nodejs",
    description: "Server-side JavaScript runtime for scalable applications",
    
  },
  {
    name: "Python",
    category: "backend",
    level: 90,
    icon: "python",
    description: "Versatile programming language for distributed systems and APIs",
   
  },
  {
    name: "Express.js",
    category: "backend",
    level: 88,
    icon: "express",
    description: "Fast, unopinionated web framework for Node.js",
   
  },
  {
    name: "FastAPI",
    category: "backend",
    level: 92,
    icon: "fastapi",
    description: "Modern, high-performance web framework for building APIs with Python",
    
  },
  {
    name: "Socket.IO",
    category: "backend",
    level: 85,
    icon: "socketio",
    description: "Real-time bidirectional event-based communication library",
    
  },
  {
    name: "Kafka",
    category: "backend",
    level: 82,
    icon: "kafka",
    description: "Distributed event streaming platform for building real-time data pipelines",
    
  },

  // Database
  {
    name: "PostgreSQL",
    category: "database",
    level: 85,
    icon: "postgresql",
    description: "Advanced open-source relational database system",
   
  },
  {
    name: "MongoDB",
    category: "database",
    level: 75,
    icon: "mongodb",
    description: "NoSQL document database for modern applications",
    
  },
  {
    name: "Redis",
    category: "database",
    level: 88,
    icon: "redis",
    description: "In-memory data structure store for caching, queues, and rate limiting",
    
  },

  // DevOps
  {
    name: "Docker",
    category: "devops",
    level: 88,
    icon: "docker",
    description: "Containerization platform for consistent deployments",
    
  },
  {
    name: "AWS",
    category: "devops",
    level: 90,
    icon: "aws",
    description: "Cloud computing services including EC2, S3, and Lambda",
    
  },
  {
    name: "Nginx",
    category: "devops",
    level: 80,
    icon: "nginx",
    description: "High-performance web server and reverse proxy",
    
  },
  {
    name: "Vercel",
    category: "devops",
    level: 85,
    icon: "vercel",
    description: "Frontend deployment platform optimized for Next.js",
    
  },
  {
    name: "OpenTelemetry",
    category: "devops",
    level: 75,
    icon: "opentelemetry",
    description: "Observability framework for cloud-native software",
    
  },

  // Tools
  {
    name: "Git",
    category: "tools",
    level: 92,
    icon: "git",
    description: "Distributed version control system for code management",
    
  },
  {
    name: "VS Code",
    category: "tools",
    level: 95,
    icon: "vscode",
    description: "Powerful code editor with extensive customization",
   
  },
  {
    name: "Figma",
    category: "tools",
    level: 70,
    icon: "figma",
    description: "Collaborative design tool for UI/UX development",
    
  },
  {
    name: "Lua",
    category: "tools",
    level: 72,
    icon: "lua",
    description: "Lightweight scripting language for Redis and system automation",
    
  },

  // Soft Skills
  {
    name: "Problem Solving",
    category: "soft",
    level: 92,
    description: "Analytical thinking and systematic approach to complex challenges",
    
  },
  {
    name: "Team Collaboration",
    category: "soft",
    level: 88,
    description: "Effective communication and teamwork in agile environments",
    
  },
  {
    name: "Project Management",
    category: "soft",
    level: 80,
    description: "Planning, organizing, and delivering projects on time",
    
  },
];

// Validate all skills at runtime
const validatedSkills = skills.map((skill) => skillSchema.parse(skill));

export { validatedSkills as skills };

// Helper functions
export function getSkillsByCategory(category: Skill["category"]): Skill[] {
  return validatedSkills.filter((skill) => skill.category === category);
}

export function getTopSkills(limit: number = 10): Skill[] {
  return validatedSkills
    .sort((a, b) => b.level - a.level)
    .slice(0, limit);
}

export function getSkillByName(name: string): Skill | undefined {
  return validatedSkills.find((skill) => skill.name.toLowerCase() === name.toLowerCase());
}

// Skill categories for organization
export const skillCategories = [
  {
    name: "Frontend",
    value: "frontend",
    description: "User interface and experience technologies",
    color: "oklch(0.7 0.3 130)", // Neon green
  },
  {
    name: "Backend",
    value: "backend",
    description: "Server-side development and APIs",
    color: "oklch(0.7 0.3 200)", // Neon blue
  },
  {
    name: "Database",
    value: "database",
    description: "Data storage and management systems",
    color: "oklch(0.7 0.3 300)", // Neon pink
  },
  {
    name: "DevOps",
    value: "devops",
    description: "Deployment and infrastructure management",
    color: "oklch(0.7 0.3 40)", // Neon orange
  },
  {
    name: "Tools",
    value: "tools",
    description: "Development and productivity tools",
    color: "oklch(0.7 0.3 260)", // Neon purple
  },
  {
    name: "Soft Skills",
    value: "soft",
    description: "Communication and leadership abilities",
    color: "oklch(0.7 0.3 180)", // Neon cyan
  },
] as const;

// Proficiency levels
export const proficiencyLevels = [
  { min: 90, max: 100, label: "Expert", description: "Deep expertise and mentoring ability" },
  { min: 80, max: 89, label: "Advanced", description: "Highly proficient with complex projects" },
  { min: 70, max: 79, label: "Intermediate", description: "Comfortable with most tasks" },
  { min: 60, max: 69, label: "Beginner", description: "Basic understanding and usage" },
  { min: 0, max: 59, label: "Learning", description: "Currently developing skills" },
] as const;

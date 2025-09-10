import { projectSchema, type Project } from "@/lib/validators";

const projects: Project[] = [
  {
    id: "ecommerce-platform",
    title: "E-commerce Platform",
    description: "A full-stack e-commerce platform built with Next.js, featuring user authentication, product management, shopping cart, payment integration, and admin dashboard. Optimized for performance with server-side rendering and static generation.",
    summary: "Modern e-commerce solution with advanced features and excellent performance",
    image: "/images/projects/ecommerce.jpg",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Prisma",
      "PostgreSQL",
      "Stripe",
      "NextAuth.js",
    ],
    category: "web",
    status: "completed",
    featured: true,
    links: {
      github: "https://github.com/shashanksingh/ecommerce-platform",
      live: "https://ecommerce-demo.shashanksingh.dev",
      demo: "https://ecommerce-demo.shashanksingh.dev",
    },
    startDate: "2024-01-15",
    endDate: "2024-04-20",
    highlights: [
      "Implemented secure payment processing with Stripe",
      "Built responsive design with mobile-first approach",
      "Achieved 95+ Lighthouse performance score",
      "Integrated advanced search and filtering",
      "Created comprehensive admin dashboard",
    ],
    metrics: {
      users: 500,
      performance: "95+ Lighthouse score",
    },
  },
  {
    id: "task-management-app",
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates, drag-and-drop functionality, team collaboration features, and advanced project tracking. Built with React and Socket.io for real-time communication.",
    summary: "Collaborative productivity tool with real-time features",
    image: "/images/projects/taskmanager.jpg",
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "Socket.io",
      "MongoDB",
      "Express.js",
      "Tailwind CSS",
    ],
    category: "web",
    status: "completed",
    featured: true,
    links: {
      github: "https://github.com/shashanksingh/task-manager",
      live: "https://tasks.shashanksingh.dev",
    },
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    highlights: [
      "Real-time collaboration with Socket.io",
      "Drag-and-drop task management",
      "Advanced project analytics",
      "Team permission management",
      "Mobile-responsive design",
    ],
    metrics: {
      users: 200,
      stars: 45,
    },
  },
  {
    id: "ai-code-reviewer",
    title: "AI Code Reviewer",
    description: "An intelligent code review tool that uses machine learning to analyze code quality, suggest improvements, detect potential bugs, and ensure coding standards compliance. Integrates with popular version control systems.",
    summary: "ML-powered code analysis and review automation",
    image: "/images/projects/aireviewer.jpg",
    technologies: [
      "Python",
      "FastAPI",
      "TensorFlow",
      "React",
      "PostgreSQL",
      "Docker",
      "GitHub API",
    ],
    category: "tool",
    status: "in-progress",
    featured: true,
    links: {
      github: "https://github.com/shashanksingh/ai-code-reviewer",
    },
    startDate: "2024-06-01",
    highlights: [
      "Machine learning model for code analysis",
      "Integration with GitHub and GitLab",
      "Automated code quality scoring",
      "Custom rule configuration",
      "Detailed improvement suggestions",
    ],
    metrics: {
      stars: 120,
    },
  },
  {
    id: "weather-dashboard",
    title: "Weather Analytics Dashboard",
    description: "A comprehensive weather analytics dashboard with historical data visualization, weather predictions, and location-based insights. Features interactive charts, maps, and detailed weather metrics for multiple cities.",
    summary: "Advanced weather data visualization and analytics platform",
    image: "/images/projects/weather.jpg",
    technologies: [
      "Vue.js",
      "TypeScript",
      "D3.js",
      "Node.js",
      "Redis",
      "OpenWeather API",
      "Chart.js",
    ],
    category: "web",
    status: "completed",
    featured: false,
    links: {
      github: "https://github.com/shashanksingh/weather-dashboard",
      live: "https://weather.shashanksingh.dev",
    },
    startDate: "2023-05-20",
    endDate: "2023-08-10",
    highlights: [
      "Interactive weather data visualization",
      "Historical weather trend analysis",
      "Multi-city comparison features",
      "Responsive design for all devices",
      "Real-time weather updates",
    ],
    metrics: {
      users: 150,
      performance: "90+ Lighthouse score",
    },
  },
];

// Validate all projects at runtime
const validatedProjects = projects.map((project) => projectSchema.parse(project));

export { validatedProjects as projects };

// Helper functions
export function getFeaturedProjects(): Project[] {
  return validatedProjects.filter((project) => project.featured);
}

export function getProjectsByCategory(category: Project["category"]): Project[] {
  return validatedProjects.filter((project) => project.category === category);
}

export function getProjectsByStatus(status: Project["status"]): Project[] {
  return validatedProjects.filter((project) => project.status === status);
}

export function getProjectById(id: string): Project | undefined {
  return validatedProjects.find((project) => project.id === id);
}

// Project categories for filtering
export const projectCategories = [
  { value: "all", label: "All Projects" },
  { value: "web", label: "Web Applications" },
  { value: "mobile", label: "Mobile Apps" },
  { value: "desktop", label: "Desktop Applications" },
  { value: "api", label: "APIs & Services" },
  { value: "tool", label: "Developer Tools" },
  { value: "other", label: "Other" },
] as const;

// Technology tags for filtering
export const technologyTags = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "Vue.js",
  "Express.js",
  "PostgreSQL",
  "MongoDB",
  "Tailwind CSS",
  "FastAPI",
  "Docker",
  "AWS",
] as const;

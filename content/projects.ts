import { projectSchema, type Project } from "@/lib/validators";

const projects: Project[] = [
  {
    id: "distributed-task-queue",
    title: "Distributed Task Queue & Job Orchestrator",
    description: "Built a high-performance distributed task queue capable of processing 10,000+ jobs per minute using Redis Streams with consumer groups. Implemented at-least-once delivery, retries, dead-letter queue, and exponential backoff to maintain consistency during worker failures. Features a FastAPI control plane for scheduling, monitoring, and partitioning.",
    summary: "Scalable task queue with 10k+ jobs/min throughput and fault tolerance",
    image: "/images/projects/taskmanager.jpg",
    technologies: [
      "Python",
      "FastAPI",
      "Redis",
      "Docker",
      "Nginx",
      "AWS EC2",
    ],
    category: "api",
    status: "completed",
    featured: true,
    links: {
      github: "https://github.com/shashanksingh/distributed-task-queue",
    },
    startDate: "2025-01-01",
    endDate: "2025-03-15",
    highlights: [
      "Built distributed task queue capable of processing 10k+ jobs/min using Redis Streams + consumer groups; scaled horizontally under load",
      "Implemented at-least-once delivery, retries, dead-letter queue, and exponential backoff to maintain consistency during worker failures",
      "Designed FastAPI control plane for scheduling, monitoring, partitioning; reduced starvation + imbalance by ~45%",
      "Deployed on EC2 with Nginx + rolling updates for zero-downtime upgrades",
    ],
    metrics: {
      performance: "10k+ jobs/min, 45% reduced imbalance",
    },
  },
  {
    id: "api-gateway",
    title: "High-Throughput API Gateway & Distributed Rate Limiter",
    description: "Designed a high-performance API gateway handling 20,000+ requests per second with sub-120ms p99 latency across backend services. Developed distributed token-bucket rate limiting using Redis Lua scripts to reduce burst-based failures. Features OpenTelemetry tracing and structured logging for improved debugging.",
    summary: "API gateway with 20k+ req/sec and advanced rate limiting",
    image: "/images/projects/ecommerce.jpg",
    technologies: [
      "Python",
      "FastAPI",
      "Redis",
      "Docker",
      "Nginx",
      "AWS EC2",
      "OpenTelemetry",
    ],
    category: "api",
    status: "completed",
    featured: true,
    links: {
      github: "https://github.com/shashanksingh/api-gateway",
    },
    startDate: "2025-02-01",
    endDate: "2025-04-20",
    highlights: [
      "Designed gateway handling 20k+ req/sec with <120ms p99 latency across backend services",
      "Developed distributed token-bucket rate limiting using Redis Lua, reducing burst-based 5xx failures by ~65%",
      "Added tracing (OpenTelemetry) + structured logging, cutting debugging time by ~40%",
      "Optimized metadata lookups via caching + connection pooling, reducing p95 latency by 35%",
    ],
    metrics: {
      performance: "20k+ req/sec, <120ms p99, 65% reduced failures",
    },
  },
  {
    id: "event-driven-inventory",
    title: "Event-Driven Inventory Service (Kafka Microservice)",
    description: "Built an event-driven inventory microservice consuming Kafka topics with sub-150ms update latency. Implemented idempotent consumers and outbox pattern to ensure consistent writes under concurrency. Features snapshotting pipeline archiving deltas to S3 and autoscaling for handling traffic spikes.",
    summary: "Event-driven microservice with Kafka and sub-150ms latency",
    image: "/images/projects/taskmanager.jpg",
    technologies: [
      "Java",
      "Spring Boot",
      "Kafka",
      "PostgreSQL",
      "Docker",
      "AWS S3",
      "AWS EC2",
    ],
    category: "api",
    status: "completed",
    featured: true,
    links: {
      github: "https://github.com/shashanksingh/event-driven-inventory",
    },
    startDate: "2025-03-10",
    endDate: "2025-05-25",
    highlights: [
      "Built event-driven inventory microservice consuming Kafka topics with <150ms update latency",
      "Implemented idempotent consumers + outbox pattern ensuring consistent writes under concurrency",
      "Enabled snapshotting pipeline archiving deltas to S3, reducing DB load by ~50%",
      "Integrated autoscaling + health metrics to sustain performance during 15× traffic spikes",
    ],
    metrics: {
      performance: "<150ms latency, 50% reduced DB load",
    },
  },
  {
    id: "code-studio",
    title: "Code Studio - Cloud Based Online AI IDE",
    description: "Built a full-stack Cloud IDE using Node.js, React, Socket.IO, and Docker, enabling real-time code execution in the browser. Designed and deployed a scalable coding server and file system architecture, reducing code execution latency by 35%. Provides a collaborative coding environment with AI-powered suggestions.",
    summary: "Cloud-based IDE with real-time code execution and AI features",
    image: "/images/projects/aireviewer.jpg",
    technologies: [
      "React",
      "Node.js",
      "Socket.io",
      "Docker",
      "TypeScript",
      "Monaco Editor",
    ],
    category: "tool",
    status: "completed",
    featured: true,
    links: {
      github: "https://github.com/shashanksingh/code-studio",
      live: "https://code-studio.shashanksingh.dev",
    },
    startDate: "2025-04-01",
    endDate: "2025-04-30",
    highlights: [
      "Built a full-stack Cloud IDE using Node.js, React, Socket.IO & Docker, enabling real-time code execution",
      "Designed and deployed a scalable coding server and file system architecture, reducing code execution latency by 35%",
      "Integrated AI-powered code completion and suggestions",
      "Enabled collaborative coding with real-time synchronization",
    ],
    metrics: {
      performance: "35% reduced latency",
    },
  },
  {
    id: "pixel-fits",
    title: "Pixel Fits - AI Powered Fashion Agent",
    description: "Built an AI-driven fashion recommendation website using Angular, PrimeNG, and OpenWeather API, boosting user engagement by 40% through weather-based personalized clothing suggestions. Engineered an AI-powered fashion recommendation system integrating OpenAI API for contextual suggestions based on weather, events, and user preferences.",
    summary: "AI fashion agent with weather-based recommendations",
    image: "/images/projects/ecommerce.jpg",
    technologies: [
      "Angular",
      "PrimeNG",
      "OpenWeather API",
      "OpenAI API",
      "TypeScript",
      "Node.js",
    ],
    category: "web",
    status: "completed",
    featured: true,
    links: {
      github: "https://github.com/shashanksingh/pixel-fits",
      live: "https://pixel-fits.shashanksingh.dev",
    },
    startDate: "2025-09-01",
    endDate: "2025-09-30",
    highlights: [
      "Built an AI-driven fashion recommendation website using Angular, PrimeNG, and OpenWeather API, boosting user engagement by 40% through weather-based personalized clothing suggestions",
      "Engineered an AI-powered fashion recommendation system integrating OpenAI API for contextual suggestions, boosting engagement by 40%",
      "Implemented real-time weather-based outfit recommendations",
      "Created responsive UI with PrimeNG component library",
    ],
    metrics: {
      performance: "40% increased engagement",
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

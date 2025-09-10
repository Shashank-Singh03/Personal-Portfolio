import { achievementSchema, type Achievement } from "@/lib/validators";

const achievements: Achievement[] = [
  {
    id: "github-stars-milestone",
    title: "1000+ GitHub Stars",
    description: "Reached over 1000 stars across all open-source repositories, demonstrating community impact and code quality.",
    date: "2024-03-15",
    category: "milestone",
    icon: "star",
    metric: {
      value: "1000+",
      label: "GitHub Stars",
    },
  },
  {
    id: "aws-certified-developer",
    title: "AWS Cloud Practioner",
    description: "Validated foundational expertise in AWS cloud concepts, core services, security, and cost optimization to support scalable deployments.",
    date: "2024-12-29",
    category: "certification",
    icon: "aws",
    metric: {
      value: "Foundation",
      label: "AWS Certification",
    },
  },
  {
    id: "DSA Questions",
    title: "3 stars on leetcode",
    description: "Solved 500+ questions on leetcode.",
    date: "2024-11-10",
    category: "award",
    icon: "trophy",
    metric: {
      value: "500+",
      label: "LeetCode",
    },
  },
  {
    id: "open-source-contributions",
    title: "100+ Open Source Contributions",
    description: "Made over 100 meaningful contributions to various open-source projects, helping improve developer tools and libraries.",
    date: "2024-02-28",
    category: "contribution",
    icon: "git-branch",
    link: "https://github.com/Shashank-Singh03",
    metric: {
      value: "100+",
      label: "Contributions",
    },
  },
  {
    id: "mentorship-program",
    title: "Tech Mentorship Recognition",
    description: "Recognized for mentoring 10+ junior developers and contributing to their career growth in the tech industry.",
    date: "2023-12-05",
    category: "recognition",
    icon: "users",
    metric: {
      value: "10+",
      label: "Mentees",
    },
  },
  {
    id: "tech-conference-speaker",
    title: "Conference Speaker",
    description: "Delivered a technical presentation on 'Modern React Patterns' at a regional developer conference.",
    date: "2023-09-15",
    category: "recognition",
    icon: "mic",
    metric: {
      value: "200+",
      label: "Attendees",
    },
  },
  {
    id: "code-review-champion",
    title: "Code Review Champion",
    description: "Completed over 500 code reviews, helping maintain high code quality standards across team projects.",
    date: "2024-05-10",
    category: "milestone",
    icon: "search",
    metric: {
      value: "500+",
      label: "Code Reviews",
    },
  },
  {
    id: "Cloud Architect-certification",
    title: "Oracle Cloud Architect Certification",
    description: "Demonstrated proficiency in designing, implementing, and managing secure, high-performance cloud architectures on Oracle Cloud.",
    date: "2025-09-03",
    category: "certification",
    icon: "Cloud",
    metric: {
      value: "Expert",
      label: "Assosiate Level",
    },
  },
  {
    id: "project-delivery-record",
    title: "100% On-Time Delivery",
    description: "Maintained a perfect record of delivering all assigned projects on time and within scope over the past year.",
    date: "2024-06-01",
    category: "milestone",
    icon: "clock",
    metric: {
      value: "100%",
      label: "On-Time Delivery",
    },
  },
];

// Validate all achievements at runtime
const validatedAchievements = achievements.map((achievement) => achievementSchema.parse(achievement));

export { validatedAchievements as achievements };

// Helper functions
export function getAchievementsByCategory(category: Achievement["category"]): Achievement[] {
  return validatedAchievements.filter((achievement) => achievement.category === category);
}

export function getRecentAchievements(limit: number = 5): Achievement[] {
  return validatedAchievements
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

export function getAchievementById(id: string): Achievement | undefined {
  return validatedAchievements.find((achievement) => achievement.id === id);
}

export function getAchievementsByYear(year: number): Achievement[] {
  return validatedAchievements.filter((achievement) => 
    new Date(achievement.date).getFullYear() === year
  );
}

// Achievement categories for organization
export const achievementCategories = [
  {
    name: "Certifications",
    value: "certification",
    description: "Professional certifications and credentials",
    icon: "award",
    color: "oklch(0.7 0.3 130)", // Neon green
  },
  {
    name: "Awards",
    value: "award",
    description: "Competition wins and honors received",
    icon: "trophy",
    color: "oklch(0.7 0.3 40)", // Neon orange
  },
  {
    name: "Milestones",
    value: "milestone",
    description: "Significant career and project milestones",
    icon: "flag",
    color: "oklch(0.7 0.3 200)", // Neon blue
  },
  {
    name: "Contributions",
    value: "contribution",
    description: "Open source and community contributions",
    icon: "git-branch",
    color: "oklch(0.7 0.3 300)", // Neon pink
  },
  {
    name: "Recognition",
    value: "recognition",
    description: "Industry and peer recognition",
    icon: "star",
    color: "oklch(0.7 0.3 260)", // Neon purple
  },
] as const;

// Achievement statistics
export function getAchievementStats() {
  const total = validatedAchievements.length;
  const byCategory = achievementCategories.map(category => ({
    ...category,
    count: getAchievementsByCategory(category.value).length,
  }));
  
  const currentYear = new Date().getFullYear();
  const thisYear = getAchievementsByYear(currentYear).length;
  
  return {
    total,
    byCategory,
    thisYear,
  };
}

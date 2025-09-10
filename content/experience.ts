import { experienceSchema, type Experience } from "@/lib/validators";

const experiences: Experience[] = [
  {
    id: "oracle-intern",
    company: "Oracle",
    role: "Frontend & Cloud Engineer Intern",
    duration: "June 2025 – Present",
    location: "Bangalore, India",
    bullets: [
      "Developed responsive UI components in Angular 16+, enhancing performance for 10,000+ users",
      "Built reusable PrimeNG components, reducing code redundancy by 35%",
      "Deployed builds to AWS EC2 with SSL setup and automated workflows"
    ],
    startDate: "2025-06-01",
    current: true
  },
  {
    id: "woodman-intern",
    company: "Woodman Electronics",
    role: "Front End Engineer Intern",
    duration: "Nov 2024 – Jan 2025",
    location: "New Delhi, India",
    bullets: [
      "Developed and maintained 3 web applications, boosting engagement by 25%",
      "Collaborated with a 5-member dev team to roll out new features, increasing traffic by 15%"
    ],
    startDate: "2024-11-01",
    endDate: "2025-01-31",
    current: false
  }
];

// Validate all experiences at runtime
const validatedExperiences = experiences.map((experience) => experienceSchema.parse(experience));

export { validatedExperiences as experiences };

// Helper functions
export function getRecentExperiences(limit: number = 2): Experience[] {
  return validatedExperiences
    .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
    .slice(0, limit);
}

export function getExperienceById(id: string): Experience | undefined {
  return validatedExperiences.find((experience) => experience.id === id);
}

export function getCurrentExperience(): Experience | undefined {
  return validatedExperiences.find((experience) => experience.current);
}

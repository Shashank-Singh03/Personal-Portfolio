import { describe, it, expect } from "vitest";
import { siteConfig } from "@/content/site";
import { projects } from "@/content/projects";
import { skills } from "@/content/skills";
import { achievements } from "@/content/achievements";
import { experiences } from "@/content/experience";
import { 
  siteConfigSchema, 
  projectSchema, 
  skillSchema, 
  achievementSchema,
  experienceSchema
} from "@/lib/validators";

describe("Content Configuration", () => {
  describe("Site Configuration", () => {
    it("should have valid site configuration", () => {
      expect(() => siteConfigSchema.parse(siteConfig)).not.toThrow();
    });

    it("should have required fields", () => {
      expect(siteConfig.name).toBe("Shashank Singh");
      expect(siteConfig.role).toBe("Software Developer");
      expect(siteConfig.email).toContain("@");
      expect(siteConfig.social.github).toMatch(/^https:\/\/github\.com\//);
      expect(siteConfig.social.linkedin).toMatch(/^https:\/\/linkedin\.com\//);
    });

    it("should have valid SEO configuration", () => {
      expect(siteConfig.seo.title).toBeTruthy();
      expect(siteConfig.seo.description).toBeTruthy();
      expect(siteConfig.seo.keywords.length).toBeGreaterThan(0);
    });

    it("should have valid theme colors", () => {
      expect(siteConfig.theme.primaryColor).toMatch(/oklch\(/);
      expect(siteConfig.theme.accentColor).toMatch(/oklch\(/);
    });
  });

  describe("Projects Configuration", () => {
    it("should have valid projects array", () => {
      expect(projects).toBeInstanceOf(Array);
      expect(projects.length).toBeGreaterThan(0);
    });

    it("should validate all projects", () => {
      projects.forEach((project) => {
        expect(() => projectSchema.parse(project)).not.toThrow();
      });
    });

    it("should have at least one featured project", () => {
      const featuredProjects = projects.filter((p) => p.featured);
      expect(featuredProjects.length).toBeGreaterThan(0);
    });

    it("should have valid project categories", () => {
      const validCategories = ["web", "mobile", "desktop", "api", "tool", "other"];
      projects.forEach((project) => {
        expect(validCategories).toContain(project.category);
      });
    });

    it("should have valid project statuses", () => {
      const validStatuses = ["completed", "in-progress", "planned", "archived"];
      projects.forEach((project) => {
        expect(validStatuses).toContain(project.status);
      });
    });

    it("should have required technologies for each project", () => {
      projects.forEach((project) => {
        expect(project.technologies.length).toBeGreaterThan(0);
      });
    });
  });

  describe("Skills Configuration", () => {
    it("should have valid skills array", () => {
      expect(skills).toBeInstanceOf(Array);
      expect(skills.length).toBeGreaterThan(0);
    });

    it("should validate all skills", () => {
      skills.forEach((skill) => {
        expect(() => skillSchema.parse(skill)).not.toThrow();
      });
    });

    it("should have valid skill levels", () => {
      skills.forEach((skill) => {
        expect(skill.level).toBeGreaterThanOrEqual(0);
        expect(skill.level).toBeLessThanOrEqual(100);
      });
    });

    it("should have valid skill categories", () => {
      const validCategories = ["frontend", "backend", "database", "devops", "tools", "soft"];
      skills.forEach((skill) => {
        expect(validCategories).toContain(skill.category);
      });
    });

    it("should have skills in each category", () => {
      const categories = ["frontend", "backend", "database", "devops", "tools", "soft"];
      categories.forEach((category) => {
        const skillsInCategory = skills.filter((s) => s.category === category);
        expect(skillsInCategory.length).toBeGreaterThan(0);
      });
    });
  });

  describe("Achievements Configuration", () => {
    it("should have valid achievements array", () => {
      expect(achievements).toBeInstanceOf(Array);
      expect(achievements.length).toBeGreaterThan(0);
    });

    it("should validate all achievements", () => {
      achievements.forEach((achievement) => {
        expect(() => achievementSchema.parse(achievement)).not.toThrow();
      });
    });

    it("should have valid achievement categories", () => {
      const validCategories = ["certification", "award", "milestone", "contribution", "recognition"];
      achievements.forEach((achievement) => {
        expect(validCategories).toContain(achievement.category);
      });
    });

    it("should have valid dates", () => {
      achievements.forEach((achievement) => {
        const date = new Date(achievement.date);
        expect(date).toBeInstanceOf(Date);
        expect(date.getTime()).not.toBeNaN();
      });
    });

    it("should have unique achievement IDs", () => {
      const ids = achievements.map((a) => a.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  describe("Experience Configuration", () => {
    it("should have valid experiences array", () => {
      expect(experiences).toBeInstanceOf(Array);
      expect(experiences.length).toBeGreaterThan(0);
    });

    it("should validate all experiences", () => {
      experiences.forEach((experience) => {
        expect(() => experienceSchema.parse(experience)).not.toThrow();
      });
    });

    it("should have required fields for each experience", () => {
      experiences.forEach((experience) => {
        expect(experience.id).toBeTruthy();
        expect(experience.company).toBeTruthy();
        expect(experience.role).toBeTruthy();
        expect(experience.duration).toBeTruthy();
        expect(experience.location).toBeTruthy();
        expect(experience.bullets).toBeInstanceOf(Array);
        expect(experience.bullets.length).toBeGreaterThan(0);
        expect(experience.startDate).toBeTruthy();
        expect(typeof experience.current).toBe("boolean");
      });
    });

    it("should have unique experience IDs", () => {
      const ids = experiences.map((exp) => exp.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it("should have at least one current experience", () => {
      const currentExperiences = experiences.filter((exp) => exp.current);
      expect(currentExperiences.length).toBeGreaterThan(0);
    });
  });
});

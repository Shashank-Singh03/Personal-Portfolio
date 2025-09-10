import { describe, it, expect } from "vitest";
import { experiences, getRecentExperiences, getExperienceById, getCurrentExperience } from "@/content/experience";
import { experienceSchema } from "@/lib/validators";

describe("Experience Content", () => {
  describe("Experience Data Structure", () => {
    it("should have valid experiences array", () => {
      expect(experiences).toBeInstanceOf(Array);
      expect(experiences.length).toBeGreaterThan(0);
    });

    it("should validate all experiences against schema", () => {
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

    it("should have valid date formats", () => {
      experiences.forEach((experience) => {
        const startDate = new Date(experience.startDate);
        expect(startDate).toBeInstanceOf(Date);
        expect(startDate.getTime()).not.toBeNaN();
        
        if (experience.endDate) {
          const endDate = new Date(experience.endDate);
          expect(endDate).toBeInstanceOf(Date);
          expect(endDate.getTime()).not.toBeNaN();
        }
      });
    });

    it("should have at least one bullet point per experience", () => {
      experiences.forEach((experience) => {
        expect(experience.bullets.length).toBeGreaterThan(0);
        experience.bullets.forEach((bullet) => {
          expect(bullet).toBeTruthy();
          expect(typeof bullet).toBe("string");
        });
      });
    });
  });

  describe("Experience Helper Functions", () => {
    it("should return recent experiences in correct order", () => {
      const recent = getRecentExperiences(2);
      expect(recent).toBeInstanceOf(Array);
      expect(recent.length).toBeLessThanOrEqual(2);
      
      // Should be sorted by start date (most recent first)
      for (let i = 1; i < recent.length; i++) {
        const current = new Date(recent[i].startDate);
        const previous = new Date(recent[i - 1].startDate);
        expect(current.getTime()).toBeLessThanOrEqual(previous.getTime());
      }
    });

    it("should return experience by ID", () => {
      const firstExperience = experiences[0];
      const found = getExperienceById(firstExperience.id);
      expect(found).toBeDefined();
      expect(found?.id).toBe(firstExperience.id);
    });

    it("should return undefined for non-existent ID", () => {
      const found = getExperienceById("non-existent-id");
      expect(found).toBeUndefined();
    });

    it("should return current experience", () => {
      const current = getCurrentExperience();
      if (current) {
        expect(current.current).toBe(true);
      }
    });
  });

  describe("Experience Data Validation", () => {
    it("should have Oracle experience as current", () => {
      const oracle = experiences.find(exp => exp.company === "Oracle");
      expect(oracle).toBeDefined();
      expect(oracle?.current).toBe(true);
      expect(oracle?.role).toBe("Frontend & Cloud Engineer Intern");
      expect(oracle?.location).toBe("Bangalore, India");
    });

    it("should have Woodman Electronics experience as past", () => {
      const woodman = experiences.find(exp => exp.company === "Woodman Electronics");
      expect(woodman).toBeDefined();
      expect(woodman?.current).toBe(false);
      expect(woodman?.role).toBe("Front End Engineer Intern");
      expect(woodman?.location).toBe("New Delhi, India");
    });

    it("should have proper bullet points with achievements", () => {
      const oracle = experiences.find(exp => exp.company === "Oracle");
      expect(oracle?.bullets).toContain("Developed responsive UI components in Angular 16+, enhancing performance for 10,000+ users");
      expect(oracle?.bullets).toContain("Built reusable PrimeNG components, reducing code redundancy by 35%");
      expect(oracle?.bullets).toContain("Deployed builds to AWS EC2 with SSL setup and automated workflows");
    });

    it("should have proper duration formats", () => {
      experiences.forEach((experience) => {
        expect(experience.duration).toMatch(/\d{4}/); // Should contain year
        if (experience.current) {
          expect(experience.duration).toContain("Present");
        }
      });
    });
  });
});

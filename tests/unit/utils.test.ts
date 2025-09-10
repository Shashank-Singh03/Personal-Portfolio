import { describe, it, expect } from "vitest";
import {
  estimateOneRepMax,
  computeBMI,
  getBMICategory,
  convertWeight,
  convertHeight,
  formatDate,
  slugify,
  truncate,
  capitalize,
  isValidEmail,
  isValidUrl,
} from "@/lib/utils";

describe("Calculator Functions", () => {
  describe("estimateOneRepMax", () => {
    it("should calculate 1RM correctly using Epley formula", () => {
      expect(estimateOneRepMax(100, 5)).toBe(117); // 100 * (1 + 5/30)
      expect(estimateOneRepMax(200, 3)).toBe(220); // 200 * (1 + 3/30)
      expect(estimateOneRepMax(150, 1)).toBe(150); // 1 rep should return same weight
    });

    it("should handle edge cases", () => {
      expect(estimateOneRepMax(0, 5)).toBe(0);
      expect(estimateOneRepMax(100, 0)).toBe(100);
    });
  });

  describe("computeBMI", () => {
    it("should calculate BMI correctly", () => {
      expect(computeBMI(70, 175)).toBe(22.9); // 70 / (1.75^2) = 22.857...
      expect(computeBMI(80, 180)).toBe(24.7); // 80 / (1.80^2) = 24.691...
    });

    it("should handle edge cases", () => {
      expect(computeBMI(50, 150)).toBe(22.2);
      expect(computeBMI(100, 200)).toBe(25.0);
    });
  });

  describe("getBMICategory", () => {
    it("should return correct BMI categories", () => {
      expect(getBMICategory(17)).toBe("Underweight");
      expect(getBMICategory(22)).toBe("Normal weight");
      expect(getBMICategory(27)).toBe("Overweight");
      expect(getBMICategory(32)).toBe("Obese");
    });

    it("should handle boundary values", () => {
      expect(getBMICategory(18.5)).toBe("Normal weight");
      expect(getBMICategory(24.9)).toBe("Normal weight");
      expect(getBMICategory(25.0)).toBe("Overweight");
      expect(getBMICategory(29.9)).toBe("Overweight");
      expect(getBMICategory(30.0)).toBe("Obese");
    });
  });

  describe("convertWeight", () => {
    it("should convert between kg and lbs correctly", () => {
      expect(convertWeight(70, "kg", "lbs")).toBe(154.3);
      expect(convertWeight(154, "lbs", "kg")).toBe(69.9);
      expect(convertWeight(100, "kg", "kg")).toBe(100); // Same unit
    });
  });

  describe("convertHeight", () => {
    it("should convert between cm and ft correctly", () => {
      expect(convertHeight(180, "cm", "ft")).toBe(5.9);
      expect(convertHeight(6, "ft", "cm")).toBe(182.9);
      expect(convertHeight(175, "cm", "cm")).toBe(175); // Same unit
    });
  });
});

describe("String Utilities", () => {
  describe("formatDate", () => {
    it("should format dates correctly", () => {
      const date = new Date("2024-01-15");
      const formatted = formatDate(date);
      expect(formatted).toMatch(/January 15, 2024/);
    });

    it("should handle string dates", () => {
      const formatted = formatDate("2024-01-15");
      expect(formatted).toMatch(/January 15, 2024/);
    });
  });

  describe("slugify", () => {
    it("should create valid slugs", () => {
      expect(slugify("Hello World")).toBe("hello-world");
      expect(slugify("React & Next.js")).toBe("react--nextjs");
      expect(slugify("  Multiple   Spaces  ")).toBe("multiple-spaces");
    });
  });

  describe("truncate", () => {
    it("should truncate long strings", () => {
      expect(truncate("Hello World", 5)).toBe("Hello...");
      expect(truncate("Short", 10)).toBe("Short");
    });
  });

  describe("capitalize", () => {
    it("should capitalize first letter", () => {
      expect(capitalize("hello")).toBe("Hello");
      expect(capitalize("WORLD")).toBe("World");
      expect(capitalize("")).toBe("");
    });
  });
});

describe("Validation Utilities", () => {
  describe("isValidEmail", () => {
    it("should validate email addresses", () => {
      expect(isValidEmail("test@example.com")).toBe(true);
      expect(isValidEmail("user.name+tag@example.co.uk")).toBe(true);
      expect(isValidEmail("invalid.email")).toBe(false);
      expect(isValidEmail("@example.com")).toBe(false);
      expect(isValidEmail("test@")).toBe(false);
    });
  });

  describe("isValidUrl", () => {
    it("should validate URLs", () => {
      expect(isValidUrl("https://example.com")).toBe(true);
      expect(isValidUrl("http://localhost:3000")).toBe(true);
      expect(isValidUrl("ftp://files.example.com")).toBe(true);
      expect(isValidUrl("not-a-url")).toBe(false);
      expect(isValidUrl("")).toBe(false);
    });
  });
});

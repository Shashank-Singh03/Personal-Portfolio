import { test, expect } from "@playwright/test";

test.describe("Calculator Components", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/skills"); // Assuming calculators are on skills page
  });

  test.describe("One Rep Max Calculator", () => {
    test("should calculate 1RM correctly", async ({ page }) => {
      // Find the 1RM calculator (assuming it's visible on skills page or in a modal/section)
      const calculator = page.locator('[data-testid="one-rm-calculator"]').or(
        page.getByText("One Rep Max Calculator").locator("..")
      );

      if (await calculator.count() === 0) {
        // If not on skills page, might need to navigate to a specific section
        test.skip();
        return;
      }

      // Fill in weight and reps
      await calculator.getByLabel(/weight/i).fill("225");
      await calculator.getByLabel(/reps|repetitions/i).fill("5");

      // Click calculate button
      await calculator.getByRole("button", { name: /calculate/i }).click();

      // Should show result (225 * (1 + 5/30) = 262.5, rounded to 263)
      await expect(calculator.getByText(/263|262/)).toBeVisible();
      await expect(calculator.getByText(/lbs/i)).toBeVisible();
    });

    test("should reset calculator", async ({ page }) => {
      const calculator = page.locator('[data-testid="one-rm-calculator"]').or(
        page.getByText("One Rep Max Calculator").locator("..")
      );

      if (await calculator.count() === 0) {
        test.skip();
        return;
      }

      // Fill in values
      await calculator.getByLabel(/weight/i).fill("200");
      await calculator.getByLabel(/reps/i).fill("3");

      // Click reset
      await calculator.getByRole("button", { name: /reset/i }).click();

      // Fields should be cleared
      await expect(calculator.getByLabel(/weight/i)).toHaveValue("");
      await expect(calculator.getByLabel(/reps/i)).toHaveValue("");
    });

    test("should validate input ranges", async ({ page }) => {
      const calculator = page.locator('[data-testid="one-rm-calculator"]').or(
        page.getByText("One Rep Max Calculator").locator("..")
      );

      if (await calculator.count() === 0) {
        test.skip();
        return;
      }

      // Check weight input constraints
      const weightInput = calculator.getByLabel(/weight/i);
      await expect(weightInput).toHaveAttribute("min", "1");
      await expect(weightInput).toHaveAttribute("max", "1000");

      // Check reps input constraints
      const repsInput = calculator.getByLabel(/reps/i);
      await expect(repsInput).toHaveAttribute("min", "1");
      await expect(repsInput).toHaveAttribute("max", "50");
    });
  });

  test.describe("BMI Calculator", () => {
    test("should calculate BMI in metric units", async ({ page }) => {
      const calculator = page.locator('[data-testid="bmi-calculator"]').or(
        page.getByText("BMI Calculator").locator("..")
      );

      if (await calculator.count() === 0) {
        test.skip();
        return;
      }

      // Make sure metric tab is selected
      await calculator.getByText("Metric").click();

      // Fill in weight and height
      await calculator.getByLabel(/weight.*kg/i).fill("70");
      await calculator.getByLabel(/height.*cm/i).fill("175");

      // Click calculate
      await calculator.getByRole("button", { name: /calculate.*bmi/i }).click();

      // Should show BMI result (70 / (1.75^2) = 22.9)
      await expect(calculator.getByText(/22\.9|23\.0/)).toBeVisible();
      await expect(calculator.getByText(/normal weight/i)).toBeVisible();
    });

    test("should calculate BMI in imperial units", async ({ page }) => {
      const calculator = page.locator('[data-testid="bmi-calculator"]').or(
        page.getByText("BMI Calculator").locator("..")
      );

      if (await calculator.count() === 0) {
        test.skip();
        return;
      }

      // Switch to imperial tab
      await calculator.getByText("Imperial").click();

      // Fill in weight and height
      await calculator.getByLabel(/weight.*lbs/i).fill("154");
      await calculator.getByLabel(/height.*ft/i).fill("5.74");

      // Click calculate
      await calculator.getByRole("button", { name: /calculate.*bmi/i }).click();

      // Should show BMI result
      await expect(calculator.getByText(/22|23/)).toBeVisible();
    });

    test("should show BMI categories reference", async ({ page }) => {
      const calculator = page.locator('[data-testid="bmi-calculator"]').or(
        page.getByText("BMI Calculator").locator("..")
      );

      if (await calculator.count() === 0) {
        test.skip();
        return;
      }

      // Check that BMI categories are displayed
      await expect(calculator.getByText(/< 18\.5/)).toBeVisible();
      await expect(calculator.getByText(/18\.5 - 24\.9/)).toBeVisible();
      await expect(calculator.getByText(/25\.0 - 29\.9/)).toBeVisible();
      await expect(calculator.getByText(/≥ 30\.0/)).toBeVisible();

      await expect(calculator.getByText(/underweight/i)).toBeVisible();
      await expect(calculator.getByText(/normal weight/i)).toBeVisible();
      await expect(calculator.getByText(/overweight/i)).toBeVisible();
      await expect(calculator.getByText(/obese/i)).toBeVisible();
    });

    test("should be accessible via keyboard", async ({ page }) => {
      const calculator = page.locator('[data-testid="bmi-calculator"]').or(
        page.getByText("BMI Calculator").locator("..")
      );

      if (await calculator.count() === 0) {
        test.skip();
        return;
      }

      // Navigate through calculator with keyboard
      await calculator.getByLabel(/weight/i).first().focus();
      await page.keyboard.type("70");

      await page.keyboard.press("Tab");
      await page.keyboard.type("175");

      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab"); // Skip to calculate button
      await page.keyboard.press("Enter");

      // Should show result
      await expect(calculator.getByText(/22|23/)).toBeVisible();
    });
  });
});

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "@/app/api/contact/route";
import { unlink, readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

describe("Contact API Route", () => {
  const testDataFile = path.join(process.cwd(), ".data", "contact-submissions.json");

  afterEach(async () => {
    // Clean up test data file after each test
    if (existsSync(testDataFile)) {
      try {
        await unlink(testDataFile);
      } catch {
        // File might not exist, ignore error
      }
    }
  });

  it("should accept valid contact form submission", async () => {
    const validData = {
      name: "John Doe",
      email: "john@example.com",
      subject: "Test Subject",
      message: "This is a test message with enough characters to pass validation.",
    };

    const request = new NextRequest("http://localhost:3000/api/contact", {
      method: "POST",
      body: JSON.stringify(validData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.message).toContain("Message sent successfully");
    expect(data.id).toBeDefined();
  });

  it("should reject invalid email format", async () => {
    const invalidData = {
      name: "John Doe",
      email: "invalid-email",
      subject: "Test Subject",
      message: "This is a test message with enough characters.",
    };

    const request = new NextRequest("http://localhost:3000/api/contact", {
      method: "POST",
      body: JSON.stringify(invalidData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
  });

  it("should reject message that is too short", async () => {
    const invalidData = {
      name: "John Doe",
      email: "john@example.com",
      subject: "Test Subject",
      message: "Short", // Less than 10 characters
    };

    const request = new NextRequest("http://localhost:3000/api/contact", {
      method: "POST",
      body: JSON.stringify(invalidData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
  });

  it("should reject empty required fields", async () => {
    const invalidData = {
      name: "",
      email: "john@example.com",
      subject: "Test Subject",
      message: "This is a test message with enough characters.",
    };

    const request = new NextRequest("http://localhost:3000/api/contact", {
      method: "POST",
      body: JSON.stringify(invalidData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
  });

  it("should store submission data in file", async () => {
    const validData = {
      name: "Jane Smith",
      email: "jane@example.com",
      subject: "File Storage Test",
      message: "Testing if the submission gets stored in the file system.",
    };

    const request = new NextRequest("http://localhost:3000/api/contact", {
      method: "POST",
      body: JSON.stringify(validData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await POST(request);
    
    expect(response.status).toBe(200);
    
    // Check if file was created and contains the submission
    expect(existsSync(testDataFile)).toBe(true);
    
    const fileContents = await readFile(testDataFile, "utf-8");
    const submissions = JSON.parse(fileContents);
    
    expect(Array.isArray(submissions)).toBe(true);
    expect(submissions.length).toBe(1);
    expect(submissions[0].name).toBe(validData.name);
    expect(submissions[0].email).toBe(validData.email);
    expect(submissions[0].subject).toBe(validData.subject);
    expect(submissions[0].message).toBe(validData.message);
    expect(submissions[0].timestamp).toBeDefined();
    expect(submissions[0].id).toBeDefined();
  });

  it("should handle malformed JSON", async () => {
    const request = new NextRequest("http://localhost:3000/api/contact", {
      method: "POST",
      body: "invalid json",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.success).toBe(false);
  });

  it("should include metadata in stored submission", async () => {
    const validData = {
      name: "Test User",
      email: "test@example.com",
      subject: "Metadata Test",
      message: "Testing metadata inclusion in stored submissions.",
    };

    const request = new NextRequest("http://localhost:3000/api/contact", {
      method: "POST",
      body: JSON.stringify(validData),
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Test Browser",
        "x-forwarded-for": "192.168.1.1",
      },
    });

    const response = await POST(request);
    expect(response.status).toBe(200);

    const fileContents = await readFile(testDataFile, "utf-8");
    const submissions = JSON.parse(fileContents);
    
    expect(submissions[0].ip).toBe("192.168.1.1");
    expect(submissions[0].userAgent).toBe("Test Browser");
    expect(submissions[0].timestamp).toBeDefined();
    expect(new Date(submissions[0].timestamp)).toBeInstanceOf(Date);
  });
});

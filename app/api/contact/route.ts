import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validators";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    
    // Validate with Zod schema
    const validatedData = contactFormSchema.parse(body);
    
    // Create timestamp
    const timestamp = new Date().toISOString();
    
    // Create submission object
    const submission = {
      ...validatedData,
      timestamp,
      id: `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ip: request.headers.get("x-forwarded-for") || 
          request.headers.get("x-real-ip") || 
          "unknown",
      userAgent: request.headers.get("user-agent") || "unknown",
    };
    
    // Ensure .data directory exists
    const dataDir = join(process.cwd(), ".data");
    if (!existsSync(dataDir)) {
      await mkdir(dataDir, { recursive: true });
    }
    
    // Write to file (append to existing or create new)
    const filePath = join(dataDir, "contact-submissions.json");
    let submissions = [];
    
    try {
      // Try to read existing submissions
      const { readFile } = await import("fs/promises");
      const existingData = await readFile(filePath, "utf-8");
      submissions = JSON.parse(existingData);
    } catch {
      // File doesn't exist or is invalid, start with empty array
      submissions = [];
    }
    
    // Add new submission
    submissions.push(submission);
    
    // Keep only last 1000 submissions to prevent file from getting too large
    if (submissions.length > 1000) {
      submissions = submissions.slice(-1000);
    }
    
    // Write updated submissions back to file
    await writeFile(filePath, JSON.stringify(submissions, null, 2));
    
    // Log to server console
    console.log(`New contact submission from ${validatedData.name} (${validatedData.email})`);
    console.log(`Subject: ${validatedData.subject}`);
    console.log(`Message: ${validatedData.message.substring(0, 100)}...`);
    console.log(`Timestamp: ${timestamp}`);
    console.log("---");
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: "Message sent successfully! I'll get back to you soon.",
      id: submission.id,
    });
    
  } catch (error) {
    console.error("Contact form error:", error);
    
    // Handle validation errors
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        {
          success: false,
          message: "Please check your form data and try again.",
          errors: error.message,
        },
        { status: 400 }
      );
    }
    
    // Handle other errors
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again later.",
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { message: "Method not allowed" },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { message: "Method not allowed" },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { message: "Method not allowed" },
    { status: 405 }
  );
}

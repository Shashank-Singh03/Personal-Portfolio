import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validators";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import { Resend } from "resend";
import { siteConfig } from "@/content/site";

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
    
    // Send email via Resend
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY not found, skipping email send");
    } else {
      try {
        await resend.emails.send({
          from: "Portfolio Contact Form <onboarding@resend.dev>",
          to: [siteConfig.email],
          subject: `New Contact Form Submission: ${validatedData.subject}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333; border-bottom: 2px solid #39ff14; padding-bottom: 10px;">
                New Contact Form Submission
              </h2>
              
              <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #333; margin-top: 0;">Contact Details</h3>
                <p><strong>Name:</strong> ${validatedData.name}</p>
                <p><strong>Email:</strong> <a href="mailto:${validatedData.email}">${validatedData.email}</a></p>
                <p><strong>Subject:</strong> ${validatedData.subject}</p>
                <p><strong>Submitted:</strong> ${new Date(timestamp).toLocaleString()}</p>
              </div>
              
              <div style="background: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                <h3 style="color: #333; margin-top: 0;">Message</h3>
                <p style="white-space: pre-wrap; line-height: 1.6;">${validatedData.message}</p>
              </div>
              
              <div style="margin-top: 20px; padding: 15px; background: #e8f5e8; border-radius: 8px; border-left: 4px solid #39ff14;">
                <p style="margin: 0; color: #333;">
                  <strong>Quick Reply:</strong> 
                  <a href="mailto:${validatedData.email}?subject=Re: ${validatedData.subject}" 
                     style="color: #39ff14; text-decoration: none;">
                    Click here to reply directly
                  </a>
                </p>
              </div>
              
              <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
              <p style="color: #666; font-size: 12px; text-align: center;">
                This email was sent from your portfolio contact form at ${new Date().toLocaleString()}
              </p>
            </div>
          `,
        });
        
        console.log(`Email sent successfully to ${siteConfig.email}`);
      } catch (emailError) {
        console.error("Failed to send email:", emailError);
        // Don't fail the entire request if email fails, just log it
      }
    }
    
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

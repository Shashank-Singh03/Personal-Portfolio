"use client";

import { useState } from "react";
import { Section, AlternateSection } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  Github, 
  Linkedin, 
  Code,
  MessageCircle,
  Calendar
} from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import { contactFormSchema } from "@/lib/validators";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form data
      const validatedData = contactFormSchema.parse(formData);
      
      // Submit to API
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData),
      });

      if (response.ok) {
        toast.success("Message sent successfully! I'll get back to you soon.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || "Failed to send message. Please try again.");
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <>
      {/* Hero Section */}
      <Section
        title="Let's Work Together"
        subtitle="Get In Touch"
        description="Ready to spot me on your next project? Let's discuss how we can build something amazing together."
        className="pt-32"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="steel-plate gym-shadow border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-primary" />
                Send a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What's this about?"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell me about your project, ideas, or just say hello!"
                    rows={6}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground/20 border-t-primary-foreground rounded-full animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <Card className="steel-plate gym-shadow border-border/50">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Email</div>
                    <Link 
                      href={`mailto:${siteConfig.email}`}
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      {siteConfig.email}
                    </Link>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Location</div>
                    <div className="text-sm text-muted-foreground">
                      {siteConfig.location}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Clock className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Response Time</div>
                    <div className="text-sm text-muted-foreground">
                      Usually within 24 hours
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="steel-plate gym-shadow border-border/50">
              <CardHeader>
                <CardTitle>Connect With Me</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <Github className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-medium">GitHub</div>
                    <div className="text-sm text-muted-foreground">
                      Check out my code
                    </div>
                  </div>
                </Link>
                
                <Link
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <Linkedin className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-medium">LinkedIn</div>
                    <div className="text-sm text-muted-foreground">
                      Professional network
                    </div>
                  </div>
                </Link>
                
                {siteConfig.social.leetcode && (
                  <Link
                    href={siteConfig.social.leetcode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <Code className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium">LeetCode</div>
                      <div className="text-sm text-muted-foreground">
                        View my solutions
                      </div>
                    </div>
                  </Link>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="steel-plate gym-shadow border-border/50">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/projects">
                    <Calendar className="w-4 h-4 mr-2" />
                    View My Work
                  </Link>
                </Button>
                
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link 
                    href="https://calendar.app.google/LgGsCYMHhMbrRNnF7"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule a Call
                  </Link>
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="w-4 h-4 mr-2" />
                  Download Resume
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      {/* FAQ Section */}
      <AlternateSection
        title="Frequently Asked Questions"
        subtitle="Common Questions"
        description="Quick answers to questions I often receive from potential collaborators"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              question: "What's your typical project timeline?",
              answer: "Project timelines vary based on scope and complexity. Simple websites typically take 2-4 weeks, while complex applications can take 2-6 months. I always provide detailed estimates upfront."
            },
            {
              question: "Do you work with remote teams?",
              answer: "Absolutely! I have extensive experience working with distributed teams and am comfortable with various collaboration tools and methodologies."
            },
            {
              question: "What technologies do you specialize in?",
              answer: "I specialize in modern web technologies including React, Next.js, TypeScript, Node.js, and various databases. I'm always learning new technologies to stay current."
            },
            {
              question: "Do you provide ongoing support?",
              answer: "Yes, I offer maintenance and support packages for all projects. This includes bug fixes, updates, and feature enhancements as needed."
            },
            {
              question: "What's your development process?",
              answer: "I follow agile methodologies with regular check-ins, code reviews, and testing. Communication is key - you'll always know the project status."
            },
            {
              question: "Can you help with existing projects?",
              answer: "Definitely! I can help optimize, debug, add features, or completely refactor existing codebases. I'm experienced with legacy system modernization."
            }
          ].map((faq, index) => (
            <Card key={index} className="steel-plate gym-shadow border-border/50">
              <CardHeader>
                <CardTitle className="text-base">{faq.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </AlternateSection>
    </>
  );
}

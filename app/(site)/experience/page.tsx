"use client";

import { Section, AlternateSection } from "@/components/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  MapPin, 
  Calendar, 
  Dumbbell,
  ArrowRight,
  Briefcase,
  TrendingUp,
  Users
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { experiences } from "@/content/experience";

// Metadata is handled by the layout

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

// Removed unused hoverVariants

export default function Experience() {
  const currentExperience = experiences.find(exp => exp.current);
  const pastExperiences = experiences.filter(exp => !exp.current);

  return (
    <>
      {/* Hero Section */}
      <Section
        title="Professional Journey"
        subtitle="Experience"
        description="A timeline of my professional growth, showcasing real-world impact and continuous learning in the tech industry"
        className="pt-32"
      >
        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="steel-plate gym-shadow text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">{experiences.length}</div>
              <div className="text-sm text-muted-foreground">Total Roles</div>
            </CardContent>
          </Card>
          
          <Card className="steel-plate gym-shadow text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">
                {currentExperience ? "1" : "0"}
              </div>
              <div className="text-sm text-muted-foreground">Current Role</div>
            </CardContent>
          </Card>
          
          <Card className="steel-plate gym-shadow text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">
                {experiences.reduce((acc, exp) => acc + exp.bullets.length, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Key Achievements</div>
            </CardContent>
          </Card>
          
          <Card className="steel-plate gym-shadow text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">2+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Current Experience */}
      {currentExperience && (
        <AlternateSection
          title="Current Role"
          subtitle="Active Position"
          description="My current professional engagement and ongoing contributions"
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={cardVariants}
          >
            <Card className="steel-plate gym-shadow border-primary/20 hover:border-primary/40 transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <Building2 className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl font-bold">{currentExperience.company}</CardTitle>
                        <p className="text-primary font-medium">{currentExperience.role}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{currentExperience.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{currentExperience.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                    Current
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3">
                  {currentExperience.bullets.map((bullet, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </AlternateSection>
      )}

      {/* Past Experiences */}
      <Section
        title="Professional History"
        subtitle="Previous Roles"
        description="A comprehensive look at my career progression and the impact I've made at each organization"
      >
        <div className="space-y-8">
          {pastExperiences.map((experience) => (
            <motion.div
              key={experience.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={cardVariants}
              whileHover="hover"
            >
              <Card className="steel-plate gym-shadow border-border/50 hover:border-primary/30 transition-all duration-300 group cursor-pointer">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-muted/50 rounded-lg group-hover:bg-primary/10 transition-colors">
                          <Building2 className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <div>
                          <CardTitle className="text-xl font-bold">{experience.company}</CardTitle>
                          <p className="text-muted-foreground font-medium">{experience.role}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{experience.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{experience.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="hidden group-hover:block">
                      <Dumbbell className="w-6 h-6 text-primary/60" />
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3">
                    {experience.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-muted-foreground/60 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm leading-relaxed text-muted-foreground">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Career Philosophy */}
      <AlternateSection
        title="Career Philosophy"
        subtitle="Professional Growth"
        description="The principles that guide my professional development and approach to work"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="steel-plate gym-shadow border-border/50">
            <CardHeader>
              <div className="p-3 bg-primary/10 rounded-lg w-fit mb-2">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Continuous Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Every role is an opportunity to learn, grow, and contribute meaningfully. 
                I approach each position with curiosity and a commitment to excellence.
              </p>
            </CardContent>
          </Card>

          <Card className="steel-plate gym-shadow border-border/50">
            <CardHeader>
              <div className="p-3 bg-primary/10 rounded-lg w-fit mb-2">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Collaborative Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Success is measured not just by individual achievements, but by the positive 
                impact on teams, users, and the broader community.
              </p>
            </CardContent>
          </Card>

          <Card className="steel-plate gym-shadow border-border/50">
            <CardHeader>
              <div className="p-3 bg-primary/10 rounded-lg w-fit mb-2">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Results-Driven</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                I focus on delivering measurable results and creating value through 
                innovative solutions and efficient execution.
              </p>
            </CardContent>
          </Card>
        </div>
      </AlternateSection>

      {/* CTA Section */}
      <Section
        title="Ready to Work Together?"
        description="Let's discuss how my experience and skills can contribute to your next project"
        className="text-center"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <Button asChild size="lg" className="group flex-1">
            <Link href="/contact">
              <Briefcase className="mr-2 h-4 w-4" />
              Start a Project
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg" className="flex-1">
            <Link href="/projects">
              View My Work
            </Link>
          </Button>
        </div>
      </Section>
    </>
  );
}

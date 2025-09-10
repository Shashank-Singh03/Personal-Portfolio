import { Hero } from "@/components/Hero";
import { Section, AlternateSection } from "@/components/Section";
import { StatsGrid } from "@/components/StatCounter";
import { ProjectCard } from "@/components/ProjectCard";
import { SkillPlates } from "@/components/SkillPlates";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Zap, Trophy, Briefcase, Building2, MapPin, Calendar } from "lucide-react";
import Link from "next/link";
import { siteConfig, quickStats } from "@/content/site";
import { getFeaturedProjects } from "@/content/projects";
import { getTopSkills } from "@/content/skills";
import { getRecentAchievements } from "@/content/achievements";
import { getRecentExperiences } from "@/content/experience";
import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata({
  title: "Home",
  description: `${siteConfig.tagline} - ${siteConfig.description}`,
  keywords: ["portfolio", "software developer", "full-stack"],
});

export default function Home() {
  const featuredProjects = getFeaturedProjects().slice(0, 3);
  const topSkills = getTopSkills(8);
  const recentAchievements = getRecentAchievements(3);
  const recentExperiences = getRecentExperiences(2);

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Quick Stats */}
      <Section
        title="Performance Metrics"
        subtitle="Current Stats"
        description="Real numbers that showcase consistent progress and dedication to excellence"
        variant="default"
      >
        <StatsGrid 
          stats={quickStats.map(stat => ({
            value: parseInt(stat.value.replace(/\D/g, '')) || 0,
            label: stat.label,
            description: stat.description,
            suffix: stat.value.includes('+') ? '+' : '',
          }))}
          variant="default"
          columns={4}
        />
      </Section>

      {/* Featured Projects */}
      <AlternateSection
        title="Featured Work"
        subtitle="Projects"
        description="A selection of projects that demonstrate technical expertise and problem-solving capabilities"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
          {featuredProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              variant="default"
              showMetrics={true}
            />
          ))}
        </div>
        
        <div className="text-center">
          <Button asChild size="lg" className="group">
            <Link href="/projects">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </AlternateSection>

      {/* Top Skills */}
      <Section
        title="Technical Arsenal"
        subtitle="Skills"
        description="Technologies and tools mastered through continuous learning and practical application"
      >
        <SkillPlates 
          skills={topSkills} 
          variant="plates" 
          showProgress={true}
        />
        
        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg" className="group">
            <Link href="/skills">
              <Zap className="mr-2 h-4 w-4" />
              Explore All Skills
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </Section>

      {/* Recent Experience */}
      <Section
        title="Professional Journey"
        subtitle="Experience"
        description="Recent professional roles and key contributions that showcase real-world impact"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {recentExperiences.map((experience) => (
            <div 
              key={experience.id}
              className="steel-plate p-6 rounded-lg gym-shadow hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Building2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{experience.company}</h3>
                    <p className="text-primary font-medium">{experience.role}</p>
                  </div>
                </div>
                {experience.current && (
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                    Current
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{experience.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{experience.location}</span>
                </div>
              </div>
              
              <ul className="space-y-2">
                {experience.bullets.slice(0, 2).map((bullet, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Button asChild variant="outline" size="lg" className="group">
            <Link href="/experience">
              <Briefcase className="mr-2 h-4 w-4" />
              View Full Experience
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </Section>

      {/* Recent Achievements */}
      <AlternateSection
        title="Latest Achievements"
        subtitle="Milestones"
        description="Recent accomplishments and recognition in the software development community"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {recentAchievements.map((achievement) => (
            <div 
              key={achievement.id}
              className="steel-plate p-6 rounded-lg gym-shadow text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Trophy className="w-6 h-6 text-primary" />
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-2">{achievement.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {achievement.description}
              </p>
              {achievement.metric && (
                <div className="text-2xl font-bold text-primary">
                  {achievement.metric.value}
                  <span className="text-sm text-muted-foreground ml-1">
                    {achievement.metric.label}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Button asChild variant="outline" size="lg" className="group">
            <Link href="/achievements">
              <Trophy className="mr-2 h-4 w-4" />
              View All Achievements
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </AlternateSection>

      {/* Call to Action */}
      <Section
        title="Ready to Build Something Amazing?"
        description="Let's discuss how we can work together to bring your next project to life with the same dedication and precision."
        className="text-center"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <Button asChild size="lg" className="group flex-1">
            <Link href="/contact">
              <Code className="mr-2 h-4 w-4" />
              Start a Project
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg" className="flex-1">
            <Link href="/about">
              Learn More About Me
            </Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
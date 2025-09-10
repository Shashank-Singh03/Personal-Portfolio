import { Section, AlternateSection } from "@/components/Section";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectsClient } from "@/components/ProjectsClient";
import { Button } from "@/components/ui/button";
import { 
  ExternalLink,
  Github,
  Star
} from "lucide-react";
import { projects } from "@/content/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata.projects();

export default function Projects() {
  const projectStats = {
    total: projects.length,
    completed: projects.filter(p => p.status === "completed").length,
    featured: projects.filter(p => p.featured).length,
    technologies: Array.from(new Set(projects.flatMap(p => p.technologies))).length,
  };

  return (
    <>
      {/* Hero Section */}
      <Section
        title="Project Portfolio"
        subtitle="Featured Work"
        description="A collection of projects showcasing technical expertise, problem-solving skills, and commitment to quality"
        className="pt-32"
      >
        {/* Project Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="steel-plate gym-shadow p-6 text-center rounded-lg">
            <div className="text-3xl font-bold text-primary mb-2">{projectStats.total}</div>
            <div className="text-sm text-muted-foreground">Total Projects</div>
          </div>
          
          <div className="steel-plate gym-shadow p-6 text-center rounded-lg">
            <div className="text-3xl font-bold text-primary mb-2">{projectStats.completed}</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </div>
          
          <div className="steel-plate gym-shadow p-6 text-center rounded-lg">
            <div className="text-3xl font-bold text-primary mb-2">{projectStats.featured}</div>
            <div className="text-sm text-muted-foreground">Featured</div>
          </div>
          
          <div className="steel-plate gym-shadow p-6 text-center rounded-lg">
            <div className="text-3xl font-bold text-primary mb-2">{projectStats.technologies}</div>
            <div className="text-sm text-muted-foreground">Technologies</div>
          </div>
        </div>
      </Section>

      {/* Filters and Search */}
      <AlternateSection className="py-12">
        <ProjectsClient />
      </AlternateSection>

      {/* Featured Projects Highlight */}
      <AlternateSection
        title="Featured Projects"
        subtitle="Highlights"
        description="These projects represent some of my best work and demonstrate key technical skills"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.filter(p => p.featured).slice(0, 2).map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              variant="featured"
              showMetrics={true}
            />
          ))}
        </div>
      </AlternateSection>

      {/* Open Source Contribution */}
      <Section
        title="Open Source Contributions"
        subtitle="Community Impact"
        description="Contributing to the developer community through open source projects and knowledge sharing"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="steel-plate gym-shadow p-6 rounded-lg text-center">
            <Github className="w-8 h-8 text-primary mx-auto mb-4" />
            <div className="text-2xl font-bold text-primary mb-2">100+</div>
            <div className="text-sm text-muted-foreground">Contributions</div>
          </div>
          
          <div className="steel-plate gym-shadow p-6 rounded-lg text-center">
            <Star className="w-8 h-8 text-primary mx-auto mb-4" />
            <div className="text-2xl font-bold text-primary mb-2">1000+</div>
            <div className="text-sm text-muted-foreground">GitHub Stars</div>
          </div>
          
          <div className="steel-plate gym-shadow p-6 rounded-lg text-center">
            <ExternalLink className="w-8 h-8 text-primary mx-auto mb-4" />
            <div className="text-2xl font-bold text-primary mb-2">15+</div>
            <div className="text-sm text-muted-foreground">Repositories</div>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <p className="text-muted-foreground mb-6">
            I believe in giving back to the community that has helped me grow. 
            Check out my open source contributions and feel free to collaborate!
          </p>
          
          <Button asChild variant="outline" size="lg">
            <a 
              href="https://github.com/shashanksingh" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Github className="w-4 h-4 mr-2" />
              View on GitHub
            </a>
          </Button>
        </div>
      </Section>

      {/* CTA Section */}
      <AlternateSection
        title="Interested in Working Together?"
        description="Let's discuss how we can bring your next project to life with the same attention to detail and quality"
        className="text-center"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <Button asChild size="lg" className="flex-1">
            <a href="/contact">
              Start a Project
            </a>
          </Button>
          
          <Button asChild variant="outline" size="lg" className="flex-1">
            <a href="/about">
              Learn More About Me
            </a>
          </Button>
        </div>
      </AlternateSection>
    </>
  );
}

import { Suspense } from "react";
import { Section, AlternateSection } from "@/components/Section";
import { GitHubProjectsClient } from "@/components/GitHubProjectsClient";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { fetchGitHubRepos } from "@/lib/github";
import { pageMetadata } from "@/lib/seo";
import { ProjectGridSkeleton } from "@/components/ProjectCardSkeleton";

export const metadata = pageMetadata.projects();
export const revalidate = 3600; // ISR: revalidate every 1 hour

async function ProjectsContent() {
  const repos = await fetchGitHubRepos();

  const projectStats = {
    total: repos.length,
    languages: Array.from(new Set(repos.map((r) => r.language).filter(Boolean)))
      .length,
    topics: Array.from(new Set(repos.flatMap((r) => r.topics))).length,
    stars: repos.reduce((sum, r) => sum + r.stargazers_count, 0),
  };

  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <div className="steel-plate gym-shadow p-6 text-center rounded-lg">
          <div className="text-3xl font-bold text-primary mb-2">{projectStats.total}</div>
          <div className="text-sm text-muted-foreground">Public Repos</div>
        </div>
        <div className="steel-plate gym-shadow p-6 text-center rounded-lg">
          <div className="text-3xl font-bold text-primary mb-2">{projectStats.languages}</div>
          <div className="text-sm text-muted-foreground">Languages</div>
        </div>
        <div className="steel-plate gym-shadow p-6 text-center rounded-lg">
          <div className="text-3xl font-bold text-primary mb-2">{projectStats.topics}</div>
          <div className="text-sm text-muted-foreground">Topics</div>
        </div>
        <div className="steel-plate gym-shadow p-6 text-center rounded-lg">
          <div className="text-3xl font-bold text-primary mb-2">{projectStats.stars}</div>
          <div className="text-sm text-muted-foreground">Total Stars</div>
        </div>
      </div>

      {/* Projects Grid */}
      <GitHubProjectsClient repos={repos} />
    </>
  );
}

export default function Projects() {
  return (
    <>
      {/* Hero Section */}
      <Section
        title="Project Portfolio"
        subtitle="GitHub Repos"
        description="All public repositories — automatically synced from GitHub, sorted by latest activity"
        className="pt-32"
      >
        <Suspense fallback={<ProjectGridSkeleton count={6} />}>
          <ProjectsContent />
        </Suspense>
      </Section>

      {/* Open Source Section */}
      <AlternateSection
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
            <Github className="w-8 h-8 text-primary mx-auto mb-4" />
            <div className="text-2xl font-bold text-primary mb-2">1000+</div>
            <div className="text-sm text-muted-foreground">GitHub Stars</div>
          </div>

          <div className="steel-plate gym-shadow p-6 rounded-lg text-center">
            <Github className="w-8 h-8 text-primary mx-auto mb-4" />
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
              href="https://github.com/Shashank-Singh03"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-4 h-4 mr-2" />
              View on GitHub
            </a>
          </Button>
        </div>
      </AlternateSection>

      {/* CTA Section */}
      <AlternateSection
        title="Interested in Working Together?"
        description="Let's discuss how we can bring your next project to life with the same attention to detail and quality"
        className="text-center"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <Button asChild size="lg" className="flex-1">
            <a href="/contact">Start a Project</a>
          </Button>
          <Button asChild variant="outline" size="lg" className="flex-1">
            <a href="/about">Learn More About Me</a>
          </Button>
        </div>
      </AlternateSection>
    </>
  );
}

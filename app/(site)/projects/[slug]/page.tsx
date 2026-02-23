import { notFound } from "next/navigation";
import { Section } from "@/components/Section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ReadmeRenderer } from "@/components/ReadmeRenderer";
import { fetchGitHubRepos, fetchRepoByName, fetchRepoReadme, repoToTechStack, repoNameToTitle } from "@/lib/github";
import { Github, ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import { generateMetadata as genMeta } from "@/lib/seo";

export const revalidate = 3600;

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const repo = await fetchRepoByName(slug);
  if (!repo) return {};
  return genMeta({
    title: repoNameToTitle(repo.name),
    description: repo.description || `View ${repoNameToTitle(repo.name)} on GitHub`,
    keywords: repo.topics,
  });
}

export async function generateStaticParams() {
  try {
    const repos = await fetchGitHubRepos();
    return repos.map((repo) => ({ slug: repo.name }));
  } catch {
    return [];
  }
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;

  const [repo, readme] = await Promise.all([
    fetchRepoByName(slug),
    fetchRepoReadme(slug),
  ]);

  if (!repo) {
    notFound();
  }

  const title = repoNameToTitle(repo.name);
  const techStack = repoToTechStack(repo);

  return (
    <>
      {/* Top Section */}
      <Section className="pt-32 pb-8">
        {/* Back link */}
        <div className="mb-8">
          <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground -ml-2">
            <Link href="/projects">
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              Back to Projects
            </Link>
          </Button>
        </div>

        {/* Project title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
          {title}
        </h1>

        {repo.description && (
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl leading-relaxed">
            {repo.description}
          </p>
        )}

        {/* Tech Stack Chips */}
        {techStack.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {techStack.map((tech) => (
              <Badge key={tech} variant="secondary" className="px-3 py-1 text-sm">
                {tech}
              </Badge>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <Button asChild size="default">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-4 h-4 mr-2" />
              View on GitHub
            </a>
          </Button>
          {repo.stargazers_count > 0 && (
            <Button variant="outline" size="default" asChild>
              <a
                href={`${repo.html_url}/stargazers`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                ★ {repo.stargazers_count} Stars
              </a>
            </Button>
          )}
        </div>
      </Section>

      {/* README Content */}
      <Section className="pt-4 pb-24">
        <div className="max-w-4xl">
          {readme ? (
            <div className="steel-plate gym-shadow rounded-xl p-6 sm:p-8 border border-border/50">
              <ReadmeRenderer content={readme} />
            </div>
          ) : (
            <div className="steel-plate gym-shadow rounded-xl p-8 text-center border border-border/50">
              <Github className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">No README available</h2>
              <p className="text-muted-foreground mb-6">
                This repository doesn&apos;t have a README yet. View it directly on GitHub.
              </p>
              <Button asChild>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-4 h-4 mr-2" />
                  Open on GitHub
                </a>
              </Button>
            </div>
          )}
        </div>
      </Section>
    </>
  );
}

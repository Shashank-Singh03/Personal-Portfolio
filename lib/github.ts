export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  topics: string[];
  language: string | null;
  pushed_at: string;
  updated_at: string;
  fork: boolean;
  archived: boolean;
  private: boolean;
  stargazers_count: number;
  forks_count: number;
}

const GITHUB_USERNAME = "Shashank-Singh03";
const GITHUB_API_BASE = "https://api.github.com";

function getGitHubHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  // Optionally use a token for higher rate limits (set in Vercel env vars)
  if (process.env.GITHUB_TOKEN) {
    headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(
      `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed&direction=desc`,
      {
        headers: getGitHubHeaders(),
        next: { revalidate: 3600 }, // ISR: revalidate every 1 hour
      }
    );

    if (!res.ok) {
      console.error(`GitHub API error: ${res.status} ${res.statusText}`);
      return [];
    }

    const repos: GitHubRepo[] = await res.json();

    // Filter: only public, non-forked, non-archived repos
    return repos
      .filter((repo) => !repo.fork && !repo.archived && !repo.private)
      .sort(
        (a, b) =>
          new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
      );
  } catch (error) {
    console.error("Failed to fetch GitHub repos:", error);
    return [];
  }
}

export async function fetchRepoByName(
  repoName: string
): Promise<GitHubRepo | null> {
  try {
    const res = await fetch(
      `${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${repoName}`,
      {
        headers: getGitHubHeaders(),
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) return null;

    const repo: GitHubRepo = await res.json();

    // Ensure it's public, non-forked, non-archived
    if (repo.fork || repo.archived || repo.private) return null;

    return repo;
  } catch {
    return null;
  }
}

export async function fetchRepoReadme(repoName: string): Promise<string | null> {
  try {
    const res = await fetch(
      `${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${repoName}/readme`,
      {
        headers: getGitHubHeaders(),
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) return null;

    const data = await res.json();

    // README content is base64-encoded
    if (data.content && data.encoding === "base64") {
      return Buffer.from(data.content, "base64").toString("utf-8");
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Derive tech stack chips from repo topics or language.
 * Returns at most 8 chips.
 */
export function repoToTechStack(repo: GitHubRepo): string[] {
  if (repo.topics && repo.topics.length > 0) {
    return repo.topics.slice(0, 8).map((t) =>
      t
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    );
  }
  if (repo.language) {
    return [repo.language];
  }
  return [];
}

/**
 * Format a repo name slug into a human-readable title.
 */
export function repoNameToTitle(name: string): string {
  return name
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

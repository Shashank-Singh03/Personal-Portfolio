import { NextResponse } from "next/server";
import { fetchGitHubRepos } from "@/lib/github";

export const runtime = "edge";
export const revalidate = 3600; // Revalidate every 1 hour

export async function GET() {
  try {
    const repos = await fetchGitHubRepos();
    return NextResponse.json(repos, {
      headers: {
        "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("GitHub repos API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch GitHub repositories" },
      { status: 500 }
    );
  }
}

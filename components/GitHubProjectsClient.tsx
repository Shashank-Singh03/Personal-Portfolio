"use client";

import { useState } from "react";
import { GitHubProjectCard } from "@/components/GitHubProjectCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Grid3X3,
  List,
} from "lucide-react";
import { type GitHubRepo, repoToTechStack, repoNameToTitle } from "@/lib/github";

interface GitHubProjectsClientProps {
  repos: GitHubRepo[];
}

export function GitHubProjectsClient({ repos }: GitHubProjectsClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredRepos = repos.filter((repo) => {
    const title = repoNameToTitle(repo.name).toLowerCase();
    const desc = (repo.description || "").toLowerCase();
    const techs = repoToTechStack(repo).join(" ").toLowerCase();
    const query = searchTerm.toLowerCase();
    return title.includes(query) || desc.includes(query) || techs.includes(query);
  });

  return (
    <>
      {/* Search and View Toggle */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            <Grid3X3 className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Result count */}
      {searchTerm && (
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-muted-foreground">
            Showing {filteredRepos.length} of {repos.length} repositories
          </span>
          <Button variant="ghost" size="sm" onClick={() => setSearchTerm("")}>
            Clear
          </Button>
        </div>
      )}

      {/* Projects Grid/List */}
      {filteredRepos.length > 0 ? (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
              : "grid grid-cols-1 gap-4"
          }
        >
          {filteredRepos.map((repo) => (
            <GitHubProjectCard key={repo.id} repo={repo} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto bg-muted/20 rounded-full flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No projects found</h3>
          <p className="text-muted-foreground mb-6">
            Try adjusting your search to find what you&apos;re looking for.
          </p>
          <Button onClick={() => setSearchTerm("")}>Clear Search</Button>
        </div>
      )}
    </>
  );
}

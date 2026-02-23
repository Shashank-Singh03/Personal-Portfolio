"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github } from "lucide-react";
import Link from "next/link";
import { type GitHubRepo, repoToTechStack, repoNameToTitle } from "@/lib/github";

interface GitHubProjectCardProps {
  repo: GitHubRepo;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20, rotateX: -10 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
  hover: {
    y: -8,
    rotateX: 5,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeOut" as const,
    },
  },
};

export function GitHubProjectCard({ repo }: GitHubProjectCardProps) {
  const title = repoNameToTitle(repo.name);
  const techStack = repoToTechStack(repo);

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true }}
      className="group cursor-pointer"
    >
      <Card className="h-full steel-plate gym-shadow border-border/50 overflow-hidden hover:border-primary/50 transition-all duration-300 flex flex-col">
        <CardHeader className="pb-3">
          <h3 className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-2 leading-snug">
            {title}
          </h3>
        </CardHeader>

        <CardContent className="flex-1 pb-4">
          {/* Tech Stack Chips */}
          {techStack.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {techStack.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="text-xs px-2 py-1"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              <Badge variant="outline" className="text-xs px-2 py-1 text-muted-foreground">
                No topics yet
              </Badge>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex items-center justify-between gap-2 pt-0">
          {/* GitHub Link */}
          <Button
            variant="outline"
            size="sm"
            asChild
            className="hover:border-primary/50"
          >
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="w-4 h-4" />
              <span className="ml-1.5">GitHub</span>
            </a>
          </Button>

          {/* Know More → */}
          <Button
            variant="default"
            size="sm"
            asChild
            className="group/btn"
          >
            <Link href={`/projects/${repo.name}`}>
              Know More
              <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

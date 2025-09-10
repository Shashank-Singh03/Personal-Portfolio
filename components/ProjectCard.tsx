"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ExternalLink, 
  Github, 
  Calendar, 
  Users, 
  Star, 
  TrendingUp,
  Eye
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { type Project } from "@/lib/validators";
import { cn, formatDate } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  variant?: "default" | "featured" | "compact";
  showMetrics?: boolean;
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

const imageVariants = {
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
    },
  },
};

const statusColors = {
  completed: "bg-green-500/20 text-green-400 border-green-500/30",
  "in-progress": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  planned: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  archived: "bg-gray-500/20 text-gray-400 border-gray-500/30",
};

export function ProjectCard({ 
  project, 
  variant = "default", 
  showMetrics = true 
}: ProjectCardProps) {
  const isCompact = variant === "compact";
  const isFeatured = variant === "featured";

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true }}
      className={cn(
        "group cursor-pointer",
        isFeatured && "col-span-full lg:col-span-2"
      )}
    >
      <Card className={cn(
        "h-full steel-plate gym-shadow border-border/50 overflow-hidden",
        "hover:border-primary/50 transition-all duration-300",
        isFeatured && "lg:flex lg:flex-row"
      )}>
        {/* Project Image */}
        {project.image && (
          <div className={cn(
            "relative overflow-hidden",
            isCompact ? "h-32" : "h-48",
            isFeatured && "lg:w-1/2 lg:h-auto"
          )}>
            <motion.div
              variants={imageVariants}
              className="relative w-full h-full"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                sizes={isFeatured ? "(max-width: 1024px) 100vw, 50vw" : "100vw"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </motion.div>
            
            {/* Status Badge */}
            <div className="absolute top-4 left-4">
              <Badge 
                variant="outline"
                className={cn(
                  "border backdrop-blur-sm",
                  statusColors[project.status]
                )}
              >
                {project.status.replace('-', ' ')}
              </Badge>
            </div>

            {/* Featured Badge */}
            {project.featured && (
              <div className="absolute top-4 right-4">
                <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm">
                  <Star className="w-3 h-3 mr-1" />
                  Featured
                </Badge>
              </div>
            )}
          </div>
        )}

        <div className={cn(
          "flex flex-col",
          isFeatured && project.image && "lg:w-1/2"
        )}>
          <CardHeader className={cn(isCompact && "pb-3")}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className={cn(
                  "font-semibold group-hover:text-primary transition-colors line-clamp-2",
                  isCompact ? "text-base" : "text-lg lg:text-xl"
                )}>
                  {project.title}
                </h3>
                
                {!isCompact && (
                  <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(project.startDate)}</span>
                    {project.endDate && (
                      <>
                        <span>-</span>
                        <span>{formatDate(project.endDate)}</span>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className={cn(
            "flex-1",
            isCompact ? "pb-3" : "pb-4"
          )}>
            <p className={cn(
              "text-muted-foreground mb-4",
              isCompact ? "text-sm line-clamp-2" : "line-clamp-3"
            )}>
              {isCompact ? project.summary : project.description}
            </p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.technologies.slice(0, isCompact ? 3 : 6).map((tech) => (
                <Badge 
                  key={tech} 
                  variant="secondary" 
                  className="text-xs px-2 py-1"
                >
                  {tech}
                </Badge>
              ))}
              {project.technologies.length > (isCompact ? 3 : 6) && (
                <Badge variant="outline" className="text-xs px-2 py-1">
                  +{project.technologies.length - (isCompact ? 3 : 6)}
                </Badge>
              )}
            </div>

            {/* Metrics */}
            {showMetrics && project.metrics && !isCompact && (
              <div className="grid grid-cols-2 gap-4 p-3 bg-muted/30 rounded-lg">
                {project.metrics.users && (
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="font-medium">{project.metrics.users}</span>
                    <span className="text-muted-foreground">users</span>
                  </div>
                )}
                {project.metrics.stars && (
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="w-4 h-4 text-primary" />
                    <span className="font-medium">{project.metrics.stars}</span>
                    <span className="text-muted-foreground">stars</span>
                  </div>
                )}
                {project.metrics.downloads && (
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <span className="font-medium">{project.metrics.downloads}</span>
                    <span className="text-muted-foreground">downloads</span>
                  </div>
                )}
                {project.metrics.performance && (
                  <div className="flex items-center gap-2 text-sm">
                    <Eye className="w-4 h-4 text-primary" />
                    <span className="font-medium text-primary">
                      {project.metrics.performance}
                    </span>
                  </div>
                )}
              </div>
            )}
          </CardContent>

          <CardFooter className={cn(
            "flex items-center justify-between gap-2",
            isCompact && "pt-0"
          )}>
            <div className="flex gap-2">
              {project.links.github && (
                <Button 
                  variant="outline" 
                  size={isCompact ? "sm" : "default"}
                  asChild
                  className="hover:border-primary/50"
                >
                  <Link 
                    href={project.links.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Github className="w-4 h-4" />
                    {!isCompact && <span className="ml-2">Code</span>}
                  </Link>
                </Button>
              )}
              
              {project.links.live && (
                <Button 
                  variant="outline" 
                  size={isCompact ? "sm" : "default"}
                  asChild
                  className="hover:border-primary/50"
                >
                  <Link 
                    href={project.links.live} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {!isCompact && <span className="ml-2">Live</span>}
                  </Link>
                </Button>
              )}
            </div>

            {!isCompact && (
              <Badge 
                variant="outline"
                className="capitalize text-xs"
              >
                {project.category}
              </Badge>
            )}
          </CardFooter>
        </div>
      </Card>
    </motion.div>
  );
}

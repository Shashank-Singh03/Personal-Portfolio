import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export function ProjectCardSkeleton() {
  return (
    <Card className="h-full steel-plate border-border/50 overflow-hidden flex flex-col animate-pulse">
      <CardHeader className="pb-3">
        {/* Title skeleton */}
        <div className="h-5 bg-muted/50 rounded-md w-3/4" />
      </CardHeader>

      <CardContent className="flex-1 pb-4">
        {/* Tech chips skeleton */}
        <div className="flex flex-wrap gap-1.5">
          <div className="h-6 bg-muted/50 rounded-full w-16" />
          <div className="h-6 bg-muted/50 rounded-full w-20" />
          <div className="h-6 bg-muted/50 rounded-full w-14" />
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between gap-2 pt-0">
        <div className="h-8 bg-muted/50 rounded-md w-24" />
        <div className="h-8 bg-muted/50 rounded-md w-28" />
      </CardFooter>
    </Card>
  );
}

export function ProjectGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProjectCardSkeleton key={i} />
      ))}
    </div>
  );
}

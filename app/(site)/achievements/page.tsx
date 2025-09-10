import { Section, AlternateSection } from "@/components/Section";
import { AchievementCounter, StatsGrid } from "@/components/StatCounter";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Trophy, 
  Award, 
  Star, 
  Target, 
  GitBranch,
  ExternalLink,
  Calendar
} from "lucide-react";
import Link from "next/link";
import { 
  achievements, 
  getAchievementsByCategory, 
  achievementCategories,
  getAchievementStats 
} from "@/content/achievements";
import { formatDate } from "@/lib/utils";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata.achievements();

const categoryIcons = {
  certification: <Award className="w-6 h-6" />,
  award: <Trophy className="w-6 h-6" />,
  milestone: <Target className="w-6 h-6" />,
  contribution: <GitBranch className="w-6 h-6" />,
  recognition: <Star className="w-6 h-6" />,
};

export default function Achievements() {
  const stats = getAchievementStats();
  
  const achievementStats = [
    { value: stats.total, label: "Total Achievements", description: "Career milestones reached" },
    { value: stats.thisYear, label: "This Year", description: "Recent accomplishments" },
    { value: stats.byCategory.find(c => c.value === "certification")?.count || 0, label: "Certifications", description: "Professional credentials" },
    { value: stats.byCategory.find(c => c.value === "award")?.count || 0, label: "Awards", description: "Recognition received" },
  ];

  return (
    <>
      {/* Hero Section */}
      <Section
        title="Achievements & Recognition"
        subtitle="Professional Milestones"
        description="A record of accomplishments, certifications, and recognition earned through dedication and continuous improvement"
        className="pt-32"
      >
        <StatsGrid 
          stats={achievementStats}
          variant="default"
          columns={4}
        />
      </Section>

      {/* Achievement Categories */}
      <AlternateSection
        title="Achievement Categories"
        subtitle="Organized by Type"
        description="Professional accomplishments organized by category, showcasing growth across different areas"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {achievementCategories.map((category) => {
            const categoryAchievements = getAchievementsByCategory(category.value);
            
            return (
              <Card key={category.value} className="steel-plate gym-shadow border-border/50">
                <CardHeader>
                  <div 
                    className="p-3 rounded-lg w-fit mb-2"
                    style={{ backgroundColor: `${category.color}20`, color: category.color }}
                  >
                    {categoryIcons[category.value as keyof typeof categoryIcons]}
                  </div>
                  <CardTitle className="flex items-center justify-between">
                    {category.name}
                    <Badge variant="secondary">{categoryAchievements.length}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {category.description}
                  </p>
                  
                  {categoryAchievements.slice(0, 3).map((achievement) => (
                    <div key={achievement.id} className="flex items-start gap-3 mb-3 last:mb-0">
                      <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2"></div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm line-clamp-1">
                          {achievement.title}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {formatDate(achievement.date, { month: "short", year: "numeric" })}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {categoryAchievements.length > 3 && (
                    <div className="text-xs text-muted-foreground mt-2">
                      +{categoryAchievements.length - 3} more
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </AlternateSection>

      {/* Recent Achievements */}
      <Section
        title="Recent Achievements"
        subtitle="Latest Milestones"
        description="The most recent accomplishments and recognition, showing continuous growth and progress"
      >
        <div className="space-y-6">
          {achievements.slice(0, 6).map((achievement, index) => (
            <Card key={achievement.id} className="steel-plate gym-shadow border-border/50">
              <CardContent className="p-6">
                <div className="flex items-start gap-6">
                  {/* Icon */}
                  <div 
                    className="p-4 rounded-lg flex-shrink-0"
                    style={{ 
                      backgroundColor: `${achievementCategories.find(c => c.value === achievement.category)?.color}20`,
                      color: achievementCategories.find(c => c.value === achievement.category)?.color
                    }}
                  >
                    {categoryIcons[achievement.category as keyof typeof categoryIcons]}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="font-semibold text-lg text-primary mb-1">
                          {achievement.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(achievement.date)}
                          </div>
                          <Badge variant="outline" className="text-xs capitalize">
                            {achievement.category.replace('-', ' ')}
                          </Badge>
                        </div>
                      </div>
                      
                      {/* Metric */}
                      {achievement.metric && (
                        <div className="text-right flex-shrink-0">
                          <div className="text-2xl font-bold text-primary">
                            {achievement.metric.value}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {achievement.metric.label}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <p className="text-muted-foreground mb-4">
                      {achievement.description}
                    </p>
                    
                    {/* Link */}
                    {achievement.link && (
                      <Button variant="outline" size="sm" asChild>
                        <Link 
                          href={achievement.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Details
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Achievement Timeline */}
      <AlternateSection
        title="Achievement Timeline"
        subtitle="Progress Over Time"
        description="A chronological view of major milestones and accomplishments throughout my career"
      >
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:transform md:-translate-x-px"></div>
          
          <div className="space-y-8">
            {[...achievements]
              .sort((a, b) => {
                const dateA = new Date(a.date).getTime();
                const dateB = new Date(b.date).getTime();
                // Return NaN for invalid dates to sort them to the bottom
                if (isNaN(dateA) && isNaN(dateB)) return 0;
                if (isNaN(dateA)) return 1;
                if (isNaN(dateB)) return -1;
                return dateB - dateA; // Descending order (latest first)
              })
              .slice(0, 8)
              .map((achievement, index) => (
              <div 
                key={achievement.id}
                className={`relative flex items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div 
                  className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full border-2 border-background md:transform md:-translate-x-1/2 z-10"
                  style={{ 
                    backgroundColor: achievementCategories.find(c => c.value === achievement.category)?.color || '#39ff14'
                  }}
                ></div>
                
                {/* Content */}
                <div className="flex-1 ml-12 md:ml-0">
                  <Card className="steel-plate gym-shadow border-border/50">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant="outline" className="text-xs">
                          {formatDate(achievement.date, { month: "short", year: "numeric" })}
                        </Badge>
                        <Badge 
                          variant="secondary" 
                          className="text-xs capitalize"
                        >
                          {achievement.category.replace('-', ' ')}
                        </Badge>
                      </div>
                      
                      <h3 className="font-semibold text-primary mb-2">
                        {achievement.title}
                      </h3>
                      
                      <p className="text-sm text-muted-foreground">
                        {achievement.description}
                      </p>
                      
                      {achievement.metric && (
                        <div className="mt-3 text-center p-2 bg-muted/20 rounded">
                          <div className="text-lg font-bold text-primary">
                            {achievement.metric.value}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {achievement.metric.label}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
                
                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1"></div>
              </div>
            ))}
          </div>
        </div>
      </AlternateSection>

      {/* CTA Section */}
      <Section
        title="Ready to Achieve Great Things Together?"
        description="Let's work together to create achievements worth celebrating"
        className="text-center"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <Button asChild size="lg" className="flex-1">
            <Link href="/contact">
              Start a Project
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg" className="flex-1">
            <Link href="/projects">
              View My Work
            </Link>
          </Button>
        </div>
      </Section>
    </>
  );
}

import { Section, AlternateSection } from "@/components/Section";
import { SkillPlates } from "@/components/SkillPlates";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BMICalculator } from "@/components/Calculators/BMI";
import { OneRMCalculator } from "@/components/Calculators/OneRM";
import { 
  Code, 
  Database, 
  Server, 
  Palette, 
  Settings, 
  Users,
  TrendingUp,
  Award
} from "lucide-react";
import Link from "next/link";
import { skills, getSkillsByCategory, skillCategories } from "@/content/skills";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata.skills();

const categoryIcons = {
  frontend: <Palette className="w-5 h-5" />,
  backend: <Server className="w-5 h-5" />,
  database: <Database className="w-5 h-5" />,
  devops: <Settings className="w-5 h-5" />,
  tools: <Code className="w-5 h-5" />,
  soft: <Users className="w-5 h-5" />,
};

const skillStats = {
  total: skills.length,
  expert: skills.filter(s => s.level >= 90).length,
  advanced: skills.filter(s => s.level >= 80 && s.level < 90).length,
  years: Math.max(...skills.map(s => s.yearsOfExperience || 0)),
};

export default function Skills() {
  return (
    <>
      {/* Hero Section */}
      <Section
        title="Technical Arsenal"
        subtitle="Skills & Technologies"
        description="A comprehensive breakdown of my technical skills, developed through continuous learning and real-world application"
        className="pt-32"
      >
        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="steel-plate gym-shadow text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">{skillStats.total}</div>
              <div className="text-sm text-muted-foreground">Total Skills</div>
            </CardContent>
          </Card>
          
          <Card className="steel-plate gym-shadow text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">{skillStats.expert}</div>
              <div className="text-sm text-muted-foreground">Expert Level</div>
            </CardContent>
          </Card>
          
          <Card className="steel-plate gym-shadow text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">{skillStats.advanced}</div>
              <div className="text-sm text-muted-foreground">Advanced Level</div>
            </CardContent>
          </Card>
          
          <Card className="steel-plate gym-shadow text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">{skillStats.years}+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </CardContent>
          </Card>
        </div>

        {/* All Skills Overview */}
        <SkillPlates skills={skills} variant="plates" showProgress={true} />
      </Section>

      {/* Skills by Category */}
      <AlternateSection
        title="Skill Categories"
        subtitle="Organized by Domain"
        description="Detailed breakdown of skills organized by technical domain and proficiency level"
      >
        <Tabs defaultValue="frontend" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-8">
            {skillCategories.map((category) => (
              <TabsTrigger 
                key={category.value} 
                value={category.value}
                className="flex items-center gap-2"
              >
                {categoryIcons[category.value as keyof typeof categoryIcons]}
                <span className="hidden sm:inline">{category.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {skillCategories.map((category) => {
            const categorySkills = getSkillsByCategory(category.value);
            
            return (
              <TabsContent key={category.value} value={category.value} className="space-y-6">
                <div className="text-center mb-8">
                  <div 
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                    style={{ backgroundColor: `${category.color}20`, color: category.color }}
                  >
                    {categoryIcons[category.value as keyof typeof categoryIcons]}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                  <p className="text-muted-foreground">{category.description}</p>
                </div>

                <SkillPlates 
                  skills={categorySkills} 
                  variant="cards" 
                  showProgress={true} 
                />
              </TabsContent>
            );
          })}
        </Tabs>
      </AlternateSection>

      {/* Learning Philosophy */}
      <Section
        title="Learning Philosophy"
        subtitle="Continuous Growth"
        description="My approach to skill development and staying current in the ever-evolving tech landscape"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="steel-plate gym-shadow border-border/50">
            <CardHeader>
              <div className="p-3 bg-primary/10 rounded-lg w-fit mb-2">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Progressive Overload</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Just like in strength training, I believe in gradually increasing the complexity 
                of challenges to build stronger technical skills over time.
              </p>
            </CardContent>
          </Card>

          <Card className="steel-plate gym-shadow border-border/50">
            <CardHeader>
              <div className="p-3 bg-primary/10 rounded-lg w-fit mb-2">
                <Code className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Practice & Application</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Learning isn&apos;t complete until it&apos;s applied. Every new skill is 
                immediately put to work in real projects to solidify understanding.
              </p>
            </CardContent>
          </Card>

          <Card className="steel-plate gym-shadow border-border/50">
            <CardHeader>
              <div className="p-3 bg-primary/10 rounded-lg w-fit mb-2">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Measurable Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Progress is tracked, measured, and celebrated. From certifications to 
                project completions, every achievement is a step forward.
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Currently Learning */}
      <AlternateSection
        title="Currently Learning"
        subtitle="In Progress"
        description="Technologies and skills I'm actively developing to stay ahead of the curve"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {["Rust", "Go", "GraphQL", "Three.js", "WebAssembly", "Kubernetes", "Machine Learning", "Blockchain"].map((skill) => (
            <Card key={skill} className="steel-plate gym-shadow text-center p-4">
              <div className="font-medium mb-2">{skill}</div>
              <Badge variant="outline" className="text-xs">
                Learning
              </Badge>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <p className="text-muted-foreground mb-6">
            The journey of learning never stops. These are the technologies I&apos;m currently 
            exploring to expand my toolkit and stay at the forefront of development.
          </p>
          
          <Button asChild variant="outline" size="lg">
            <Link href="/projects">
              See How I Apply These Skills
            </Link>
          </Button>
        </div>
      </AlternateSection>

      {/* Training Calculators */}
      <Section
        title="Training Calculators"
        subtitle="Quick Tools"
        description="Quick tools to measure performance, because fitness meets tech."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <BMICalculator />
          <OneRMCalculator />
        </div>
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            These tools are for demonstration only — use them as a warm-up, not a replacement for medical or training advice.
          </p>
        </div>
      </Section>

      {/* CTA Section */}
      <Section
        title="Ready to Put These Skills to Work?"
        description="Let's discuss how my technical expertise can help bring your project to life"
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

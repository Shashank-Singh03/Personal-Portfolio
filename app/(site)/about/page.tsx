import { Section, AlternateSection } from "@/components/Section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Calendar, 
  MapPin, 
  Mail, 
  Download, 
  Code, 
  Dumbbell,
  Target,
  Users,
  BookOpen
} from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata.about();

const timeline = [
  {
    year: "2024",
    title: "Intern Front-End Developer",
    company: "Woodman Electronics",
    description: "I worked there as a front end intern for 2 months i.e. novemeber 2024 to january 2025.",
    technologies: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "AWS"],
    achievements: ["Collaborated with a team of 5 developers to implement new website features", "Reduced load times by 40%", "Implemented CI/CD pipeline"],
  },
  {
    year: "2025",
    title: "Intern Front-End Developer",
    company: "PawsNme - Oracle subsidiary",
    description: "I worked there as a front end intern for 4 months i.e. may 2025 to september 2025.",
    technologies: ["React", "Angular", "TypeScript", "Node.js", "PostgreSQL", "AWS", "Git", "Jira", "PrimeNG"],
    achievements: ["Developed and maintained responsive UI components using Angular 16+ and TypeScript, enhancing portal performance and user experience for over 10,000 monthly users", "Built dynamic, reusable components with PrimeNG", "Implemented CI/CD pipeline"],
  },
];

const values = [
  {
    icon: <Target className="w-6 h-6" />,
    title: "Precision & Quality",
    description: "Every line of code is written with purpose, tested thoroughly, and optimized for performance. Just like perfect form in the gym.",
  },
  {
    icon: <Dumbbell className="w-6 h-6" />,
    title: "Continuous Growth",
    description: "Constantly learning new technologies and improving skills. Progress is measured, tracked, and celebrated.",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Team Collaboration",
    description: "Great software is built by great teams. I believe in clear communication, knowledge sharing, and collective success.",
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Knowledge Sharing",
    description: "Passionate about mentoring others and contributing to the developer community through open source and technical writing.",
  },
];

export default function About() {
  return (
    <>
      {/* Hero Section */}
      <Section
        title="About Me"
        subtitle="Get to Know"
        description="The story behind the code - my journey, values, and what drives me to build exceptional software"
        className="pt-32"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Personal Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p>
                I&apos;m <strong className="text-foreground">{siteConfig.name}</strong>, 
                I’m Shashank Kumar Singh, a Computer Science engineer who believes in progressive overload — both in the gym and in technology.
                Just as I push for that extra rep, I push code that performs, scales, and makes an impact. With experience in frontend development (Angular, PrimeNG, React) and backend automation using Python (BeautifulSoup, Selenium), 
                I’ve built scalable web applications and cloud-deployed ML models that deliver real results.
              </p>
              
              <p>
                My journey in software development began with curiosity and has evolved into 
                a commitment to crafting solutions that not only work but excel. I specialize 
                in full-stack development with a focus on modern web technologies, always 
                striving to write clean, maintainable, and performant code.
              </p>
              
              <p>
                When I&apos;m not coding, you&apos;ll find me in the gym, applying the same 
                principles of consistency, progressive improvement, and goal-oriented training 
                to my physical fitness. This mindset translates directly into my approach to 
                software development - every project is an opportunity to push boundaries and 
                achieve new personal records.
              </p>
            </div>
            
            {/* Quick Facts */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{siteConfig.location}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-primary" />
                <Link href={`mailto:${siteConfig.email}`} className="hover:text-primary">
                  {siteConfig.email}
                </Link>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Code className="w-4 h-4 text-primary" />
                <span>3+ Years Experience</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-4 h-4 text-primary" />
                <span>Available for Projects</span>
              </div>
            </div>
          </div>

          {/* CTA Card */}
          <Card className="steel-plate gym-shadow">
            <CardContent className="p-6 text-center">
              <div className="mb-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Download className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Download Resume</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Get the full details of my experience, skills, and achievements.
                </p>
              </div>
              
              <Button className="w-full mb-4">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              
              <Button variant="outline" className="w-full" asChild>
                <Link href="/contact">
                  Get In Touch
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Values Section */}
      <AlternateSection
        title="Core Values"
        subtitle="What Drives Me"
        description="The principles that guide my approach to software development and professional growth"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <Card key={index} className="steel-plate gym-shadow border-border/50 hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary flex-shrink-0">
                    {value.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </AlternateSection>

      {/* Experience Timeline */}
      <Section
        title="Professional Journey"
        subtitle="Experience"
        description="My training log in the world of software development - tracking progress, achievements, and continuous growth"
      >
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:transform md:-translate-x-px"></div>
          
          <div className="space-y-12">
            {timeline.map((item, index) => (
              <div 
                key={index}
                className={`relative flex items-start gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-primary rounded-full border-2 border-background md:transform md:-translate-x-1/2 z-10"></div>
                
                {/* Content */}
                <div className="flex-1 ml-12 md:ml-0">
                  <Card className="steel-plate gym-shadow border-border/50">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <Badge variant="outline" className="mb-2">{item.year}</Badge>
                          <h3 className="font-semibold text-xl text-primary">{item.title}</h3>
                          <p className="text-muted-foreground font-medium">{item.company}</p>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground mb-4">{item.description}</p>
                      
                      {/* Technologies */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold mb-2">Technologies Used:</h4>
                        <div className="flex flex-wrap gap-2">
                          {item.technologies.map((tech) => (
                            <Badge key={tech} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      {/* Achievements */}
                      <div>
                        <h4 className="text-sm font-semibold mb-2">Key Achievements:</h4>
                        <ul className="space-y-1">
                          {item.achievements.map((achievement, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                              <div className="w-1 h-1 bg-primary rounded-full flex-shrink-0"></div>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1"></div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <AlternateSection
        title="Let's Work Together"
        description="Ready to bring the same level of dedication and expertise to your next project?"
        className="text-center"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <Button asChild size="lg" className="flex-1">
            <Link href="/contact">
              Start a Conversation
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg" className="flex-1">
            <Link href="/projects">
              View My Work
            </Link>
          </Button>
        </div>
      </AlternateSection>
    </>
  );
}

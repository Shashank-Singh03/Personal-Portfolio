import { Metadata } from "next";
import { siteConfig } from "@/content/site";

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

export function generateMetadata({
  title,
  description,
  keywords,
  image,
  url,
  type = "website",
  publishedTime,
  modifiedTime,
  author,
  section,
  tags,
}: SEOProps = {}): Metadata {
  const metaTitle = title 
    ? `${title} | ${siteConfig.name}` 
    : siteConfig.seo.title;
  
  const metaDescription = description || siteConfig.seo.description;
  const metaKeywords = keywords?.length 
    ? [...keywords, ...siteConfig.seo.keywords] 
    : siteConfig.seo.keywords;
  
  const metaImage = image || siteConfig.seo.ogImage || "/images/og-default.jpg";
  const metaUrl = url || siteConfig.social.website;

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: metaKeywords,
    authors: [{ name: author || siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    
    openGraph: {
      type,
      title: metaTitle,
      description: metaDescription,
      url: metaUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
      locale: "en_US",
      ...(type === "article" && {
        publishedTime,
        modifiedTime,
        authors: [author || siteConfig.name],
        section,
        tags,
      }),
    },
    
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [metaImage],
      creator: `@${siteConfig.social.twitter?.split("/").pop() || siteConfig.name}`,
    },
    
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
      yandex: process.env.YANDEX_VERIFICATION,
      yahoo: process.env.YAHOO_VERIFICATION,
    },
    
    category: section,
  };
}

// Structured data generators
export function generatePersonStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.role,
    description: siteConfig.description,
    email: siteConfig.email,
    url: siteConfig.social.website,
    image: "/images/avatar.jpg",
    sameAs: [
      siteConfig.social.github,
      siteConfig.social.linkedin,
      siteConfig.social.twitter,
    ].filter(Boolean),
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location,
    },
    knowsAbout: [
      "Software Development",
      "Web Development",
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Python",
    ],
  };
}

export function generateWebsiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.seo.title,
    description: siteConfig.seo.description,
    url: siteConfig.social.website,
    author: {
      "@type": "Person",
      name: siteConfig.name,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.social.website}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateProjectStructuredData(project: {
  name: string;
  description: string;
  url?: string;
  image?: string;
  dateCreated: string;
  dateModified?: string;
  author: string;
  programmingLanguage?: string[];
  keywords?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.name,
    description: project.description,
    url: project.url,
    image: project.image,
    dateCreated: project.dateCreated,
    dateModified: project.dateModified,
    author: {
      "@type": "Person",
      name: project.author,
    },
    programmingLanguage: project.programmingLanguage,
    keywords: project.keywords,
    applicationCategory: "WebApplication",
  };
}

// SEO utilities
export function generateCanonicalUrl(path: string): string {
  const baseUrl = siteConfig.social.website || "https://shashanksingh.dev";
  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function generateAlternateUrls(path: string) {
  const canonical = generateCanonicalUrl(path);
  return [
    { rel: "canonical", href: canonical },
    { rel: "alternate", type: "application/rss+xml", href: `${canonical}/feed.xml` },
  ];
}

// Page-specific metadata generators
export const pageMetadata = {
  home: () => generateMetadata({
    title: "Home",
    description: `${siteConfig.tagline} - ${siteConfig.description}`,
    keywords: ["portfolio", "software developer", "full-stack"],
  }),
  
  about: () => generateMetadata({
    title: "About",
    description: `Learn more about ${siteConfig.name}, a ${siteConfig.role} passionate about building exceptional software.`,
    keywords: ["about", "biography", "experience"],
  }),
  
  skills: () => generateMetadata({
    title: "Skills & Technologies",
    description: `Explore the technical skills and technologies that ${siteConfig.name} uses to build modern applications.`,
    keywords: ["skills", "technologies", "expertise", "programming"],
  }),
  
  projects: () => generateMetadata({
    title: "Projects",
    description: `Discover the projects built by ${siteConfig.name}, showcasing expertise in modern web development.`,
    keywords: ["projects", "portfolio", "web development", "applications"],
  }),
  
  achievements: () => generateMetadata({
    title: "Achievements",
    description: `Professional achievements and milestones reached by ${siteConfig.name} in software development.`,
    keywords: ["achievements", "certifications", "awards", "recognition"],
  }),
  
  experience: () => generateMetadata({
    title: "Experience",
    description: `Professional experience and career journey of ${siteConfig.name}, showcasing real-world impact and growth.`,
    keywords: ["experience", "career", "professional", "work history", "employment"],
  }),
  
  contact: () => generateMetadata({
    title: "Contact",
    description: `Get in touch with ${siteConfig.name} for collaboration opportunities and project inquiries.`,
    keywords: ["contact", "hire", "collaboration", "projects"],
  }),
};

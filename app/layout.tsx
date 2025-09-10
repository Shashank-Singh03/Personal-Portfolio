import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Shashank Singh - Software Developer",
  description: "Full-stack software developer specializing in React, Next.js, and modern web technologies. Building powerful applications with gym-level dedication.",
  keywords: ["software developer", "full-stack", "React", "Next.js", "TypeScript", "web development"],
  authors: [{ name: "Shashank Singh" }],
  creator: "Shashank Singh",
  openGraph: {
    title: "Shashank Singh - Software Developer",
    description: "Full-stack software developer specializing in React, Next.js, and modern web technologies.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shashank Singh - Software Developer",
    description: "Full-stack software developer specializing in React, Next.js, and modern web technologies.",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Shashank Singh",
              jobTitle: "Software Developer",
              url: "https://shashanksingh.dev",
              sameAs: [
                "https://github.com/shashanksingh",
                "https://linkedin.com/in/shashanksingh",
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-primary text-primary-foreground px-4 py-2 rounded">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}

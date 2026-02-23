import { AboutSection } from "@/components/AboutSection";
import { SelectedWork } from "@/components/SelectedWork";
import { ContactCTASection } from "@/components/ContactCTASection";
import { siteConfig } from "@/content/site";
import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata({
  title: "Home",
  description: `${siteConfig.tagline} - ${siteConfig.description}`,
  keywords: ["portfolio", "software developer", "full-stack"],
});

export const revalidate = 3600;

export default function Home() {
  return (
    <>
      {/* Hero → About Me cinematic (200vh sticky scroll) */}
      <AboutSection />

      {/* Selected Work — immediately follows, no gap, no spacer */}
      <SelectedWork />

      {/* Contact CTA — cinematic takeover before footer */}
      <ContactCTASection />
    </>
  );
}
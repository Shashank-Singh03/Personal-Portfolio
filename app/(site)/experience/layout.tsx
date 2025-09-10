import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata.experience();

export default function ExperienceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

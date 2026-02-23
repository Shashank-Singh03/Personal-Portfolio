import { SideNav } from "@/components/SideNav";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SideNav />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

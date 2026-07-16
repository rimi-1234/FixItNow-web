import { MarketingHeader } from "@/components/layout/marketing-header";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { ScrollProgressBar } from "@/components/chrome/scroll-progress-bar";
import { ScrollToTopButton } from "@/components/chrome/scroll-to-top-button";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col scroll-smooth">
      <ScrollProgressBar />
      <MarketingHeader />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <MarketingFooter />
      <ScrollToTopButton />
    </div>
  );
}

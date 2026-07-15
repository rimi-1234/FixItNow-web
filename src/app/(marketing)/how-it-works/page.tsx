import type { Metadata } from "next";
import { HowItWorksSection } from "@/features/customer-dashboard/components/how-it-works-section";

export const metadata: Metadata = {
  title: "How It Works",
  description: "Learn how FixItNow connects you with skilled technicians in three simple steps.",
};

export default function HowItWorksPage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <h1 className="text-4xl font-bold text-foreground tracking-tight">How It Works</h1>
        <p className="mt-3 text-lg text-muted-foreground">Book professional home services in three simple steps</p>
      </div>
      <HowItWorksSection />
    </div>
  );
}

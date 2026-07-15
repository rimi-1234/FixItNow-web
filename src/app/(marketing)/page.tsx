import { HeroSection } from "@/features/customer-dashboard/components/hero-section";
import { CategoriesSection } from "@/features/customer-dashboard/components/categories-section";
import { HowItWorksSection } from "@/features/customer-dashboard/components/how-it-works-section";
import { FeaturedTechniciansSection } from "@/features/customer-dashboard/components/featured-technicians-section";
import { CTASection } from "@/features/customer-dashboard/components/cta-section";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <HowItWorksSection />
      <FeaturedTechniciansSection />
      <CTASection />
    </>
  );
}

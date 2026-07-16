import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { LandingHeroSection } from "@/features/marketing/components/landing-hero-section";
import { RouteVisualizerSection } from "@/features/marketing/components/route-visualizer-section";
import { LandingFeaturesSection } from "@/features/marketing/components/landing-features-section";
import { CategoriesSection } from "@/features/customer-dashboard/components/categories-section";
import { HowItWorksSection } from "@/features/customer-dashboard/components/how-it-works-section";
import { FeaturedTechniciansSection } from "@/features/customer-dashboard/components/featured-technicians-section";
import { CTASection } from "@/features/customer-dashboard/components/cta-section";

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
};

export default function HomePage() {
  return (
    <>
      <LandingHeroSection />
      <CategoriesSection />
      <HowItWorksSection />
      <RouteVisualizerSection />
      <LandingFeaturesSection />
      <FeaturedTechniciansSection />
      <CTASection />
    </>
  );
}

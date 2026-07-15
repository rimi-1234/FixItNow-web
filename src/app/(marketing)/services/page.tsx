import type { Metadata } from "next";
import { ServicesPageContent } from "@/features/services/components/services-page";

export const metadata: Metadata = {
  title: "Browse Services",
  description: "Find professional home services near you — plumbing, electrical, cleaning, painting, and more.",
};

export default function ServicesPage() {
  return <ServicesPageContent />;
}

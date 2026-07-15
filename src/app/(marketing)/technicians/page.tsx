import type { Metadata } from "next";
import { TechniciansPageContent } from "@/features/technicians/components/technicians-page";

export const metadata: Metadata = {
  title: "Browse Technicians",
  description: "Find skilled, verified technicians near you. Filter by skill, location, and experience.",
};

export default function TechniciansPage() {
  return <TechniciansPageContent />;
}

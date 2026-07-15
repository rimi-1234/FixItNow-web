import type { Metadata } from "next";
import { TechnicianDetailPage } from "@/features/technicians/components/technician-detail-page";

export const metadata: Metadata = {
  title: "Technician Profile",
};

export default async function TechnicianPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <TechnicianDetailPage id={id} />;
}

import type { Metadata } from "next";
import { TechnicianProfileEditor } from "@/features/technician-dashboard/components/technician-profile-editor";

export const metadata: Metadata = { title: "My Profile" };

export default function TechnicianProfilePage() {
  return <TechnicianProfileEditor />;
}

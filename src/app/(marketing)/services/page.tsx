import type { Metadata } from "next";
import { ServicesPageContent } from "@/features/services/components/services-page";

export const metadata: Metadata = {
  title: "Browse Services",
  description: "Find professional plumbing, electrical, cleaning, painting, repair, and home care services.",
};

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ categoryId?: string | string[] }>;
}) {
  const query = await searchParams;
  const initialCategoryId = Array.isArray(query.categoryId)
    ? query.categoryId[0]
    : query.categoryId;

  return <ServicesPageContent initialCategoryId={initialCategoryId} />;
}

const SERVICE_PLACEHOLDERS = {
  plumbing: "/images/placeholders/services/plumbing.svg",
  electrical: "/images/placeholders/services/electrical.svg",
  cleaning: "/images/placeholders/services/cleaning.svg",
  painting: "/images/placeholders/services/painting.svg",
  carpentry: "/images/placeholders/services/carpentry.svg",
  "air-conditioning": "/images/placeholders/services/air-conditioning.svg",
  "appliance-repair": "/images/placeholders/services/appliance-repair.svg",
  handyman: "/images/placeholders/services/handyman.svg",
  default: "/images/placeholders/services/home-service.svg",
} as const;

const TECHNICIAN_PLACEHOLDERS = [
  "/images/placeholders/technicians/tech-01.svg",
  "/images/placeholders/technicians/tech-02.svg",
  "/images/placeholders/technicians/tech-03.svg",
  "/images/placeholders/technicians/tech-04.svg",
  "/images/placeholders/technicians/tech-05.svg",
  "/images/placeholders/technicians/tech-06.svg",
] as const;

const SERVICE_KEYWORDS = [
  ["plumbing", ["plumb", "pipe", "leak", "water", "drain", "faucet"]],
  ["electrical", ["electric", "wiring", "wire", "light", "power", "socket"]],
  ["cleaning", ["clean", "maid", "sanitize", "housekeeping"]],
  ["painting", ["paint", "decorat", "wall color"]],
  ["carpentry", ["carpent", "wood", "furniture"]],
  ["air-conditioning", ["air condition", "air-condition", "ac repair", "hvac", "cooling"]],
  ["appliance-repair", ["appliance", "washing machine", "refrigerator", "fridge", "oven"]],
  ["handyman", ["handyman", "maintenance", "repair", "installation"]],
] as const;

interface CategoryMediaInput {
  id?: string;
  name?: string;
  slug?: string;
}

interface ServiceMediaInput {
  id?: string;
  name?: string;
  description?: string;
  category?: CategoryMediaInput | null;
}

interface TechnicianMediaInput {
  id?: string;
  email?: string;
}

function normalize(value: string | undefined): string {
  return value?.toLowerCase().replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim() ?? "";
}

function resolveServiceKey(...values: Array<string | undefined>): keyof typeof SERVICE_PLACEHOLDERS {
  const searchable = values.map(normalize).filter(Boolean).join(" ");

  for (const [key, keywords] of SERVICE_KEYWORDS) {
    if (keywords.some((keyword) => searchable.includes(keyword))) {
      return key;
    }
  }

  return "default";
}

function stableHash(value: string): number {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) | 0;
  }

  return Math.abs(hash);
}

export function resolveCategoryImage(category: CategoryMediaInput): string {
  const key = resolveServiceKey(category.slug, category.name);
  return SERVICE_PLACEHOLDERS[key];
}

export function resolveServiceImage(service: ServiceMediaInput): string {
  const key = resolveServiceKey(
    service.category?.slug,
    service.category?.name,
    service.name,
    service.description
  );

  return SERVICE_PLACEHOLDERS[key];
}

export function resolveTechnicianImage(technician: TechnicianMediaInput): string {
  const seed = technician.id || technician.email || "fixitnow-technician";
  const index = stableHash(seed) % TECHNICIAN_PLACEHOLDERS.length;

  return TECHNICIAN_PLACEHOLDERS[index] ?? TECHNICIAN_PLACEHOLDERS[0];
}

export const placeholderMedia = {
  services: SERVICE_PLACEHOLDERS,
  technicians: TECHNICIAN_PLACEHOLDERS,
} as const;

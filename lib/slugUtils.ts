/**
 * Convert service title to slug
 * e.g., "Web Development" -> "web-development"
 */
import servicesData from "@/data/services.json";

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function generateServiceSlug(title: string): string {
  return slugify(title);
}

// Build mappings from data file so slugs are editable in content
const serviceIdToSlug: Record<number, string> = {};
const slugToServiceId: Record<string, number> = {};

servicesData.forEach((s: { id: number; slug?: string; title?: string }) => {
  const slug = (s.slug as string) || slugify(s.title || `service-${s.id}`);
  serviceIdToSlug[s.id] = slug;
  slugToServiceId[slug] = s.id;
});

export function getServiceSlug(serviceId: number): string {
  return serviceIdToSlug[serviceId] || generateServiceSlug(`service-${serviceId}`);
}

export function getServiceIdFromSlug(slug: string): number | null {
  const id = slugToServiceId[slug.toLowerCase()];
  return typeof id === "number" ? id : null;
}

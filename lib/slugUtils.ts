/**
 * Convert service title to slug
 * e.g., "Web Development" -> "web-development"
 */
export function generateServiceSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}

/**
 * Map service ID to slug
 */
const serviceIdToSlug: Record<number, string> = {
  1: "web-development",
  2: "ui-ux-design",
  3: "branding",
};

export function getServiceSlug(serviceId: number): string {
  return serviceIdToSlug[serviceId] || generateServiceSlug(`Service ${serviceId}`);
}

/**
 * Map slug to service ID
 */
const slugToServiceId: Record<string, number> = {
  "web-development": 1,
  "ui-ux-design": 2,
  branding: 3,
};

export function getServiceIdFromSlug(slug: string): number | null {
  return slugToServiceId[slug.toLowerCase()] || null;
}

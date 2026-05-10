/**
 * Get portfolio slug from ID
 */
import portfolioData from "@/data/portfolio.json";

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const portfolioIdToSlug: Record<number, string> = {};
const slugToPortfolioId: Record<string, number> = {};

portfolioData.forEach((p: any) => {
  const slug = (p.slug as string) || slugify(p.title || `project-${p.id}`);
  portfolioIdToSlug[p.id] = slug;
  slugToPortfolioId[slug] = p.id;
});

export function getPortfolioSlug(portfolioId: number): string {
  return portfolioIdToSlug[portfolioId] || "";
}

export function getPortfolioIdFromSlug(slug: string): number | null {
  const id = slugToPortfolioId[slug.toLowerCase()];
  return typeof id === "number" ? id : null;
}

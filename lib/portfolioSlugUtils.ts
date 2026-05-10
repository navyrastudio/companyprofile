/**
 * Get portfolio slug from ID
 */
const portfolioIdToSlug: Record<number, string> = {
  1: "koha-coffee",
  2: "navyra",
  3: "olivia",
  4: "vella",
  5: "arkana",
  6: "lumira",
};

export function getPortfolioSlug(portfolioId: number): string {
  return portfolioIdToSlug[portfolioId] || "";
}

/**
 * Map slug to portfolio ID
 */
const slugToPortfolioId: Record<string, number> = {
  "koha-coffee": 1,
  navyra: 2,
  olivia: 3,
  vella: 4,
  arkana: 5,
  lumira: 6,
};

export function getPortfolioIdFromSlug(slug: string): number | null {
  return slugToPortfolioId[slug.toLowerCase()] || null;
}

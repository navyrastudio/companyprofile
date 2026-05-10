import companyData from '@/data/company.json';
import portfolioData from '@/data/portfolio.json';
import servicesData from '@/data/services.json';
import { getPortfolioSlug } from '@/lib/portfolioSlugUtils';
import { getServiceSlug } from '@/lib/slugUtils';

export async function GET() {
  const siteUrl = companyData.siteUrl || 'https://navyra.id';

  const urls: string[] = [
    `${siteUrl}/`,
    `${siteUrl}/about`,
    `${siteUrl}/portfolio`,
    `${siteUrl}/layanan`,
  ];

  type PortfolioItem = { id: number; slug?: string };
  type ServiceItem = { id: number; slug?: string };

  const portfolioList = portfolioData as PortfolioItem[];
  portfolioList.forEach((p) => {
    const slug = getPortfolioSlug(p.id);
    if (slug) urls.push(`${siteUrl}/portfolio/${slug}`);
  });

  const servicesList = servicesData as ServiceItem[];
  servicesList.forEach((s) => {
    const slug = getServiceSlug(s.id);
    if (slug) urls.push(`${siteUrl}/layanan/${slug}`);
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((url) => `<url><loc>${url}</loc></url>`)
    .join('\n')}\n</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
    },
  });
}

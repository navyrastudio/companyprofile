import { Metadata } from "next";
import { notFound } from "next/navigation";
import PortfolioDetail from "@/components/sections/PortfolioDetail";
import { getPortfolioIdFromSlug, getPortfolioSlug } from "@/lib/portfolioSlugUtils";
import portfolioData from "@/data/portfolio.json";
import companyData from "@/data/company.json";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const portfolioId = getPortfolioIdFromSlug(slug);

  if (!portfolioId) {
    return {
      title: "Project tidak ditemukan - Navyra Studio",
    };
  }

  const project = portfolioData.find((p) => p.id === portfolioId);

  const siteUrl = companyData.siteUrl || "https://navyra.id";
  const title = `${project?.title} - Proyek | Navyra Studio`;
  const description = project?.description || "Lihat detail proyek kami";

  const imageUrl = project?.image ? `${siteUrl}${project.image}` : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteUrl}/portfolio/${slug}`,
      images: imageUrl ? [{ url: imageUrl }] : undefined,
    },
    twitter: {
      title,
      description,
    },
  };
}

export async function generateStaticParams() {
  return portfolioData.map((project) => ({
    slug: getPortfolioSlug(project.id),
  }));
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;
  const portfolioId = getPortfolioIdFromSlug(slug);

  if (!portfolioId) {
    notFound();
  }

  return (
    <>
      <main className="min-h-screen bg-white">
        <PortfolioDetail portfolioId={portfolioId} />
      </main>
    </>
  );
}

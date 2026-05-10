import { Metadata } from "next";
import { notFound } from "next/navigation";
import PortfolioDetail from "@/components/sections/PortfolioDetail";
import { getPortfolioIdFromSlug, getPortfolioSlug } from "@/lib/portfolioSlugUtils";
import portfolioData from "@/data/portfolio.json";

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

  return {
    title: `${project?.title} - Portofolio | Navyra Studio`,
    description: project?.description || "Lihat detail project kami",
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

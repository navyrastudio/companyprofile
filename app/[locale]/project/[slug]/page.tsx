import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ProjectDetail from "@/components/sections/ProjectDetail";
import { getPortfolioIdFromSlug, getPortfolioSlug } from "@/lib/portfolioSlugUtils";
import portfolioData from "@/data/portfolio.json";
import companyData from "@/data/company.json";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const portfolioId = getPortfolioIdFromSlug(slug);

  if (!portfolioId) {
    return { title: t("projectNotFound") };
  }

  const project = portfolioData.find((p) => p.id === portfolioId);
  const siteUrl = companyData.siteUrl || "https://navyra.id";
  const title = `${project?.title} - ${t("projectSuffix")}`;
  const description = project?.description || t("projectDescriptionFallback");
  const imageUrl = project?.image ? `${siteUrl}${project.image}` : undefined;

  return {
    title,
    description,
    openGraph: {
      title, description,
      url: `${siteUrl}/${locale}/project/${slug}`,
      images: imageUrl ? [{ url: imageUrl }] : undefined,
    },
    twitter: { title, description },
  };
}

export async function generateStaticParams() {
  return portfolioData.map((project) => ({
    slug: getPortfolioSlug(project.id),
  }));
}

export default async function ProjectDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const portfolioId = getPortfolioIdFromSlug(slug);

  if (!portfolioId) notFound();

  return (
    <main className="min-h-screen bg-white">
      <ProjectDetail portfolioId={portfolioId} />
    </main>
  );
}

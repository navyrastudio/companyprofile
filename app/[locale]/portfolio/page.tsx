import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import PortfolioGrid from "@/components/sections/PortfolioGrid";
import companyData from "@/data/company.json";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const siteUrl = companyData.siteUrl || "https://navyra.id";

  return {
    title: t("portfolioTitle"),
    description: t("portfolioDescription"),
    openGraph: {
      title: t("portfolioTitle"),
      description: t("portfolioDescription"),
      url: `${siteUrl}/${locale}/portfolio`,
    },
    twitter: {
      title: t("portfolioTitle"),
      description: t("portfolioDescription"),
    },
  };
}

export default async function PortfolioPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-white">
      <PortfolioGrid />
    </main>
  );
}

import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ProjectGrid from "@/components/sections/ProjectGrid";
import companyData from "@/data/company.json";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const siteUrl = companyData.siteUrl || "https://navyra.id";

  return {
    title: t("projectTitle"),
    description: t("projectDescription"),
    openGraph: {
      title: t("projectTitle"),
      description: t("projectDescription"),
      url: `${siteUrl}/${locale}/project`,
    },
    twitter: {
      title: t("projectTitle"),
      description: t("projectDescription"),
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-white">
      <ProjectGrid />
    </main>
  );
}

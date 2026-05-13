import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import AboutSection from "@/components/sections/AboutSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import ClientsSection from "@/components/sections/ClientsSection";
import companyData from "@/data/company.json";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: t("siteTitle"),
    description: t("siteDescription"),
    keywords: [
      "Digital Agency", "Web Development", "UI/UX Design",
      "Brand Identity", "Design Studio", "Navyra Studio", "Surakarta",
    ],
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: companyData.siteUrl || "https://navyra.id",
      type: "website",
      locale: locale === "id" ? "id_ID" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: t("siteTitle"),
      description: t("twitterDescription"),
    },
    robots: {
      index: true, follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <PortfolioSection />
      <ServicesSection />
      <AboutSection />
      <ClientsSection />
      <FAQSection />
      <CTASection />
    </>
  );
}

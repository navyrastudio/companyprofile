import { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import StatsSection from "@/components/sections/StatsSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import AboutSection from "@/components/sections/AboutSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import ClientsSection from "@/components/sections/ClientsSection";
import companyData from "@/data/company.json";

export const metadata: Metadata = {
  title: "Navyra Studio - Digital Agency & Design Studio Indonesia",
  description:
    "Navyra Studio membantu bisnis Anda berkembang dengan solusi digital terpadu: Web Development, UI/UX Design, dan Branding. Tim profesional siap mewujudkan visi digital Anda.",
  keywords: [
    "Digital Agency",
    "Web Development",
    "UI/UX Design",
    "Brand Identity",
    "Design Studio",
    "Navyra Studio",
    "Surakarta",
  ],
  openGraph: {
    title: "Navyra Studio - Merancang Produk Digital yang Bertumbuh Bersama Bisnis Anda",
    description:
      "Solusi digital terpadu: Web Development, UI/UX Design, dan Branding untuk membantu bisnis Anda berkembang di era digital.",
    url: companyData.siteUrl || "https://navyra.id",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Navyra Studio - Digital Agency Indonesia",
    description:
      "Web Development, UI/UX Design, dan Branding untuk pertumbuhan bisnis digital Anda.",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <ClientsSection />
      <ServicesSection />
      {/* <StatsSection /> */}
      <PortfolioSection />
      <AboutSection />
      <FAQSection />
      <CTASection />
    </>
  );
}

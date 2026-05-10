import { Metadata } from "next";
import PortfolioGrid from "@/components/sections/PortfolioGrid";
import companyData from "@/data/company.json";

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = companyData.siteUrl || "https://navyra.id";
  const title = "Proyek Lengkap - Navyra Studio";
  const description = "Jelajahi seluruh proyek dan proyek yang telah kami selesaikan untuk berbagai klien dengan kategori yang berbeda-beda.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteUrl}/portfolio`,
    },
    twitter: {
      title,
      description,
    },
  };
}

export default function PortfolioPage() {
  return (
    <>
      <main className="min-h-screen bg-white">
        <PortfolioGrid />
      </main>
    </>
  );
}

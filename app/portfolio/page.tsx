import { Metadata } from "next";
import PortfolioGrid from "@/components/sections/PortfolioGrid";

export const metadata: Metadata = {
  title: "Portofolio Lengkap - Navyra Studio",
  description: "Jelajahi seluruh portofolio dan proyek yang telah kami selesaikan untuk berbagai klien dengan kategori yang berbeda-beda.",
};

export default function PortfolioPage() {
  return (
    <>
      <main className="min-h-screen bg-white">
        <PortfolioGrid />
      </main>
    </>
  );
}

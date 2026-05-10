import { Metadata } from "next";
import PortfolioGrid from "@/components/sections/PortfolioGrid";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Portofolio Lengkap - Navyra Studio",
  description: "Jelajahi seluruh portofolio dan proyek yang telah kami selesaikan untuk berbagai klien dengan kategori yang berbeda-beda.",
};

export default function PortfolioPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <PortfolioGrid />
      </main>
      <Footer />
    </>
  );
}

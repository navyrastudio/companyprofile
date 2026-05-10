import { Metadata } from "next";
import ServicesAccordion from "./ServicesAccordion";

export const metadata: Metadata = {
  title: "Layanan Lengkap - Navyra Studio",
  description: "Jelajahi layanan lengkap Navyra Studio dengan pricelist transparan untuk setiap kategori kebutuhan digital Anda.",
};

export default function LayananPage() {
  return (
    <div className="min-h-screen bg-white">
      <ServicesAccordion />
    </div>
  );
}
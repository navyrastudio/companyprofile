import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SplashScreen from "@/components/ui/SplashScreen";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Navyra Studio",
  description:
    "Merancang Produk Digital yang Bertumbuh Bersama Bisnis Anda. Kami membantu bisnis menghadirkan website, sistem, dan identitas visual yang tidak hanya terlihat modern, tetapi juga memberikan dampak nyata bagi perkembangan brand dan pengalaman pengguna.",
  keywords: [
    "Brand Identity",
    "Web Development",
    "UI/UX design",
    "Digital Agency",
    "Surakarta",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} ${poppins.variable} antialiased`}>
      <body className="bg-white text-slate-900" style={{ scrollBehavior: "smooth" }}>
        <SplashScreen />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

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
    "Merancang Produk Digital yang Bertumbuh Bersama Bisnis Anda.",
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
  return children;
}

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
  title: "Navyra Studio — Creative Digital Agency",
  description:
    "Studio kreatif yang berfokus pada desain brand, visual, dan digital untuk membantu bisnis tampil berkesan dan relevan di era digital.",
  keywords: [
    "brand identity",
    "web design",
    "UI/UX design",
    "digital agency",
    "Jakarta",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} ${poppins.variable} antialiased`}>
      <body className="h-screen overflow-hidden bg-white text-slate-900">
        <SplashScreen />
        {/* Explicit scroll container — snap-y snap-mandatory must be on the actual scrolling element */}
        <div
          id="scroll-container"
          className="h-full overflow-y-scroll snap-y snap-proximity"
          style={{ scrollbarWidth: "thin", scrollbarColor: "#1A56DB #f1f5f9", scrollBehavior: "smooth" }}
        >
          <Navbar />
          <main>{children}</main>
          {/* Footer as last snap target */}
          <div className="snap-start">
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}

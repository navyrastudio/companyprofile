import Image from "next/image";
import Button from "@/components/ui/Button";
import { ScrollIcon, TrendIcon } from "@/components/ui/Icons";
import companyData from "@/data/company.json";

export default function HeroSection() {
  return (
    <section
      id="beranda"
      className="relative min-h-screen flex items-center overflow-hidden bg-white pt-16"
    >
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#1A56DB 1px, transparent 1px), linear-gradient(90deg, #1A56DB 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Gradient blobs */}
      <div className="absolute top-0 right-0 w-150 h-150 bg-linear-to-bl from-blue-100/60 via-blue-50/30 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-100 h-100 bg-linear-to-tr from-blue-50/40 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center py-16 lg:py-20">
          {/* Left: Content */}
          <div className="flex flex-col gap-6 max-w-xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 w-fit px-3 py-1.5 rounded-full border border-blue-200 bg-blue-50">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
                Navyra Studio
              </span>
            </div>

            {/* Heading */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-gray-900 leading-[1.1] tracking-tight">
                {companyData.tagline}
              </h1>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-blue-600 leading-[1.1] tracking-tight">
                {companyData.taglineAccent}
              </h1>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-gray-500 leading-relaxed max-w-lg">
              {companyData.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-1">
              <Button href="#portofolio" variant="primary" size="lg" showArrow>
                Lihat Portofolio
              </Button>
              <Button href="#tentang" variant="outline" size="lg">
                Tentang Kami
              </Button>
            </div>

            {/* Scroll indicator */}
            <div className="flex items-center gap-2 mt-4 text-gray-400">
              <ScrollIcon className="w-5 h-5" />
              <span className="text-xs font-medium tracking-wide">
                Scroll untuk menjelajahi
              </span>
            </div>
          </div>

          {/* Right: Hero 3D image */}
          <div className="relative flex items-center justify-center h-105 lg:h-130">
            {/* Glow behind image */}
            <div className="absolute inset-8 bg-blue-300/20 rounded-full blur-3xl pointer-events-none" />

            {/* 3D image */}
            <div className="relative w-80 h-80 lg:w-[480px] lg:h-[480px]">
              <Image
                src="/heroicon.png"
                alt="Navyra Studio 3D Mark"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>

            {/* Floating card 1 - highlights */}
            <div className="absolute top-6 right-0 lg:-right-4 bg-white rounded-2xl shadow-lg shadow-blue-100/50 border border-gray-100 p-4 min-w-35">
              <div className="flex flex-col gap-1.5">
                {companyData.highlights.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                    <span className="text-xs font-medium text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating card 2 - since year */}
            <div className="absolute bottom-10 right-2 lg:right-0 bg-white rounded-2xl shadow-lg shadow-blue-100/50 border border-gray-100 p-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <TrendIcon className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                    Since {companyData.since}
                  </span>
                </div>
                {/* Mini chart bars */}
                <div className="flex items-end gap-1 h-8">
                  {[30, 50, 40, 70, 55, 80, 65, 90].map((h, i) => (
                    <div
                      key={i}
                      className="w-3 rounded-sm bg-blue-100"
                      style={{ height: `${h}%` }}
                    >
                      <div
                        className="w-full rounded-sm bg-blue-500"
                        style={{ height: i >= 5 ? "100%" : "60%" }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating dot decorations */}
            <div className="absolute top-14 left-4 w-3 h-3 rounded-full bg-blue-400 opacity-60" />
            <div className="absolute top-28 left-0 w-2 h-2 rounded-full bg-blue-300 opacity-40" />
            <div className="absolute bottom-20 left-6 w-4 h-4 rounded-full bg-blue-200 opacity-50" />
          </div>
        </div>
      </div>
    </section>
  );
}

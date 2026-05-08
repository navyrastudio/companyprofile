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
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59,130,246,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.4) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Gradient orbs */}
      <div className="absolute top-0 right-0 w-150 h-150 bg-blue-200/40 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-100 h-100 bg-blue-100/60 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-100 bg-blue-50/80 blur-[80px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center py-16 lg:py-24">
          {/* Left: Content */}
          <div className="flex flex-col gap-7 max-w-xl">
            {/* Badge */}
            <div className="animate-hero-badge inline-flex items-center gap-2.5 w-fit px-4 py-2 border border-blue-500/30 bg-blue-50 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 bg-blue-600 animate-pulse" />
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-[0.2em]">
                Navyra Studio — Creative Digital Agency
              </span>
            </div>

            {/* Heading */}
            <div className="animate-hero-h1 space-y-1">
              <h1 className="text-4xl sm:text-5xl lg:text-[3.75rem] font-bold text-slate-900 leading-[1.08] tracking-tight">
                {companyData.tagline}
              </h1>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.75rem] font-bold text-blue-600 leading-[1.08] tracking-tight">
                {companyData.taglineAccent}
              </h1>
            </div>

            {/* Description */}
            <p className="animate-hero-desc text-base sm:text-lg text-slate-600 leading-relaxed max-w-lg">
              {companyData.description}
            </p>

            {/* Horizontal rule */}
            <div className="w-16 h-px bg-blue-500/50" />

            {/* CTAs */}
            <div className="animate-hero-cta flex flex-wrap gap-3">
              <Button href="#portofolio" variant="primary" size="lg" showArrow>
                Lihat Portofolio
              </Button>
              <Button href="#tentang" variant="outline" size="lg">
                Tentang Kami
              </Button>
            </div>

            {/* Scroll indicator */}
            <div className="flex items-center gap-2 text-slate-400 mt-2">
              <ScrollIcon className="w-4 h-4" />
              <span className="text-xs font-medium tracking-widest uppercase">
                Scroll untuk menjelajahi
              </span>
            </div>
          </div>

          {/* Right: Hero 3D image */}
          <div className="animate-hero-image relative flex items-center justify-center h-95 sm:h-115 lg:h-135">
            {/* Glow behind image */}
            <div className="absolute inset-12 bg-blue-200/40 blur-3xl pointer-events-none" />

            {/* 3D image */}
            <div className="relative w-72 h-72 sm:w-95 sm:h-95 lg:w-115 lg:h-115 animate-float">
              <Image
                src="/heroicon.png"
                alt="Navyra Studio 3D Mark"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>

            {/* Floating card 1 - highlights */}
            <div className="animate-hero-card1 absolute top-4 right-0 lg:-right-2 bg-white/95 backdrop-blur-md border border-slate-200 shadow-md p-4 min-w-35">
              <div className="flex flex-col gap-2">
                {companyData.highlights.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-blue-600 shrink-0" />
                    <span className="text-xs font-medium text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating card 2 - since year */}
            <div className="animate-hero-card2 absolute bottom-8 right-2 lg:right-0 bg-white/95 backdrop-blur-md border border-slate-200 shadow-md p-4">
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-2">
                  <TrendIcon className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-semibold text-slate-700 uppercase tracking-widest">
                    Since {companyData.since}
                  </span>
                </div>
                {/* Mini chart bars */}
                <div className="flex items-end gap-1 h-8">
                  {[30, 50, 40, 70, 55, 80, 65, 90].map((h, i) => (
                    <div
                      key={i}
                      className="w-2.5 bg-blue-100"
                      style={{ height: `${h}%` }}
                    >
                      <div
                        className="w-full bg-blue-500"
                        style={{ height: i >= 5 ? "100%" : "60%" }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Corner decorations */}
            <div className="absolute top-0 left-4 w-px h-12 bg-linear-to-b from-blue-500/60 to-transparent" />
            <div className="absolute top-0 left-4 w-8 h-px bg-linear-to-r from-blue-500/60 to-transparent" />
            <div className="absolute bottom-0 right-4 w-px h-12 bg-linear-to-t from-blue-500/60 to-transparent" />
            <div className="absolute bottom-0 right-4 w-8 h-px bg-linear-to-l from-blue-500/60 to-transparent" />
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}

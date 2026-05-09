import Image from "next/image";
import companyData from "@/data/company.json";
import Button from "@/components/ui/Button";

export default function HeroSection() {
  return (
    <section
      id="beranda"
      className="snap-start relative min-h-screen bg-white flex items-center justify-center overflow-hidden"
    >
      {/* Gradient orb — top left */}
      <div
        className="animate-orb-1 absolute -top-40 -left-40 w-150 h-150 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(26,86,219,0.20) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Gradient orb — bottom right */}
      <div
        className="animate-orb-2 absolute -bottom-48 -right-48 w-175 h-175 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(99,143,230,0.16) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Gradient orb — top right accent */}
      <div
        className="animate-orb-3 absolute top-10 right-0 w-87.5 h-87.5 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(147,197,253,0.15) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(148,163,184,0.45) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Edge vignette — fade dots to white at edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 75% 70% at 50% 50%, transparent 40%, rgba(255,255,255,0.85) 75%, white 100%)",
        }}
      />

      {/* Content */}
      <div className="relative flex flex-col items-center text-center gap-7 px-6 max-w-4xl mx-auto pt-14 sm:pt-16 lg:pt-18">

        {/* Logo — float animation */}
        <Image
          src="/navyra-logo.png"
          alt="Navyra Studio"
          width={200}
          height={200}
          className="animate-hero-logo object-contain"
          priority
        />

        {/* Eyebrow badge */}
        <div className="animate-hero-badge inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-slate-200 bg-white/80 backdrop-blur-sm shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-500">
            Digital Studio
          </span>
          <span className="w-px h-3 bg-slate-200" />
          <span className="text-[10px] font-medium text-blue-500 tracking-wide">Est. 2026</span>
        </div>

        {/* Heading */}
        <h1 className="animate-hero-h1 text-2xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
         Merancang Produk Digital yang <span className="text-brand">Bertumbuh Bersama Bisnis Anda</span>
        </h1>

        {/* Description */}
        <p className="animate-hero-desc text-slate-400 text-xs sm:text-base leading-relaxed max-w-3xl">
          {companyData.description}
        </p>

        {/* CTA */}
        <div className="animate-hero-cta">
          <Button href="#kontak" variant="primary" showArrow>
            Mari Bekerja Sama
          </Button>
        </div>

      </div>

      {/* Scroll-down hint */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-hero-cta pointer-events-none">
        <span className="text-[9px] uppercase tracking-[0.3em] text-slate-400 font-medium">Scroll</span>
        <div className="animate-scroll-bounce">
          <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}



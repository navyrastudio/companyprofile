import Button from "@/components/ui/Button";
import AnimateIn from "@/components/ui/AnimateIn";

export default function CTASection() {
  return (
    <section
      id="kontak"
      className="snap-start relative min-h-screen bg-white flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ── Ambient orbs (same language as Hero) ── */}
      <div
        className="animate-orb-2 absolute -bottom-40 -left-40 w-150 h-150 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(26,86,219,0.18) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="animate-orb-1 absolute -top-48 -right-32 w-175 h-175 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(99,143,230,0.14) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="animate-orb-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-100 h-100 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(147,197,253,0.10) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* ── Dot grid ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(148,163,184,0.40) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* ── Edge vignette ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 75% 70% at 50% 50%, transparent 40%, rgba(255,255,255,0.85) 75%, white 100%)",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl mx-auto gap-10">

        {/* Top accent line */}
        <AnimateIn from="bottom">
          <div className="flex items-center gap-3">
            <div className="h-px w-10 bg-brand/30" />
            <span className="text-[10px] uppercase tracking-[0.35em] text-brand font-semibold">
              Mulai Proyek
            </span>
            <div className="h-px w-10 bg-brand/30" />
          </div>
        </AnimateIn>

        {/* Heading */}
        <AnimateIn from="bottom">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.1] tracking-tight">
            Punya ide? <br />
            <span className="text-brand">Mari wujudkan bersama.</span>
          </h2>
        </AnimateIn>

        {/* Subtext */}
        <AnimateIn from="bottom">
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-md">
            Kami terbuka untuk kolaborasi — dari brand identity, web, hingga desain produk digital yang berkesan.
          </p>
        </AnimateIn>

        {/* Buttons */}
        <AnimateIn from="bottom">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button href="mailto:navyrastudio@gmail.com" variant="primary" size="lg" showArrow>
              Hubungi Kami
            </Button>
            <Button href="#portofolio" variant="outline" size="lg">
              Lihat Karya
            </Button>
          </div>
        </AnimateIn>

        {/* Email nudge */}
        <AnimateIn from="bottom">
          <p className="text-xs text-slate-400 tracking-wide">
            atau kirim langsung ke{" "}
            <a
              href="mailto:navyrastudio@gmail.com"
              className="text-brand font-medium hover:underline underline-offset-4 transition-colors"
            >
              navyrastudio@gmail.com
            </a>
          </p>
        </AnimateIn>
      </div>

      {/* ── Bottom label ── */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <span className="text-[9px] uppercase tracking-[0.3em] text-slate-300 font-semibold">
          Navyra Studio · 2025
        </span>
      </div>
    </section>
  );
}

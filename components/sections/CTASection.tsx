import Button from "@/components/ui/Button";
import AnimateIn from "@/components/ui/AnimateIn";

export default function CTASection() {
  return (
    <section id="kontak" className="py-16 lg:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section divider */}
        <div className="w-full h-px bg-linear-to-r from-transparent via-slate-300 to-transparent mb-16 lg:mb-20" />

        {/* Tagline above CTA */}
        <AnimateIn from="bottom" className="text-center mb-14 flex flex-col items-center gap-5">
          {/* Pill label */}
          <span className="inline-flex items-center gap-2 px-4 py-1.5 border border-blue-200 bg-blue-50 text-blue-600 text-xs font-semibold uppercase tracking-[0.2em]">
            <span className="w-1.5 h-1.5 bg-blue-500 inline-block" />
            Navyra Studio
          </span>

          {/* Main tagline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-[1.1] tracking-tight max-w-3xl">
            Menciptakan{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-blue-600">Produk Digital</span>
              <span className="absolute -bottom-1 left-0 w-full h-0.75 bg-blue-200" />
            </span>
            {" "}yang Berdampak
            <br className="hidden sm:block" />
            dan{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-blue-600">Visual</span>
              <span className="absolute -bottom-1 left-0 w-full h-0.75 bg-blue-200" />
            </span>
            {" "}yang Bermakna.
          </h2>
          {/* Decorative line */}
          <div className="flex items-center gap-3 mt-2">
            <div className="w-12 h-px bg-slate-300" />
            <div className="w-2 h-2 bg-blue-500 rotate-45" />
            <div className="w-12 h-px bg-slate-300" />
          </div>
        </AnimateIn>

        <AnimateIn from="bottom" delay={150} className="relative overflow-hidden border border-blue-200 bg-linear-to-br from-blue-600 via-blue-700 to-blue-800">
          {/* Background effects */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 blur-3xl pointer-events-none" />

          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-white/30" />
          <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-white/30" />
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-white/30" />
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-white/30" />

          {/* Content */}
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 px-8 py-12 sm:px-12 sm:py-16 lg:px-16">
            <div className="flex flex-col gap-3 max-w-lg">
              <p className="text-blue-100 text-xs font-semibold uppercase tracking-[0.25em]">
                Mari Berkolaborasi
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                Punya Proyek?{" "}
                <span className="text-blue-200">
                  Mari Wujudkan Bersama.
                </span>
              </h2>
              <p className="text-blue-100 text-sm sm:text-base leading-relaxed mt-1">
                Kami siap membantu Anda membangun identitas dan desain yang berkesan.
              </p>
            </div>

            <div className="shrink-0">
              <Button
                href="mailto:hello@navyrastudio.com"
                variant="white"
                size="lg"
                showArrow
              >
                Hubungi Kami
              </Button>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}

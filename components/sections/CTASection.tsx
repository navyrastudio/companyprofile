import Button from "@/components/ui/Button";
import AnimateIn from "@/components/ui/AnimateIn";

export default function CTASection() {
  return (
    <section id="kontak" className="snap-start min-h-screen py-24 lg:py-32 bg-white flex flex-col justify-center">
      <div className="w-full px-6 text-center">

        {/* Divider top */}
        <div className="w-px h-12 bg-linear-to-b from-transparent to-slate-300 mx-auto mb-12" />

        <AnimateIn from="bottom" className="flex flex-col items-center gap-8">

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight tracking-tight">
            Punya proyek? <br />
            <span className="text-brand">Mari wujudkan.</span>
          </h2>

          {/* Subtext */}
          <p className="text-slate-400 text-base leading-relaxed max-w-md">
            Kami terbuka untuk kolaborasi — dari brand identity, web, hingga desain produk digital.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button href="mailto:hello@navyrastudio.com" variant="primary" size="lg" showArrow>
              Hubungi Kami
            </Button>
            <Button href="#portofolio" variant="outline" size="lg">
              Lihat Karya
            </Button>
          </div>

          {/* Email nudge */}
          <p className="text-xs text-slate-400 tracking-wide">
            atau kirim langsung ke{" "}
            <a href="mailto:navyrastudio@gmail.com" className="text-brand hover:underline underline-offset-4">
            navyrastudio@gmail.com            
            </a>
          </p>
        </AnimateIn>

        {/* Divider bottom */}
        <div className="w-px h-12 bg-linear-to-t from-transparent to-slate-300 mx-auto mt-12" />

      </div>
    </section>
  );
}

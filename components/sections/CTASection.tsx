import Button from "@/components/ui/Button";

export default function CTASection() {
  return (
    <section id="kontak" className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-blue-700 via-blue-600 to-blue-800 px-8 py-12 sm:px-12 sm:py-16 lg:px-16">
          {/* Background decorative shapes */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />
          <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-blue-400/20 rounded-full -translate-y-1/2" />

          {/* Content */}
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            <div className="flex flex-col gap-2 max-w-lg">
              <p className="text-blue-200 text-sm font-semibold uppercase tracking-widest">
                Mari Berkolaborasi
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                Punya Proyek?{" "}
                <span className="text-blue-200">
                  Mari Wujudkan Bersama.
                </span>
              </h2>
              <p className="text-blue-100/80 text-sm sm:text-base leading-relaxed mt-1">
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
        </div>
      </div>
    </section>
  );
}

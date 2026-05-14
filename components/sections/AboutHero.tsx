"use client";

import { useTranslations } from "next-intl";
import AnimateIn from "@/components/ui/AnimateIn";
import Button from "@/components/ui/Button";

export default function AboutHero() {
  const t = useTranslations("about");

  return (
    <section className="relative bg-white overflow-hidden">
      {/* Gradient orbs for visual interest */}
      <div
        className="animate-orb-1 absolute -top-32 -left-48 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(26,86,219,0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="animate-orb-2 absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(99,143,230,0.08) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative pt-20 pb-16 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="max-w-4xl">
            {/* Eyebrow */}
            <AnimateIn className="mb-8">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-slate-200 bg-white/50 backdrop-blur-sm shadow-sm">
                <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-600">
                  {t("pageLabel")}
                </span>
              </div>
            </AnimateIn>

            {/* Heading with accent line */}
            <AnimateIn delay={40} className="mb-8">
              <div className="flex items-start gap-6">
                <div className="mt-1 w-1 h-12 bg-linear-to-b from-brand to-brand/0 rounded-full" />
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight tracking-tight">
                  {t("heroHeading")}
                </h1>
              </div>
            </AnimateIn>

            {/* Description */}
            <AnimateIn delay={80}>
              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-10 max-w-3xl font-light">
                {t("heroDescription")}
              </p>
            </AnimateIn>

            {/* CTA */}
            <AnimateIn delay={120}>
              <Button href="#kontak" variant="primary" showArrow>
                {t("heroCTA")}
              </Button>
            </AnimateIn>
          </div>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-8 lg:pt-12 border-t border-slate-100/50">
          <div className="h-px bg-linear-to-r from-transparent via-brand/20 to-transparent" />
        </div>
      </div>
    </section>
  );
}

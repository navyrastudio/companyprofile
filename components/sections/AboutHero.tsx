"use client";

import { useTranslations } from "next-intl";
import AnimateIn from "@/components/ui/AnimateIn";
import Button from "@/components/ui/Button";

export default function AboutHero() {
  const t = useTranslations("about");

  return (
    <section className="relative bg-white pt-20 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <AnimateIn className="mb-6">
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50">
              <span className="w-1.5 h-1.5 rounded-full bg-brand" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600">
                {t("pageLabel")}
              </span>
            </div>
          </AnimateIn>

          {/* Heading */}
          <AnimateIn delay={40}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight tracking-tight mb-6">
              {t("heroHeading")}
            </h1>
          </AnimateIn>

          {/* Description */}
          <AnimateIn delay={80}>
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-8 max-w-2xl">
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

      {/* Subtle divider */}
      <div className="mt-16 sm:mt-20 border-t border-slate-100" />
    </section>
  );
}

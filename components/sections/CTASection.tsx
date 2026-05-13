"use client";

import Button from "@/components/ui/Button";
import AnimateIn from "@/components/ui/AnimateIn";
import companyData from "@/data/company.json";
import { useTranslations } from "next-intl";

export default function CTASection() {
  const t = useTranslations("cta");
  return (
    <section
      id="kontak"
      className="py-24 lg:py-32 bg-white border-t border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* ── Top divider label ── */}
        <AnimateIn className="flex items-center gap-4 mb-16">
          <span className="h-px flex-1 bg-slate-100" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-brand">
            {t("label")}
          </span>
          <span className="h-px flex-1 bg-slate-100" />
        </AnimateIn>

        {/* ── Main content ── */}
        <div className="max-w-3xl mx-auto text-center">
          <AnimateIn>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.05] tracking-tight mb-6">
              {t("heading")} {" "}
              <span className="text-brand">{t("highlight")}</span>
            </h2>
          </AnimateIn>

          <AnimateIn delay={80}>
            <p className="text-slate-400 text-base leading-relaxed max-w-md mx-auto mb-10">
              {t("description")}
            </p>
          </AnimateIn>

          <AnimateIn delay={160}>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button href={`mailto:${companyData.email}`} variant="primary" size="sm" showArrow>
                {t("contactButton")}
              </Button>
            </div>
          </AnimateIn>

          <AnimateIn delay={220}>
            <p className="mt-7 text-xs text-slate-400">
              {t("orSendTo")} {" "}
              <a
                href={`mailto:${companyData.email}`}
                className="text-brand font-medium hover:underline underline-offset-4 transition-colors"
              >
                {companyData.email}
              </a>
            </p>
          </AnimateIn>
        </div>

      </div>
    </section>
  );
}

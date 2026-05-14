"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";
import AnimateIn from "@/components/ui/AnimateIn";
import companyData from "@/data/company.json";
import { useTranslations } from "next-intl";

export default function AboutSection() {
  const t = useTranslations("about");
  const tStats = useTranslations("stats");
  return (
    <section id="tentang" className="py-24 lg:py-32 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* ── Section label ── */}
        <AnimateIn className="mb-16">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-8 bg-brand" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-brand">{t("sectionLabel")}</span>
          </div>
        </AnimateIn>

        {/* ── Two-col ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left col */}
          <AnimateIn from="left" className="space-y-10">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-[1.1] tracking-tight">
              {t("companyHeading")}
            </h2>

            <p className="text-slate-500 text-sm leading-relaxed">
              {t("companyDescription")}
            </p>

            <p className="text-slate-500 text-sm leading-relaxed">
              {t("longDesc")}
            </p>

            {/* Value list */}
            {/* <div className="space-y-4 pt-2">
              {values.map((v: any, i: number) => (
                <div key={i} className="flex gap-4 items-start group">
                  <span className="mt-1 w-1 h-1 rounded-full bg-brand shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-slate-800 mb-0.5">{v.label}</p>
                    <p className="text-xs text-slate-400 leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div> */}

            <Button href="/about" variant="primary" size="sm">
              {t("cta")}
            </Button>
          </AnimateIn>

          {/* Right col — visual */}
          <AnimateIn from="right" delay={100}>
            <div className="relative">
              {/* Main image / studio card */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-50 to-slate-100 border border-slate-200 aspect-[4/3]">
                {/* Grid lines */}
                <div
                  className="absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(26,86,219,1) 1px, transparent 1px), linear-gradient(90deg, rgba(26,86,219,1) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                />

                {/* Center content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <div className="relative bg-white rounded-2xl shadow-lg border border-slate-100 px-8 py-6 flex items-center gap-4">
                    <Image src="/inilogo.png" alt={t("logoAlt")} width={40} height={40} className="w-10 h-10 object-contain" />
                    <div>
                      <p className="text-base font-bold text-slate-900 leading-none">Navyra Studio</p>
                      <p className="text-xs text-slate-400 mt-1">Digital Agency · Est. {companyData.since}</p>
                    </div>
                  </div>

                  {/* Mini metric cards */}
                  <div className="flex gap-3">
                      <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-slate-100 px-4 py-3 text-center shadow-sm">
                      <p className="text-lg font-bold text-slate-900 leading-none">50+</p>
                      <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider">{tStats("labels.project")}</p>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-slate-100 px-4 py-3 text-center shadow-sm">
                      <p className="text-lg font-bold text-slate-900 leading-none">40+</p>
                      <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider">{tStats("labels.client")}</p>
                    </div>
                    <div className="bg-brand rounded-xl px-4 py-3 text-center shadow-sm">
                      <p className="text-lg font-bold text-white leading-none">100%</p>
                      <p className="text-[10px] text-brand-200 mt-1 uppercase tracking-wider">{tStats("labels.quality")}</p>
                    </div>
                  </div>
                </div>

                {/* Corner accents */}
                <span className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-brand/20 rounded-tl-sm" />
                <span className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-brand/20 rounded-br-sm" />
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}

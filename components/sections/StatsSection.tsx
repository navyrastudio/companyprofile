"use client";

import AnimateIn from "@/components/ui/AnimateIn";
import statsData from "@/data/stats.json";

export default function StatsSection() {
  return (
    <section className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* ── Header ── */}
        <AnimateIn className="py-16 lg:py-20 border-b border-slate-800">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-8 bg-brand" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-brand">Pencapaian Kami</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white leading-[1.1] tracking-tight">
                Dipercaya oleh<br />Puluhan Klien
              </h2>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs md:pb-1 shrink-0">
              Kami telah membantu bisnis lokal dan internasional berkembang melalui solusi digital yang inovatif dan berkelanjutan.
            </p>
          </div>
        </AnimateIn>

        {/* ── Stats grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-800 border-b border-slate-800">
          {statsData.map((stat, i) => (
            <AnimateIn
              key={stat.label}
              delay={i * 80}
              className="group flex flex-col gap-2 px-8 py-12 hover:bg-slate-800/50 transition-colors duration-300"
            >
              <span className="text-5xl sm:text-6xl font-bold text-white tabular-nums tracking-tight leading-none group-hover:text-brand transition-colors duration-300">
                {stat.value}
              </span>
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500 mt-1">
                {stat.label}
              </span>
            </AnimateIn>
          ))}
        </div>

      </div>
    </section>
  );
}

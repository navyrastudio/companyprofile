"use client";

import AnimateIn from "@/components/ui/AnimateIn";
import SectionLabel from "@/components/ui/SectionLabel";
import statsData from "@/data/stats.json";

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  project: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  client: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 8.646 4 4 0 010-8.646M9 9H5m14 0h-4M9 9h6M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9" />
    </svg>
  ),
  award: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  quality: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
};

export default function StatsSection() {
  return (
    <section className="py-24 lg:py-32 bg-slate-50 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-100/30 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-brand-50/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <AnimateIn className="flex flex-col items-start gap-4 mb-16">
          <SectionLabel>Pencapaian Kami</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
            Dipercaya oleh Puluhan Klien
          </h2>
          <p className="text-slate-600 leading-relaxed max-w-lg text-sm sm:text-base">
            Kami telah membantu bisnis lokal dan internasional berkembang melalui solusi digital yang inovatif dan berkelanjutan.
          </p>
        </AnimateIn>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-t border-l border-slate-200 overflow-hidden">
          {statsData.map((stat, i) => {
            const IconComponent = iconMap[stat.icon] || iconMap.project;
            return (
              <AnimateIn
                key={stat.label}
                delay={i * 50}
                className="group relative flex flex-col items-center text-center p-6 sm:p-8 border-r border-b border-slate-200 transition-all duration-300 hover:bg-linear-to-br hover:from-blue-50/50 hover:to-slate-50/50 overflow-hidden"
              >
                {/* Content */}
                <div className="relative z-10 flex flex-col items-center">
                  {/* Icon */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded bg-linear-to-br from-brand-100 to-brand-50 flex items-center justify-center mb-4 group-hover:from-brand group-hover:to-brand-600 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-md">
                    <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-brand group-hover:text-white" />
                  </div>

                  {/* Value */}
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-1 group-hover:text-brand transition-colors duration-300 tabular-nums">
                    {stat.value}
                  </div>

                  {/* Label */}
                  <p className="text-xs sm:text-sm text-slate-600 font-medium group-hover:text-slate-900 transition-colors duration-300">
                    {stat.label}
                  </p>
                </div>
              </AnimateIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

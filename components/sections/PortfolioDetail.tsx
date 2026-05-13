"use client";

import Image from "next/image";
import Link from "next/link";
import AnimateIn from "@/components/ui/AnimateIn";
import portfolioData from "@/data/portfolio.json";
import { getPortfolioSlug } from "@/lib/portfolioSlugUtils";

type Project = (typeof portfolioData)[0] & {
  challenge?: string;
  solution?: string;
  workDetails?: string[];
  results?: string;
};

export default function PortfolioDetail({ portfolioId }: { portfolioId: number }) {
  const project = portfolioData.find((p) => p.id === portfolioId) as Project | undefined;
  const idx = portfolioData.findIndex((p) => p.id === portfolioId);
  const prev = idx > 0 ? portfolioData[idx - 1] : portfolioData[portfolioData.length - 1];
  const next = idx < portfolioData.length - 1 ? portfolioData[idx + 1] : portfolioData[0];

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-slate-400 text-sm">Project tidak ditemukan.</p>
      </div>
    );
  }

  const num = String(project.id).padStart(2, "0");

  return (
    <div className="bg-white mt-16 sm:mt-[72px]">

      {/* ══════════════════════════════════════
          HERO — cinematic full-viewport
      ══════════════════════════════════════ */}
      <div className="relative w-full h-[70vh] min-h-[480px] max-h-[780px]">
        <div className="absolute inset-0" style={{ backgroundColor: project.bgColor }} />
        <Image
          src={project.image}
          alt={project.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Multi-stop gradient for readability */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.05) 100%)"
        }} />

        {/* Back link */}
        <Link
          href="/portfolio"
          className="absolute top-6 left-6 lg:left-10 flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-200 group"
        >
          <span className="w-7 h-7 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-200">
            <svg className="w-3 h-3 text-white group-hover:text-slate-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </span>
          <span className="text-xs font-medium">Semua Proyek</span>
        </Link>

        {/* Project number */}
        <div className="absolute top-6 right-6 lg:right-10">
          <span className="text-[11px] font-mono text-white/30">{num}</span>
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 px-6 lg:px-10 pb-10 lg:pb-14 max-w-7xl mx-auto">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.35em] text-white/50">
                    {project.category}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-white/30" />
                  <span className="text-[9px] font-mono text-white/40">{project.year}</span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-[4.5rem] font-bold text-white leading-[1.0] tracking-tight">
                  {project.title}
                </h1>
                <p className="text-white/50 text-sm sm:text-base mt-2 font-light">{project.subtitle}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          META STRIP
      ══════════════════════════════════════ */}
      <div className="border-b border-slate-100 bg-white sticky top-[64px] z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <AnimateIn className="flex items-center gap-8 py-4 overflow-x-auto scrollbar-hide">
            {[
              { label: "Tahun", value: project.year },
              { label: "Kategori", value: project.category },
              { label: "Client", value: project.title },
              ...(project.workDetails ? [{ label: "Deliverable", value: `${project.workDetails.length} Item` }] : []),
            ].map((meta, i, arr) => (
              <div key={meta.label} className="flex items-center gap-8 shrink-0">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.25em] text-slate-400 font-semibold mb-0.5">{meta.label}</p>
                  <p className="text-xs font-bold text-slate-800 whitespace-nowrap">{meta.value}</p>
                </div>
                {i < arr.length - 1 && <div className="w-px h-6 bg-slate-100 shrink-0" />}
              </div>
            ))}
          </AnimateIn>
        </div>
      </div>

      {/* ══════════════════════════════════════
          CONTENT
      ══════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-16 lg:gap-24">

          {/* ── Left: main editorial content ── */}
          <div>
            {/* Description – pull quote style */}
            <AnimateIn>
              <p className="text-slate-700 text-xl sm:text-2xl leading-relaxed font-light border-l-2 border-brand pl-6 mb-16">
                {project.description}
              </p>
            </AnimateIn>

            <div className="space-y-14">
              {/* Challenge */}
              {project.challenge && (
                <AnimateIn delay={60}>
                  <div className="grid grid-cols-[40px_1fr] gap-6">
                    <div className="pt-0.5">
                      <span className="text-[10px] font-mono text-slate-300">01</span>
                    </div>
                    <div>
                      <h2 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brand mb-4">
                        Tantangan
                      </h2>
                      <p className="text-slate-500 leading-relaxed text-sm sm:text-base">
                        {project.challenge}
                      </p>
                    </div>
                  </div>
                </AnimateIn>
              )}

              {/* Solution */}
              {project.solution && (
                <AnimateIn delay={80}>
                  <div className="grid grid-cols-[40px_1fr] gap-6">
                    <div className="pt-0.5">
                      <span className="text-[10px] font-mono text-slate-300">02</span>
                    </div>
                    <div>
                      <h2 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brand mb-4">
                        Solusi
                      </h2>
                      <p className="text-slate-500 leading-relaxed text-sm sm:text-base">
                        {project.solution}
                      </p>
                    </div>
                  </div>
                </AnimateIn>
              )}
            </div>

            {/* Results — full-width dark card */}
            {project.results && (
              <AnimateIn delay={100} className="mt-14">
                <div className="rounded-2xl bg-slate-950 p-8 sm:p-10 relative overflow-hidden">
                  {/* Decorative number */}
                  <span className="absolute top-6 right-8 text-[80px] font-bold text-white/[0.03] select-none leading-none">
                    {num}
                  </span>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/30 mb-5">
                    Hasil & Dampak
                  </p>
                  <p className="text-white text-lg sm:text-xl leading-relaxed font-light relative z-10">
                    &ldquo;{project.results}&rdquo;
                  </p>
                </div>
              </AnimateIn>
            )}
          </div>

          {/* ── Right: sticky sidebar ── */}
          {project.workDetails && project.workDetails.length > 0 && (
            <AnimateIn delay={100} className="lg:sticky lg:top-32 self-start space-y-8">

              {/* Work list */}
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400 mb-6">
                  Pekerjaan Dilakukan
                </p>
                <ul className="space-y-4">
                  {project.workDetails.map((detail, i) => (
                    <li key={i} className="flex items-start gap-3.5 group">
                      <span className="mt-0.5 text-[10px] font-mono text-slate-300 shrink-0 w-5 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm text-slate-500 leading-snug group-hover:text-slate-800 transition-colors duration-200">
                        {detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Divider */}
              <div className="h-px bg-slate-100" />

              {/* CTA */}
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400 mb-3">
                  Tertarik Berkolaborasi?
                </p>
                <a
                  href={`https://wa.me/6285163665100?text=${encodeURIComponent(`Halo, saya tertarik untuk mengerjakan proyek serupa dengan ${project.title}. Boleh kita diskusi?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-slate-900 text-white text-xs font-semibold hover:bg-brand transition-colors duration-200"
                >
                  <svg className="w-3.5 h-3.5 shrink-0 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Diskusi Proyek
                </a>
              </div>
            </AnimateIn>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════
          NEXT / PREV NAVIGATION
      ══════════════════════════════════════ */}
      <div className="border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 divide-x divide-slate-100">

            {[
              { project: prev, dir: "prev", label: "Sebelumnya", icon: "M15 19l-7-7 7-7" },
              { project: next, dir: "next", label: "Selanjutnya", icon: "M9 5l7 7-7 7" },
            ].map(({ project: p, dir, label, icon }) => (
              <Link
                key={dir}
                href={`/portfolio/${getPortfolioSlug(p.id)}`}
                className={`group relative overflow-hidden py-8 sm:py-10 flex items-center gap-5 transition-colors duration-200 hover:bg-slate-50 ${dir === "next" ? "flex-row-reverse pl-8 lg:pl-10 -mr-6 lg:-mr-10 pr-6 lg:pr-10" : "-ml-6 lg:-ml-10 pl-6 lg:pl-10 pr-8 lg:pr-10"}`}
              >
                {/* Mini image */}
                <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0" style={{ backgroundColor: p.bgColor }} />
                  <Image src={p.image} alt={p.title} fill className="object-cover" />
                </div>

                <div className={`min-w-0 ${dir === "next" ? "text-right" : ""}`}>
                  <div className="flex items-center gap-2 mb-0.5 ${dir === 'next' ? 'justify-end' : ''}">
                    <svg className={`w-3 h-3 text-slate-400 shrink-0 ${dir === "next" ? "order-last" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
                    </svg>
                    <p className="text-[9px] uppercase tracking-[0.25em] text-slate-400 font-semibold">{label}</p>
                  </div>
                  <p className="text-sm font-bold text-slate-800 group-hover:text-brand transition-colors truncate">
                    {p.title}
                  </p>
                  <p className="text-xs text-slate-400 truncate">{p.category}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
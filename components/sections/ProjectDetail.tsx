"use client";

import Image from "next/image";
import Link from "next/link";
import AnimateIn from "@/components/ui/AnimateIn";
import portfolioData from "@/data/portfolio.json";
import { getPortfolioSlug } from "@/lib/portfolioSlugUtils";
import { useTranslations } from "next-intl";

type Project = (typeof portfolioData)[0] & {
  challenge?: string;
  solution?: string;
  workDetails?: string[];
  results?: string;
};

export default function ProjectDetail({ portfolioId }: { portfolioId: number }) {
  const t = useTranslations("project");
  const project = portfolioData.find((p) => p.id === portfolioId) as Project | undefined;
  
  // Get translated project details
  const rawProjects = t.raw("projects") as any;
  const projectsFromTranslations = Array.isArray(rawProjects) ? rawProjects : [];
  const translatedProjectDetails = projectsFromTranslations.find((p: any) => p.id === portfolioId);
  
  const idx = portfolioData.findIndex((p) => p.id === portfolioId);
  const prev = idx > 0 ? portfolioData[idx - 1] : portfolioData[portfolioData.length - 1];
  const next = idx < portfolioData.length - 1 ? portfolioData[idx + 1] : portfolioData[0];

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-slate-400 text-sm">{t("notFound")}</p>
      </div>
    );
  }

  // Use translated details if available, otherwise fall back to static data
  const description = translatedProjectDetails?.description || project.description;
  const challenge = translatedProjectDetails?.challenge || project.challenge;
  const solution = translatedProjectDetails?.solution || project.solution;
  const workDetails = translatedProjectDetails?.workDetails || project.workDetails;
  const results = translatedProjectDetails?.results || project.results;

  const num = String(project.id).padStart(2, "0");
  const WA_NUMBER = "6285163665100";

  return (
    <div className="bg-gradient-to-br from-white via-slate-50 to-white relative overflow-hidden mt-16 sm:mt-[72px]">
      {/* Subtle gradient orbs for consistency with hero */}
      <div
        className="animate-orb-1 absolute -top-40 -left-40 w-150 h-150 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(26,86,219,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="animate-orb-2 absolute -bottom-96 -right-96 w-175 h-175 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(99,143,230,0.06) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* ══════════════════════════════════════
          HERO — cinematic full-viewport
      ══════════════════════════════════════ */}
      <div className="relative w-full h-[70vh] min-h-[480px] max-h-[780px] rounded-3xl mx-6 lg:mx-10 mt-6 overflow-hidden shadow-lg">
        <div className="absolute inset-0" style={{ backgroundColor: project.bgColor }} />
        <Image
          src={project.image}
          alt={project.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Enhanced multi-stop gradient for readability */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)"
        }} />

        {/* Back link */}
        <Link
          href="/project"
          className="absolute top-6 left-6 lg:left-10 flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-200 group"
        >
          <span className="w-7 h-7 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-200">
            <svg className="w-3 h-3 text-white group-hover:text-slate-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </span>
          <span className="text-xs font-medium">{t("backLink")}</span>
        </Link>

        {/* Project number */}
        <div className="absolute top-6 right-6 lg:right-10">
          <span className="text-[11px] font-mono text-white/30">{num}</span>
        </div>

      </div>

      {/* ══════════════════════════════════════
          META STRIP
      ══════════════════════════════════════ */}
      <div className="border-b border-slate-100/50 bg-gradient-to-r from-slate-50/50 via-white to-slate-50/50 backdrop-blur-md sticky top-[64px] z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <AnimateIn className="flex items-center gap-8 py-5 overflow-x-auto scrollbar-hide">
            {[
              { label: t("meta.year"), value: project.year },
              { label: t("meta.category"), value: project.category },
              { label: t("meta.client"), value: project.title },
              ...(workDetails ? [{ label: t("meta.deliverable"), value: `${workDetails.length} Item` }] : []),
            ].map((meta, i, arr) => (
              <div key={meta.label} className="flex items-center gap-8 shrink-0">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.25em] text-slate-400 font-semibold mb-1">{meta.label}</p>
                  <p className="text-xs font-bold text-slate-900 whitespace-nowrap">{meta.value}</p>
                </div>
                {i < arr.length - 1 && <div className="w-px h-6 bg-slate-200/40 shrink-0" />}
              </div>
            ))}
          </AnimateIn>
        </div>
      </div>

      {/* ══════════════════════════════════════
          CONTENT
      ══════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-28 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-16 lg:gap-28">

          {/* ── Left: main editorial content ── */}
          <div className="space-y-16">
            {/* Description – enhanced pull quote style */}
            <AnimateIn>
              <p className="text-slate-700 text-xl sm:text-3xl leading-relaxed font-light border-l-4 border-brand pl-6 sm:pl-8">
                {description}
              </p>
            </AnimateIn>

            <div className="space-y-16">
              {/* Challenge */}
              {challenge && (
                <AnimateIn delay={60}>
                  <div className="group">
                    <div className="flex items-start gap-6 md:gap-8">
                      <div className="pt-1 shrink-0">
                        <span className="text-sm font-mono font-bold text-brand bg-brand/10 rounded-full w-10 h-10 flex items-center justify-center">01</span>
                      </div>
                      <div className="flex-1">
                        <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-900 mb-3">
                          {t("challenge")}
                        </h2>
                        <p className="text-slate-600 leading-relaxed text-base">
                          {challenge}
                        </p>
                      </div>
                    </div>
                  </div>
                </AnimateIn>
              )}

              {/* Solution */}
              {solution && (
                <AnimateIn delay={80}>
                  <div className="group">
                    <div className="flex items-start gap-6 md:gap-8">
                      <div className="pt-1 shrink-0">
                        <span className="text-sm font-mono font-bold text-brand bg-brand/10 rounded-full w-10 h-10 flex items-center justify-center">02</span>
                      </div>
                      <div className="flex-1">
                        <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-900 mb-3">
                          {t("solution")}
                        </h2>
                        <p className="text-slate-600 leading-relaxed text-base">
                          {solution}
                        </p>
                      </div>
                    </div>
                  </div>
                </AnimateIn>
              )}
            </div>

            {/* Results — modern gradient card */}
            {results && (
              <AnimateIn delay={100} className="mt-16">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-10 sm:p-12 lg:p-16 border border-slate-800 shadow-xl">
                  {/* Decorative gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-brand/5 to-transparent opacity-50 pointer-events-none" />
                  
                  {/* Decorative number */}
                  <span className="absolute top-8 right-8 text-[120px] font-bold text-white/[0.05] select-none leading-none">
                    {num}
                  </span>
                  
                  <div className="relative z-10">
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand mb-6">
                      {t("resultsTitle")}
                    </p>
                    <p className="text-white text-xl sm:text-2xl leading-relaxed font-light">
                      &ldquo;{results}&rdquo;
                    </p>
                  </div>
                </div>
              </AnimateIn>
            )}
          </div>

          {/* ── Right: sticky sidebar ── */}
          {workDetails && workDetails.length > 0 && (
            <AnimateIn delay={100} className="lg:sticky lg:top-40 self-start space-y-8">

              {/* Work list card */}
              <div className="rounded-2xl bg-white border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-900 mb-6">
                    {t("workDoneTitle")}
                  </p>
                <ul className="space-y-3.5">
                  {workDetails.map((detail: any, i: number) => (
                    <li key={i} className="flex items-start gap-3 group">
                      <span className="mt-0.5 text-xs font-bold font-mono text-brand bg-brand/10 rounded-full w-6 h-6 flex items-center justify-center shrink-0 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm text-slate-600 leading-snug group-hover:text-slate-800 transition-colors duration-200 pt-0.5">
                        {detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Divider */}
              <div className="h-px bg-slate-100" />

              {/* CTA */}
              <div className="rounded-2xl bg-gradient-to-br from-brand/95 to-brand p-6 shadow-lg hover:shadow-xl transition-shadow">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/90 mb-4">
                    {t("interestedTitle")}
                  </p>
                <a
                  href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(t("waInquiry", { title: project.title }))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 w-full py-3 rounded-full bg-white text-brand text-xs font-bold hover:bg-slate-50 transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  {t("discussCTA")}
                </a>
              </div>
            </AnimateIn>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════
          NEXT / PREV NAVIGATION
      ══════════════════════════════════════ */}
      <div className="border-t border-slate-100/50 bg-gradient-to-b from-white to-slate-50/30 relative z-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 divide-x divide-slate-100/50">

              {[
              { project: prev, dir: "prev", label: t("prevLabel"), icon: "M15 19l-7-7 7-7" },
              { project: next, dir: "next", label: t("nextLabel"), icon: "M9 5l7 7-7 7" },
            ].map(({ project: p, dir, label, icon }) => (
              <Link
                key={dir}
                href={`/project/${getPortfolioSlug(p.id)}`}
                className={`group relative overflow-hidden py-10 sm:py-12 flex items-center gap-6 transition-all duration-300 hover:bg-slate-100/50 ${dir === "next" ? "flex-row-reverse pl-8 lg:pl-12 -mr-6 lg:-mr-10 pr-6 lg:pr-10" : "-ml-6 lg:-ml-10 pl-6 lg:pl-10 pr-8 lg:pr-12"}`}
              >
                {/* Mini image with enhanced styling */}
                <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 opacity-70 group-hover:opacity-100 transition-all duration-300 ring-1 ring-slate-200 group-hover:ring-brand">
                  <div className="absolute inset-0" style={{ backgroundColor: p.bgColor }} />
                  <Image src={p.image} alt={p.title} fill className="object-cover" />
                </div>

                <div className={`min-w-0 flex-1 ${dir === "next" ? "text-right" : ""}`}>
                  <div className={`flex items-center gap-2 mb-1.5 ${dir === 'next' ? 'justify-end' : ''}`}>
                    <svg className={`w-3.5 h-3.5 text-slate-400 group-hover:text-brand shrink-0 transition-colors ${dir === "next" ? "order-last" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
                    </svg>
                    <p className="text-[8px] uppercase tracking-[0.3em] text-slate-400 font-bold">{label}</p>
                  </div>
                  <p className="text-base font-bold text-slate-900 group-hover:text-brand transition-colors truncate leading-tight">
                    {p.title}
                  </p>
                  <p className="text-xs text-slate-400 truncate mt-1">{p.category}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

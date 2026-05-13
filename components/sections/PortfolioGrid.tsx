"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AnimateIn from "@/components/ui/AnimateIn";
import portfolioData from "@/data/portfolio.json";
import { getPortfolioSlug } from "@/lib/portfolioSlugUtils";

type FilterKey = "all" | "web-development" | "ui-ux-design" | "branding";

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all",             label: "Semua Karya" },
  { key: "web-development", label: "Web Dev" },
  { key: "ui-ux-design",   label: "UI/UX" },
  { key: "branding",        label: "Branding" },
];

function mapCategory(category: string): FilterKey {
  const c = (category || "").toLowerCase();
  if (c.includes("web")) return "web-development";
  if (c.includes("ui") || c.includes("ux") || c.includes("design")) return "ui-ux-design";
  return "branding";
}

function ProjectCard({
  project,
  featured = false,
}: {
  project: (typeof portfolioData)[0];
  featured?: boolean;
}) {
  const slug = getPortfolioSlug(project.id);

  return (
    <Link
      href={`/portfolio/${slug}`}
      className={`group relative block overflow-hidden rounded-2xl bg-slate-100 ${
        featured ? "aspect-video" : "aspect-4/3"
      }`}
    >
      {/* BG color */}
      <div className="absolute inset-0" style={{ backgroundColor: project.bgColor }} />

      {/* Image */}
      <Image
        src={project.image}
        alt={project.title}
        fill
        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.04]"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/15 to-transparent" />

      {/* Top row */}
      <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70 bg-black/20 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
          {project.category}
        </span>
        <span className="text-[11px] font-mono text-white/40">
          {project.year}
        </span>
      </div>

      {/* Arrow button */}
      <div className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        <svg className="w-3.5 h-3.5 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
        </svg>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 translate-y-0.5 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className={`font-bold text-white leading-tight mb-1 ${featured ? "text-xl sm:text-2xl" : "text-base sm:text-lg"}`}>
          {project.title}
        </h3>
        <p className="text-xs sm:text-sm text-white/55 leading-relaxed line-clamp-1">
          {project.subtitle}
        </p>
      </div>
    </Link>
  );
}

export default function PortfolioGrid() {
  const [filter, setFilter] = useState<FilterKey>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return portfolioData;
    return portfolioData.filter(
      (p) => mapCategory(p.category as string) === filter
    );
  }, [filter]);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="min-h-screen bg-white">

      {/* ── Page header ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-10">
        <AnimateIn>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">

            {/* Left: title */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-brand mb-3">
                Portofolio
              </p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 tracking-tight leading-[0.95]">
                Karya<br />& Proyek
              </h1>
            </div>

            {/* Right: big number */}
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-1">Total</p>
              <p className="text-6xl sm:text-7xl font-bold text-slate-100 tabular-nums leading-none select-none">
                {String(filtered.length).padStart(2, "0")}
              </p>
            </div>
          </div>

          {/* Filter bar */}
          <div className="flex items-center gap-1.5 mt-10 flex-wrap">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                  filter === f.key
                    ? "bg-slate-900 text-white"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                {f.label}
              </button>
            ))}

            {/* Divider + count */}
            <span className="ml-auto text-[11px] text-slate-300 hidden sm:block font-mono">
              {filtered.length} proyek
            </span>
          </div>
        </AnimateIn>
      </div>

      {/* ── Divider ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="h-px bg-slate-100" />
      </div>

      {/* ── Grid ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        {filtered.length === 0 ? (
          <AnimateIn className="py-32 text-center">
            <p className="text-slate-300 text-sm">Tidak ada proyek dalam kategori ini.</p>
          </AnimateIn>
        ) : (
          <AnimateIn delay={80} className="space-y-4">
            {/* Featured — full width hero */}
            {featured && (
              <ProjectCard project={featured} featured />
            )}

            {/* Rest — 2-col then 3-col grid */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {rest.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}
          </AnimateIn>
        )}

        {/* Footer rule */}
        {filtered.length > 0 && (
          <div className="mt-16 flex items-center gap-4">
            <span className="h-px flex-1 bg-slate-100" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-slate-300 shrink-0">
              {filtered.length} proyek ditampilkan
            </span>
            <span className="h-px flex-1 bg-slate-100" />
          </div>
        )}
      </div>
    </div>
  );
}

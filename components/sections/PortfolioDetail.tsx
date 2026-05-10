"use client";

import Image from "next/image";
import Link from "next/link";
import AnimateIn from "@/components/ui/AnimateIn";
import SectionLabel from "@/components/ui/SectionLabel";
import portfolioData from "@/data/portfolio.json";
import { getPortfolioSlug } from "@/lib/portfolioSlugUtils";

interface PortfolioDetailProps {
  portfolioId: number;
}

export default function PortfolioDetail({ portfolioId }: PortfolioDetailProps) {
  const project = portfolioData.find((p) => p.id === portfolioId);
  const currentIndex = portfolioData.findIndex((p) => p.id === portfolioId);
  const prevProject = currentIndex > 0 ? portfolioData[currentIndex - 1] : portfolioData[portfolioData.length - 1];
  const nextProject = currentIndex < portfolioData.length - 1 ? portfolioData[currentIndex + 1] : portfolioData[0];

  if (!project) {
    return (
      <section className="py-16 sm:py-24 lg:py-32 bg-white relative">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900">Project tidak ditemukan</h2>
        </div>
      </section>
    );
  }

  const projectData = project as typeof project & {
    challenge?: string;
    solution?: string;
    workDetails?: string[];
    results?: string;
  };

  return (
    <>
      {/* ── Hero Section ── */}
      <section className="py-16 sm:py-24 lg:py-32 bg-white relative">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <AnimateIn className="flex items-center gap-2 mb-10 sm:mb-12">
            <Link
              href="/portfolio"
              className="text-xs sm:text-sm text-slate-400 hover:text-slate-700 transition-colors duration-200"
            >
              Portfolio
            </Link>
            <span className="text-slate-200">/</span>
            <span className="text-xs sm:text-sm text-slate-700 font-medium">{project.title}</span>
          </AnimateIn>

          {/* ── Header ── */}
          <AnimateIn delay={50} className="flex flex-col items-start gap-3 mb-10 sm:mb-14">
            <SectionLabel>{project.category}</SectionLabel>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
              {project.title}
            </h1>
            <p className="text-slate-500 leading-relaxed max-w-lg text-sm sm:text-base">
              {project.description}
            </p>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-[0.15em] text-slate-400 font-semibold">Tahun</span>
                <span className="text-sm font-bold text-slate-800">{project.year}</span>
              </div>
              <span className="w-px h-4 bg-slate-200" />
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-[0.15em] text-slate-400 font-semibold">Layanan</span>
                <span className="text-sm font-bold text-slate-800">{project.service}</span>
              </div>
            </div>
          </AnimateIn>

          {/* ── Hero Image ── */}
          <AnimateIn delay={100}>
            <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-slate-100">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── Content Section ── */}
      <section className="pb-16 sm:pb-24 lg:pb-32 bg-white">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="divide-y divide-slate-100 border-t border-slate-100">

            {/* Challenge */}
            {projectData.challenge && (
              <AnimateIn className="py-10 sm:py-14">
                <div className="flex items-start gap-4 sm:gap-6">
                  <span className="text-[11px] text-slate-300 font-mono tabular-nums shrink-0 pt-1.5 sm:pt-2">01</span>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-brand mb-2 sm:mb-3">
                      Tantangan
                    </h2>
                    <p className="text-slate-500 leading-relaxed text-sm sm:text-base max-w-3xl">
                      {projectData.challenge}
                    </p>
                  </div>
                </div>
              </AnimateIn>
            )}

            {/* Solution */}
            {projectData.solution && (
              <AnimateIn delay={50} className="py-10 sm:py-14">
                <div className="flex items-start gap-4 sm:gap-6">
                  <span className="text-[11px] text-slate-300 font-mono tabular-nums shrink-0 pt-1.5 sm:pt-2">02</span>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-brand mb-2 sm:mb-3">
                      Solusi
                    </h2>
                    <p className="text-slate-500 leading-relaxed text-sm sm:text-base max-w-3xl">
                      {projectData.solution}
                    </p>
                  </div>
                </div>
              </AnimateIn>
            )}

            {/* Work Details */}
            {projectData.workDetails && projectData.workDetails.length > 0 && (
              <AnimateIn delay={100} className="py-10 sm:py-14">
                <div className="flex items-start gap-4 sm:gap-6">
                  <span className="text-[11px] text-slate-300 font-mono tabular-nums shrink-0 pt-1.5 sm:pt-2">03</span>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-brand mb-6 sm:mb-8">
                      Pekerjaan yang Dilakukan
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {projectData.workDetails.map((detail, idx) => (
                        <span
                          key={idx}
                          className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium bg-slate-50 border border-slate-200 text-slate-600 hover:border-brand hover:text-brand hover:bg-brand-50 transition-all duration-200 rounded"
                        >
                          <svg className="w-3 h-3 text-brand shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                          {detail}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimateIn>
            )}

            {/* Results */}
            {projectData.results && (
              <AnimateIn delay={150} className="py-10 sm:py-14">
                <div className="flex items-start gap-4 sm:gap-6">
                  <span className="text-[11px] text-slate-300 font-mono tabular-nums shrink-0 pt-1.5 sm:pt-2">04</span>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-brand mb-4 sm:mb-6">
                      Hasil
                    </h2>
                    <div className="rounded-lg bg-brand p-5 sm:p-6 shadow-lg shadow-brand/20 max-w-3xl">
                      <p className="text-white/90 leading-relaxed text-sm sm:text-base">
                        {projectData.results}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimateIn>
            )}

          </div>
        </div>
      </section>

      {/* ── Navigation Section ── */}
      <section className="py-16 sm:py-24 lg:py-32 bg-white border-t border-slate-100">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">

          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400 mb-6 sm:mb-8">
            Proyek Lainnya
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Previous Project */}
            <Link href={`/portfolio/${getPortfolioSlug(prevProject.id)}`}>
              <div className="group flex items-center gap-4 p-5 sm:p-6 rounded-lg border border-slate-200 bg-white hover:border-brand hover:shadow-sm transition-all duration-200">
                <div className="shrink-0 flex items-center justify-center w-9 h-9 rounded border border-slate-200 text-slate-400 group-hover:border-brand group-hover:text-brand transition-all duration-200">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mb-0.5">Sebelumnya</p>
                  <h3 className="text-sm sm:text-base font-bold text-slate-800 group-hover:text-brand transition-colors duration-200 truncate">
                    {prevProject.title}
                  </h3>
                  <p className="text-xs text-slate-400 truncate">{prevProject.category}</p>
                </div>
              </div>
            </Link>

            {/* Next Project */}
            <Link href={`/portfolio/${getPortfolioSlug(nextProject.id)}`}>
              <div className="group flex items-center justify-between gap-4 p-5 sm:p-6 rounded-lg border border-slate-200 bg-white hover:border-brand hover:shadow-sm transition-all duration-200">
                <div className="min-w-0 text-right flex-1">
                  <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mb-0.5">Selanjutnya</p>
                  <h3 className="text-sm sm:text-base font-bold text-slate-800 group-hover:text-brand transition-colors duration-200 truncate">
                    {nextProject.title}
                  </h3>
                  <p className="text-xs text-slate-400 truncate">{nextProject.category}</p>
                </div>
                <div className="shrink-0 flex items-center justify-center w-9 h-9 rounded border border-slate-200 text-slate-400 group-hover:border-brand group-hover:text-brand transition-all duration-200">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>

          {/* Back to Portfolio */}
          <div className="mt-6">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-slate-700 transition-colors duration-200"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Kembali ke Portofolio
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
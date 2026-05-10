"use client";

import Link from "next/link";
import Image from "next/image";
import AnimateIn from "@/components/ui/AnimateIn";
import SectionLabel from "@/components/ui/SectionLabel";
import portfolioData from "@/data/portfolio.json";
import { getPortfolioSlug } from "@/lib/portfolioSlugUtils";

export default function PortfolioGrid() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-white relative">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <AnimateIn className="flex flex-col items-start gap-3 mb-12 sm:mb-20">
          <SectionLabel>Portofolio</SectionLabel>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
            Seluruh Proyek Kami
          </h2>
          <p className="text-slate-500 leading-relaxed max-w-lg text-sm sm:text-base">
            Jelajahi koleksi lengkap proyek yang telah kami selesaikan untuk berbagai klien 
            dengan kategori dan tahun yang berbeda-beda.
          </p>
        </AnimateIn>

        {/* ── Portfolio Grid ── */}
        <AnimateIn delay={150} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {portfolioData.map((project, index) => {
            const slug = getPortfolioSlug(project.id);
            
            return (
              <Link key={project.id} href={`/portfolio/${slug}`}>
                <div className="group relative overflow-hidden rounded-2xl aspect-square sm:aspect-auto sm:h-80 cursor-pointer">
                  {/* Background color fallback */}
                  <div 
                    className="absolute inset-0"
                    style={{ backgroundColor: project.bgColor }}
                  />

                  {/* Image */}
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />

                  {/* Content */}
                  <div 
                    className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6 text-white"
                    style={{ color: project.textColor }}
                  >
                    <div className="space-y-2 sm:space-y-3 transform group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg sm:text-xl font-bold truncate">
                            {project.title}
                          </h3>
                          <p className="text-xs sm:text-sm opacity-90 truncate">
                            {project.subtitle}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: `${project.textColor}33` }}>
                        <span className="text-[10px] sm:text-xs font-medium px-2 py-1 rounded-full" style={{ backgroundColor: `${project.accentColor}33` }}>
                          {project.category}
                        </span>
                        <span className="text-xs font-semibold">
                          {project.year}
                        </span>
                      </div>
                    </div>

                    {/* Arrow icon */}
                    <div className="absolute top-5 right-5 sm:top-6 sm:right-6 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: `${project.accentColor}40` }}>
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </AnimateIn>
      </div>
    </section>
  );
}

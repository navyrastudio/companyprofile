"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "@/components/ui/Icons";
import SectionLabel from "@/components/ui/SectionLabel";
import AnimateIn from "@/components/ui/AnimateIn";
import Button from "@/components/ui/Button";
import portfolioData from "@/data/portfolio.json";

const ITEMS_PER_PAGE = 4;

export default function PortfolioSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const featured = portfolioData.filter((p) => p.featured);
  const maxIndex = Math.max(0, featured.length - ITEMS_PER_PAGE);

  const handlePrev = () => setActiveIndex((i) => Math.max(0, i - 1));
  const handleNext = () => setActiveIndex((i) => Math.min(maxIndex, i + 1));

  const visible = featured.slice(activeIndex, activeIndex + ITEMS_PER_PAGE);

  return (
    <section id="portofolio" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-125 h-125 bg-blue-100/60 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* Left: Text */}
          <AnimateIn from="left" className="lg:w-72 shrink-0 flex flex-col justify-between gap-8">
            <div className="flex flex-col gap-5">
              <SectionLabel>Portofolio</SectionLabel>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
                Karya yang<br />Berbicara
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Setiap proyek kami kerjakan dengan dedikasi dan perhatian pada
                detail untuk menghasilkan produk yang relevan dan solutif
              </p>
              <Button href="#portofolio" variant="outline" showArrow>
                Lihat Semua
              </Button>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                disabled={activeIndex === 0}
                className={`w-10 h-10 border flex items-center justify-center transition-all duration-200 ${
                  activeIndex === 0
                    ? "border-slate-200 text-slate-300 cursor-not-allowed"
                    : "border-slate-300 text-slate-600 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50"
                }`}
                aria-label="Previous"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                disabled={activeIndex >= maxIndex}
                className={`w-10 h-10 border flex items-center justify-center transition-all duration-200 ${
                  activeIndex >= maxIndex
                    ? "border-slate-200 text-slate-300 cursor-not-allowed"
                    : "border-slate-300 text-slate-600 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50"
                }`}
                aria-label="Next"
              >
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Dots */}
              <div className="flex items-center gap-1.5 ml-2">
                {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`transition-all duration-200 ${
                      i === activeIndex
                        ? "w-5 h-1.5 bg-blue-600"
                        : "w-1.5 h-1.5 bg-slate-300 hover:bg-slate-400"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </AnimateIn>

          {/* Right: Portfolio grid */}
          <AnimateIn from="right" delay={150} className="flex-1 grid grid-cols-2 gap-3 sm:gap-4">
            {visible.map((item) => (
              <Link
                key={item.id}
                href="#portofolio"
                className="group relative overflow-hidden aspect-4/3 flex items-end cursor-pointer border border-white/5"
                style={{ backgroundColor: item.bgColor }}
                aria-label={`Lihat proyek ${item.title}`}
              >
                {/* Card content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-6">
                  <div
                    className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-none text-center"
                    style={{ color: item.textColor }}
                  >
                    {item.title}
                  </div>
                  <div
                    className="text-[10px] sm:text-xs font-medium tracking-widest uppercase mt-1.5 opacity-70"
                    style={{ color: item.accentColor }}
                  >
                    {item.subtitle}
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />

                {/* Category tag at bottom */}
                <div className="relative z-10 w-full p-3 sm:p-4 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <span className="text-xs font-semibold uppercase tracking-widest text-white/80">
                    {item.category}
                  </span>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-0 h-0 border-t-32 border-r-32 border-t-transparent border-r-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            ))}
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}

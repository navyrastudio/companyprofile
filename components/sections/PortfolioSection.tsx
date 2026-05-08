"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "@/components/ui/Icons";
import SectionLabel from "@/components/ui/SectionLabel";
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
    <section id="portofolio" className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* Left: Text */}
          <div className="lg:w-70 shrink-0 flex flex-col justify-between gap-8">
            <div className="flex flex-col gap-4">
              <SectionLabel>Portofolio</SectionLabel>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                Karya yang Berbicara
              </h2>
              <p className="text-gray-500 leading-relaxed text-sm sm:text-base">
                Setiap proyek kami kerjakan dengan dedikasi dan perhatian pada
                detail untuk menghasilkan desain yang bermakna.
              </p>
              <Button href="#portofolio" variant="outline" showArrow>
                Lihat Semua Portofolio
              </Button>
            </div>

            {/* Navigation arrows */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                disabled={activeIndex === 0}
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200 ${
                  activeIndex === 0
                    ? "border-gray-200 text-gray-300 cursor-not-allowed"
                    : "border-gray-300 text-gray-600 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50"
                }`}
                aria-label="Previous"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                disabled={activeIndex >= maxIndex}
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200 ${
                  activeIndex >= maxIndex
                    ? "border-gray-200 text-gray-300 cursor-not-allowed"
                    : "border-gray-300 text-gray-600 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50"
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
                    className={`rounded-full transition-all duration-200 ${
                      i === activeIndex
                        ? "w-5 h-2 bg-blue-600"
                        : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right: Portfolio grid */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-2 gap-4">
            {visible.map((item) => (
              <Link
                key={item.id}
                href="#portofolio"
                className="group relative rounded-2xl overflow-hidden aspect-4/3 flex items-end cursor-pointer"
                style={{ backgroundColor: item.bgColor }}
                aria-label={`Lihat proyek ${item.title}`}
              >
                {/* Portfolio card content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                  {/* Abstract logo/text in center */}
                  <div
                    className="text-3xl sm:text-4xl font-black tracking-tight leading-none text-center"
                    style={{ color: item.textColor }}
                  >
                    {item.title}
                  </div>
                  <div
                    className="text-xs font-medium tracking-widest uppercase mt-1 opacity-70"
                    style={{ color: item.accentColor }}
                  >
                    {item.subtitle}
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-all duration-300" />

                {/* Category tag at bottom */}
                <div className="relative z-10 w-full p-4 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <span
                    className="text-xs font-semibold uppercase tracking-wide"
                    style={{ color: item.accentColor }}
                  >
                    {item.category}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

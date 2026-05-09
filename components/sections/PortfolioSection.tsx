"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import portfolioData from "@/data/portfolio.json";

type PortfolioItem = {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  description: string;
  image: string;
  bgColor: string;
  textColor: string;
  accentColor: string;
  featured: boolean;
};

export default function PortfolioSection() {
  const items = portfolioData as PortfolioItem[];
  const [activeIdx, setActiveIdx] = useState(0);
  const activeIdxRef = useRef(0);
  const lockedRef = useRef(false);

  useEffect(() => { activeIdxRef.current = activeIdx; }, [activeIdx]);

  const goTo = useCallback((idx: number) => {
    if (idx < 0 || idx >= items.length) return;
    setActiveIdx(idx);
  }, [items.length]);

  // Touch swipe
  useEffect(() => {
    let startX = 0;
    const onTouchStart = (e: TouchEvent) => { startX = e.touches[0].clientX; };
    const onTouchEnd = (e: TouchEvent) => {
      const dx = startX - e.changedTouches[0].clientX;
      if (Math.abs(dx) < 40) return;
      const idx = activeIdxRef.current;
      if (dx > 0) goTo(Math.min(idx + 1, items.length - 1));
      else        goTo(Math.max(idx - 1, 0));
    };
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [goTo, items.length]);

  // Horizontal trackpad/mouse wheel only — do NOT capture vertical so outer snap works
  useEffect(() => {
    const section = document.getElementById("portofolio");
    if (!section) return;
    const onWheel = (e: WheelEvent) => {
      // Only intercept dominant horizontal movement
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      if (lockedRef.current) return;
      const idx = activeIdxRef.current;
      if (e.deltaX > 0) goTo(Math.min(idx + 1, items.length - 1));
      else              goTo(Math.max(idx - 1, 0));
      lockedRef.current = true;
      setTimeout(() => { lockedRef.current = false; }, 500);
    };
    section.addEventListener("wheel", onWheel, { passive: false });
    return () => section.removeEventListener("wheel", onWheel);
  }, [goTo, items.length]);

  return (
    <section
      id="portofolio"
      className="snap-start h-screen flex flex-col bg-white overflow-hidden"
    >
      {/* Header */}
      <div className="shrink-0 flex items-center justify-between px-6 sm:px-12 lg:px-20 pt-20 pb-6">
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
          <span className="w-5 h-px bg-brand/60 inline-block" />
          Proyek Kami
          <span className="w-5 h-px bg-brand/60 inline-block" />
        </span>
        <span className="font-mono text-[11px] text-slate-400 tabular-nums">
          <span className="text-slate-700 font-semibold">{String(activeIdx + 1).padStart(2, "0")}</span>
          {" / "}
          {String(items.length).padStart(2, "0")}
        </span>
      </div>

      {/* Slider — transform-based, GPU smooth, zero glitch */}
      <div className="flex-1 relative overflow-hidden">
        <div
          className="flex h-full will-change-transform"
          style={{
            transform: `translateX(-${activeIdx * 100}%)`,
            transition: "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {items.map((item, i) => (
            <div
              key={item.id}
              aria-hidden={i !== activeIdx}
              className="shrink-0 w-full h-full flex items-center px-6 sm:px-12 lg:px-20"
            >
              <div className="w-full grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-14 items-center">

                {/* Info */}
                <div className="lg:col-span-2 flex flex-col gap-4 order-2 lg:order-1">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-brand">
                    {item.category}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
                    {item.title}
                  </h2>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.subtitle}</p>
                  <div className="w-8 h-px bg-slate-200 my-1" />
                  <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
                  <span className="text-xs text-slate-400">{item.year}</span>
                </div>

                {/* Image */}
                <div className="lg:col-span-3 relative overflow-hidden aspect-video order-1 lg:order-2">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority={i === 0}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom nav */}
      <div className="shrink-0 flex items-center justify-between px-6 sm:px-12 lg:px-20 py-4 border-t border-slate-100">
        <div className="flex items-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Proyek ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === activeIdx
                  ? "w-5 h-1 bg-brand"
                  : "w-1.5 h-1.5 bg-slate-200 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => goTo(activeIdx - 1)}
            disabled={activeIdx === 0}
            aria-label="Sebelumnya"
            className="w-8 h-8 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-800 hover:border-slate-400 disabled:opacity-20 transition-all duration-200"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => goTo(activeIdx + 1)}
            disabled={activeIdx === items.length - 1}
            aria-label="Berikutnya"
            className="w-8 h-8 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-800 hover:border-slate-400 disabled:opacity-20 transition-all duration-200"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

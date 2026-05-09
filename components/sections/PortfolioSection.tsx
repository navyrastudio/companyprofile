"use client";

import { useRef, useEffect, useState, useCallback } from "react";
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
  const sectionRef   = useRef<HTMLElement>(null);
  const trackRef     = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const activeIdxRef = useRef(0);

  const items = portfolioData as PortfolioItem[];

  const goTo = useCallback((idx: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: idx * track.clientWidth, behavior: "smooth" });
  }, []);

  useEffect(() => { activeIdxRef.current = activeIdx; }, [activeIdx]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let locked = false;

    const onWheel = (e: WheelEvent) => {
      if (locked) { e.preventDefault(); return; }
      const idx     = activeIdxRef.current;
      const atStart = idx === 0;
      const atEnd   = idx === items.length - 1;
      const goRight = e.deltaY > 0 || e.deltaX > 0;
      const goLeft  = e.deltaY < 0 || e.deltaX < 0;

      if (goRight && !atEnd) {
        e.preventDefault(); locked = true;
        goTo(idx + 1);
        setTimeout(() => { locked = false; }, 600);
      } else if (goLeft && !atStart) {
        e.preventDefault(); locked = true;
        goTo(idx - 1);
        setTimeout(() => { locked = false; }, 600);
      }
    };

    section.addEventListener("wheel", onWheel, { passive: false });
    return () => section.removeEventListener("wheel", onWheel);
  }, [goTo, items.length]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let startX = 0, startY = 0, locked = false;

    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (locked) return;
      const dx = startX - e.changedTouches[0].clientX;
      const dy = startY - e.changedTouches[0].clientY;
      if (Math.abs(dx) <= Math.abs(dy) || Math.abs(dx) < 30) return;
      const idx = activeIdxRef.current;
      if (dx > 0 && idx < items.length - 1) {
        locked = true; goTo(idx + 1);
        setTimeout(() => { locked = false; }, 600);
      } else if (dx < 0 && idx > 0) {
        locked = true; goTo(idx - 1);
        setTimeout(() => { locked = false; }, 600);
      }
    };

    section.addEventListener("touchstart", onTouchStart, { passive: true });
    section.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      section.removeEventListener("touchstart", onTouchStart);
      section.removeEventListener("touchend", onTouchEnd);
    };
  }, [goTo, items.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-card]"));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = cards.indexOf(entry.target as HTMLElement);
            if (idx !== -1) setActiveIdx(idx);
          }
        });
      },
      { root: track, threshold: 0.5 }
    );
    cards.forEach((c) => obs.observe(c));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="portofolio"
      className="snap-start h-screen flex flex-col bg-white overflow-hidden"
    >
      {/* Section label */}
      <div className="shrink-0 flex items-center justify-between px-6 sm:px-12 lg:px-20 pt-16 sm:pt-18 pb-0">
        <div className="flex items-center gap-3">
          <div className="w-5 h-px bg-brand" />
          <p className="text-[9px] uppercase tracking-[0.3em] text-slate-400 font-semibold">Proyek Kami</p>
        </div>
        <span className="font-mono text-[10px] tabular-nums text-slate-400">
          <span className="text-slate-700 font-semibold text-xs">{String(activeIdx + 1).padStart(2, "0")}</span>
          {" — "}
          {String(items.length).padStart(2, "0")}
        </span>
      </div>

      {/* Slide track */}
      <div
        ref={trackRef}
        className="flex-1 flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory"
        style={{ scrollbarWidth: "none" }}
      >
        {items.map((item, i) => (
          <div
            key={item.id}
            data-card
            className="snap-start shrink-0 w-full h-full"
          >
            <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2">

              {/* Left — project info */}
              <div className="flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-8 lg:py-0 order-2 lg:order-1">
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-mono text-[10px] font-semibold text-slate-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="w-4 h-px bg-slate-200" />
                  <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-brand">
                    {item.category}
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight mb-1">
                  {item.title}
                </h2>
                <p className="text-sm text-slate-400 font-medium mb-6">{item.subtitle}</p>

                <div className="w-10 h-px bg-slate-200 mb-6" />

                <p className="text-sm text-slate-500 leading-relaxed max-w-sm mb-8">
                  {item.description}
                </p>

                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-slate-400 mb-0.5">Tahun</p>
                    <p className="text-sm font-semibold text-slate-700">{item.year}</p>
                  </div>
                  <div className="w-px h-6 bg-slate-200" />
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-slate-400 mb-0.5">Layanan</p>
                    <p className="text-sm font-semibold text-slate-700">{item.category}</p>
                  </div>
                </div>
              </div>

              {/* Right — image */}
              <div className="relative order-1 lg:order-2 overflow-hidden" style={{ minHeight: "40vh" }}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={i === 0}
                />
                <div className="hidden lg:block absolute inset-y-0 left-0 w-16 bg-linear-to-r from-white to-transparent" />
              </div>
            </div>
          </div>
        ))}
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
                i === activeIdx ? "w-5 h-1 bg-brand" : "w-1 h-1 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => goTo(activeIdx - 1)}
            disabled={activeIdx === 0}
            className="w-8 h-8 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-400 disabled:opacity-20 transition-all duration-200"
            aria-label="Sebelumnya"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => goTo(activeIdx + 1)}
            disabled={activeIdx === items.length - 1}
            className="w-8 h-8 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-400 disabled:opacity-20 transition-all duration-200"
            aria-label="Berikutnya"
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

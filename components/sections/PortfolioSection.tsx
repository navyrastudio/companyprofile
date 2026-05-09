"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import portfolioData from "@/data/portfolio.json";

type PortfolioItem = {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  bgColor: string;
  textColor: string;
  accentColor: string;
  featured: boolean;
};

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const activeIdxRef = useRef(0); // always-current ref for use inside wheel handler

  const items = portfolioData as PortfolioItem[];

  /* ── Snap to slide by index ── */
  const goTo = useCallback((idx: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: idx * track.clientWidth, behavior: "smooth" });
  }, []);

  /* ── Keep ref in sync with state ── */
  useEffect(() => { activeIdxRef.current = activeIdx; }, [activeIdx]);

  /* ── Wheel: use activeIdx ref so boundary is always accurate ── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let locked = false;

    const onWheel = (e: WheelEvent) => {
      if (locked) { e.preventDefault(); return; }

      const idx      = activeIdxRef.current;
      const atStart  = idx === 0;
      const atEnd    = idx === items.length - 1;
      const goRight  = e.deltaY > 0 || e.deltaX > 0;
      const goLeft   = e.deltaY < 0 || e.deltaX < 0;

      if (goRight && !atEnd) {
        e.preventDefault();
        locked = true;
        goTo(idx + 1);
        setTimeout(() => { locked = false; }, 600);
      } else if (goLeft && !atStart) {
        e.preventDefault();
        locked = true;
        goTo(idx - 1);
        setTimeout(() => { locked = false; }, 600);
      }
      // at boundary → don't preventDefault → bubbles to outer snap-y container
    };

    section.addEventListener("wheel", onWheel, { passive: false });
    return () => section.removeEventListener("wheel", onWheel);
  }, [goTo, items.length]);

  /* ── Touch: swipe horizontal inside, vertical at boundary → outer snap-y ── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let startX = 0;
    let startY = 0;
    let locked = false;

    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (locked) return;
      const dx = startX - e.changedTouches[0].clientX;
      const dy = startY - e.changedTouches[0].clientY;

      // Only handle if primarily horizontal swipe
      if (Math.abs(dx) <= Math.abs(dy) || Math.abs(dx) < 30) return;

      const idx     = activeIdxRef.current;
      const atStart = idx === 0;
      const atEnd   = idx === items.length - 1;

      if (dx > 0 && !atEnd) {
        locked = true;
        goTo(idx + 1);
        setTimeout(() => { locked = false; }, 600);
      } else if (dx < 0 && !atStart) {
        locked = true;
        goTo(idx - 1);
        setTimeout(() => { locked = false; }, 600);
      }
      // at boundary → no preventDefault, outer snap-y handles vertical swipe
    };

    section.addEventListener("touchstart", onTouchStart, { passive: true });
    section.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      section.removeEventListener("touchstart", onTouchStart);
      section.removeEventListener("touchend", onTouchEnd);
    };
  }, [goTo, items.length]);

  /* ── Track active index via IntersectionObserver on each card ── */
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
      {/* ── Top bar ── */}
      <div className="shrink-0 flex items-end justify-between px-8 sm:px-14 lg:px-20 pt-12 pb-5 border-b border-slate-100">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-semibold mb-1">Portofolio</p>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
            Karya yang Berbicara
          </h2>
        </div>

        {/* Fraction */}
        <span className="font-mono text-sm tabular-nums text-slate-300">
          <span className="text-slate-900 font-bold text-lg">{String(activeIdx + 1).padStart(2, "0")}</span>
          <span className="mx-1">/</span>
          {String(items.length).padStart(2, "0")}
        </span>
      </div>

      {/* ── Card track ── */}
      <div
        ref={trackRef}
        className="flex-1 flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory"
        style={{ scrollbarWidth: "none" }}
      >
        {items.map((item, i) => (
          <div
            key={item.id}
            data-card
            className="snap-start shrink-0 w-full h-full relative group"
            style={{ backgroundColor: item.bgColor }}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              sizes="100vw"
              priority={i === 0}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

            {/* Bottom info */}
            <div className="absolute bottom-0 left-0 right-0 px-8 sm:px-14 lg:px-20 pb-10">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <span className="inline-block text-[9px] font-semibold uppercase tracking-[0.25em] text-white/50 mb-3">
                    {item.category}
                  </span>
                  <h3 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/45 mt-2 font-medium">{item.subtitle}</p>
                </div>
                {/* Accent dot */}
                <div
                  className="shrink-0 w-2.5 h-2.5 rounded-full mb-2"
                  style={{ backgroundColor: item.accentColor }}
                />
              </div>
              {/* Progress line */}
              <div className="mt-5 h-px bg-white/10 relative overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 transition-all duration-500"
                  style={{
                    width: `${((activeIdx + 1) / items.length) * 100}%`,
                    backgroundColor: item.accentColor,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Dot nav ── */}
      <div className="shrink-0 flex items-center justify-between px-8 sm:px-14 lg:px-20 py-4">
        <div className="flex items-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Proyek ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === activeIdx ? "w-5 h-1 bg-slate-900" : "w-1 h-1 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>

        {/* Prev / Next arrows */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => goTo(activeIdx - 1)}
            disabled={activeIdx === 0}
            className="w-8 h-8 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-400 disabled:opacity-25 transition-all duration-200"
            aria-label="Sebelumnya"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => goTo(activeIdx + 1)}
            disabled={activeIdx === items.length - 1}
            className="w-8 h-8 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-400 disabled:opacity-25 transition-all duration-200"
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

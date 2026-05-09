"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
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
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const items = portfolioData as PortfolioItem[];

  /* ── Snap to specific slide ── */
  const goTo = useCallback((idx: number) => {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = track.querySelector<HTMLElement>("[data-card]")?.offsetWidth ?? track.clientWidth;
    track.scrollTo({ left: idx * cardWidth, behavior: "smooth" });
  }, []);

  /* ── Wheel: horizontal inside, vertical at boundaries → outer container ── */
  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    let ticking = false;

    const onWheel = (e: WheelEvent) => {
      if (ticking) return;

      const atEnd   = track.scrollLeft >= track.scrollWidth - track.clientWidth - 8;
      const atStart = track.scrollLeft <= 8;

      const goingRight = e.deltaY > 0 || e.deltaX > 0;
      const goingLeft  = e.deltaY < 0 || e.deltaX < 0;

      if (goingRight && !atEnd) {
        // Consume event — scroll inner track horizontally
        e.preventDefault();
        ticking = true;
        requestAnimationFrame(() => { ticking = false; });
        track.scrollBy({ left: Math.abs(e.deltaY || e.deltaX) * 2, behavior: "smooth" });
      } else if (goingLeft && !atStart) {
        // Consume event — scroll inner track horizontally
        e.preventDefault();
        ticking = true;
        requestAnimationFrame(() => { ticking = false; });
        track.scrollBy({ left: -Math.abs(e.deltaY || e.deltaX) * 2, behavior: "smooth" });
      }
      // At boundary → do NOT preventDefault; let event bubble naturally
      // to #scroll-container so snap-y mandatory takes over
    };

    section.addEventListener("wheel", onWheel, { passive: false });
    return () => section.removeEventListener("wheel", onWheel);
  }, []);

  /* ── Track active index as inner track scrolls ── */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      const cardWidth = track.querySelector<HTMLElement>("[data-card]")?.offsetWidth ?? track.clientWidth;
      const idx = Math.round(track.scrollLeft / cardWidth);
      setActiveIdx(Math.max(0, Math.min(idx, items.length - 1)));
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [items.length]);

  return (
    <section
      ref={sectionRef}
      id="portofolio"
      className="snap-start h-screen flex flex-col bg-slate-50 overflow-hidden"
    >
      {/* ── Header bar ── */}
      <div className="shrink-0 flex items-center justify-between px-6 sm:px-10 lg:px-16 pt-10 pb-6">
        <SectionLabel>Portofolio</SectionLabel>

        <span className="font-mono text-xs text-slate-400 tabular-nums tracking-widest">
          <span className="text-slate-900 font-semibold">{String(activeIdx + 1).padStart(2, "0")}</span>
          {" / "}
          {String(items.length).padStart(2, "0")}
        </span>

        <div className="hidden sm:flex items-center gap-2 text-slate-400">
          <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Geser</span>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Section title */}
      <div className="shrink-0 px-6 sm:px-10 lg:px-16 mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
          Karya yang Berbicara
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Setiap proyek kami kerjakan dengan dedikasi penuh.
        </p>
      </div>

      {/* ── Horizontal scroll track ── */}
      <div
        ref={trackRef}
        className="flex-1 flex gap-4 overflow-x-auto overflow-y-hidden snap-x snap-mandatory pl-6 sm:pl-10 lg:pl-16 pr-6"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {items.map((item, i) => (
          <div
            key={item.id}
            data-card
            className="snap-start shrink-0 w-[78vw] sm:w-[55vw] lg:w-[40vw] h-full relative rounded-2xl overflow-hidden group cursor-pointer"
            style={{ backgroundColor: item.bgColor }}
          >
            {/* Image */}
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              sizes="(max-width: 640px) 78vw, (max-width: 1024px) 55vw, 40vw"
              priority={i === 0}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/25 to-transparent" />

            {/* Top: category */}
            <div className="absolute top-5 left-5 flex items-center gap-2.5">
              <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/75 border border-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full">
                {item.category}
              </span>
              <span className="text-[9px] font-mono text-white/35 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>

            {/* Bottom: info */}
            <div className="absolute bottom-6 left-5 right-5">
              <p className="text-[11px] text-white/50 mb-1.5 font-medium tracking-wide">
                {item.subtitle}
              </p>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight tracking-tight">
                {item.title}
              </h3>
              <div
                className="mt-3 h-0.5 w-8 group-hover:w-16 transition-all duration-500"
                style={{ backgroundColor: item.accentColor }}
              />
            </div>
          </div>
        ))}

        {/* Trailing spacer so last card snaps left */}
        <div className="shrink-0 w-px h-full" aria-hidden="true" />
      </div>

      {/* ── Dot progress ── */}
      <div className="shrink-0 flex items-center justify-center gap-2 py-5">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Proyek ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === activeIdx
                ? "w-6 h-1.5 bg-brand"
                : "w-1.5 h-1.5 bg-slate-300 hover:bg-slate-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

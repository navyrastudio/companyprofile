"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import projectData from "@/data/portfolio.json";
import AnimateIn from "@/components/ui/AnimateIn";
import Button from "@/components/ui/Button";
import { getPortfolioSlug } from "@/lib/portfolioSlugUtils";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ProjectItem = {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  image: string;
  bgColor?: string;
  accentColor?: string;
  featured?: boolean;
};

function ProjectCard({
  item,
  sizes,
  className = "",
}: {
  item: ProjectItem;
  sizes: string;
  className?: string;
}) {
  const slug = getPortfolioSlug(item.id);
  const cardRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Initial state
    gsap.set(card, {
      opacity: 0,
      scale: 0.85,
      y: 40,
      rotateY: 8,
    });

    // Get card elements for staggered animation
    const categoryEl = card.querySelector(".absolute.top-4.left-4");
    const yearEl = card.querySelector(".absolute.top-4.right-4");
    const infoEl = card.querySelector(".absolute.inset-x-0.bottom-0");
    const elements = [categoryEl, yearEl, infoEl].filter(Boolean);

    // Set initial state for inner elements
    gsap.set(elements, {
      opacity: 0,
      y: 20,
    });

    // Main card animation with timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    // Animate card
    tl.to(
      card,
      {
        opacity: 1,
        scale: 1,
        y: 0,
        rotateY: 0,
        duration: 0.8,
        ease: "back.out(1.5)",
      },
      0
    );

    // Animate inner elements with stagger
    tl.to(
      elements,
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.1,
      },
      0.2
    );

    // Hover animation
    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        scale: 1.03,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <Link
      ref={cardRef}
      href={`/project/${slug}`}
      className={`group relative block overflow-hidden rounded-2xl bg-slate-100 ${className}`}
      style={{ perspective: "1000px" }}
    >
      <Image
        src={item.image}
        alt={item.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes={sizes}
      />

      {/* Permanent bottom gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/75 via-slate-900/10 to-transparent" />

      {/* Top left: category */}
      <div className="absolute top-4 left-4" style={{ opacity: 0 }}>
        <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] px-2.5 py-1 rounded-full bg-white/90 text-slate-700 backdrop-blur-sm">
          <span className="w-1 h-1 rounded-full bg-brand" />
          {item.category}
        </span>
      </div>

      {/* Top right: year */}
      <div className="absolute top-4 right-4" style={{ opacity: 0 }}>
        <span className="text-[10px] font-mono text-white/50">{item.year}</span>
      </div>

      {/* Bottom: info + arrow */}
      <div className="absolute inset-x-0 bottom-0 p-5 flex items-end justify-between gap-3" style={{ opacity: 0 }}>
        <div>
          <p className="text-base font-bold text-white leading-tight">{item.title}</p>
          <p className="text-xs text-white/60 mt-0.5">{item.subtitle}</p>
        </div>
        <div className="shrink-0 w-9 h-9 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:bg-brand group-hover:border-brand group-hover:scale-110" style={{ opacity: 0 }}>
          <svg
            className="w-3.5 h-3.5 text-white -rotate-45"
            fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

export default function ProjectSection() {
  const t = useTranslations("project");
  const items = (projectData as ProjectItem[]).filter((i) => i.featured).slice(0, 4);
  const [hero, second, third, fourth] = items;
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.set(section, { opacity: 0, y: 60 });

    gsap.to(section, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="proyek" className="py-24 lg:py-32 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* ── Header ── */}
        <AnimateIn className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-8 bg-brand" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-brand">{t("sectionLabel")}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-[1.1] tracking-tight">
              {t("headline").split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  {i < t("headline").split("\n").length - 1 && <br />}
                </span>
              ))}
            </h2>
            <div className="sm:pb-1 shrink-0 hidden md:block">
              <Button href="/project" variant="outline" size="sm">
                {t("otherProjectsButton")}
              </Button>
            </div>
          </div>
        </AnimateIn>

        {/* ── Editorial layout ── */}
        <div className="flex flex-col gap-3">

          {/* Row 1: Wide hero + tall side */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-3">
            {hero && (
              <AnimateIn delay={0}>
                <ProjectCard
                  item={hero}
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="aspect-video"
                />
              </AnimateIn>
            )}
            {second && (
              <AnimateIn delay={80}>
                <ProjectCard
                  item={second}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="h-full min-h-[260px] lg:aspect-auto"
                />
              </AnimateIn>
            )}
          </div>

          {/* Row 2: Two equal cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[third, fourth].map((item, i) =>
              item ? (
                <AnimateIn key={item.id} delay={160 + i * 80}>
                  <ProjectCard
                    item={item}
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="aspect-4/3"
                  />
                </AnimateIn>
              ) : null
            )}
          </div>
        </div>

        {/* ── Footer ── */}
        <AnimateIn delay={280} className="mt-8 flex items-center justify-between">
          <p className="text-slate-400 text-sm">
            {t("footerCount", { count: 4, total: projectData.length })}
          </p>
          <div className="sm:pb-1 shrink-0 md:hidden">
            <Button href="/project" variant="outline" size="sm">
              Proyek Lainnya
            </Button>
          </div>
        </AnimateIn>

      </div>
    </section>
  );
}

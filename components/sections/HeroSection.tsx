"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { useTranslations } from "next-intl";
import { useLoading } from "@/context/LoadingContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const t = useTranslations("hero");
  const sectionRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const { isLoading } = useLoading();

  useEffect(() => {
    // Skip if still loading
    if (isLoading) return;

    // Set initial states for all elements
    gsap.set([logoRef.current, badgeRef.current, headingRef.current, descRef.current, ctaRef.current, scrollHintRef.current], {
      opacity: 0,
      y: 60,
    });

    // Logo special initial state
    gsap.set(logoRef.current, {
      scale: 0.5,
      rotateY: 90,
    });

    // Create staggered timeline - no delay, appear immediately after loading
    const tl = gsap.timeline({
      delay: 0, // No delay, appear immediately
    });

    // Logo animation - with 3D flip effect
    tl.to(
      logoRef.current,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateY: 0,
        duration: 1.2,
        ease: "back.out(1.3)",
      },
      0
    );

    // Badge animation - slide up with bounce
    tl.to(
      badgeRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.5)",
      },
      0.1
    );

    // Heading animation - with letter-like stagger effect
    tl.to(
      headingRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "back.out(1.2)",
      },
      0.25
    );

    // Description animation
    tl.to(
      descRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      },
      0.4
    );

    // CTA Button animation - with scale effect
    tl.to(
      ctaRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.4)",
      },
      0.55
    );

    // Scroll hint animation - fade in smoothly
    tl.to(
      scrollHintRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.inOut",
      },
      0.7
    );

    return () => {
      tl.kill();
    };
  }, [isLoading]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Gradient orb — top left */}
      <div
        className="animate-orb-1 absolute -top-40 -left-40 w-150 h-150 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(26,86,219,0.20) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Gradient orb — bottom right */}
      <div
        className="animate-orb-2 absolute -bottom-48 -right-48 w-175 h-175 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(99,143,230,0.16) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Gradient orb — top right accent */}
      <div
        className="animate-orb-3 absolute top-10 right-0 w-87.5 h-87.5 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(147,197,253,0.15) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(148,163,184,0.45) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Edge vignette — fade dots to white at edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 75% 70% at 50% 50%, transparent 40%, rgba(255,255,255,0.85) 75%, white 100%)",
        }}
      />

      {/* Content */}
      <div className="relative flex flex-col items-center text-center gap-7 px-6 max-w-4xl mx-auto">

        {/* Logo — float animation */}
        <div ref={logoRef} className="relative opacity-0 translate-y-16">
          <Image
            src="/navyra-logo.png"
            alt={t("logoAlt")}
            width={200}
            height={200}
            className="object-contain w-28 sm:w-36 lg:w-44"
            priority
          />
        </div>

        {/* Eyebrow badge */}
        <div ref={badgeRef} className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-slate-200 bg-white/80 backdrop-blur-sm shadow-sm opacity-0 translate-y-16">
          <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-500">
            {t("eyebrow")}
          </span>
          <span className="w-px h-3 bg-slate-200" />
          <span className="text-[10px] font-medium text-brand tracking-wide">{t("established")}</span>
        </div>

        {/* Heading */}
        <h1 ref={headingRef} className="text-2xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight opacity-0 translate-y-16">
          <span className="sr-only">Navyra Studio</span>
          {t("heading")} <span className="text-brand">{t("highlight")}</span>
        </h1>

        {/* Description */}
        <p ref={descRef} className="text-slate-400 text-xs sm:text-base leading-relaxed max-w-3xl opacity-0 translate-y-16">
          {t("description")}
        </p>

        {/* CTA */}
        <div ref={ctaRef} className="opacity-0 translate-y-16">
          <Button href="#kontak" variant="primary" showArrow>
            {t("cta")}
          </Button>
        </div>

      </div>

      {/* Scroll-down hint */}
      <div ref={scrollHintRef} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none opacity-0 translate-y-6">
        <span className="text-[9px] uppercase tracking-[0.3em] text-slate-400 font-medium">{t("scrollHint")}</span>
        <div className="animate-scroll-bounce">
          <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}



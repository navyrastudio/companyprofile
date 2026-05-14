"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function SplashScreen() {
  const [count, setCount]   = useState(0);
  const [lifted, setLifted] = useState(false);
  const [hidden, setHidden] = useState(false);
  const rafRef = useRef<number | null>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const countRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  /* ── Count 0 → 100 over ~1.8s, then trigger curtain wipe ── */
  useEffect(() => {
    const duration = 900;
    const start    = performance.now();

    const tick = (now: number) => {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased    = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * 100));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        // Hold 100 for a beat, then lift the curtain
        setTimeout(() => setLifted(true), 150);
        setTimeout(() => setHidden(true), 1000);
      }
    };

    // Small delay before counting so the initial logo can render
    const init = setTimeout(() => {
      rafRef.current = requestAnimationFrame(tick);
    }, 200);

    return () => {
      clearTimeout(init);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // GSAP animations for loading elements
  useEffect(() => {
    if (!logoRef.current || !countRef.current || !containerRef.current) return;

    // Initial state - logo
    gsap.set(logoRef.current, {
      scale: 0.3,
      opacity: 0,
      rotateZ: -30,
    });

    // Logo entrance animation with glow effect
    gsap.to(logoRef.current, {
      scale: 1,
      opacity: 1,
      rotateZ: 0,
      duration: 1.2,
      ease: "back.out(1.2)",
      delay: 0.1,
    });

    // Subtle rotation animation during loading
    gsap.to(logoRef.current, {
      rotateZ: 360,
      duration: 20,
      ease: "none",
      repeat: -1,
    });

    // Counter animation
    gsap.set(countRef.current, {
      scale: 0.5,
      opacity: 0,
    });

    gsap.to(countRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.6,
      ease: "back.out(1.5)",
      delay: 0.4,
    });

    // Progress bar glow effect
    if (progressRef.current) {
      gsap.set(progressRef.current, {
        boxShadow: "0 0 0px rgba(26, 86, 219, 0)",
      });

      gsap.to(progressRef.current, {
        boxShadow: "0 0 20px rgba(26, 86, 219, 0.8)",
        duration: 0.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    // Exit animation for curtain
    const exitTimeline = gsap.timeline({
      delay: 2.2,
    });

    if (containerRef.current) {
      exitTimeline.to(
        containerRef.current,
        {
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
        },
        0.5
      );
    }

    return () => {
      exitTimeline.kill();
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-9999 overflow-hidden"
      style={{ pointerEvents: lifted ? "none" : "auto" }}
    >
      {/* ── Curtain panel ── */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #1A56DB 0%, #1741b0 100%)",
          transition: lifted
            ? "transform 0.85s cubic-bezier(0.76, 0, 0.24, 1)"
            : "none",
          transform: lifted ? "translateY(-100%)" : "translateY(0%)",
        }}
      >
        {/* ── Animated background orbs ── */}
        <div
          className="absolute -top-40 -left-40 w-150 h-150 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
            filter: "blur(60px)",
            animation: "pulse 4s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -bottom-48 -right-48 w-175 h-175 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)",
            filter: "blur(80px)",
            animation: "pulse 5s ease-in-out infinite 1s",
          }}
        />

        {/* ── Logo — center ── */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-8"
        >
          <div className="relative">
            <Image
              ref={logoRef}
              src="/navyra-logo.png"
              alt="Navyra Studio"
              width={220}
              height={220}
              priority
              className="object-contain brightness-0 invert w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]"
            />
          </div>

          {/* ── Counter display ── */}
          <div
            ref={countRef}
            className="flex items-baseline gap-1"
          >
            <span className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
              {count}
            </span>
            <span className="text-lg sm:text-xl text-white/60 font-light">%</span>
          </div>
        </div>

        {/* ── Bottom progress line ── */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
          <div
            ref={progressRef}
            className="h-full bg-gradient-to-r from-white/40 via-white/80 to-white/40 transition-all duration-100 ease-linear"
            style={{ width: `${count}%` }}
          />
        </div>

        {/* ── Bottom text ── */}
        <div className="absolute bottom-8 left-0 right-0 text-center">
          <p className="text-xs sm:text-sm text-white/50 font-light tracking-widest">
            LOADING NAVYRA STUDIO
          </p>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
}

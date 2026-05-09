"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function SplashScreen() {
  const [count, setCount]   = useState(0);
  const [lifted, setLifted] = useState(false);
  const [hidden, setHidden] = useState(false);
  const rafRef = useRef<number | null>(null);

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

  if (hidden) return null;

  return (
    <div
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
        {/* ── Logo — center ── */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ animation: "splash-logo-in 1.2s cubic-bezier(0.22,1,0.36,1) 0.1s both" }}
        >
          <Image
            src="/navyra-logo.png"
            alt="Navyra Studio"
            width={220}
            height={220}
            priority
            className="object-contain brightness-0 invert w-40 h-40 sm:w-48 sm:h-48 lg:w-72 lg:h-72"
          />
        </div>

        {/* ── Bottom progress line ── */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10">
          <div
            className="h-full bg-white/40 transition-all duration-100 ease-linear"
            style={{ width: `${count}%` }}
          />
        </div>
      </div>
    </div>
  );
}

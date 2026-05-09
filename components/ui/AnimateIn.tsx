"use client";

import { useEffect, useRef, useState } from "react";

interface AnimateInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  from?: "bottom" | "left" | "right" | "fade";
  as?: keyof React.JSX.IntrinsicElements;
}

export default function AnimateIn({
  children,
  className = "",
  delay = 0,
  from = "bottom",
  as: Tag = "div",
}: AnimateInProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const hiddenClass = {
    bottom: "opacity-0 translate-y-8 scale-[0.98]",
    left:   "opacity-0 -translate-x-8 scale-[0.98]",
    right:  "opacity-0 translate-x-8 scale-[0.98]",
    fade:   "opacity-0 scale-[0.97]",
  }[from];

  const C = Tag as React.ElementType;

  return (
    <C
      ref={ref}
      className={`transition-[opacity,transform] ${visible ? "opacity-100 translate-x-0 translate-y-0 scale-100" : hiddenClass} ${className}`}
      style={{
        transitionDuration: "650ms",
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </C>
  );
}

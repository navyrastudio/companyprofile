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
    bottom: "opacity-0 translate-y-10",
    left: "opacity-0 -translate-x-10",
    right: "opacity-0 translate-x-10",
    fade: "opacity-0",
  }[from];

  const C = Tag as React.ElementType;

  return (
    <C
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-x-0 translate-y-0" : hiddenClass} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </C>
  );
}

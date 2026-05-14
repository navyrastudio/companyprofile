import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealOptions {
  duration?: number;
  delay?: number;
  stagger?: number;
  fromOpacity?: number;
  fromY?: number;
}

export const useScrollReveal = (
  options: ScrollRevealOptions = {}
) => {
  const {
    duration = 0.8,
    delay = 0,
    stagger = 0.1,
    fromOpacity = 0,
    fromY = 40,
  } = options;

  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Get all children that should be animated
    const children = element.querySelectorAll("*");
    
    // Set initial state
    gsap.set(element, { opacity: fromOpacity, y: fromY });
    gsap.set(children, { opacity: fromOpacity, y: fromY });

    // Create timeline animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        end: "top 20%",
        toggleActions: "play none none none",
        markers: false,
      },
    });

    tl.to(element, { opacity: 1, y: 0, duration }, 0);
    tl.to(
      children,
      {
        opacity: 1,
        y: 0,
        duration,
        stagger,
      },
      0
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [duration, delay, stagger, fromOpacity, fromY]);

  return ref;
};

"use client";

import { useState } from "react";
import Link from "next/link";
import type { IconType } from "react-icons";
import {
  SiReact, SiNextdotjs, SiLaravel, SiWordpress, SiWebflow, SiVuedotjs,
  SiFigma, SiFramer, SiCanva, SiBehance, SiDribbble,
} from "react-icons/si";
import { Icon as IconifyIcon } from "@iconify/react";
import SectionLabel from "@/components/ui/SectionLabel";
import AnimateIn from "@/components/ui/AnimateIn";
import servicesData from "@/data/services.json";
import { getServiceSlug } from "@/lib/slugUtils";

const siIconMap: Record<string, IconType> = {
  SiReact, SiNextdotjs, SiLaravel, SiWordpress, SiWebflow, SiVuedotjs,
  SiFigma, SiFramer, SiCanva, SiBehance, SiDribbble,
};

export default function ServicesSection() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = (id: number) => setOpenId(openId === id ? null : id);

  return (
    <section id="layanan" className="py-24 lg:py-32 bg-slate-50 relative">
      {/* Subtle background accent */}


      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimateIn className="flex flex-col items-start gap-4 mb-16">
          <SectionLabel>Layanan Kami</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
            Solusi digital yang dirancang untuk<br className="hidden sm:block" /> tumbuh bersama bisnis Anda.
          </h2>
          <p className="text-slate-600 leading-relaxed max-w-lg text-sm sm:text-base">
            Kami menyediakan layanan Web Development, UI/UX Design, dan Branding yang dirancang
            untuk membantu bisnis Anda berkembang dan tampil lebih profesional di era digital.
          </p>
        </AnimateIn>

        {/* Accordion */}
        <AnimateIn delay={150} className="border-t border-slate-200">
          {servicesData.map((service, index) => {
            const isOpen = openId === service.id;
            const num = String(index + 1).padStart(2, "0");

            return (
              <div key={service.id} className="border-b border-slate-200">
                <button
                  onClick={() => toggle(service.id)}
                  className="w-full flex items-center gap-6 py-6 sm:py-7 text-left group"
                  aria-expanded={isOpen}
                >
                  {/* Number */}
                  <span className="text-xs text-slate-400 font-mono shrink-0 w-8 tabular-nums">
                    {num}
                  </span>

                  {/* Title */}
                  <span
                    className={`flex-1 text-xl sm:text-2xl lg:text-3xl font-semibold transition-colors duration-200 ${
                      isOpen ? "text-brand" : "text-slate-700 group-hover:text-slate-900"
                    }`}
                  >
                    {service.title}
                  </span>

                  {/* Toggle icon */}
                  <span
                    className={`shrink-0 w-8 h-8 flex items-center justify-center border transition-all duration-200 ${
                      isOpen
                        ? "border-brand text-brand bg-brand-50"
                        : "border-slate-300 text-slate-500 group-hover:border-slate-400 group-hover:text-slate-700"
                    }`}
                  >
                    <svg
                      className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>

                {/* Expanded content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="pb-8 pl-14">
                    <p className="text-slate-600 leading-relaxed mb-5 max-w-2xl text-sm sm:text-base">
                      {service.description}
                    </p>

                    {/* What we build */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {service.items.map((item) => (
                        <span
                          key={item}
                          className="px-3 py-1.5 text-xs font-medium border border-slate-300 text-slate-600 hover:border-brand hover:text-brand transition-colors duration-200"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    {/* Tech stack */}
                    {service.techStack && (
                      <div className="flex items-center gap-4 flex-wrap mb-6">
                        <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold shrink-0">Tech Stack</span>
                        {service.techStack.map((tech) => {
                          const t = tech as { name: string; icon: string; lib?: string; color?: string };
                          const color = t.color ?? "#94a3b8";

                          if (t.lib === "iconify") {
                            return (
                              <div key={t.name} title={t.name} className="group flex items-center gap-1.5 cursor-default">
                                <IconifyIcon icon={t.icon} width={18} height={18} style={{ color, opacity: 0.75 }} className="group-hover:opacity-100 transition-opacity duration-200" />
                                <span className="text-xs text-slate-500 group-hover:text-slate-800 transition-colors duration-200">{t.name}</span>
                              </div>
                            );
                          }

                          const SiIcon = siIconMap[t.icon];
                          return SiIcon ? (
                            <div key={t.name} title={t.name} className="group flex items-center gap-1.5 cursor-default">
                              <SiIcon size={18} style={{ color, opacity: 0.75 }} className="group-hover:opacity-100 transition-opacity duration-200" />
                              <span className="text-xs text-slate-500 group-hover:text-slate-800 transition-colors duration-200">{t.name}</span>
                            </div>
                          ) : null;
                        })}
                      </div>
                    )}

                    {/* CTA Button */}
                    <Link href={`/layanan/${getServiceSlug(service.id)}`}>
                      <button className="px-5 py-2.5 rounded-full bg-brand text-white text-sm font-semibold hover:bg-brand/90 transition-colors duration-200">
                        Lihat Harga Lengkap
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </AnimateIn>
      </div>
    </section>
  );
}

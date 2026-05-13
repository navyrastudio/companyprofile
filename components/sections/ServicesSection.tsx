"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import type { IconType } from "react-icons";
import {
  SiReact, SiNextdotjs, SiLaravel, SiWordpress, SiWebflow, SiVuedotjs,
  SiFigma, SiFramer, SiCanva, SiBehance, SiDribbble,
} from "react-icons/si";
import { Icon as IconifyIcon } from "@iconify/react";
import AnimateIn from "@/components/ui/AnimateIn";
import servicesDataStatic from "@/data/services.json";
import { getServiceSlug } from "@/lib/slugUtils";
import { useTranslations } from "next-intl";

const siIconMap: Record<string, IconType> = {
  SiReact, SiNextdotjs, SiLaravel, SiWordpress, SiWebflow, SiVuedotjs,
  SiFigma, SiFramer, SiCanva, SiBehance, SiDribbble,
};

export default function ServicesSection() {
  const [openId, setOpenId] = useState<number | null>(null);
  const t = useTranslations("services");
  const rawData = t.raw("data") as any;
  const servicesData = Array.isArray(rawData) ? rawData : [];
  
  // Extract tech stack from static data (not translated)
  const techStackMap: Record<number, any[]> = {};
  servicesDataStatic.forEach((service: any) => {
    if (service.techStack) {
      techStackMap[service.id] = service.techStack;
    }
  });
  
  const toggle = (id: number) => setOpenId(openId === id ? null : id);

  return (
    <section id="layanan" className="py-24 lg:py-32 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* ── Section header ── */}
        <AnimateIn className="mb-16">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-8 bg-brand" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-brand">{t("sectionLabel")}</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-[1.1] tracking-tight max-w-lg">
              {t("headline")}
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs md:pb-1 shrink-0">
              {t("description")}
            </p>
          </div>
        </AnimateIn>

        {/* ── Accordion ── */}
        <AnimateIn delay={100} className="divide-y divide-slate-100">
          {servicesData.map((service: any, index: number) => {
            const isOpen = openId === service.id;
            const num = String(index + 1).padStart(2, "0");

            return (
              <div key={service.id}>
                <button
                  onClick={() => toggle(service.id)}
                  className="w-full flex items-center gap-6 py-7 text-left group"
                  aria-expanded={isOpen}
                >
                  <span className="text-[11px] font-mono text-slate-300 shrink-0 w-6 tabular-nums">
                    {num}
                  </span>

                  <span className={`flex-1 text-lg font-semibold transition-colors duration-200 ${
                    isOpen ? "text-brand" : "text-slate-800 group-hover:text-slate-950"
                  }`}>
                    {service.title}
                  </span>

                  <span className="hidden sm:inline-flex text-[10px] font-medium text-slate-400 border border-slate-200 px-2.5 py-1 rounded-full mr-4 shrink-0">
                    {t("subServices", { count: service.items.length })}
                  </span>

                  {/* chevron */}
                  <svg className={`shrink-0 w-4 h-4 transition-all duration-300 ${
                    isOpen ? "rotate-180 text-brand" : "text-slate-300 group-hover:text-slate-500"
                  }`} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Panel */}
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                }`}>
                  <div className="pb-10 pl-12 grid md:grid-cols-[1fr_220px] gap-8 items-start">
                    <div>
                      <p className="text-slate-500 text-sm leading-relaxed mb-6 max-w-xl">
                        {service.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-7">
                        {service.items.map((item: any) => (
                          <span key={item.name} className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-full hover:bg-brand-50 hover:text-brand hover:border-brand/30 transition-colors duration-150 cursor-default">
                            {item.name}
                          </span>
                        ))}
                      </div>

                      {techStackMap[service.id] && (
                        <div className="flex items-center gap-5 flex-wrap">
                          <span className="text-[10px] uppercase tracking-[0.2em] text-slate-300 font-semibold shrink-0">{t("stackLabel")}</span>
                          {techStackMap[service.id].map((tech) => {
                            const techItem = tech as { name: string; icon: string; lib?: string; color?: string };
                            const color = techItem.color ?? "#94a3b8";
                            if (techItem.lib === "iconify") {
                              return (
                                <div key={techItem.name} title={techItem.name} className="flex items-center gap-1.5 opacity-40 hover:opacity-80 transition-opacity cursor-default">
                                  <IconifyIcon icon={techItem.icon} width={14} height={14} style={{ color }} />
                                  <span className="text-[11px] text-slate-500">{techItem.name}</span>
                                </div>
                              );
                            }
                            const SiIcon = siIconMap[techItem.icon];
                            return SiIcon ? (
                              <div key={techItem.name} title={techItem.name} className="flex items-center gap-1.5 opacity-40 hover:opacity-80 transition-opacity cursor-default">
                                <SiIcon size={14} style={{ color }} />
                                <span className="text-[11px] text-slate-500">{techItem.name}</span>
                              </div>
                            ) : null;
                          })}
                        </div>
                      )}
                    </div>

                    <div className="justify-end flex ">
                      <Button href={`/layanan/${getServiceSlug(service.id)}`} variant="outline" size="sm">
                        {t("detailButton")}
                      </Button>
                    </div>
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

"use client";

import { useState } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import AnimateIn from "@/components/ui/AnimateIn";
import servicesData from "@/data/services.json";

export default function ServicesSection() {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggle = (id: number) => setOpenId(openId === id ? null : id);

  return (
    <section id="layanan" className="py-20 lg:py-28 bg-gray-50 relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-linear-to-b from-transparent via-blue-500/40 to-transparent" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimateIn className="flex flex-col items-start gap-4 mb-16">
          <SectionLabel>Layanan Kami</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
            Paket Layanan
          </h2>
          <p className="text-slate-600 leading-relaxed max-w-lg text-sm sm:text-base">
            Kami menyediakan berbagai layanan desain dan branding yang dirancang
            untuk membantu bisnis Anda tumbuh dan dikenal lebih luas.
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
                      isOpen ? "text-blue-600" : "text-slate-700 group-hover:text-slate-900"
                    }`}
                  >
                    {service.title}
                  </span>

                  {/* Toggle icon */}
                  <span
                    className={`shrink-0 w-8 h-8 flex items-center justify-center border transition-all duration-200 ${
                      isOpen
                        ? "border-blue-600 text-blue-600 bg-blue-50"
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
                    <div className="flex flex-wrap gap-2">
                      {service.items.map((item) => (
                        <span
                          key={item}
                          className="px-3 py-1.5 text-xs font-medium border border-slate-300 text-slate-600 hover:border-blue-600 hover:text-blue-600 transition-colors duration-200"
                        >
                          {item}
                        </span>
                      ))}
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

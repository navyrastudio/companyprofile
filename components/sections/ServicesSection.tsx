"use client";

import { useState } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import servicesData from "@/data/services.json";

export default function ServicesSection() {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggle = (id: number) => setOpenId(openId === id ? null : id);

  return (
    <section id="layanan" className="py-20 lg:py-28 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-start gap-4 mb-16">
          <SectionLabel>Layanan Kami</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
            Paket Layanan
          </h2>
          <p className="text-gray-500 leading-relaxed max-w-lg">
            Kami menyediakan berbagai layanan desain dan branding yang dirancang
            untuk membantu bisnis Anda tumbuh dan dikenal lebih luas.
          </p>
        </div>

        {/* Accordion */}
        <div className="divide-y divide-gray-200 border-t border-gray-200">
          {servicesData.map((service, index) => {
            const isOpen = openId === service.id;
            const num = String(index + 1).padStart(2, "0");

            return (
              <div key={service.id}>
                <button
                  onClick={() => toggle(service.id)}
                  className="w-full flex items-center gap-6 py-7 text-left group"
                  aria-expanded={isOpen}
                >
                  {/* Number */}
                  <span className="text-xs text-gray-400 font-mono shrink-0 w-8">
                    [{num}]
                  </span>

                  {/* Title */}
                  <span
                    className={`flex-1 text-2xl sm:text-3xl font-semibold transition-colors duration-200 ${
                      isOpen ? "text-blue-600" : "text-gray-900 group-hover:text-blue-600"
                    }`}
                  >
                    {service.title}
                  </span>

                  {/* Toggle icon */}
                  <span
                    className={`shrink-0 w-8 h-8 flex items-center justify-center rounded-full border transition-all duration-200 ${
                      isOpen
                        ? "border-blue-600 text-blue-600"
                        : "border-gray-300 text-gray-400 group-hover:border-blue-600 group-hover:text-blue-600"
                    }`}
                  >
                    <svg
                      className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
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
                    <p className="text-gray-500 leading-relaxed mb-5 max-w-2xl">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.items.map((item) => (
                        <span
                          key={item}
                          className="px-4 py-1.5 text-sm border border-gray-200 text-gray-700 rounded-full hover:border-blue-400 hover:text-blue-600 transition-colors duration-200"
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
        </div>
      </div>
    </section>
  );
}

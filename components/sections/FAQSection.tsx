"use client";

import { useState } from "react";
import AnimateIn from "@/components/ui/AnimateIn";
import SectionLabel from "@/components/ui/SectionLabel";
import faqData from "@/data/faq.json";

export default function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(0);

  const toggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-brand-100/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <AnimateIn className="flex flex-col items-start gap-4 mb-16">
          <SectionLabel>Pertanyaan Umum</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
            FAQ
          </h2>
          <p className="text-slate-600 leading-relaxed max-w-lg text-sm sm:text-base">
            Cari jawaban untuk pertanyaan yang sering diajukan tentang layanan dan proses kami.
          </p>
        </AnimateIn>

        {/* FAQ Accordion */}
        <AnimateIn delay={150} className="border-t border-slate-200">
          {faqData.map((item, index) => {
            const isOpen = openId === index;
            const num = String(index + 1).padStart(2, "0");
            return (
              <div key={index} className="border-b border-slate-200">
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center gap-6 py-6 sm:py-7 text-left group"
                  aria-expanded={isOpen}
                >
                  {/* Number */}
                  <span className="text-xs text-slate-400 font-mono shrink-0 w-8 tabular-nums">
                    {num}
                  </span>

                  {/* Question */}
                  <span
                    className={`flex-1 text-xl sm:text-2xl lg:text-3xl font-semibold transition-colors duration-200 ${
                      isOpen ? "text-brand" : "text-slate-700 group-hover:text-slate-900"
                    }`}
                  >
                    {item.question}
                  </span>

                  {/* Toggle Icon */}
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

                {/* Answer */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="pb-8 pl-14">
                    <p className="text-slate-600 leading-relaxed text-sm sm:text-base max-w-2xl">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </AnimateIn>

        {/* CTA */}
        <AnimateIn className="pt-12 sm:pt-16 border-t border-slate-200 mt-12 sm:mt-16">
          <p className="text-slate-600 text-sm sm:text-base">
            Masih ada pertanyaan lain?{" "}
            <a
              href="mailto:navyrastudio@gmail.com"
              className="font-semibold text-brand hover:underline underline-offset-4"
            >
              Hubungi kami
            </a>
          </p>
        </AnimateIn>
      </div>
    </section>
  );
}

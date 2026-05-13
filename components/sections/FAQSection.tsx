"use client";

import { useState } from "react";
import AnimateIn from "@/components/ui/AnimateIn";
import faqData from "@/data/faq.json";

export default function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(0);
  const toggle = (id: number) => setOpenId(openId === id ? null : id);

  return (
    <section className="py-24 lg:py-32 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* ── Header ── */}
        <AnimateIn className="mb-16">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-8 bg-brand" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-brand">Pertanyaan Umum</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-[1.1] tracking-tight">
              FAQ
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs md:pb-1 shrink-0">
              Cari jawaban untuk pertanyaan yang sering diajukan tentang layanan dan proses kami.
            </p>
          </div>
        </AnimateIn>

        {/* ── Two-col layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 lg:gap-20 items-start">

          {/* Accordion */}
          <AnimateIn delay={80} className="divide-y divide-slate-200">
            {faqData.map((item, index) => {
              const isOpen = openId === index;
              return (
                <div key={index}>
                  <button
                    onClick={() => toggle(index)}
                    className="w-full flex items-start gap-5 py-6 text-left group"
                    aria-expanded={isOpen}
                  >
                    <span className="text-[11px] font-mono text-slate-300 shrink-0 w-5 tabular-nums pt-0.5">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className={`flex-1 text-sm font-semibold leading-snug transition-colors duration-200 ${
                      isOpen ? "text-brand" : "text-slate-800 group-hover:text-slate-950"
                    }`}>
                      {item.question}
                    </span>

                    <svg className={`shrink-0 w-4 h-4 mt-0.5 transition-all duration-300 ${
                      isOpen ? "rotate-180 text-brand" : "text-slate-300 group-hover:text-slate-500"
                    }`} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}>
                    <div className="pl-10 pb-6">
                      <p className="text-slate-500 text-sm leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </AnimateIn>

          {/* Side card */}
          <AnimateIn delay={160} className="lg:sticky lg:top-28">
            <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm">
              <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center mb-5">
                <svg className="w-5 h-5 text-brand" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">Masih ada pertanyaan?</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-5">
                Jangan ragu untuk menghubungi kami langsung. Tim kami siap membantu Anda.
              </p>
              <a
                href="mailto:navyrastudio@gmail.com"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline underline-offset-4 transition-colors"
              >
                navyrastudio@gmail.com
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </AnimateIn>

        </div>
      </div>
    </section>
  );
}

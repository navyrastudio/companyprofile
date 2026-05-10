"use client";

import type { IconType } from "react-icons";
import {
  SiReact, SiNextdotjs, SiLaravel, SiWordpress, SiWebflow, SiVuedotjs,
  SiFigma, SiFramer, SiCanva, SiBehance, SiDribbble,
} from "react-icons/si";
import { Icon as IconifyIcon } from "@iconify/react";
import AnimateIn from "@/components/ui/AnimateIn";
import SectionLabel from "@/components/ui/SectionLabel";
import servicesData from "@/data/services.json";

const siIconMap: Record<string, IconType> = {
  SiReact, SiNextdotjs, SiLaravel, SiWordpress, SiWebflow, SiVuedotjs,
  SiFigma, SiFramer, SiCanva, SiBehance, SiDribbble,
};

const WA_NUMBER = "6285163665100";

function buildWaUrl(serviceTitle: string, tier: string, price?: number): string {
  const priceText = price
    ? `Rp ${price.toLocaleString("id-ID")}`
    : "Custom (Hubungi Kami)";

  const message = [
    `Halo, saya tertarik untuk berkonsultasi mengenai layanan berikut:`,
    ``,
    `📌 *Layanan*: ${serviceTitle}`,
    `📦 *Paket*: ${tier}`,
    `💰 *Harga*: ${priceText}`,
    ``,
    `Mohon informasinya lebih lanjut. Terima kasih! 🙏`,
  ].join("\n");

  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

interface ServicePricelistProps {
  serviceId: number;
}

export default function ServicePricelist({ serviceId }: ServicePricelistProps) {
  const service = servicesData.find((s) => s.id === serviceId);

  if (!service) {
    return (
      <section className="py-16 sm:py-24 lg:py-32 bg-white relative">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900">Layanan tidak ditemukan</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-white relative">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <AnimateIn className="flex flex-col items-start gap-3 mb-12 sm:mb-20">
          <SectionLabel>Pricelist</SectionLabel>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
            {service.title}
          </h2>
          <p className="text-slate-500 leading-relaxed max-w-lg text-sm sm:text-base">
            {service.description}
          </p>
        </AnimateIn>

        {/* ── Main Content ── */}
        <AnimateIn delay={150} className="space-y-8 sm:space-y-10">

          {/* Items / Tags */}
          <div className="flex flex-wrap gap-2">
            {service.items.map((item) => (
              <span
                key={item}
                className="px-3 py-1.5 text-xs font-medium bg-slate-50 border border-slate-200 text-slate-600 hover:border-brand hover:text-brand hover:bg-brand-50 transition-all duration-200 rounded-full"
              >
                {item}
              </span>
            ))}
          </div>

          {/* Tech stack */}
          {service.techStack && (
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <span className="text-[10px] uppercase tracking-[0.15em] text-slate-400 font-semibold w-full sm:w-auto">
                Tech Stack
              </span>
              {service.techStack.map((tech) => {
                const t = tech as { name: string; icon: string; lib?: string; color?: string };
                const color = t.color ?? "#94a3b8";

                if (t.lib === "iconify") {
                  return (
                    <div key={t.name} title={t.name} className="group flex items-center gap-1.5 cursor-default">
                      <IconifyIcon icon={t.icon} width={15} height={15} style={{ color, opacity: 0.65 }} className="group-hover:opacity-100 transition-opacity duration-200" />
                      <span className="text-xs text-slate-400 group-hover:text-slate-700 transition-colors duration-200">{t.name}</span>
                    </div>
                  );
                }

                const SiIcon = siIconMap[t.icon];
                return SiIcon ? (
                  <div key={t.name} title={t.name} className="group flex items-center gap-1.5 cursor-default">
                    <SiIcon size={15} style={{ color, opacity: 0.65 }} className="group-hover:opacity-100 transition-opacity duration-200" />
                    <span className="text-xs text-slate-400 group-hover:text-slate-700 transition-colors duration-200">{t.name}</span>
                  </div>
                ) : null;
              })}
            </div>
          )}

          {/* ── Pricing cards ── */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400 mb-4">
              Paket Harga
            </p>

            <div className="">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                {/* ── Medium ── */}
                <AnimateIn delay={200}>
                  <div className="flex flex-col h-full rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 hover:border-slate-300 hover:shadow-sm transition-all duration-200">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3 sm:mb-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300 inline-block" />
                      Medium
                    </span>
                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-2 sm:mb-3 tabular-nums">
                      Rp {service.pricing.medium.price.toLocaleString("id-ID")}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-5 flex-1">
                      {service.pricing.medium.description}
                    </p>
                    <a
                      href={buildWaUrl(service.title, "Medium", service.pricing.medium.price)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:border-brand hover:text-brand hover:bg-brand-50 transition-all duration-200 group"
                    >
                      {/* WhatsApp icon */}
                      <svg className="w-4 h-4 shrink-0 text-[#25D366] group-hover:scale-110 transition-transform duration-200" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Konsultasi Sekarang
                    </a>
                  </div>
                </AnimateIn>

                {/* ── Menengah — Featured ── */}
                <AnimateIn delay={250}>
                  <div className="relative flex flex-col h-full rounded-2xl bg-brand p-5 sm:p-6 shadow-lg shadow-brand/20 hover:shadow-xl hover:shadow-brand/25 transition-all duration-200">
                    <span className="absolute -top-3 left-5 bg-white text-brand text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm border border-brand/10">
                      Recommended
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-white/60 mb-3 sm:mb-4 mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/50 inline-block" />
                      Menengah
                    </span>
                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3 tabular-nums">
                      Rp {service.pricing.menengah.price.toLocaleString("id-ID")}
                    </div>
                    <p className="text-xs sm:text-sm text-white/80 leading-relaxed mb-5 flex-1">
                      {service.pricing.menengah.description}
                    </p>
                    <a
                      href={buildWaUrl(service.title, "Menengah", service.pricing.menengah.price)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white text-brand text-xs font-semibold hover:bg-white/90 active:scale-[0.98] transition-all duration-200 group"
                    >
                      <svg className="w-4 h-4 shrink-0 text-[#25D366] group-hover:scale-110 transition-transform duration-200" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Konsultasi Sekarang
                    </a>
                  </div>
                </AnimateIn>

                {/* ── High (Custom) ── */}
                <AnimateIn delay={300}>
                  <div className="flex flex-col h-full rounded-2xl bg-slate-900 p-5 sm:p-6 hover:bg-slate-800 transition-all duration-200">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3 sm:mb-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-600 inline-block" />
                      High (Custom)
                    </span>
                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3">
                      Hubungi Kami
                    </div>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-5 flex-1">
                      {service.pricing.high.description}
                    </p>
                    <a
                      href={buildWaUrl(service.title, "High (Custom)")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-slate-700 text-slate-300 text-xs font-semibold hover:border-[#25D366] hover:text-[#25D366] hover:bg-[#25D366]/5 active:scale-[0.98] transition-all duration-200 group"
                    >
                      <svg className="w-4 h-4 shrink-0 text-[#25D366] group-hover:scale-110 transition-transform duration-200" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Konsultasi Sekarang
                    </a>
                  </div>
                </AnimateIn>

              </div>
            </div>
          </div>

        </AnimateIn>
      </div>
    </section>
  );
}

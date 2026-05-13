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
import { useTranslations } from "next-intl";

const siIconMap: Record<string, IconType> = {
  SiReact, SiNextdotjs, SiLaravel, SiWordpress, SiWebflow, SiVuedotjs,
  SiFigma, SiFramer, SiCanva, SiBehance, SiDribbble,
};

const WA_NUMBER = "6285163665100";

const WaIcon = () => (
  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

type Tier = { label: string; price: number | null; description: string; features: string[] };
type Pricing = { medium: Tier; menengah: Tier; high: Tier };
type ServiceItem = { name: string; description: string; pricing: Pricing };
type Service = {
  id: number; title: string; slug: string; description: string;
  techStack: { name: string; icon: string; lib?: string; color?: string }[];
  items: ServiceItem[];
};

interface Props { serviceId: number; }

export default function ServicePricelist({ serviceId }: Props) {
  const tServices = useTranslations("services");
  const rawData = tServices.raw("data") as any;
  const servicesFromTranslations = Array.isArray(rawData) ? rawData : [];
  const service = servicesFromTranslations.find((s: any) => s.id === serviceId);
  
  const tPricelist = useTranslations("pricelist");
  const tMeta = useTranslations("meta");

  const buildWaUrl = (serviceTitle: string, itemName: string, tierLabel: string, price?: number | null): string => {
    const priceText = price ? `Rp ${price.toLocaleString("id-ID")}` : tPricelist("customPrice");
    const message = tPricelist("waMessage", { service: serviceTitle, item: itemName, tier: tierLabel, price: priceText });
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  if (!service) {
    return (
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-slate-900">{tMeta("serviceNotFound")}</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-white">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <AnimateIn className="flex flex-col items-start gap-3 mb-12 sm:mb-20">
          <SectionLabel>{tPricelist("fullLabel")}</SectionLabel>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
            {service.title}
          </h2>
          <p className="text-slate-500 leading-relaxed max-w-lg text-sm sm:text-base">
            {service.description}
          </p>
        </AnimateIn>

        {/* Tech Stack */}
        <AnimateIn delay={80}>
          {service.techStack && (
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 mb-16">
              <span className="text-[10px] uppercase tracking-[0.15em] text-slate-400 font-semibold">{tPricelist("tools")}</span>
              {service.techStack.map((tech: any) => {
                const color = tech.color ?? "#94a3b8";
                if (tech.lib === "iconify") {
                  return (
                    <div key={tech.name} title={tech.name} className="group flex items-center gap-1.5 cursor-default">
                      <IconifyIcon icon={tech.icon} width={15} height={15} style={{ color, opacity: 0.6 }} className="group-hover:opacity-100 transition-opacity" />
                      <span className="text-xs text-slate-400 group-hover:text-slate-700 transition-colors">{tech.name}</span>
                    </div>
                  );
                }
                const SiIcon = siIconMap[tech.icon];
                return SiIcon ? (
                  <div key={tech.name} title={tech.name} className="group flex items-center gap-1.5 cursor-default">
                    <SiIcon size={15} style={{ color, opacity: 0.6 }} className="group-hover:opacity-100 transition-opacity" />
                    <span className="text-xs text-slate-400 group-hover:text-slate-700 transition-colors">{tech.name}</span>
                  </div>
                ) : null;
              })}
            </div>
          )}
        </AnimateIn>

        {/* Per-item pricing */}
        <div className="space-y-16 sm:space-y-20">
          {service.items.map((item: any, idx: number) => {
            const tiers = [
              { key: "medium",   data: item.pricing.medium,   accent: false, dark: false },
              { key: "menengah", data: item.pricing.menengah, accent: true,  dark: false },
              { key: "high",     data: item.pricing.high,     accent: false, dark: true  },
            ];

            return (
              <AnimateIn key={item.name} delay={100 + idx * 50}>
                {/* Sub-item header */}
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-[11px] font-mono text-slate-300 tabular-nums shrink-0">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900">{item.name}</h3>
                    <p className="text-sm text-slate-400 mt-0.5">{item.description}</p>
                  </div>
                </div>

                {/* 3-tier cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pl-0 sm:pl-8">
                  {tiers.map(({ key, data, accent, dark }: any) => (
                    <div
                      key={key}
                      className={`relative flex flex-col rounded-2xl p-5 sm:p-6 transition-all duration-200 ${
                        accent
                          ? "bg-brand shadow-lg shadow-brand/20 hover:shadow-xl hover:shadow-brand/25"
                          : dark
                          ? "bg-slate-900 hover:bg-slate-800"
                          : "border border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                      }`}
                    >
                      {accent && (
                        <span className="absolute -top-3 left-5 bg-white text-brand text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm border border-brand/10">
                          {tPricelist("recommended")}
                        </span>
                      )}

                      {/* Tier label */}
                      <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest mb-3 mt-1 ${
                        accent ? "text-white/60" : dark ? "text-slate-500" : "text-slate-400"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full inline-block ${accent ? "bg-white/50" : dark ? "bg-slate-600" : "bg-slate-300"}`} />
                        {data.label}
                      </span>

                      {/* Price */}
                      <div className={`text-2xl sm:text-3xl font-bold tabular-nums mb-2 ${
                        accent ? "text-white" : dark ? "text-white" : "text-slate-900"
                      }`}>
                        {data.price ? `Rp ${data.price.toLocaleString("id-ID")}` : tPricelist("contactUs")}
                      </div>

                      {/* Description */}
                      <p className={`text-xs leading-relaxed mb-4 flex-1 ${
                        accent ? "text-white/80" : dark ? "text-slate-400" : "text-slate-500"
                      }`}>
                        {data.description}
                      </p>

                      {/* Features */}
                      <ul className="space-y-1.5 mb-5">
                        {data.features.map((f: any) => (
                          <li key={f} className={`flex items-start gap-2 text-xs ${
                            accent ? "text-white/80" : dark ? "text-slate-400" : "text-slate-500"
                          }`}>
                            <span className={`mt-1 w-1 h-1 rounded-full shrink-0 ${accent ? "bg-white/60" : dark ? "bg-slate-500" : "bg-brand"}`} />
                            {f}
                          </li>
                        ))}
                      </ul>

                      {/* CTA */}
                      <a
                        href={buildWaUrl(service.title, item.name, data.label, data.price)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                          accent
                            ? "bg-white text-brand hover:bg-white/90"
                            : dark
                            ? "border border-slate-700 text-slate-300 hover:border-[#25D366] hover:text-[#25D366] hover:bg-[#25D366]/5"
                            : "border border-slate-200 text-slate-700 hover:border-brand hover:text-brand hover:bg-brand-50"
                        }`}
                      >
                        <WaIcon />
                        {tPricelist("consultNow")}
                      </a>
                    </div>
                  ))}
                </div>

                {/* Sub-divider */}
                {idx < service.items.length - 1 && (
                  <div className="mt-14 h-px bg-slate-100" />
                )}
              </AnimateIn>
            );
          })}
        </div>

      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import clientsData from "@/data/clients.json";
import { useTranslations } from "next-intl";

type Client = { id: number; name: string; logo: string };
const clients = clientsData as Client[];
const ticker = [...clients, ...clients, ...clients];

export default function ClientsSection() {
  const t = useTranslations("clients");
  return (
    <section className="py-12 bg-white border-t border-slate-100">

      {/* ── Label ── */}
      <div className="flex items-center gap-4 px-6 lg:px-10 mb-8 max-w-7xl mx-auto">
        <span className="h-px flex-1 bg-slate-100" />
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-brand shrink-0">
          {t("label")}
        </span>
        <span className="h-px flex-1 bg-slate-100" />
      </div>

      {/* ── Marquee ── */}
      <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>

        {/* Fade masks */}
        <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: 120, background: "linear-gradient(90deg,#fff,transparent)", zIndex: 10, pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: 120, background: "linear-gradient(-90deg,#fff,transparent)", zIndex: 10, pointerEvents: "none" }} />

        {/* Track */}
        <div
          className="animate-marquee"
          style={{ display: "flex", flexDirection: "row", flexWrap: "nowrap", alignItems: "center", width: "max-content" }}
        >
          {ticker.map((client, i) => (
            <div
              key={`${client.id}-${i}`}
              style={{ display: "flex", alignItems: "center", paddingLeft: 40, paddingRight: 40, flexShrink: 0 }}
              className="logo-item"
              title={client.name}
            >
              <Image
                src={client.logo}
                alt={`Logo ${client.name}`}
                width={120}
                height={48}
                className="logo-img"
                style={{
                  height: 36,
                  width: "auto",
                  objectFit: "contain",
                  maxWidth: 120,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .logo-item {
          // opacity: 0.45;
          // filter: grayscale(100%);
          transition: opacity 0.3s, filter 0.3s;
          cursor: default;
        }
        .logo-item:hover {
          opacity: 1;
          filter: grayscale(0%);
        }
      `}</style>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import portfolioData from "@/data/portfolio.json";
import AnimateIn from "@/components/ui/AnimateIn";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import { getPortfolioSlug } from "@/lib/portfolioSlugUtils";

type PortfolioItem = {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  image: string;
  featured?: boolean;
};

export default function PortfolioSection() {
  const items = (portfolioData as PortfolioItem[]).filter((item) => item.featured).slice(0, 3);

  return (
    <section id="proyek" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <AnimateIn className="flex flex-col items-start gap-4 mb-14">
          <SectionLabel>Proyek Kami</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
            Karya yang kami banggakan.
          </h2>
        </AnimateIn>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {items.map((item, i) => {
            const slug = getPortfolioSlug(item.id);
            return (
              <AnimateIn key={item.id} delay={i * 60}>
                <Link href={`/portfolio/${slug}`}>
                  <div className="group relative overflow-hidden bg-slate-100 cursor-pointer rounded-sm" style={{ aspectRatio: '5/4' }}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/55 transition-all duration-400" />
                    <div className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-white/60 mb-1">
                        {item.category} · {item.year}
                      </span>
                      <p className="text-base font-bold text-white leading-tight">{item.title}</p>
                      <p className="text-xs text-white/60 mt-0.5">{item.subtitle}</p>
                    </div>
                  </div>
                </Link>
              </AnimateIn>
            );
          })}
        </div>

        {/* CTA Button */}
        <AnimateIn className="flex justify-center">
          <Button href="/portfolio" variant="primary" showArrow>
            Lihat Semua Proyek
          </Button>
        </AnimateIn>
      </div>
    </section>
  );
}

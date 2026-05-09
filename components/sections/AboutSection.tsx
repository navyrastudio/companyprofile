import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import AnimateIn from "@/components/ui/AnimateIn";
import companyData from "@/data/company.json";

export default function AboutSection() {
  return (
    <section id="tentang" className="snap-start min-h-screen py-20 lg:py-28 bg-gray-50 relative overflow-hidden flex flex-col justify-center">
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-125 h-125 bg-blue-100/50 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section divider line */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Visual */}
          <AnimateIn from="left" className="relative">
            {/* Main card */}
            <div className="relative overflow-hidden bg-linear-to-br from-blue-50 to-slate-100 border border-slate-200 aspect-4/3">
              {/* Grid pattern inside */}
              <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)",
                  backgroundSize: "30px 30px",
                }}
              />

              {/* Studio display */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-8">
                {/* Monitor */}
                <div className="relative">
                  <div className="w-48 h-32 bg-white border border-blue-300/50 shadow-lg flex items-center justify-center">
                    <Image src="/navyra-logo.png" alt="Navyra Studio" width={120} height={40} className="w-28 h-auto object-contain opacity-60" />
                    {/* Screen glare */}
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-linear-to-b from-black/3 to-transparent" />
                  </div>
                  <div className="w-12 h-3 bg-slate-200 border-x border-b border-blue-300/20 mx-auto" />
                  <div className="w-20 h-0.5 bg-blue-300/30 mx-auto" />
                </div>

                {/* Floating UI chips */}
                <div className="flex gap-2 absolute top-5 left-5">
                  <div className="w-2 h-2 bg-blue-300/50 border border-blue-400/30" />
                  <div className="w-1.5 h-1.5 bg-blue-200/40 border border-blue-300/20 mt-1" />
                </div>

                {/* Corner accent lines */}
                <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-blue-500/30" />
                <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-blue-500/30" />
              </div>

              {/* Bottom gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-blue-100/60 to-transparent" />
            </div>

            {/* Floating accent card */}
            <div className="absolute -bottom-5 -right-3 sm:-right-5 bg-white border border-slate-200 shadow-md p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 border border-blue-300/50 flex items-center justify-center p-1.5">
                    <Image src="/inilogo.png" alt="Navyra Studio" width={40} height={40} className="w-full h-full object-contain" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium uppercase tracking-widest">Berdiri sejak</div>
                  <div className="text-2xl font-bold text-slate-900 mt-0.5">{companyData.since}</div>
                </div>
              </div>
            </div>

            {/* Decorative dots grid */}
            <div className="absolute -top-4 -left-4 grid grid-cols-4 gap-2">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="w-1 h-1 bg-blue-400/40" />
              ))}
            </div>
          </AnimateIn>

          {/* Right: Content */}
          <AnimateIn from="right" delay={150} className="flex flex-col gap-7">
            <SectionLabel>Tentang Kami</SectionLabel>

            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
              {companyData.about.heading}
            </h2>

            <div className="w-12 h-px bg-blue-500/50" />

            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              {companyData.about.description}
            </p>

            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Karena bagi kami, produk digital terbaik bukan hanya tentang tampilan, tetapi tentang bagaimana sebuah solusi dapat membantu bisnis bertumbuh dan terhubung lebih dekat dengan penggunanya.
            </p>

            {/* Stats grid */}
            {/* <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 mt-2 border-t border-slate-200">
              {statsData.map((stat) => (
                <StatCard
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                  icon={stat.icon}
                />
              ))}
            </div> */}
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}

import StatCard from "@/components/ui/StatCard";
import SectionLabel from "@/components/ui/SectionLabel";
import { LogoMark } from "@/components/ui/Icons";
import companyData from "@/data/company.json";
import statsData from "@/data/stats.json";

export default function AboutSection() {
  return (
    <section id="tentang" className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Visual */}
          <div className="relative">
            {/* Main image card */}
            <div className="relative rounded-3xl overflow-hidden bg-linear-to-br from-blue-900 to-blue-700 aspect-4/3">
              {/* Decorative office/workspace illustration */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-8">
                {/* Monitor */}
                <div className="relative">
                  <div className="w-48 h-32 bg-blue-800/80 rounded-xl border border-blue-600/50 flex items-center justify-center shadow-2xl">
                    <LogoMark className="w-16 h-16 text-blue-300 opacity-60" />
                  </div>
                  {/* Monitor stand */}
                  <div className="w-12 h-3 bg-blue-800 mx-auto rounded-b-md" />
                  <div className="w-20 h-1.5 bg-blue-800/70 mx-auto rounded-full" />
                </div>
                {/* Floating UI elements */}
                <div className="flex gap-3 absolute top-6 right-6">
                  <div className="w-8 h-8 rounded-full bg-blue-400/20 border border-blue-400/30" />
                  <div className="w-4 h-4 rounded-full bg-blue-300/20 border border-blue-300/30 mt-2" />
                </div>
              </div>

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-blue-950/30 to-transparent" />
            </div>

            {/* Floating accent card */}
            <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-white rounded-2xl shadow-xl shadow-blue-100/60 p-5 border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                  <LogoMark className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-xs text-gray-400 font-medium">Berdiri sejak</div>
                  <div className="text-xl font-bold text-gray-900">{companyData.since}</div>
                </div>
              </div>
            </div>

            {/* Decorative dots */}
            <div className="absolute -top-4 -left-4 grid grid-cols-4 gap-2">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-200" />
              ))}
            </div>
          </div>

          {/* Right: Content */}
          <div className="flex flex-col gap-6">
            <SectionLabel>Tentang Kami</SectionLabel>

            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              {companyData.about.heading}
            </h2>

            <p className="text-gray-500 leading-relaxed">
              {companyData.about.description}
            </p>

            <p className="text-gray-500 leading-relaxed">
              Dengan pengalaman lebih dari 5 tahun, kami telah membantu
              puluhan brand dari berbagai industri untuk tampil lebih profesional,
              konsisten, dan berkesan di era digital.
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 mt-2 border-t border-gray-200">
              {statsData.map((stat) => (
                <StatCard
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                  icon={stat.icon}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

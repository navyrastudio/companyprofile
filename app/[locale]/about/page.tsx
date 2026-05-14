import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import AboutHero from "@/components/sections/AboutHero";
import AnimateIn from "@/components/ui/AnimateIn";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import companyData from "@/data/company.json";
import Image from "next/image";
import { FaLinkedin, FaInstagram, FaEnvelope, FaLightbulb, FaBullseye } from "react-icons/fa";
import { FiCheckCircle, FiSearch, FiPenTool, FiCode, FiArrowRight } from "react-icons/fi";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const siteUrl = companyData.siteUrl || "https://navyra.id";

  return {
    title: t("aboutTitle"),
    description: companyData.about?.description || companyData.description,
    openGraph: {
      title: t("aboutTitle"),
      description: companyData.about?.description || companyData.description,
      url: `${siteUrl}/${locale}/about`,
    },
  };
}

function AboutContent() {
  const t = useTranslations("about");
  const tFooter = useTranslations("footer");

  return (
    <section className="py-24 lg:py-32 bg-white relative">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32 relative z-10">

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <AnimateIn className="space-y-8">
            <SectionLabel>{t("visionMission")}</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              {t.rich("visionMissionHeading", {
                highlight: (chunks) => <span className="text-transparent bg-clip-text bg-linear-to-r from-brand to-blue-600">{chunks}</span>
              })}
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              {t("longDesc")}
            </p>
          </AnimateIn>

          <div className="space-y-6">
            <AnimateIn delay={100} className="bg-slate-50/80 backdrop-blur-sm border border-slate-200 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-6">
                <FaLightbulb className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{t("vision")}</h3>
              <p className="text-slate-600 text-lg leading-relaxed">{t("visionText")}</p>
            </AnimateIn>

            <AnimateIn delay={200} className="bg-slate-50/80 backdrop-blur-sm border border-slate-200 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-14 h-14 bg-brand/10 text-brand rounded-lg flex items-center justify-center mb-6">
                <FaBullseye className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{t("mission")}</h3>
              <ul className="space-y-4">
                {[0, 1, 2].map((i) => (
                  <li key={i} className="flex items-start">
                    <FiCheckCircle className="w-6 h-6 text-brand shrink-0 mr-4 mt-0.5" />
                    <span className="text-slate-700 text-lg">{t(`missionItems.${i}`)}</span>
                  </li>
                ))}
              </ul>
            </AnimateIn>
          </div>
        </div>

        {/* Core Values */}
        <div className="space-y-12">
          <AnimateIn className="text-center max-w-2xl mx-auto">
            <SectionLabel className="justify-center mb-4">{t("ourValues")}</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              {t("coreValuesHeading")}
            </h2>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[0, 1, 2].map((i) => (
              <AnimateIn key={i} delay={i * 100} className="group relative bg-white p-8 rounded-xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-brand/30 transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-brand to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <h4 className="text-xl font-bold text-slate-900 mb-3">{t(`values.${i}.label`)}</h4>
                <p className="text-slate-600 leading-relaxed">{t(`values.${i}.desc`)}</p>
              </AnimateIn>
            ))}
          </div>
        </div>

        {/* How We Work */}
        <div className="bg-slate-900 rounded-2xl p-8 md:p-12 lg:p-16 relative overflow-hidden">
          {/* Subtle glow inside the dark section */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/20 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/4" />
          
          <AnimateIn className="relative z-10 max-w-3xl mb-16">
            <span className="inline-block py-1 px-3 rounded-md bg-white/10 text-white text-sm font-medium tracking-wider uppercase mb-6 border border-white/20">
              {t("howWeWork")}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              {t("howWeWorkHeading")}
            </h2>
            <p className="text-xl text-slate-300">
              {t("howWeWorkDesc")}
            </p>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            <AnimateIn delay={100} className="relative group">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg flex items-center justify-center text-white mb-6 group-hover:bg-brand transition-colors duration-300">
                <FiSearch className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold text-white mb-4 flex items-center">
                <span className="text-brand/50 mr-3 text-lg font-mono">01</span> {t("research")}
              </h4>
              <p className="text-slate-400 leading-relaxed">{t("researchDesc")}</p>
            </AnimateIn>

            <AnimateIn delay={200} className="relative group">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg flex items-center justify-center text-white mb-6 group-hover:bg-brand transition-colors duration-300">
                <FiPenTool className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold text-white mb-4 flex items-center">
                <span className="text-brand/50 mr-3 text-lg font-mono">02</span> {t("design")}
              </h4>
              <p className="text-slate-400 leading-relaxed">{t("designDesc")}</p>
            </AnimateIn>

            <AnimateIn delay={300} className="relative group">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg flex items-center justify-center text-white mb-6 group-hover:bg-brand transition-colors duration-300">
                <FiCode className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold text-white mb-4 flex items-center">
                <span className="text-brand/50 mr-3 text-lg font-mono">03</span> {t("implementation")}
              </h4>
              <p className="text-slate-400 leading-relaxed">{t("implementationDesc")}</p>
            </AnimateIn>
          </div>
        </div>

        {/* Contact Banner */}
        <AnimateIn className="bg-linear-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{t("contactLabel")}</h3>
            <p className="text-lg text-slate-600 mb-6">{t("contactDesc")}</p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={`mailto:${tFooter("contactEmail")}`} className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-brand text-white font-medium hover:bg-brand-dark transition-colors shadow-lg shadow-brand/20">
                <FaEnvelope className="mr-2" /> {t("emailUs")}
              </a>
              <a href={`tel:${companyData.phone.replace(/\s+/g, "")}`} className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-slate-700 font-medium border border-slate-200 hover:bg-slate-50 transition-colors">
                {t("callUs")}
              </a>
            </div>
          </div>
          
          <div className="hidden lg:flex w-24 h-24 bg-white rounded-xl items-center justify-center shadow-xl border border-slate-100 shrink-0 relative rotate-3 hover:rotate-12 transition-transform duration-500">
            <FiArrowRight className="w-10 h-10 text-brand" />
          </div>
        </AnimateIn>

      </div>
    </section>
  );
}

const FoundersSection = () => {
  const t = useTranslations("about");

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimateIn className="text-center max-w-2xl mx-auto mb-16">
          <SectionLabel className="justify-center mb-4">{t("founders")}</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">
            {t("foundersHeading")}
          </h2>
          <p className="text-slate-600 text-lg">
            {t("founderBio")}
          </p>
        </AnimateIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {(companyData.founders || []).map((founder, idx) => (
            <AnimateIn key={founder.name} delay={idx * 100} className="group h-full flex">
              <div className="flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-2xl hover:border-brand/30 transition-all duration-500 overflow-hidden w-full">
                {/* Photo Header */}
                <div className="w-full h-64 bg-slate-100 relative overflow-hidden group-hover:bg-brand transition-colors duration-500 shrink-0">
                  <Image 
                    src={founder.image} 
                    alt={founder.name} 
                    fill
                    className="object-cover object-top group-hover:scale-105 group-hover:opacity-90 transition-all duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  {/* Subtle gradient overlay at bottom of photo to blend with content */}
                  <div className="absolute bottom-0 left-0 w-full h-24 bg-linear-to-t from-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col grow relative bg-white z-10">
                  {/* Subtle top border that changes color on hover */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-slate-100 group-hover:bg-linear-to-r group-hover:from-brand group-hover:to-blue-600 transition-all duration-500" />
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-brand transition-colors line-clamp-2">{founder.name}</h3>
                  <p className="text-sm font-medium text-slate-500 mb-6">{founder.role}</p>
                  
                  {/* Footer / Socials pinned to bottom */}
                  <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                    <a href={`mailto:${founder.email}`} className="text-slate-400 hover:text-brand transition-colors" title={t("founderEmail")}>
                      <FaEnvelope className="w-5 h-5" />
                    </a>
                    <div className="flex items-center space-x-4">
                      {founder.socials?.linkedin && (
                        <a href={founder.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-600 transition-colors" title={t("founderLinkedIn")}>
                          <FaLinkedin className="w-5 h-5" />
                        </a>
                      )}
                      {founder.socials?.instagram && (
                        <a href={founder.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-pink-600 transition-colors" title={t("founderInstagram")}>
                          <FaInstagram className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-white">
      <AboutHero />
      <AboutContent />
      <FoundersSection />
    </main>
  );
}

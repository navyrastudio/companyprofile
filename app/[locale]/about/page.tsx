import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import AboutHero from "@/components/sections/AboutHero";
import AnimateIn from "@/components/ui/AnimateIn";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import companyData from "@/data/company.json";

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
    <section className="py-16 sm:py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">

        <AnimateIn className="space-y-6">
          <SectionLabel>{t("visionMission")}</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div>
              <h3 className="text-xl font-bold text-slate-900">{t("vision")}</h3>
              <p className="text-slate-600 mt-3">{t("visionText")}</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">{t("mission")}</h3>
              <ul className="mt-3 space-y-2 text-slate-600 list-inside">
                {[0, 1, 2].map((i) => (
                  <li key={i}>{t(`missionItems.${i}`)}</li>
                ))}
              </ul>
            </div>
          </div>
        </AnimateIn>

        <AnimateIn delay={50} className="space-y-6">
          <SectionLabel>{t("ourValues")}</SectionLabel>
          <div className="flex flex-wrap gap-3">
            {(companyData.highlights || []).map((h) => (
              <div key={h} className="px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-700 text-sm">
                {h}
              </div>
            ))}
          </div>
        </AnimateIn>

        <AnimateIn delay={100} className="space-y-6">
          <SectionLabel>{t("howWeWork")}</SectionLabel>
          <p className="text-slate-600">{t("howWeWorkDesc")}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
              <h4 className="font-semibold">{t("research")}</h4>
              <p className="text-sm text-slate-600 mt-2">{t("researchDesc")}</p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
              <h4 className="font-semibold">{t("design")}</h4>
              <p className="text-sm text-slate-600 mt-2">{t("designDesc")}</p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
              <h4 className="font-semibold">{t("implementation")}</h4>
              <p className="text-sm text-slate-600 mt-2">{t("implementationDesc")}</p>
            </div>
          </div>
        </AnimateIn>

        <AnimateIn delay={150} className="space-y-6">
          <SectionLabel>{t("contactLabel")}</SectionLabel>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <p className="text-slate-600">{t("contactDesc")}</p>
              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <Button href={`mailto:${tFooter("contactEmail")}`} variant="primary" size="sm">{t("email")}: {tFooter("contactEmail")}</Button>
                <Button href={`tel:${companyData.phone.replace(/\s+/g, "")}`} variant="primary" size="sm">{t("phone")}: {companyData.phone}</Button>
              </div>
            </div>
            <div className="text-sm text-slate-500">
              <div>{companyData.address}</div>
              <div className="mt-3">{t("followUs")}{' '}
                {(companyData.socials && Object.entries(companyData.socials))?.map(([k, v]) => (
                  <a key={k} href={v} className="ml-3 text-brand underline" target="_blank" rel="noreferrer">{k}</a>
                ))}
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-white">
      <AboutHero />
      <AboutContent />
    </main>
  );
}

import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import ServicesAccordion from "./ServicesAccordion";
import { getTranslations } from "next-intl/server";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: t("layananTitle"),
    description: t("layananDescription"),
  };
}

export default async function LayananPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-white">
      <ServicesAccordion />
    </div>
  );
}

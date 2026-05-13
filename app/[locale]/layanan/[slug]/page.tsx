import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ServicePricelist from "@/components/sections/ServicePricelist";
import { getServiceIdFromSlug, getServiceSlug } from "@/lib/slugUtils";
import servicesData from "@/data/services.json";
import companyData from "@/data/company.json";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const serviceId = getServiceIdFromSlug(slug);

  if (!serviceId) {
    return { title: t("serviceNotFound") };
  }

  const service = servicesData.find((s) => s.id === serviceId);
  const siteUrl = companyData.siteUrl || "https://navyra.id";
  const title = `${service?.title} - ${t("servicePricelistSuffix")}`;
  const description = service?.description || t("serviceDescriptionFallback");

  return {
    title,
    description,
    openGraph: {
      title, description,
      url: `${siteUrl}/${locale}/layanan/${getServiceSlug(serviceId)}`,
    },
    twitter: { title, description },
  };
}

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: getServiceSlug(service.id),
  }));
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const serviceId = getServiceIdFromSlug(slug);

  if (!serviceId) notFound();

  return (
    <div className="min-h-screen bg-white">
      <ServicePricelist serviceId={serviceId} />
    </div>
  );
}

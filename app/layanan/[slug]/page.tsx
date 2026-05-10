import { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePricelist from "@/components/sections/ServicePricelist";
import { getServiceIdFromSlug, getServiceSlug } from "@/lib/slugUtils";
import servicesData from "@/data/services.json";
import companyData from "@/data/company.json";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const serviceId = getServiceIdFromSlug(slug);
  
  if (!serviceId) {
    return {
      title: "Layanan tidak ditemukan - Navyra Studio",
    };
  }

  const service = servicesData.find((s) => s.id === serviceId);
  const siteUrl = companyData.siteUrl || "https://navyra.id";
  const title = `${service?.title} - Pricelist Lengkap | Navyra Studio`;
  const description = service?.description || "Lihat pricelist dan paket layanan kami";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteUrl}/layanan/${getServiceSlug(serviceId)}`,
    },
    twitter: {
      title,
      description,
    },
  };
}

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: getServiceSlug(service.id),
  }));
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const serviceId = getServiceIdFromSlug(slug);

  if (!serviceId) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <ServicePricelist serviceId={serviceId} />
    </div>
  );
}

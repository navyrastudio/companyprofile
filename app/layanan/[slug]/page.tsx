import { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePricelist from "@/components/sections/ServicePricelist";
import { getServiceIdFromSlug, getServiceSlug } from "@/lib/slugUtils";
import servicesData from "@/data/services.json";

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
  
  return {
    title: `${service?.title} - Pricelist Lengkap | Navyra Studio`,
    description: service?.description || "Lihat pricelist dan paket layanan kami",
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

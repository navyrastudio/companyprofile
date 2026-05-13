import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRight, BrandIcon, WebIcon, UIIcon, PhotoIcon, DevIcon, SEOIcon } from "@/components/ui/Icons";

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  href: string;
}

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  brand: BrandIcon,
  web: WebIcon,
  ui: UIIcon,
  photo: PhotoIcon,
  dev: DevIcon,
  seo: SEOIcon,
};

export default function ServiceCard({ icon, title, description, href }: ServiceCardProps) {
  const tMeta = useTranslations("meta");
  const IconComponent = iconMap[icon] || BrandIcon;

  return (
    <div className="group relative flex flex-col gap-4 p-6 rounded-2xl bg-white border border-gray-100 hover:border-blue-100 hover:shadow-lg hover:shadow-blue-50 transition-all duration-300 cursor-pointer">
      {/* Icon container */}
      <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
        <IconComponent className="w-6 h-6" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 flex-1">
        <h3 className="font-semibold text-gray-900 text-base">{title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
      </div>

      {/* Arrow link */}
      <Link
        href={href}
        className="self-start w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:border-blue-600 group-hover:text-blue-600 group-hover:bg-blue-50 transition-all duration-300"
        aria-label={`${tMeta("serviceCardLabel")} ${title}`}
      >
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

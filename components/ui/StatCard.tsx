import { ProjectIcon, ClientIcon, AwardIcon, QualityIcon } from "@/components/ui/Icons";

interface StatCardProps {
  value: string;
  label: string;
  icon: string;
}

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  project: ProjectIcon,
  client: ClientIcon,
  award: AwardIcon,
  quality: QualityIcon,
};

export default function StatCard({ value, label, icon }: StatCardProps) {
  const IconComponent = iconMap[icon] || ProjectIcon;

  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mb-1">
        <IconComponent className="w-5 h-5" />
      </div>
      <span className="text-3xl font-bold text-gray-900 leading-none">{value}</span>
      <span className="text-sm text-gray-500">{label}</span>
    </div>
  );
}

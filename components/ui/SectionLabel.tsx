interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-blue-600 ${className}`}
    >
      <span className="w-4 h-px bg-blue-600 inline-block" />
      {children}
      <span className="w-4 h-px bg-blue-600 inline-block" />
    </span>
  );
}

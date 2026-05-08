interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 ${className}`}
    >
      <span className="w-5 h-px bg-blue-600/60 inline-block" />
      {children}
      <span className="w-5 h-px bg-blue-600/60 inline-block" />
    </span>
  );
}

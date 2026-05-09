interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand ${className}`}
    >
      <span className="w-5 h-px bg-brand/60 inline-block" />
      {children}
      <span className="w-5 h-px bg-brand/60 inline-block" />
    </span>
  );
}

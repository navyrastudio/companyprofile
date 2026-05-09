import Link from "next/link";
import { ArrowRight } from "@/components/ui/Icons";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "outline" | "ghost" | "white";
  href?: string;
  onClick?: () => void;
  className?: string;
  showArrow?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

const variantClasses = {
  primary:
    "bg-brand text-white hover:bg-brand-500 border border-brand/40 hover:border-brand-300/60",
  outline:
    "border border-slate-300 text-slate-700 bg-transparent hover:border-brand hover:text-brand hover:bg-brand-50",
  ghost: "text-slate-600 hover:text-slate-900 hover:bg-slate-100",
  white: "bg-white text-blue-700 hover:bg-blue-50 border border-white/20",
};

export default function Button({
  children,
  variant = "primary",
  href,
  onClick,
  className = "",
  showArrow = false,
  size = "md",
}: ButtonProps) {
  const baseClasses = `inline-flex items-center gap-2 font-semibold font-heading rounded-full transition-all duration-200 ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {children}
        {showArrow && <ArrowRight className="w-4 h-4" />}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={baseClasses}>
      {children}
      {showArrow && <ArrowRight className="w-4 h-4" />}
    </button>
  );
}

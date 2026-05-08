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
  md: "px-6 py-3 text-sm",
  lg: "px-7 py-3.5 text-base",
};

const variantClasses = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 shadow-sm shadow-blue-200 hover:shadow-md hover:shadow-blue-200",
  outline:
    "border border-gray-200 text-gray-700 bg-white hover:border-blue-600 hover:text-blue-600",
  ghost: "text-gray-600 hover:text-blue-600 hover:bg-blue-50",
  white: "bg-white text-blue-700 hover:bg-blue-50 shadow-lg shadow-blue-900/20",
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
  const baseClasses = `inline-flex items-center gap-2 rounded-full font-medium transition-all duration-200 ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

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

import { cn } from "@/shared/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "ai" | "timing" | "live";
  className?: string;
}

export const Badge = ({ children, variant = "default", className }: BadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium",
        {
          "bg-brown-100 text-brown-700": variant === "default",
          "bg-brown-700 text-cream-50": variant === "ai",
          "bg-black/40 text-white backdrop-blur-sm": variant === "timing",
          "bg-brown-700 text-cream-50": variant === "live",
        },
        className
      )}
    >
      {children}
    </span>
  );
};

export type { BadgeProps };

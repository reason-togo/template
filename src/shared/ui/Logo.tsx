import { cn } from "@/shared/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "text-2xl",
  md: "text-4xl",
  lg: "text-6xl",
};

export const Logo = ({ className, size = "md" }: LogoProps) => {
  return (
    <h1
      className={cn(
        "font-serif italic font-normal",
        "bg-gradient-to-r from-primary-300 to-primary-400 bg-clip-text text-transparent",
        sizeClasses[size],
        className
      )}
    >
      떠날이유
    </h1>
  );
};

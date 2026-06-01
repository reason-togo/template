import { cn } from "@/shared/lib/utils";

interface TagProps {
  children: React.ReactNode;
  variant?: "light" | "dark" | "green";
  className?: string;
}

export const Tag = ({ children, variant = "light", className }: TagProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium",
        {
          "bg-brown-100 text-brown-500": variant === "light",
          "bg-brown-900 text-cream-50": variant === "dark",
          "bg-green-50 text-green-700 border border-green-200": variant === "green",
        },
        className
      )}
    >
      {children}
    </span>
  );
};

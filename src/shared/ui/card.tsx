import { cn } from "@/shared/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  featured?: boolean;
}

export const Card = ({ children, className, onClick, featured = false }: CardProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-cream-50 rounded-2xl overflow-hidden",
        featured ? "shadow-featured" : "shadow-card",
        onClick && "cursor-pointer card-press",
        className
      )}
    >
      {children}
    </div>
  );
};

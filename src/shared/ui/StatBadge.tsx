import { cn } from "@/shared/lib/utils";

interface StatBadgeProps {
  label: string;
  value: string;
  className?: string;
}

export const StatBadge = ({ label, value, className }: StatBadgeProps) => {
  return (
    <div
      className={cn(
        "inline-flex flex-col gap-1 px-4 py-2.5 rounded-lg",
        "bg-gradient-to-br from-background to-accent/30",
        "border border-primary-200/50",
        className
      )}
    >
      <span className="text-xs text-muted-foreground font-medium">{label}</span>
      <span className="text-sm font-semibold text-secondary">{value}</span>
    </div>
  );
};

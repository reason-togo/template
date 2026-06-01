import { cn } from "@/shared/lib/utils";

interface ChipProps {
  label: string;
  icon?: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export const Chip = ({ label, icon, selected = false, onClick, className }: ChipProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-150 select-none whitespace-nowrap",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brown-700",
        selected
          ? "bg-brown-900 text-cream-50 font-semibold"
          : "bg-brown-100 text-brown-700 border border-brown-200 hover:bg-brown-200",
        className
      )}
    >
      {icon && <span>{icon}</span>}
      <span>{label}</span>
    </button>
  );
};

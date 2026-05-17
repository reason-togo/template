import { cn } from "@/shared/lib/utils";

interface ChipProps {
  label: string;
  icon?: string;
  selected: boolean;
  onClick?: () => void;
}

export const Chip = ({ label, icon, selected, onClick }: ChipProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 rounded-full",
        "text-sm font-medium transition-all",
        "focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2",
        selected
          ? "bg-gradient-to-r from-primary-300 to-primary-400 text-white shadow-md"
          : "border border-primary-200 bg-white text-secondary hover:border-primary-300 hover:bg-primary-50"
      )}
    >
      {icon && <span className="text-base">{icon}</span>}
      <span>{label}</span>
    </button>
  );
};

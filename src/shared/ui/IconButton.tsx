import { LucideIcon } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

interface IconButtonProps {
  icon: LucideIcon;
  onClick?: () => void;
  className?: string;
  "aria-label"?: string;
}

export const IconButton = ({
  icon: Icon,
  onClick,
  className,
  "aria-label": ariaLabel,
}: IconButtonProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        "h-10 w-10 rounded-full",
        "bg-primary-100 hover:bg-primary-200",
        "transition-colors",
        className
      )}
    >
      <Icon className="h-5 w-5 text-secondary" />
    </Button>
  );
};

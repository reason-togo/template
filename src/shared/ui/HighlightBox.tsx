import { cn } from "@/shared/lib/utils";
import { Clock } from "lucide-react";

interface HighlightBoxProps {
  children: React.ReactNode;
  className?: string;
}

export const HighlightBox = ({ children, className }: HighlightBoxProps) => {
  return (
    <div
      className={cn(
        "p-4 rounded-xl",
        "bg-gradient-to-br from-accent/40 to-primary-200/30",
        "border-l-4 border-primary-300",
        className
      )}
    >
      <div className="flex items-start gap-2">
        <Clock className="h-5 w-5 text-primary-400 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-secondary leading-relaxed">{children}</div>
      </div>
    </div>
  );
};

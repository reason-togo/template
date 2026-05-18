import { cn } from "@/shared/lib/utils";
import { ArrowDown, Car, Footprints } from "lucide-react";

interface TransportInfoProps {
  type: "walk" | "car";
  duration: string;
  className?: string;
}

export const TransportInfo = ({
  type,
  duration,
  className,
}: TransportInfoProps) => {
  const Icon = type === "walk" ? Footprints : Car;

  return (
    <div className={cn("flex items-center gap-3 py-3 pl-14", className)}>
      <ArrowDown className="h-4 w-4 text-primary-300" />
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Icon className="h-4 w-4" />
        <span>{type === "walk" ? "도보" : "차량"}</span>
        <span>•</span>
        <span>{duration}</span>
      </div>
    </div>
  );
};

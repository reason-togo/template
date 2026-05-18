import { cn } from "@/shared/lib/utils";
import { MapPin } from "lucide-react";

interface PlaceInfoProps {
  title: string;
  location: string;
  className?: string;
}

export const PlaceInfo = ({ title, location, className }: PlaceInfoProps) => {
  return (
    <div className={cn("space-y-1", className)}>
      <h3 className="text-xl font-bold text-secondary">{title}</h3>
      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <MapPin className="h-4 w-4" />
        <span>{location}</span>
      </div>
    </div>
  );
};

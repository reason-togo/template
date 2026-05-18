import { cn } from "@/shared/lib/utils";
import Image from "next/image";

interface PlaceImageProps {
  src?: string;
  alt: string;
  className?: string;
}

export const PlaceImage = ({ src, alt, className }: PlaceImageProps) => {
  return (
    <div
      className={cn(
        "relative w-full h-56 rounded-t-2xl overflow-hidden",
        className
      )}
    >
      {src ? (
        <Image src={src} alt={alt} fill className="object-cover" />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-primary-200 via-primary-300 to-primary-400 flex items-center justify-center">
          <span className="text-white/90 text-sm font-medium">{alt}</span>
        </div>
      )}
    </div>
  );
};

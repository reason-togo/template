import { Card, CardContent } from "@/shared/ui/card";
import { StatBadge } from "@/shared/ui/StatBadge";
import { HighlightBox } from "@/shared/ui/HighlightBox";
import { PlaceImage } from "@/entities/place/ui/PlaceImage";
import { PlaceInfo } from "@/entities/place/ui/PlaceInfo";
import { cn } from "@/shared/lib/utils";

// Root 컴포넌트
interface PlaceCardRootProps {
  children: React.ReactNode;
  className?: string;
}

const PlaceCardRoot = ({ children, className }: PlaceCardRootProps) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      {children}
    </Card>
  );
};

// Image 컴포넌트
interface PlaceCardImageProps {
  src?: string;
  alt: string;
  className?: string;
}

const PlaceCardImage = ({ src, alt, className }: PlaceCardImageProps) => {
  return <PlaceImage src={src} alt={alt} className={className} />;
};

// Header 컴포넌트
interface PlaceCardHeaderProps {
  title: string;
  location: string;
  className?: string;
}

const PlaceCardHeader = ({
  title,
  location,
  className,
}: PlaceCardHeaderProps) => {
  return <PlaceInfo title={title} location={location} className={className} />;
};

// Content 컴포넌트
interface PlaceCardContentProps {
  children: React.ReactNode;
  className?: string;
}

const PlaceCardContent = ({
  children,
  className,
}: PlaceCardContentProps) => {
  return (
    <CardContent className={cn("p-5 space-y-4", className)}>
      {children}
    </CardContent>
  );
};

// Highlight 컴포넌트
interface PlaceCardHighlightProps {
  children: React.ReactNode;
  className?: string;
}

const PlaceCardHighlight = ({
  children,
  className,
}: PlaceCardHighlightProps) => {
  return <HighlightBox className={className}>{children}</HighlightBox>;
};

// Stats 컴포넌트
interface PlaceCardStatsProps {
  time: string;
  cost: string;
  className?: string;
}

const PlaceCardStats = ({ time, cost, className }: PlaceCardStatsProps) => {
  return (
    <div className={cn("flex gap-3", className)}>
      <StatBadge label="예상 시간" value={time} />
      <StatBadge label="예상 비용" value={cost} />
    </div>
  );
};

// Export compound component
export const PlaceCard = {
  Root: PlaceCardRoot,
  Image: PlaceCardImage,
  Header: PlaceCardHeader,
  Content: PlaceCardContent,
  Highlight: PlaceCardHighlight,
  Stats: PlaceCardStats,
};

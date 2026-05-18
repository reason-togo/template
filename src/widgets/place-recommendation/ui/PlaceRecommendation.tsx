import { PlaceCard } from '@/features/place-card/ui/PlaceCard';
import { Button } from '@/shared/ui/button';
import { Place } from '@/entities/place/model/types';

interface PlaceRecommendationProps {
  place: Place;
  onViewCourse?: () => void;
  className?: string;
}

export const PlaceRecommendation = ({
  place,
  onViewCourse,
  className,
}: PlaceRecommendationProps) => {
  return (
    <div className={className}>
      <div className="max-w-[390px] mx-auto px-6 py-8 space-y-6">
        {/* Section Title */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-secondary">
            오늘의 추천 여행지
          </h2>
          <p className="text-sm text-muted-foreground">
            당신의 취향에 맞는 완벽한 여행지를 찾았어요
          </p>
        </div>

        {/* Place Card */}
        <PlaceCard.Root>
          <PlaceCard.Image src={place.imageUrl} alt={place.name} />
          <PlaceCard.Content>
            <PlaceCard.Header title={place.name} location={place.location} />

            {place.realtimeReason && (
              <PlaceCard.Highlight>
                <strong className="text-primary-400">지금 출발하면</strong>{' '}
                {place.realtimeReason}
              </PlaceCard.Highlight>
            )}

            <p className="text-sm text-secondary leading-relaxed">
              {place.description}
            </p>

            <PlaceCard.Stats
              time={place.estimatedTime}
              cost={place.estimatedCost}
            />
          </PlaceCard.Content>
        </PlaceCard.Root>

        {/* CTA Button */}
        <Button
          size="lg"
          onClick={onViewCourse}
          className="w-full bg-gradient-to-r from-primary-300 to-primary-400 hover:from-primary-400 hover:to-primary-500 text-white font-semibold shadow-md"
        >
          주변 코스 보기
        </Button>
      </div>
    </div>
  );
};

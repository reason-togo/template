'use client';

import { useRouter, useParams } from 'next/navigation';
import { MOCK_PLACES } from '@/shared/mock/places';
import { PlaceCard } from '@/features/place-card/ui/PlaceCard';
import { IconButton } from '@/shared/ui/IconButton';
import { Button } from '@/shared/ui/button';
import { ArrowLeft, MapPin, Clock, DollarSign, Car } from 'lucide-react';

const PlaceDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const placeId = params.id as string;

  const place = MOCK_PLACES.find((p) => p.id === placeId);

  if (!place) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-semibold text-secondary mb-2">
            관광지를 찾을 수 없습니다
          </p>
          <Button onClick={() => router.back()}>돌아가기</Button>
        </div>
      </div>
    );
  }

  const handleBack = () => {
    router.back();
  };

  const handleAddToCourse = () => {
    alert('코스 추가 기능은 곧 지원됩니다!');
  };

  // 하드코딩된 상세 정보
  const detailInfo = {
    hours: '09:00 - 18:00',
    closedDay: '월요일',
    fee: place.estimatedCost,
    parking: '무료 주차 가능',
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-[390px] mx-auto px-6 py-4">
          <IconButton icon={ArrowLeft} onClick={handleBack} />
        </div>
      </div>

      <div className="max-w-[390px] mx-auto px-6 py-6 space-y-6">
        {/* Image Gallery */}
        <div className="space-y-3">
          {/* Main Image */}
          <PlaceCard.Image src={place.imageUrl} alt={place.name} />

          {/* Thumbnail Images (Gradient Placeholders) */}
          <div className="flex gap-2 overflow-x-auto">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex-shrink-0 w-24 h-24 rounded-xl bg-gradient-to-br from-primary-200 to-primary-300 flex items-center justify-center"
              >
                <span className="text-white/60 text-xs">사진 {i}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Place Info */}
        <div className="space-y-4">
          <div>
            <h1 className="text-2xl font-bold text-secondary mb-2">
              {place.name}
            </h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{place.address}</span>
            </div>
          </div>

          <p className="text-sm text-secondary leading-relaxed">
            {place.description}
          </p>
        </div>

        {/* Detail Information */}
        <div className="space-y-3 p-4 bg-accent/20 rounded-xl">
          <h3 className="text-sm font-semibold text-secondary">상세 정보</h3>

          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-primary-400" />
              <span className="text-sm text-secondary">
                운영시간: {detailInfo.hours}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-primary-400" />
              <span className="text-sm text-secondary">
                휴무일: {detailInfo.closedDay}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <DollarSign className="h-4 w-4 text-primary-400" />
              <span className="text-sm text-secondary">
                입장료: {detailInfo.fee}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Car className="h-4 w-4 text-primary-400" />
              <span className="text-sm text-secondary">
                주차: {detailInfo.parking}
              </span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <PlaceCard.Stats
          time={place.estimatedTime}
          cost={place.estimatedCost}
        />

        {/* Add to Course Button */}
        <Button
          size="lg"
          onClick={handleAddToCourse}
          className="w-full bg-gradient-to-r from-primary-300 to-primary-400 hover:from-primary-400 hover:to-primary-500 text-white font-semibold shadow-md"
        >
          코스에 추가
        </Button>
      </div>
    </div>
  );
};

export default PlaceDetailPage;

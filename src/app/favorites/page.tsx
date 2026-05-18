'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MOCK_PLACES } from '@/shared/mock/places';
import { PlaceCard } from '@/features/place-card/ui/PlaceCard';
import { IconButton } from '@/shared/ui/IconButton';
import { Logo } from '@/shared/ui/Logo';
import { Button } from '@/shared/ui/button';
import { ArrowLeft, Heart } from 'lucide-react';
import { Place } from '@/entities/place/model/types';

const FavoritesPage = () => {
  const router = useRouter();
  const [favorites, setFavorites] = useState<Place[]>([]);

  useEffect(() => {
    // localStorage에서 찜 목록 가져오기
    const favoriteIds = JSON.parse(localStorage.getItem('favorites') || '[]');
    const favoritePlaces = MOCK_PLACES.filter((place) =>
      favoriteIds.includes(place.id)
    );
    setFavorites(favoritePlaces);
  }, []);

  const handleBack = () => {
    router.back();
  };

  const handleCreateCourse = () => {
    alert('코스 만들기 기능은 곧 지원됩니다!');
  };

  const handleGoToHome = () => {
    router.push('/');
  };

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="max-w-[390px] mx-auto px-6 py-4 flex items-center justify-between">
            <IconButton icon={ArrowLeft} onClick={handleBack} />
            <Logo size="sm" />
            <div className="w-10" /> {/* Spacer */}
          </div>
        </div>

        {/* Empty State */}
        <div className="max-w-[390px] mx-auto px-6 py-32 text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-primary-100 flex items-center justify-center">
            <Heart className="h-10 w-10 text-primary-300" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-secondary">
              찜한 관광지가 없습니다
            </h2>
            <p className="text-sm text-muted-foreground">
              마음에 드는 관광지를 찜해보세요
            </p>
          </div>
          <Button
            size="lg"
            onClick={handleGoToHome}
            className="bg-gradient-to-r from-primary-300 to-primary-400 hover:from-primary-400 hover:to-primary-500 text-white font-semibold shadow-md"
          >
            관광지 찜하러 가기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-[390px] mx-auto px-6 py-4 flex items-center justify-between">
          <IconButton icon={ArrowLeft} onClick={handleBack} />
          <Logo size="sm" />
          <div className="w-10" /> {/* Spacer */}
        </div>
      </div>

      <div className="max-w-[390px] mx-auto px-6 py-8 space-y-6">
        {/* Title */}
        <div>
          <h1 className="text-2xl font-bold text-secondary mb-2">
            찜한 관광지
          </h1>
          <p className="text-sm text-muted-foreground">
            {favorites.length}개의 관광지를 찜했어요
          </p>
        </div>

        {/* Favorites List */}
        <div className="space-y-4">
          {favorites.map((place) => (
            <PlaceCard.Root key={place.id}>
              <PlaceCard.Image src={place.imageUrl} alt={place.name} />
              <PlaceCard.Content>
                <PlaceCard.Header title={place.name} location={place.location} />
                <p className="text-sm text-secondary leading-relaxed">
                  {place.description}
                </p>
                <PlaceCard.Stats
                  time={place.estimatedTime}
                  cost={place.estimatedCost}
                />
              </PlaceCard.Content>
            </PlaceCard.Root>
          ))}
        </div>

        {/* Create Course Button (Disabled) */}
        <Button
          size="lg"
          onClick={handleCreateCourse}
          disabled
          className="w-full bg-gradient-to-r from-primary-300 to-primary-400 text-white font-semibold shadow-md opacity-50 cursor-not-allowed"
        >
          선택한 관광지로 코스 만들기
        </Button>
      </div>
    </div>
  );
};

export default FavoritesPage;

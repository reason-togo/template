'use client';

import { useRouter } from 'next/navigation';
import { PlaceRecommendation } from '@/widgets/place-recommendation/ui/PlaceRecommendation';
import { MOCK_PLACES } from '@/shared/mock/places';
import { IconButton } from '@/shared/ui/IconButton';
import { Logo } from '@/shared/ui/Logo';
import { ArrowLeft, Heart } from 'lucide-react';

const RecommendationsPage = () => {
  const router = useRouter();
  const place = MOCK_PLACES[0]; // 군산 근대역사박물관

  const handleBack = () => {
    router.back();
  };

  const handleFavorite = () => {
    // localStorage에 찜 추가
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (!favorites.includes(place.id)) {
      favorites.push(place.id);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      alert('찜 목록에 추가되었습니다!');
    } else {
      alert('이미 찜한 관광지입니다.');
    }
  };

  const handleViewCourse = () => {
    router.push('/course');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-[390px] mx-auto px-6 py-4 flex items-center justify-between">
          <IconButton icon={ArrowLeft} onClick={handleBack} />
          <Logo size="sm" />
          <IconButton icon={Heart} onClick={handleFavorite} />
        </div>
      </div>

      {/* Content */}
      <PlaceRecommendation place={place} onViewCourse={handleViewCourse} />
    </div>
  );
};

export default RecommendationsPage;

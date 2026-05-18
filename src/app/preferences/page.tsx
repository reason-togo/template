'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { StyleSelector } from '@/features/preferences/ui/StyleSelector';
import { InterestSelector } from '@/features/preferences/ui/InterestSelector';
import { ScheduleSelector } from '@/features/preferences/ui/ScheduleSelector';
import { Button } from '@/shared/ui/button';
import { IconButton } from '@/shared/ui/IconButton';
import { ArrowLeft } from 'lucide-react';
import { PreferenceState } from '@/features/preferences/model/types';

const PreferencesPage = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState<PreferenceState>({
    interests: [],
    avoidances: [],
  });

  const handleBack = () => {
    if (step === 1) {
      router.back();
    } else {
      setStep(step - 1);
    }
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // 3단계 완료 시 추천 페이지로 이동
      router.push('/recommendations');
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return !!preferences.style;
      case 2:
        return preferences.interests.length > 0;
      case 3:
        return !!preferences.duration && !!preferences.region;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[390px] mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <IconButton icon={ArrowLeft} onClick={handleBack} />
          <span className="text-sm font-medium text-muted-foreground">
            {step}/3
          </span>
          <div className="w-10" /> {/* Spacer */}
        </div>

        {/* Progress Bar */}
        <div className="mb-8 h-2 bg-primary-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary-300 to-primary-400 transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {/* Step Content */}
        <div className="mb-8">
          {step === 1 && (
            <StyleSelector
              selectedStyle={preferences.style}
              onChange={(styleId) =>
                setPreferences({ ...preferences, style: styleId })
              }
            />
          )}

          {step === 2 && (
            <InterestSelector
              selectedInterests={preferences.interests}
              selectedAvoidances={preferences.avoidances}
              onInterestsChange={(interests) =>
                setPreferences({ ...preferences, interests })
              }
              onAvoidancesChange={(avoidances) =>
                setPreferences({ ...preferences, avoidances })
              }
            />
          )}

          {step === 3 && (
            <ScheduleSelector
              selectedDuration={preferences.duration}
              selectedRegion={preferences.region}
              onDurationChange={(duration) =>
                setPreferences({ ...preferences, duration })
              }
              onRegionChange={(region) =>
                setPreferences({ ...preferences, region })
              }
            />
          )}
        </div>

        {/* Next Button */}
        <Button
          size="lg"
          onClick={handleNext}
          disabled={!canProceed()}
          className="w-full bg-gradient-to-r from-primary-300 to-primary-400 hover:from-primary-400 hover:to-primary-500 text-white font-semibold shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {step === 3 ? '추천 받기' : '다음'}
        </Button>
      </div>
    </div>
  );
};

export default PreferencesPage;

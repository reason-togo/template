import { Chip } from '@/shared/ui/Chip';
import { INTERESTS, AVOIDANCES } from '@/shared/mock/preferences';

interface InterestSelectorProps {
  selectedInterests: string[];
  selectedAvoidances: string[];
  onInterestsChange: (interests: string[]) => void;
  onAvoidancesChange: (avoidances: string[]) => void;
  className?: string;
}

export const InterestSelector = ({
  selectedInterests,
  selectedAvoidances,
  onInterestsChange,
  onAvoidancesChange,
  className,
}: InterestSelectorProps) => {
  const handleInterestToggle = (interestId: string) => {
    if (selectedInterests.includes(interestId)) {
      onInterestsChange(selectedInterests.filter((id) => id !== interestId));
    } else {
      onInterestsChange([...selectedInterests, interestId]);
    }
  };

  const handleAvoidanceToggle = (avoidanceId: string) => {
    if (selectedAvoidances.includes(avoidanceId)) {
      onAvoidancesChange(
        selectedAvoidances.filter((id) => id !== avoidanceId)
      );
    } else {
      onAvoidancesChange([...selectedAvoidances, avoidanceId]);
    }
  };

  return (
    <div className={className}>
      <h2 className="text-xl font-bold text-secondary mb-2">
        어떤 여행을 좋아하시나요?
      </h2>
      <p className="text-sm text-muted-foreground mb-6">
        관심사와 기피사항을 선택해주세요 (복수 선택 가능)
      </p>

      <div className="space-y-6">
        {/* 관심사 */}
        <div>
          <h3 className="text-sm font-semibold text-secondary mb-3">
            관심있는 여행 테마
          </h3>
          <div className="flex flex-wrap gap-2">
            {INTERESTS.map((interest) => (
              <Chip
                key={interest.id}
                label={interest.label}
                icon={interest.icon}
                selected={selectedInterests.includes(interest.id)}
                onClick={() => handleInterestToggle(interest.id)}
              />
            ))}
          </div>
        </div>

        {/* 기피사항 */}
        <div>
          <h3 className="text-sm font-semibold text-secondary mb-3">
            피하고 싶은 것들
          </h3>
          <div className="flex flex-wrap gap-2">
            {AVOIDANCES.map((avoidance) => (
              <Chip
                key={avoidance.id}
                label={avoidance.label}
                icon={avoidance.icon}
                selected={selectedAvoidances.includes(avoidance.id)}
                onClick={() => handleAvoidanceToggle(avoidance.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {(selectedInterests.length > 0 || selectedAvoidances.length > 0) && (
        <p className="text-sm text-muted-foreground mt-6 text-center">
          {selectedInterests.length > 0 &&
            `${selectedInterests.length}개의 관심사`}
          {selectedInterests.length > 0 && selectedAvoidances.length > 0 &&
            ', '}
          {selectedAvoidances.length > 0 &&
            `${selectedAvoidances.length}개의 기피사항 선택됨`}
        </p>
      )}
    </div>
  );
};

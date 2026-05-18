import { Chip } from '@/shared/ui/Chip';
import { DURATIONS, REGIONS } from '@/shared/mock/preferences';

interface ScheduleSelectorProps {
  selectedDuration?: string;
  selectedRegion?: string;
  onDurationChange: (durationId: string) => void;
  onRegionChange: (regionId: string) => void;
  className?: string;
}

export const ScheduleSelector = ({
  selectedDuration,
  selectedRegion,
  onDurationChange,
  onRegionChange,
  className,
}: ScheduleSelectorProps) => {
  return (
    <div className={className}>
      <h2 className="text-xl font-bold text-secondary mb-2">
        일정과 지역을 선택해주세요
      </h2>
      <p className="text-sm text-muted-foreground mb-6">
        언제, 어디로 여행을 떠나시나요?
      </p>

      <div className="space-y-6">
        {/* 일정 */}
        <div>
          <h3 className="text-sm font-semibold text-secondary mb-3">
            여행 일정
          </h3>
          <div className="flex gap-3">
            {DURATIONS.map((duration) => (
              <Chip
                key={duration.id}
                label={duration.label}
                icon={duration.icon}
                selected={selectedDuration === duration.id}
                onClick={() => onDurationChange(duration.id)}
                className="flex-1 justify-center"
              />
            ))}
          </div>
        </div>

        {/* 지역 */}
        <div>
          <h3 className="text-sm font-semibold text-secondary mb-3">
            여행 지역
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {REGIONS.map((region) => (
              <Chip
                key={region.id}
                label={region.label}
                selected={selectedRegion === region.id}
                onClick={() => onRegionChange(region.id)}
                className="justify-center text-sm"
              />
            ))}
          </div>
        </div>
      </div>

      {(selectedDuration || selectedRegion) && (
        <div className="mt-6 p-4 bg-accent/30 rounded-lg">
          <p className="text-sm text-secondary text-center">
            {selectedDuration &&
              `${DURATIONS.find((d) => d.id === selectedDuration)?.label}`}
            {selectedDuration && selectedRegion && ' • '}
            {selectedRegion &&
              `${REGIONS.find((r) => r.id === selectedRegion)?.label}`}
          </p>
        </div>
      )}
    </div>
  );
};

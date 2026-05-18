import { Chip } from '@/shared/ui/Chip';
import { TRAVEL_STYLES } from '@/shared/mock/preferences';

interface StyleSelectorProps {
  selectedStyle?: string;
  onChange: (styleId: string) => void;
  className?: string;
}

export const StyleSelector = ({
  selectedStyle,
  onChange,
  className,
}: StyleSelectorProps) => {
  return (
    <div className={className}>
      <h2 className="text-xl font-bold text-secondary mb-2">
        어떤 여행을 계획 중이신가요?
      </h2>
      <p className="text-sm text-muted-foreground mb-6">
        여행 스타일을 선택해주세요
      </p>

      <div className="grid grid-cols-2 gap-3">
        {TRAVEL_STYLES.map((style) => (
          <Chip
            key={style.id}
            label={style.label}
            icon={style.icon}
            selected={selectedStyle === style.id}
            onClick={() => onChange(style.id)}
            className="justify-center"
          />
        ))}
      </div>

      {selectedStyle && (
        <p className="text-sm text-muted-foreground mt-4 text-center">
          {TRAVEL_STYLES.find((s) => s.id === selectedStyle)?.description}
        </p>
      )}
    </div>
  );
};

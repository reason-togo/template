import { CourseList } from '@/features/course-list/ui/CourseList';
import { Button } from '@/shared/ui/button';
import { Course } from '@/entities/course/model/types';
import { Share2 } from 'lucide-react';

interface CourseTimelineProps {
  course: Course;
  onSave?: () => void;
  onShare?: () => void;
  className?: string;
}

export const CourseTimeline = ({
  course,
  onSave,
  onShare,
  className,
}: CourseTimelineProps) => {
  const getDurationLabel = (duration: string) => {
    switch (duration) {
      case 'day':
        return '당일 코스';
      case 'oneNight':
        return '1박 2일 코스';
      case 'twoNights':
        return '2박 3일 코스';
      default:
        return '여행 코스';
    }
  };

  return (
    <div className={className}>
      <div className="max-w-[390px] mx-auto px-6 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-secondary">
              {getDurationLabel(course.duration)}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              총 {course.totalTime} • {course.totalCost}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onShare}
            className="text-muted-foreground hover:text-secondary"
          >
            <Share2 className="h-5 w-5" />
          </Button>
        </div>

        {/* Map Placeholder */}
        <div className="w-full h-48 rounded-xl overflow-hidden bg-gradient-to-br from-primary-100 via-primary-200 to-primary-300 flex items-center justify-center shadow-md">
          <span className="text-secondary/60 text-sm font-medium">
            코스 지도
          </span>
        </div>

        {/* Course List */}
        <CourseList.Root>
          {course.items.map((item, index) => (
            <div key={item.id}>
              <CourseList.Item
                number={index + 1}
                title={item.name}
                duration={item.duration}
                cost={item.cost}
              />
              {item.transport && (
                <CourseList.Transport
                  type={item.transport.type}
                  duration={item.transport.duration}
                />
              )}
            </div>
          ))}
        </CourseList.Root>

        {/* Save Button */}
        <Button
          size="lg"
          onClick={onSave}
          className="w-full bg-gradient-to-r from-primary-300 to-primary-400 hover:from-primary-400 hover:to-primary-500 text-white font-semibold shadow-md"
        >
          코스 저장하기
        </Button>
      </div>
    </div>
  );
};

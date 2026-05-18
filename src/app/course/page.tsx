'use client';

import { useRouter } from 'next/navigation';
import { CourseTimeline } from '@/widgets/course-timeline/ui/CourseTimeline';
import { MOCK_COURSES } from '@/shared/mock/courses';
import { IconButton } from '@/shared/ui/IconButton';
import { ArrowLeft } from 'lucide-react';

const CoursePage = () => {
  const router = useRouter();
  const course = MOCK_COURSES[0]; // 군산 당일치기 코스

  const handleBack = () => {
    router.back();
  };

  const handleSave = () => {
    // localStorage에 코스 저장
    const savedCourses = JSON.parse(
      localStorage.getItem('savedCourses') || '[]'
    );
    if (!savedCourses.includes(course.id)) {
      savedCourses.push(course.id);
      localStorage.setItem('savedCourses', JSON.stringify(savedCourses));
      alert('코스가 저장되었습니다!');
    } else {
      alert('이미 저장된 코스입니다.');
    }
  };

  const handleShare = () => {
    // 공유 기능 (추후 구현)
    alert('공유 기능은 곧 지원됩니다!');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-[390px] mx-auto px-6 py-4 flex items-center justify-between">
          <IconButton icon={ArrowLeft} onClick={handleBack} />
          <h1 className="text-lg font-bold text-secondary">당일 코스</h1>
          <div className="w-10" /> {/* Spacer */}
        </div>
      </div>

      {/* Content */}
      <CourseTimeline
        course={course}
        onSave={handleSave}
        onShare={handleShare}
      />
    </div>
  );
};

export default CoursePage;

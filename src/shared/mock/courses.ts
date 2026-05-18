import { Course, CourseItem } from '@/entities/course/model/types';

export const MOCK_COURSES: Course[] = [
  {
    id: 'gunsan-day-trip',
    placeId: 'gunsan-museum',
    duration: 'day', // 당일치기
    totalTime: '4시간',
    totalCost: '2만원',
    items: [
      {
        id: '1',
        name: '군산 근대역사박물관',
        duration: '2시간',
        cost: '무료',
        order: 1,
        transport: {
          type: 'walk',
          duration: '5분',
        },
      },
      {
        id: '2',
        name: '경암동 철길마을',
        duration: '30분',
        cost: '무료',
        order: 2,
        transport: {
          type: 'walk',
          duration: '10분',
        },
      },
      {
        id: '3',
        name: '이성당 빵집',
        duration: '30분',
        cost: '5천원',
        order: 3,
        transport: {
          type: 'car',
          duration: '15분',
        },
      },
      {
        id: '4',
        name: '군산 내항 야경',
        duration: '30분',
        cost: '무료',
        order: 4,
        highlight: '석양 타이밍',
      },
    ],
  },
];

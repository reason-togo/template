export interface CourseItem {
  id: string;
  name: string;
  duration: string;
  cost: string;
  order: number;
  transport?: {
    type: 'walk' | 'car';
    duration: string;
  };
  highlight?: string;
}

export interface Course {
  id: string;
  placeId: string;
  duration: 'day' | 'oneNight' | 'twoNights';
  totalTime: string;
  totalCost: string;
  items: CourseItem[];
}

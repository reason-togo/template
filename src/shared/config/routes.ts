export const ROUTES = {
  HOME: '/',
  PREFERENCES: '/preferences',
  RECOMMENDATIONS: '/recommendations',
  COURSE: '/course',
  PLACE: (id: string) => `/place/${id}`,
  FAVORITES: '/favorites',
} as const;

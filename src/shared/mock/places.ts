import { Place } from '@/entities/place/model/types';

export const MOCK_PLACES: Place[] = [
  {
    id: 'gunsan-museum',
    name: '군산 근대역사박물관',
    location: '전북 군산시',
    address: '전북 군산시 해망로 240',
    imageUrl: undefined, // gradient placeholder 사용
    description: '일제강점기 수탈의 아픔이 서린 곳이지만, 지금은 근대건축의 매력을 느낄 수 있는 공간입니다.',
    estimatedTime: '4시간',
    estimatedCost: '2만원',
    realtimeReason: '박물관을 천천히 둘러보고 경암동 철길마을을 걸으며 석양 무렵 군산 내항에 도착할 수 있어요. 오늘처럼 맑은 날엔 야경이 특히 아름답습니다.',
    category: '근대건축',
    areaCode: '37', // 전북
  },
  {
    id: 'gongju-castle',
    name: '공주 공산성',
    location: '충남 공주시',
    address: '충남 공주시 웅진로 280',
    imageUrl: undefined,
    description: '백제 왕궁의 역사가 살아있는 산성. 성곽을 따라 걸으며 금강과 공주 시내를 한눈에 볼 수 있습니다.',
    estimatedTime: '6시간',
    estimatedCost: '5만원',
    realtimeReason: undefined,
    category: '역사유적',
    areaCode: '34', // 충남
  },
  {
    id: 'gangneung-coffee',
    name: '강릉 커피거리',
    location: '강원 강릉시',
    address: '강원 강릉시 창해로14번길 일원',
    imageUrl: undefined,
    description: '안목해변을 따라 늘어선 카페들. 바다를 보며 마시는 커피의 여유를 즐길 수 있습니다.',
    estimatedTime: '5시간',
    estimatedCost: '3만원',
    realtimeReason: undefined,
    category: '자연풍경',
    areaCode: '32', // 강원
  },
];

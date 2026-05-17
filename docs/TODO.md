# 떠날이유 (소도시 여행 큐레이션 서비스) - Claude Code 개발 프롬프트

## 프로젝트 개요

광역시를 제외한 소도시 중심의 여행 추천 서비스입니다. 사용자 취향을 입력받아 AI가 메인 관광지를 추천하고, 주변 부가 관광지를 연계하여 완성된 코스를 제공합니다.

**현재 목표: API/LLM 연결 없이 모든 페이지 UI 먼저 완성 + 목업 데이터로 페이지 이동 구현**

## 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **UI Library**: shadcn/ui (Radix UI 기반)
- **Icons**: Lucide React
- **Architecture**: FSD (Feature-Sliced Design) + Compound Component Pattern
- **State**: React hooks (useState)
- **Mock Data**: TypeScript 타입 기반 목업 데이터
- **Deployment**: Vercel

---

## 아키텍처: FSD (Feature-Sliced Design)

```
src/
├── app/                           # Next.js App Router
│   ├── layout.tsx                 # 루트 레이아웃
│   ├── page.tsx                   # 랜딩 페이지
│   ├── preferences/               
│   │   └── page.tsx              # 취향 입력
│   ├── recommendations/
│   │   └── page.tsx              # 메인 추천
│   ├── course/
│   │   └── page.tsx              # 부가 코스
│   ├── place/
│   │   └── [id]/page.tsx         # 관광지 상세
│   └── favorites/
│       └── page.tsx              # 찜 목록
│
├── widgets/                       # 페이지 레벨 컴포넌트
│   ├── landing-hero/
│   │   └── ui/
│   │       └── LandingHero.tsx
│   ├── place-recommendation/
│   │   └── ui/
│   │       └── PlaceRecommendation.tsx
│   └── course-timeline/
│       └── ui/
│           └── CourseTimeline.tsx
│
├── features/                      # 기능별 컴포넌트
│   ├── preferences/
│   │   ├── ui/
│   │   │   ├── StyleSelector.tsx
│   │   │   ├── InterestSelector.tsx
│   │   │   └── ScheduleSelector.tsx
│   │   └── model/
│   │       └── types.ts
│   │
│   ├── place-card/
│   │   └── ui/
│   │       └── PlaceCard.tsx      # Compound Component
│   │
│   ├── course-list/
│   │   └── ui/
│   │       └── CourseList.tsx     # Compound Component
│   │
│   └── favorites/
│       └── ui/
│           └── FavoriteButton.tsx
│
├── entities/                      # 비즈니스 엔티티
│   ├── place/
│   │   ├── model/
│   │   │   └── types.ts          # Place 타입
│   │   └── ui/
│   │       ├── PlaceImage.tsx
│   │       └── PlaceInfo.tsx
│   │
│   └── course/
│       ├── model/
│       │   └── types.ts          # Course 타입
│       └── ui/
│           ├── CourseStep.tsx
│           └── TransportInfo.tsx
│
├── shared/                        # 공통 코드
│   ├── ui/                       # 공통 UI 컴포넌트
│   │   ├── button.tsx           # shadcn/ui
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── separator.tsx
│   │   ├── Logo.tsx             # 커스텀
│   │   ├── IconButton.tsx
│   │   ├── Chip.tsx
│   │   ├── StatBadge.tsx
│   │   └── HighlightBox.tsx
│   │
│   ├── lib/
│   │   ├── utils.ts             # cn 함수
│   │   └── constants.ts         # 상수
│   │
│   ├── mock/                     # 목업 데이터
│   │   ├── places.ts            # 관광지 목업
│   │   ├── courses.ts           # 코스 목업
│   │   └── preferences.ts       # 취향 옵션
│   │
│   └── config/
│       └── routes.ts            # 라우트 상수
│
└── styles/
    └── globals.css              # 전역 스타일
```

---

## Compound Component Pattern

### 예시: PlaceCard

```typescript
// features/place-card/ui/PlaceCard.tsx
import { Card, CardContent } from '@/shared/ui/card';
import { StatBadge } from '@/shared/ui/StatBadge';
import { cn } from '@/shared/lib/utils';
import { MapPin, Clock } from 'lucide-react';
import Image from 'next/image';

// Root 컴포넌트
const PlaceCardRoot = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <Card className={cn('overflow-hidden', className)}>
      {children}
    </Card>
  );
};

// Image 컴포넌트
const PlaceCardImage = ({ src, alt }: { src?: string; alt: string }) => {
  return (
    <div className="relative w-full h-56 rounded-t-2xl overflow-hidden">
      {src ? (
        <Image src={src} alt={alt} fill className="object-cover" />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-primary-200 via-primary-300 to-primary-400 flex items-center justify-center">
          <span className="text-white/90 text-sm">{alt}</span>
        </div>
      )}
    </div>
  );
};

// Header 컴포넌트
const PlaceCardHeader = ({ title, location }: { title: string; location: string }) => {
  return (
    <div>
      <h3 className="text-xl font-bold text-secondary">{title}</h3>
      <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
        <MapPin className="h-4 w-4" />
        <span>{location}</span>
      </div>
    </div>
  );
};

// Content 컴포넌트
const PlaceCardContent = ({ children }: { children: React.ReactNode }) => {
  return <CardContent className="p-5 space-y-4">{children}</CardContent>;
};

// Highlight 컴포넌트
const PlaceCardHighlight = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-4 bg-gradient-to-br from-accent/40 to-primary-200/30 rounded-xl border-l-4 border-primary-300">
      <div className="flex items-start gap-2">
        <Clock className="h-5 w-5 text-primary-400 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-secondary leading-relaxed">{children}</div>
      </div>
    </div>
  );
};

// Stats 컴포넌트
const PlaceCardStats = ({ time, cost }: { time: string; cost: string }) => {
  return (
    <div className="flex gap-3">
      <StatBadge label="예상 시간" value={time} />
      <StatBadge label="예상 비용" value={cost} />
    </div>
  );
};

// Export compound component
export const PlaceCard = {
  Root: PlaceCardRoot,
  Image: PlaceCardImage,
  Header: PlaceCardHeader,
  Content: PlaceCardContent,
  Highlight: PlaceCardHighlight,
  Stats: PlaceCardStats,
};
```

### 사용 예시

```typescript
<PlaceCard.Root>
  <PlaceCard.Image src={place.imageUrl} alt={place.name} />
  <PlaceCard.Content>
    <PlaceCard.Header title={place.name} location={place.location} />
    {place.realtimeReason && (
      <PlaceCard.Highlight>
        <strong className="text-primary-400">지금 출발하면</strong>{' '}
        {place.realtimeReason}
      </PlaceCard.Highlight>
    )}
    <p className="text-sm text-secondary leading-relaxed">{place.description}</p>
    <PlaceCard.Stats time={place.estimatedTime} cost={place.estimatedCost} />
  </PlaceCard.Content>
</PlaceCard.Root>
```

---

## 디자인 시스템

### TailwindCSS 설정

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '#D4A882',
          foreground: '#FFFFFF',
          50: '#FAF7F2',
          100: '#F5EFE7',
          200: '#E8D5C4',
          300: '#D4A882',
          400: '#C99871',
          500: '#B8865F',
        },
        secondary: {
          DEFAULT: '#5C4A3A',
        },
        accent: {
          DEFAULT: '#E8D5C4',
        },
      },
      fontFamily: {
        serif: ['var(--font-dm-serif)'],
        sans: ['var(--font-pretendard)'],
      },
    },
  },
}
```

### globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 32 22 17;
    --foreground: 32 22 17;
    --primary: 30 38% 66%;
    --primary-foreground: 0 0% 100%;
    --secondary: 30 26% 30%;
    --accent: 30 38% 84%;
    --border: 30 30% 85%;
    --radius: 0.5rem;
  }
}

/* 필름 그레인 효과 */
.film-grain::before {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.03) 0px,
    transparent 1px,
    transparent 2px,
    rgba(0, 0, 0, 0.03) 3px
  );
  pointer-events: none;
  opacity: 0.3;
  z-index: 1;
}
```

---

## 목업 데이터 구조

### shared/mock/places.ts

```typescript
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
```

### shared/mock/courses.ts

```typescript
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
```

### shared/mock/preferences.ts

```typescript
export const TRAVEL_STYLES = [
  { id: 'solo', label: '혼자', icon: '👤', description: '나만의 시간' },
  { id: 'couple', label: '둘이서', icon: '👥', description: '연인, 친구와' },
  { id: 'family', label: '가족', icon: '👨‍👩‍👧‍👦', description: '온 가족이 함께' },
  { id: 'friends', label: '친구들', icon: '🎉', description: '3명 이상' },
];

export const INTERESTS = [
  { id: 'architecture', label: '근대건축', icon: '🏛️' },
  { id: 'drama', label: '드라마 촬영지', icon: '🎬' },
  { id: 'history', label: '역사 유적', icon: '📜' },
  { id: 'nature', label: '자연 풍경', icon: '🌊' },
  { id: 'culture', label: '문화 예술', icon: '🎨' },
  { id: 'food', label: '로컬 맛집', icon: '🍜' },
  { id: 'photo', label: '사진 명소', icon: '📸' },
  { id: 'walking', label: '도보 여행', icon: '🚶' },
];

export const AVOIDANCES = [
  { id: 'crowded', label: '사람 많은 곳', icon: '😰' },
  { id: 'expensive', label: '비싼 입장료', icon: '💰' },
  { id: 'sns', label: 'SNS 분위기', icon: '📱' },
  { id: 'complex', label: '복잡한 이동', icon: '🚗' },
];

export const DURATIONS = [
  { id: 'day', label: '당일치기', icon: '⏱️' },
  { id: 'oneNight', label: '1박 2일', icon: '🌙' },
  { id: 'twoNights', label: '2박 3일', icon: '🏨' },
];

export const REGIONS = [
  { id: '37', label: '전북 (군산, 전주)' },
  { id: '34', label: '충남 (공주, 부여)' },
  { id: '32', label: '강원 (강릉, 속초)' },
  { id: '35', label: '경북 (경주, 안동)' },
  { id: '38', label: '경남 (통영, 거제)' },
  { id: '36', label: '전남 (여수, 순천)' },
];
```

---

## 타입 정의

### entities/place/model/types.ts

```typescript
export interface Place {
  id: string;
  name: string;
  location: string;
  address: string;
  imageUrl?: string;
  description: string;
  estimatedTime: string;
  estimatedCost: string;
  realtimeReason?: string;
  category: string;
  areaCode: string;
}
```

### entities/course/model/types.ts

```typescript
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
```

### features/preferences/model/types.ts

```typescript
export interface PreferenceState {
  style?: string;
  interests: string[];
  avoidances: string[];
  duration?: string;
  region?: string;
}
```

---

## 구현 우선순위

### Phase 1: 프로젝트 세팅 (1일)

```bash
# 1. Next.js 프로젝트 생성
npx create-next-app@latest 떠날이유 --typescript --tailwind --app

# 2. shadcn/ui 초기화
npx shadcn-ui@latest init

# 3. 기본 컴포넌트 설치
npx shadcn-ui@latest add button card badge separator

# 4. 추가 패키지
npm install lucide-react class-variance-authority clsx tailwind-merge

# 5. 폰트 설치
# next/font/google로 DM Serif Display 자동 최적화
```

**구현 항목:**
- [x] TailwindCSS 커스텀 컬러 설정
- [x] globals.css (CSS 변수, 필름 그레인)
- [x] 폰트 설정 (DM Serif Display, Pretendard)
- [x] FSD 폴더 구조 생성
- [x] cn 유틸 함수
- [x] 라우트 상수

### Phase 2: 공통 UI 컴포넌트 (1일)

**shared/ui/** 구현:
- [x] Logo (DM Serif Display, gradient)
- [x] IconButton (원형, hover)
- [x] Chip (선택 가능)
- [x] StatBadge (시간/비용)
- [x] HighlightBox (실시간 추천 박스)

### Phase 3: 목업 데이터 (0.5일)

**shared/mock/** 구현:
- [x] places.ts (3개 이상)
- [x] courses.ts (1개 이상)
- [x] preferences.ts (옵션 리스트)

### Phase 4: Entities (1일)

**entities/place/**:
- [x] model/types.ts
- [x] ui/PlaceImage.tsx
- [x] ui/PlaceInfo.tsx

**entities/course/**:
- [x] model/types.ts
- [x] ui/CourseStep.tsx (Compound Component)
- [x] ui/TransportInfo.tsx

### Phase 5: Features (2일)

**features/place-card/** (Compound Component):
- [x] PlaceCard.Root
- [x] PlaceCard.Image
- [x] PlaceCard.Header
- [x] PlaceCard.Content
- [x] PlaceCard.Highlight
- [x] PlaceCard.Stats

**features/course-list/** (Compound Component):
- [x] CourseList.Root
- [x] CourseList.Item
- [x] CourseList.Transport

**features/preferences/**:
- [x] StyleSelector
- [x] InterestSelector
- [x] ScheduleSelector

### Phase 6: Widgets (1일)

**widgets/**:
- [x] landing-hero/ui/LandingHero.tsx
- [x] place-recommendation/ui/PlaceRecommendation.tsx
- [x] course-timeline/ui/CourseTimeline.tsx

### Phase 7: 페이지 구현 (2일)

**app/**:
- [x] page.tsx (랜딩)
- [x] preferences/page.tsx (3단계 폼)
- [x] recommendations/page.tsx (메인 추천)
- [x] course/page.tsx (부가 코스)
- [x] place/[id]/page.tsx (상세)
- [x] favorites/page.tsx (찜 목록)

**목업 데이터로 페이지 이동:**
- [x] 랜딩 → 취향 입력
- [x] 취향 입력 (3단계) → 메인 추천
- [x] 메인 추천 → 부가 코스
- [x] 부가 코스 → 관광지 상세
- [x] 찜하기 (localStorage)

---

## Claude Code 시작 프롬프트 (단계별)

### 1단계: 프로젝트 초기화

```
다음을 생성해주세요:

⚠️ 중요: 모든 컴포넌트와 함수는 반드시 화살표 함수(ES6) 형식으로 작성

1. Next.js 15 프로젝트 (TypeScript, TailwindCSS, App Router)
2. shadcn/ui 초기화 및 기본 컴포넌트 설치 (button, card, badge, separator)
3. TailwindCSS 설정:
   - 커스텀 컬러 (primary beige 팔레트)
   - 폰트 설정 (DM Serif Display, Pretendard fallback)
4. globals.css:
   - CSS 변수 추가
   - 필름 그레인 효과 (.film-grain 클래스)
5. FSD 폴더 구조 생성:
   - app/, widgets/, features/, entities/, shared/
6. shared/lib/utils.ts (cn 함수 - 화살표 함수로)
7. shared/config/routes.ts (라우트 상수)

컬러 팔레트:
- primary-50: #FAF7F2
- primary-100: #F5EFE7
- primary-200: #E8D5C4
- primary-300: #D4A882
- primary-400: #C99871
- primary-500: #B8865F
- secondary: #5C4A3A
- accent: #E8D5C4

예시 (utils.ts):
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}
```

### 2단계: 공통 UI 컴포넌트

```
shared/ui/에 다음 컴포넌트들을 만들어주세요 (모든 컴포넌트는 화살표 함수로 작성):

1. Logo.tsx
   - DM Serif Display, italic
   - gradient text (primary-300 to primary-400)
   - size props: 'sm' | 'md' | 'lg'
   
   export const Logo = ({ className, size = 'md' }: LogoProps) => {
     return <h1 className={...}>떠날이유</h1>
   }
   
2. IconButton.tsx
   - 원형 버튼 (w-10 h-10)
   - bg-primary-100 hover:bg-primary-200
   - lucide-react 아이콘 사용
   
   export const IconButton = ({ icon: Icon, onClick, className }: IconButtonProps) => {
     return <Button variant="ghost" size="icon" onClick={onClick}>...</Button>
   }

3. Chip.tsx
   - selected 상태에 따라 스타일 변경
   - selected: gradient background
   - unselected: border primary-200
   
   export const Chip = ({ label, icon, selected, onClick }: ChipProps) => {
     return <button onClick={onClick}>...</button>
   }

4. StatBadge.tsx
   - label, value props
   - gradient background (from-background to-accent/30)
   
   export const StatBadge = ({ label, value }: StatBadgeProps) => {
     return <div>...</div>
   }

5. HighlightBox.tsx
   - Clock 아이콘 포함
   - border-left-4 border-primary-300
   - gradient background
   
   export const HighlightBox = ({ children, className }: HighlightBoxProps) => {
     return <div>...</div>
   }
```

### 3단계: 목업 데이터

```
다음 목업 데이터를 생성해주세요:

1. entities/place/model/types.ts
   - Place 인터페이스 정의

2. entities/course/model/types.ts
   - CourseItem, Course 인터페이스 정의

3. features/preferences/model/types.ts
   - PreferenceState 인터페이스 정의

4. shared/mock/places.ts
   - MOCK_PLACES 배열 (3개 이상)
   - 군산 근대역사박물관, 공주 공산성, 강릉 커피거리

5. shared/mock/courses.ts
   - MOCK_COURSES 배열
   - 군산 당일치기 코스 (4단계)

6. shared/mock/preferences.ts
   - TRAVEL_STYLES (4개)
   - INTERESTS (8개)
   - AVOIDANCES (4개)
   - DURATIONS (3개)
   - REGIONS (6개)
```

### 4단계: Compound Component - PlaceCard

```
features/place-card/ui/PlaceCard.tsx를 Compound Component 패턴으로 만들어주세요:

모든 컴포넌트는 화살표 함수로 작성:

const PlaceCardRoot = ({ children, className }) => { ... }
const PlaceCardImage = ({ src, alt }) => { ... }
const PlaceCardHeader = ({ title, location }) => { ... }
const PlaceCardContent = ({ children }) => { ... }
const PlaceCardHighlight = ({ children }) => { ... }
const PlaceCardStats = ({ time, cost }) => { ... }

export const PlaceCard = {
  Root: PlaceCardRoot,
  Image: PlaceCardImage,
  Header: PlaceCardHeader,
  Content: PlaceCardContent,
  Highlight: PlaceCardHighlight,
  Stats: PlaceCardStats,
};

구조:
- PlaceCard.Root (Card wrapper)
- PlaceCard.Image (이미지 또는 gradient placeholder)
- PlaceCard.Header (제목 + 위치)
- PlaceCard.Content (CardContent wrapper)
- PlaceCard.Highlight (실시간 추천 박스)
- PlaceCard.Stats (시간 + 비용 StatBadge)

사용 예시:
<PlaceCard.Root>
  <PlaceCard.Image src={place.imageUrl} alt={place.name} />
  <PlaceCard.Content>
    <PlaceCard.Header title={place.name} location={place.location} />
    {place.realtimeReason && (
      <PlaceCard.Highlight>{place.realtimeReason}</PlaceCard.Highlight>
    )}
    <p>{place.description}</p>
    <PlaceCard.Stats time={place.estimatedTime} cost={place.estimatedCost} />
  </PlaceCard.Content>
</PlaceCard.Root>
```

### 5단계: Compound Component - CourseList

```
features/course-list/ui/CourseList.tsx를 Compound Component 패턴으로 만들어주세요:

모든 컴포넌트는 화살표 함수로 작성:

const CourseListRoot = ({ children }) => { ... }
const CourseListItem = ({ number, title, duration, cost }) => { ... }
const CourseListTransport = ({ type, duration }) => { ... }

export const CourseList = {
  Root: CourseListRoot,
  Item: CourseListItem,
  Transport: CourseListTransport,
};

구조:
- CourseList.Root (wrapper)
- CourseList.Item (CourseStep 기반)
  - 번호 (원형 gradient)
  - 제목
  - duration, cost
- CourseList.Transport (TransportInfo)
  - Walk/Car 아이콘
  - 이동 시간

사용 예시:
<CourseList.Root>
  {items.map((item, index) => (
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
```

### 6단계: Preferences 페이지

```
app/preferences/page.tsx를 만들어주세요:

3단계 스텝:
1. StyleSelector (TRAVEL_STYLES)
2. InterestSelector (INTERESTS + AVOIDANCES)
3. ScheduleSelector (DURATIONS + REGIONS)

- useState로 현재 step 관리 (1, 2, 3)
- PreferenceState 타입으로 선택값 관리
- 각 단계마다 "다음" 버튼
- 3단계 완료 시 "/recommendations"로 이동
- 목업 데이터 사용

페이지 레이아웃:
- max-w-[390px] mx-auto (모바일 중심)
- 뒤로가기 버튼
- 진행 표시 (1/3, 2/3, 3/3)
```

### 7단계: Recommendations 페이지

```
app/recommendations/page.tsx를 만들어주세요:

- MOCK_PLACES[0] 사용 (군산 근대역사박물관)
- PlaceCard.* Compound Component로 렌더링
- 하단에 "주변 코스 보기" 버튼
- 버튼 클릭 시 "/course" 이동

헤더:
- 뒤로가기 버튼
- 떠날이유 로고 (중앙)
- 찜하기 아이콘 버튼
```

### 8단계: Course 페이지

```
app/course/page.tsx를 만들어주세요:

- MOCK_COURSES[0] 사용
- 지도 placeholder (gradient)
- CourseList.* Compound Component로 렌더링
- "저장하기" 버튼 (localStorage에 저장)

헤더:
- 뒤로가기
- "당일 코스" 제목
- 공유 아이콘
```

### 9단계: Place 상세 페이지

```
app/place/[id]/page.tsx를 만들어주세요:

- URL params에서 id 가져오기
- MOCK_PLACES.find(p => p.id === id)
- PlaceCard와 비슷하지만 더 상세한 정보
- 운영시간, 휴무일, 입장료, 주차 정보 (하드코딩)
- "코스에 추가" 버튼

이미지 갤러리:
- 큰 이미지 (h-64)
- 하단에 작은 이미지 3개 (가로 스크롤)
```

### 10단계: Favorites 페이지

```
app/favorites/page.tsx를 만들어주세요:

- localStorage에서 저장된 placeId 배열 가져오기
- MOCK_PLACES에서 필터링
- PlaceCard.* 리스트로 렌더링
- "선택한 관광지로 코스 만들기" 버튼 (비활성화)

빈 상태:
- "찜한 관광지가 없습니다"
- "관광지를 찜해보세요" 버튼 → "/" 이동
```

### 11단계: 랜딩 페이지

```
app/page.tsx를 완성해주세요:

구성:
1. Logo (size="lg", italic)
2. 히어로 타이틀 (H1)
   "광역시 말고, 소도시로"
3. 서브타이틀
   "지금 바로 갈 수 있는 숨은 여행지를 찾아드려요"
4. 히어로 이미지 (gradient placeholder, h-72)
5. "여행지 찾기" 버튼 → "/preferences" 이동
6. 하단 캡션
   "제주·부산 말고 새로운 곳을 찾는다면"

레이아웃:
- max-w-[390px] mx-auto
- text-center
- 넉넉한 padding
```

---

## 주요 주의사항

1. **모든 컴포넌트와 함수는 화살표 함수(ES6) 형식으로 작성** ⭐
   ```typescript
   // ✅ 올바른 예시
   export const MyComponent = ({ prop }: Props) => {
     return <div>{prop}</div>
   }
   
   const helperFunction = (param: string) => {
     return param.toUpperCase()
   }
   
   // ❌ 잘못된 예시
   export function MyComponent({ prop }: Props) {
     return <div>{prop}</div>
   }
   
   function helperFunction(param: string) {
     return param.toUpperCase()
   }
   ```

2. **FSD 구조 엄격히 준수**
   - widgets/ → features/ → entities/ → shared/ 단방향 의존성
   - 상위 레이어는 하위 레이어만 import 가능

3. **Compound Component Pattern**
   - 각 컴포넌트는 독립적으로 동작
   - Root 컴포넌트로 감싸서 사용
   - 유연한 조합 가능

4. **목업 데이터 활용**
   - API 없이도 모든 페이지 동작
   - localStorage로 찜하기 구현
   - 페이지 간 이동 가능

5. **모바일 우선**
   - max-w-[390px] 기준
   - 터치 인터랙션 고려

6. **타입 안정성**
   - 모든 데이터에 TypeScript 타입 정의
   - entities/*/model/types.ts에 비즈니스 타입

7. **재사용성**
   - shared/ui/는 프로젝트 전역에서 사용
   - features/는 특정 기능에 종속

---

이 프롬프트를 단계별로 Claude Code에 입력하면 FSD + Compound Component Pattern 기반의 프로젝트가 완성됩니다.

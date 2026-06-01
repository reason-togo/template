# 떠날이유 — UI 전면 교체 + API 연동 작업 계획

## Context

`screens/` 폴더에 새 HTML 디자인(8개 화면)이 확정되었고, 기획서(v4)에 TourAPI·LaaS·날씨 API 등 실제 백엔드 스펙도 정의되어 있음. 현재 코드는 목(mock) 데이터 기반 6개 페이지로 구성되어 있으며, 새 디자인으로 전면 교체 + 가능한 API 연동을 병행하는 것이 이번 작업의 목표. 교체가 완료된 컴포넌트는 구버전 코드를 즉시 제거해 혼용 방지.

---

## 0. 현재 상태 vs 목표 상태

| 현황 | 목표 |
|------|------|
| 6개 페이지 (/, /preferences, /recommendations, /course, /favorites, /place/[id]) | 8개 페이지 (+ /loading, /share 신규) |
| 목 데이터만 사용 | TourAPI + 날씨/일몰 API + LaaS 연동 |
| Tailwind primary-100~400 컬러 팔레트 | 갈색/베이지 디자인 토큰으로 교체 |
| 단계 폼 UI (StyleSelector 등) | 채팅 UI (02-chat.html) |
| 기본 카드 레이아웃 | Featured card + 바텀 네비게이션 |

---

## 1. 디자인 토큰 교체 (tailwind.config + globals.css)

### 색상 토큰
```
brown-900: #3A2410   (Dark text)
brown-700: #70502E   (Primary action)
brown-600: #8B7355   (Accent)
brown-500: #907857   (Secondary text)
brown-400: #AF9F7F   (Muted / placeholder)
brown-200: #CFC7A8   (Border)
brown-100: #E8E3D0   (Surface alt / chip bg)
cream-50:  #FDFCF8   (Card / surface light)
bg:        #EEEED0   (Page background)
```

### 기타 토큰
- **Font**: `-apple-system, 'Apple SD Gothic Neo', 'Noto Sans KR', system-ui, sans-serif`
- **Border radius**: 6 / 8 / 10 / 12 / 16 / 20px + full(50%)
- **Shadow**: `shadow-card` (0 2px 12px rgba(0,0,0,.06)), `shadow-featured` (0 4px 20px rgba(0,0,0,.08)), `shadow-btn` (0 10px 32px rgba(112,80,46,.3))
- **Animation** (Tailwind extend): `fade-up`, `bounce-dot`, `spin-ring`, `ripple`, `blink`, `pulse-icon`

**수정 파일**: `tailwind.config.ts`, `src/styles/globals.css`  
**삭제**: 기존 `primary-100~400` 토큰 전부 제거

---

## 2. 공통 컴포넌트 신규/교체

모든 화면에서 공유되는 원자 컴포넌트. `src/shared/ui/` 하위에 배치.

| 컴포넌트 | 현황 | 작업 |
|---------|------|------|
| `StatusBar` | 없음 | **신규** — 시간 + 신호/배터리 아이콘, 54px |
| `HomeBar` | 없음 | **신규** — 하단 홈 인디케이터, 34px |
| `BottomNavigation` | 없음 | **신규** — 홈/추천/찜/내정보 4탭, 82px |
| `Chip` | 있음 | **교체** — active/inactive 상태, 새 토큰 적용 |
| `Tag` | 없음 | **신규** — 메타 정보 pill (light / dark / green) |
| `Button` | 있음 | **교체** — 새 primary 색상, shadow-btn, :active scale(.97) |
| `Badge` | 있음 | **교체** — 새 토큰 적용 |
| `Card` | 있음 | **교체** — cream-50 배경, shadow-card |

**삭제**: 교체 후 구버전 `Button`, `Badge`, `Card`, `Chip`, `StatBadge`, `HighlightBox`, `IconButton`, `Logo`, `Separator`

---

## 3. 화면별 작업 상세

### 화면 1 — 랜딩 (`/`)
**대상 파일**: `src/app/page.tsx`, `src/widgets/landing-hero/`

| 항목 | 작업 내용 |
|------|---------|
| 배경 | radial + linear 그래디언트 (#EEEED0 → #E8E3D0) |
| 산 실루엣 | SVG inline (screens/01-landing.html의 SVG 그대로 이식) |
| AI 배지 | "실시간 큐레이션" 배지 + ripple 애니메이션 |
| 헤드라인 | 44px / 800weight / -0.03em — "광역시 말고,\n소도시로" |
| 컨텍스트 위젯 | 날씨·시간·일몰 3개 위젯 (실시간 API 연동 대상) |
| 필터 칩 | 당일치기 / 혼자 / 무료 등 빠른 필터 |
| CTA | "지금 바로 시작하기 →" → `/preferences` |

**삭제**: `LandingHero.tsx` 전체 (교체 완료 후)

---

### 화면 2 — 취향 입력 (`/preferences`)
**대상 파일**: `src/app/preferences/page.tsx`, `src/features/preferences/`

> **구조 전면 교체**: 단계 폼 → 채팅 UI

| 항목 | 작업 내용 |
|------|---------|
| 헤더 | 뒤로가기 + AI 아바타 + "취향 분석 중" |
| 진행 도트 | 5단계 Progress dot (색상으로 현재 단계 표시) |
| 메시지 영역 | AI 메시지 + 유저 메시지 버블 (fadeUp 애니메이션) |
| 타이핑 인디케이터 | 3도트 bounce 애니메이션 |
| 빠른 응답 칩 | 단계별 선택지 (여행스타일 → 관심사 → 회피 → 일정 → 지역) |
| 입력 필드 | 자유 입력 + 전송 버튼 |
| 진행 흐름 | 5단계 완료 → `/loading`으로 이동 |

**삭제**: `StyleSelector.tsx`, `InterestSelector.tsx`, `ScheduleSelector.tsx` (교체 후)

---

### 화면 3 — AI 분석 로딩 (`/loading`) ← **신규 페이지**
**대상 파일**: `src/app/loading/page.tsx` (신규)

| 항목 | 작업 내용 |
|------|---------|
| 회전 링 | 3중 ring SVG + spin 애니메이션 (1.6s / 2.2s / 3s, reverse 혼용) |
| 단계 리스트 | 날씨 수집 → 위치 탐색 → 일몰 계산 → AI 선정 → 코스 구성 (4단계) |
| 진행 바 | 단계 진행에 따라 채워지는 progress bar |
| 완료 후 | API 응답 수신 시 → `/recommendations`로 자동 이동 |

---

### 화면 4 — 추천 결과 (`/recommendations`)
**대상 파일**: `src/app/recommendations/page.tsx`, `src/widgets/place-recommendation/`, `src/features/place-card/`

| 항목 | 작업 내용 |
|------|---------|
| 헤더 | "AI 추천 결과" + 컨텍스트 배지 (날씨/일몰 실시간) |
| 필터 바 | 지금 추천 / 당일 / 무료 / 조용 — 수평 스크롤 칩 |
| Featured Card | 메인 추천 1곳: 큰 이미지 + AI 스토리 한 줄 + 일몰 카운트다운 배지 |
| 일반 카드 | 부가 추천 3~4곳: 이미지 + 이름 + 위치 + 태그 2개 |
| 바텀 네비게이션 | 홈 / 추천(활성) / 찜 / 내정보 |
| 카드 클릭 | `/place/[id]` 이동 |

**삭제**: `PlaceRecommendation.tsx`, `PlaceCard.tsx` (교체 후)

---

### 화면 5 — 관광지 상세 (`/place/[id]`)
**대상 파일**: `src/app/place/[id]/page.tsx`

| 항목 | 작업 내용 |
|------|---------|
| 히어로 | 260px, 갈색 그래디언트 + 산 SVG + "AI 추천 1순위 ✨" 배지 + 타이밍 칩 |
| AI 스토리 블록 | 아이콘 + 제목 + 본문 (일부 강조색 #70502E) + 실시간 콜아웃 |
| 정보 그리드 | 2×2: 비용 / 대중교통 / 도보 / 혼자 적합도 |
| 교통 알림 | 마지막 귀가 지하철 시간 알림 바 |
| 추천 동선 | 번호 배지 + 장소명 + 소요시간 순서 리스트 |
| 바텀 CTA | 찜하기 버튼 + "코스 보기" 버튼 → `/course` |

---

### 화면 6 — 여행 코스 (`/course`)
**대상 파일**: `src/app/course/page.tsx`, `src/widgets/course-timeline/`, `src/features/course-list/`

| 항목 | 작업 내용 |
|------|---------|
| 출발 스트립 | 갈색 그래디언트 + 🚀 + "지금 출발 시 17:05 도착 · 17:48 석양" |
| 지도 영역 | 190px, SVG 도로망 + 핀 3개 + 점선 경로 (Kakao Map SDK는 별도 연동) |
| 타임라인 | 원형 아이콘 + 시간 + 장소명 + 태그 + 이동 수단(점선) |
| 공유 버튼 | 우측 상단 → `/share` 이동 |
| 시작 버튼 | "지금 출발하기" CTA |

**삭제**: `CourseTimeline.tsx`, `CourseList.tsx`, `CourseStep.tsx`, `TransportInfo.tsx` (교체 후)

---

### 화면 7 — 공유 (`/share`) ← **신규 페이지**
**대상 파일**: `src/app/share/page.tsx` (신규)

| 항목 | 작업 내용 |
|------|---------|
| 카드 미리보기 | 갈색 히어로 + 산 SVG + 서비스명 + 장소명 + 태그 pill + sunset bar |
| 공유 채널 | 2×2 그리드: 카카오톡(#FEE500) / 인스타(그래디언트) / 링크복사 / 이미지저장 |
| 다시 시작 | "AI와 다시 대화하기" → `/preferences` |
| 토스트 | 링크복사/저장 완료 알림 (2.2초 자동 소멸) |

---

### 화면 8 — 찜 목록 (`/favorites`)
**대상 파일**: `src/app/favorites/page.tsx`

| 항목 | 작업 내용 |
|------|---------|
| 헤더 | "저장한 여행지" + 카운트 (N곳) |
| 필터 칩 바 | 전체(기본 활성) / 산책 / 문화유산 / 무료·저렴 / 당일치기 |
| 저장 카드 | 가로 배치: 110px 이미지 영역 + 제목 + 위치 + 태그 + 저장일 + 하트 버튼 |
| 빈 상태 | 이모지 52px + 안내 텍스트 + "추천 받기" CTA |
| 바텀 네비게이션 | 홈 / 추천 / 찜(활성) / 내정보 |

---

## 4. API 연동 계획

`src/app/api/` 하위에 Next.js Route Handler로 구현. API 키는 `.env.local`에 저장.

### 4-1. 즉시 연동 가능한 API

| API | 경로 | 용도 | 인증 |
|-----|------|------|------|
| **Sunrise-Sunset API** | `GET /api/sun` | 일출·일몰 시간 (위도/경도 파라미터) | 불필요 (무료 공개) |
| **OpenWeatherMap** | `GET /api/weather` | 현재 날씨·기온 (coord → 날씨 코드) | API Key (`OPENWEATHER_KEY`) |
| **TourAPI** | `GET /api/tour/area`, `GET /api/tour/detail`, `GET /api/tour/nearby` | 지역별 관광지 목록, 상세, 주변 검색 | Service Key (`TOUR_API_KEY`) |
| **Kakao Map SDK** | 클라이언트 직접 | 코스 화면 지도 렌더링 | JS Key (`NEXT_PUBLIC_KAKAO_MAP_KEY`) |

### 4-2. 조건부 연동 (접근 가능 시)

| API | 용도 | 비고 |
|-----|------|------|
| **LaaS** (대회 플랫폼) | 메인 관광지 선정 + 코스·스토리 생성 (2회 호출) | 대회 계정/키 필요 |

### 4-3. API Route 구조

```
src/app/api/
├── curate/route.ts      POST — 전체 큐레이션 오케스트레이터
├── weather/route.ts     GET  — 좌표 → 날씨
├── sun/route.ts         GET  — 좌표 → 일출/일몰
└── tour/
    ├── area/route.ts    GET  — 지역 관광지 목록 (areaBasedList2)
    ├── nearby/route.ts  GET  — 주변 관광지 (locationBasedList2, 폴백: 2→5→10km)
    └── detail/route.ts  GET  — 관광지 상세 (detailCommon2 + detailImage2)
```

### 4-4. 데이터 흐름

```
/preferences (취향 수집)
    → POST /api/curate (취향 + 위치 + 실시간 컨텍스트)
        ├─ /api/weather (병렬)
        ├─ /api/sun (병렬)
        ├─ /api/tour/area (TourAPI 후보 조회)
        ├─ LaaS Call 1: 메인 관광지 선정
        ├─ /api/tour/nearby (메인 주변 부가 관광지)
        └─ LaaS Call 2: 코스 + 스토리 생성
    → 결과를 sessionStorage에 저장 → /recommendations 렌더링
```

---

## 5. 타입 / 상태 관리 업데이트

**`src/entities/place/model/types.ts`** — 필드 추가/변경
```typescript
interface Place {
  id: string;
  name: string;
  location: string;       // 시군구명
  address: string;
  imageUrl: string;
  description: string;
  aiStory: string;        // 신규: AI 감성 스토리텔링
  timingReason: string;   // 신규: 실시간 추천 이유
  estimatedTime: string;
  estimatedCost: string;
  transitInfo: string;    // 신규: 대중교통 소요시간
  category: string;
  areaCode: string;
  isSolo: boolean;        // 신규: 혼자 여행 적합 여부
}
```

**`src/shared/mock/`** — API 연동 완료 후 전체 삭제  
**상태 전달 방식** — 취향 데이터는 `sessionStorage`에 저장 후 `/api/curate` 호출, 결과도 `sessionStorage` 경유 (로그인 불필요 유지)

---

## 6. 삭제 예정 항목 (교체 완료 후)

```
src/widgets/landing-hero/
src/widgets/place-recommendation/
src/widgets/course-timeline/
src/features/place-card/
src/features/course-list/
src/features/preferences/     (StyleSelector, InterestSelector, ScheduleSelector)
src/entities/course/          (CourseStep, TransportInfo)
src/entities/place/ui/        (PlaceImage, PlaceInfo) → 새 컴포넌트로 대체
src/shared/ui/Button.tsx      → 교체
src/shared/ui/Badge.tsx       → 교체
src/shared/ui/Card.tsx        → 교체
src/shared/ui/Chip.tsx        → 교체
src/shared/ui/StatBadge.tsx   → 삭제
src/shared/ui/HighlightBox.tsx → 삭제
src/shared/ui/IconButton.tsx  → 삭제
src/shared/ui/Logo.tsx        → 삭제
src/shared/ui/Separator.tsx   → 삭제
src/shared/mock/              → API 연동 후 삭제
```

---

## 7. 구현 순서 (권장)

1. **디자인 토큰** — Tailwind + globals.css 먼저 교체
2. **공통 컴포넌트** — StatusBar, HomeBar, BottomNavigation, 새 Button/Chip/Tag
3. **랜딩 페이지** (01) — 첫 화면이므로 전체 토큰 검증 기준점
4. **채팅 취향 입력** (02) — 로직 복잡도 높음, 먼저 구조 확립
5. **로딩 페이지** (03, 신규) + API Route 기반 (weather, sun, tour, curate)
6. **결과 → 상세 → 코스** (04→05→06) — 데이터 흐름 연결
7. **공유 페이지** (07, 신규)
8. **찜 목록** (08)
9. **구버전 코드 정리** — 삭제 예정 항목 일괄 제거

---

## 8. 검증 방법

- `npm run dev`로 각 화면 브라우저 확인 (390px 기준, Chrome DevTools)
- `npm run build`로 타입 오류/빌드 오류 없는지 확인
- Storybook에서 공통 컴포넌트 상태별(default/hover/active/disabled) 확인
- 반응형: 360px / 390px / 430px / 768px / 1440px 뷰포트에서 가로 스크롤 없는지 확인
- `npm test`로 기존 76개 테스트 통과 유지 (새 컴포넌트 테스트 추가)
- API 연동: `/api/sun?lat=35.8&lng=127.1`, `/api/weather?lat=...` curl 테스트

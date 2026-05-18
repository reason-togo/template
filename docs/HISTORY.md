# reasontogo 작업 히스토리

> 최신 작업이 맨 위에 옵니다 (역순 정렬)  
> 상세 가이드: [WORK_HISTORY_GUIDE.md](./WORK_HISTORY_GUIDE.md)

## 작업 상태

- `[ ]` 예정
- `[~]` 진행중
- `[x]` 완료
- `[-]` 보류
- `[!]` 블로킹

## 우선순위

- 🔴 P0: 최우선 (프로젝트 블로킹)
- 🟠 P1: 높음 (주요 기능)
- 🟡 P2: 중간 (부가 기능)
- 🟢 P3: 낮음 (개선 사항)

---

## 2025-05-18 (일)

### 오늘의 목표

- [x] 프로젝트 초기 설정
- [x] 프로젝트 문서 구조 정리
- [x] 공통 UI 컴포넌트 5개 구현
- [x] 목업 데이터 작성
- [x] Storybook 설정 및 스토리 파일 11개 생성
- [x] Vitest 설정 및 첫 테스트 작성
- [x] 나머지 테스트 코드 작성 (10개)

---

#### [x] 🔴 P0: 프로젝트 초기 설정

- **레이어**: config
- **작업 내용**:
  - Next.js 15 프로젝트 생성 (TypeScript, TailwindCSS, App Router)
  - shadcn/ui 초기화 및 기본 컴포넌트 설치 (button, card, badge, separator)
  - TailwindCSS 커스텀 컬러 팔레트 설정 (beige tone)
  - 폰트 설정 (DM Serif Display, Inter)
  - globals.css 작성 (CSS 변수, 필름 그레인 효과)
  - FSD 폴더 구조 생성 (app, widgets, features, entities, shared)
  - cn 유틸 함수 및 라우트 상수 작성
- **작업 이유**: 프로젝트 개발 환경 구축
- **작업 결과**: Phase 1 완료, 개발 서버 실행 가능
- **커밋**: 2fdc529
- **이슈**: -
- **소요 시간**: 1.5시간
- **참고**: Tailwind v4 사용, @theme inline 방식

#### [x] 📄 Docs: 프로젝트 문서 구조 정리

- **레이어**: docs
- **작업 내용**:
  - src/docs를 루트 docs/ 폴더로 이동
  - 파일명 통일 (PROJECT_STATUS.md, TODO_GUIDE.md 등)
  - 루트 TODO.md를 docs/TODO.md로 통합
  - 기획서를 docs/PROPOSAL.md로 이동
  - AGENTS.md, CLAUDE.md를 docs로 이동
  - README.md 작성 (프로젝트 소개, 문서 구조)
  - .clinerules 업데이트 (docs 경로 반영)
- **작업 이유**: 문서 관리 자동화 및 접근성 향상
- **작업 결과**: 모든 md 파일이 docs/에 통합
- **커밋**: 8cc26bb
- **이슈**: -
- **소요 시간**: 0.5시간
- **참고**: -

#### [x] 🟠 P1: Logo 컴포넌트 구현

- **레이어**: shared-ui
- **작업 내용**: Logo.tsx 화살표 함수로 구현, size props 지원 (sm/md/lg)
- **작업 이유**: 공통 UI 컴포넌트 구축
- **작업 결과**: gradient text, DM Serif Display 폰트 적용 완료
- **커밋**: ec01cb1
- **이슈**: #1
- **소요 시간**: 30분
- **참고**: TypeScript 타입 체크 통과

#### [x] 🟠 P1: IconButton 컴포넌트 구현

- **레이어**: shared-ui
- **작업 내용**: 원형 아이콘 버튼 구현, lucide-react 아이콘 지원
- **작업 이유**: 공통 UI 컴포넌트 구축
- **작업 결과**: 원형 스타일, hover 효과, aria-label 접근성 지원 완료
- **커밋**: 918fb8a
- **이슈**: #2
- **소요 시간**: 30분
- **참고**: shadcn/ui Button 기반, TypeScript 타입 체크 통과

#### [x] 🟠 P1: Chip 컴포넌트 구현

- **레이어**: shared-ui
- **작업 내용**: 선택 가능한 칩 구현, selected 상태별 스타일 분기
- **작업 이유**: 공통 UI 컴포넌트 구축
- **작업 결과**: gradient/border 스타일, 아이콘 지원, focus 접근성 완료
- **커밋**: 6d037e4
- **이슈**: #3
- **소요 시간**: 40분
- **참고**: selected/unselected 상태 전환, TypeScript 타입 체크 통과

#### [x] 🟠 P1: StatBadge 컴포넌트 구현

- **레이어**: shared-ui
- **작업 내용**: 통계 배지 구현 (label, value), gradient background
- **작업 이유**: 공통 UI 컴포넌트 구축 (시간/비용 표시)
- **작업 결과**: label/value 수직 레이아웃, gradient background, border 스타일 완료
- **커밋**: 3f26fe5
- **이슈**: #4
- **소요 시간**: 20분
- **참고**: TypeScript 타입 체크 통과, 빌드 성공

#### [x] 🟠 P1: HighlightBox 컴포넌트 구현

- **레이어**: shared-ui
- **작업 내용**: 실시간 추천 하이라이트 박스 구현, Clock 아이콘 포함
- **작업 이유**: 공통 UI 컴포넌트 구축 (실시간 추천 표시)
- **작업 결과**: Clock 아이콘, gradient background, border-left-4 스타일 완료
- **커밋**: 54e2bd0
- **이슈**: #5
- **소요 시간**: 15분
- **참고**: TypeScript 타입 체크 통과, 빌드 성공

#### [x] 🟠 P1: 목업 데이터 작성

- **레이어**: entities, features, shared-mock
- **작업 내용**:
  - 타입 정의: Place, Course, PreferenceState
  - places.ts (군산, 공주, 강릉 3개 관광지)
  - courses.ts (군산 당일치기 코스)
  - preferences.ts (여행 스타일, 관심사, 기피사항, 일정, 지역 옵션)
- **작업 이유**: API 없이 페이지 동작 구현, TypeScript 타입 안정성 확보
- **작업 결과**: 6개 파일 생성 (타입 3개, 목업 데이터 3개), FSD 구조 완성
- **커밋**: 9d679c6
- **이슈**: #6
- **소요 시간**: 30분
- **참고**: TypeScript 타입 체크 통과, 빌드 성공

#### [x] 🔴 P0: Next.js 16 → 15 다운그레이드

- **레이어**: config
- **작업 내용**: Next.js 16.2.6 → 15.5.18, React 19 → 18로 다운그레이드
- **작업 이유**: Storybook 8.x 호환성 확보
- **작업 결과**: Next.js 15.5.18 설치 성공, ESLint 설정 수정
- **커밋**: caccbf6
- **이슈**: #6
- **소요 시간**: 20분
- **참고**: 명세서대로 Next.js 15 사용

#### [x] 🟠 P1: Storybook 8.x 설정

- **레이어**: config
- **작업 내용**: Storybook 8.6.18 설치, .storybook 설정 파일 생성
- **작업 이유**: 컴포넌트 시각적 테스트 환경 구축
- **작업 결과**: Storybook 설정 완료, 스토리 파일 작성 가능
- **커밋**: 35fb087
- **이슈**: #6
- **소요 시간**: 30분
- **참고**: Next.js 15 호환 확인

#### [x] 🟠 P1: Storybook 스토리 파일 생성 (11개)

- **레이어**: shared-ui, entities, features
- **작업 내용**:
  - shared/ui 스토리 5개 (Logo, IconButton, Chip, StatBadge, HighlightBox)
  - entities 스토리 4개 (PlaceImage, PlaceInfo, CourseStep, TransportInfo)
  - features 스토리 2개 (PlaceCard, CourseList)
- **작업 이유**: 모든 컴포넌트 시각적 문서화 및 테스트
- **작업 결과**: 11개 스토리 파일 완성, 목업 데이터 활용
- **커밋**: 35fb087, 258ccc6, 1cf3469
- **이슈**: #6
- **소요 시간**: 1시간
- **참고**: Compound Component 패턴 적용

#### [x] 🔴 P0: TailwindCSS v4 → v3 다운그레이드

- **레이어**: config
- **작업 내용**:
  - TailwindCSS v4 제거, v3.4.19 + PostCSS + Autoprefixer 설치
  - tailwind.config.js, postcss.config.js 생성
  - globals.css v3 문법으로 변경
- **작업 이유**: Vitest와의 ESM 호환성 문제 해결
- **작업 결과**: TailwindCSS v3로 완전 마이그레이션, Next.js 빌드 성공
- **커밋**: 753d12d
- **이슈**: #6
- **소요 시간**: 40분
- **참고**: @theme inline 제거, @tailwind 지시문 사용

#### [x] 🟠 P1: Vitest 설정 및 첫 테스트 작성

- **레이어**: config, shared-ui
- **작업 내용**:
  - Vitest 4.1.6 설치, vitest.config.mts/setup.mts 생성
  - jsdom v27 → v25 다운그레이드 (ESM 호환성)
  - Logo.test.tsx 작성 (6개 테스트)
- **작업 이유**: 단위 테스트 환경 구축
- **작업 결과**: 모든 테스트 통과 (6/6), Vitest 정상 작동
- **커밋**: 753d12d
- **이슈**: #6
- **소요 시간**: 50분
- **참고**: CSS mock 처리, @testing-library/react 사용

#### [x] 🟠 P1: Entities 레이어 UI 컴포넌트 구현

- **레이어**: entities-place, entities-course
- **작업 내용**:
  - PlaceImage.tsx (이미지 또는 gradient placeholder)
  - PlaceInfo.tsx (장소 정보 표시)
  - CourseStep.tsx (Compound Component: Root, Number, Content, Title, Info)
  - TransportInfo.tsx (이동 정보: 도보/차량 아이콘)
- **작업 이유**: Place와 Course 엔티티의 UI 컴포넌트 구축
- **작업 결과**: 4개 컴포넌트 생성, Compound Component 패턴 적용
- **커밋**: fea99dc
- **이슈**: #7
- **소요 시간**: 25분
- **참고**: TypeScript 타입 체크 통과, 빌드 성공, lucide-react 아이콘 사용

#### [x] 🟠 P1: PlaceCard Compound Component 구현

- **레이어**: features-place-card
- **작업 내용**:
  - PlaceCard.Root (Card 래퍼)
  - PlaceCard.Image (PlaceImage 기반)
  - PlaceCard.Header (PlaceInfo 기반)
  - PlaceCard.Content (CardContent 래퍼)
  - PlaceCard.Highlight (HighlightBox 기반)
  - PlaceCard.Stats (StatBadge 2개 조합)
- **작업 이유**: 관광지 카드 Feature 구축, 모든 하위 컴포넌트 조합
- **작업 결과**: 6개 서브 컴포넌트로 구성된 Compound Component 완성
- **커밋**: 10942a9
- **이슈**: #8
- **소요 시간**: 20분
- **참고**: TypeScript 타입 체크 통과, 빌드 성공, FSD 의존성 규칙 준수

#### [x] 🟠 P1: CourseList Compound Component 구현

- **레이어**: features-course-list
- **작업 내용**:
  - CourseList.Root (코스 리스트 컨테이너)
  - CourseList.Item (CourseStep 기반)
  - CourseList.Transport (TransportInfo 기반)
- **작업 이유**: 코스 타임라인 Feature 구축, CourseStep/TransportInfo 조합
- **작업 결과**: 3개 서브 컴포넌트로 구성된 Compound Component 완성
- **커밋**: eb1387b
- **이슈**: #9
- **소요 시간**: 15분
- **참고**: TypeScript 타입 체크 통과, 빌드 성공, FSD 의존성 규칙 준수

#### [x] 🟠 P1: 전체 테스트 코드 작성 (10개)

- **레이어**: shared-ui, entities, features
- **작업 내용**:
  - shared/ui 테스트 4개 (IconButton, Chip, StatBadge, HighlightBox) - Logo는 이미 완료
  - entities 테스트 4개 (PlaceImage, PlaceInfo, CourseStep, TransportInfo)
  - features 테스트 2개 (PlaceCard, CourseList)
- **작업 이유**: 모든 컴포넌트 단위 테스트 완성, 코드 품질 보장
- **작업 결과**: 총 76개 테스트 통과 (shared-ui: 34, entities: 19, features: 23)
- **커밋**: a66efd3
- **이슈**: #6
- **소요 시간**: 1시간
- **참고**: Vitest + @testing-library/react, 모든 컴포넌트 렌더링/props/className 테스트 완료

#### [x] 🟠 P1: Preferences 컴포넌트 3개 구현

- **레이어**: features-preferences
- **작업 내용**:
  - StyleSelector.tsx (여행 스타일 선택, 단일 선택)
  - InterestSelector.tsx (관심사 + 기피사항, 다중 선택)
  - ScheduleSelector.tsx (일정 + 지역, 각각 단일 선택)
  - Chip 컴포넌트에 className prop 추가
  - Storybook 파일 타입 에러 수정 (compound component 처리)
- **작업 이유**: 취향 입력 페이지에서 사용할 선택 컴포넌트 구축
- **작업 결과**: 3개 컴포넌트 구현 완료, TypeScript 타입 체크 통과, 빌드 성공
- **커밋**: 462f958
- **이슈**: #7
- **소요 시간**: 50분
- **참고**: 목업 데이터 (preferences.ts) 활용, Chip 컴포넌트 기반

#### [x] 🟠 P1: Widgets 레이어 구현 (3개)

- **레이어**: widgets
- **작업 내용**:
  - LandingHero.tsx (랜딩 페이지 히어로 섹션, Logo + CTA)
  - PlaceRecommendation.tsx (관광지 추천 섹션, PlaceCard 활용)
  - CourseTimeline.tsx (코스 타임라인 섹션, CourseList 활용, 지도 placeholder)
- **작업 이유**: 페이지 레벨 컴포넌트 구축, Features/Entities 조합
- **작업 결과**: 3개 Widget 구현 완료, TypeScript 타입 체크 통과, 빌드 성공
- **커밋**: 27299dc
- **이슈**: #8
- **소요 시간**: 40분
- **참고**: FSD Widgets 레이어, 목업 데이터 활용, Compound Component 조합

#### [x] 🔴 P0: 페이지 구현 6개 (Phase 7)

- **레이어**: app
- **작업 내용**:
  - page.tsx (랜딩 페이지, LandingHero Widget 사용)
  - preferences/page.tsx (취향 입력 3단계, useState로 step 관리)
  - recommendations/page.tsx (추천 페이지, localStorage 찜하기)
  - course/page.tsx (코스 페이지, localStorage 저장)
  - place/[id]/page.tsx (관광지 상세, 동적 라우트)
  - favorites/page.tsx (찜 목록, localStorage 읽기, 빈 상태 처리)
- **작업 이유**: 모든 페이지 UI 완성 및 페이지 간 이동 구현
- **작업 결과**: 6개 페이지 구현 완료, 페이지 이동 플로우 구현, 빌드 성공
- **커밋**: [다음 커밋 예정]
- **이슈**: #9
- **소요 시간**: 1.5시간
- **참고**: 'use client' 사용, useRouter로 페이지 이동, localStorage 활용

---

### 오늘의 성과

✅ 완료: 15개
🔄 진행중: 0개
📋 예정: 0개

**총 소요 시간**: 9.05시간

**완료된 작업:**
- 프로젝트 초기 설정 (Next.js 15 + FSD 구조)
- 프로젝트 문서 구조 정리 및 통합
- Logo 컴포넌트 구현 (#1)
- IconButton 컴포넌트 구현 (#2)
- Chip 컴포넌트 구현 (#3)
- StatBadge 컴포넌트 구현 (#4)
- HighlightBox 컴포넌트 구현 (#5)
- 타입 정의 및 목업 데이터 작성 (#6)
- Entities 레이어 UI 컴포넌트 구현 (#7)
- PlaceCard Compound Component 구현 (#8)
- CourseList Compound Component 구현 (#9)
- 전체 테스트 코드 작성 (76개 테스트 통과)
- Preferences 컴포넌트 3개 구현 (#7)
- Widgets 레이어 3개 구현 (#8)
- 페이지 구현 6개 (#9)

---

### 내일 할 일

- [ ] PlaceCard Compound Component 구현
- [ ] CourseList Compound Component 구현
- [ ] Preferences 페이지 구현

---

### 메모

- Phase 1 (프로젝트 세팅) 완료 ✅
- Phase 2 (공통 UI 컴포넌트 5개) 완료 ✅
- Phase 3 (목업 데이터 작성) 완료 ✅
- Phase 4 (Entities 레이어 UI 컴포넌트) 완료 ✅
- Phase 5 (Features) 완료 ✅
  - PlaceCard, CourseList Compound Components 완료
  - Preferences 컴포넌트 3개 (StyleSelector, InterestSelector, ScheduleSelector) 완료
- Phase 6 (Widgets 레이어) 완료 ✅
  - LandingHero, PlaceRecommendation, CourseTimeline 완료
- Phase 7 (페이지 구현 6개) 완료 ✅
  - 랜딩, 취향 입력, 추천, 코스, 상세, 찜 목록 페이지 완료
  - 페이지 간 이동 플로우 구현
  - localStorage 기반 찜하기/저장 기능 구현
- Storybook 설정 및 스토리 파일 11개 완료 ✅
- Vitest 설정 및 테스트 코드 11개 완료 (76개 테스트 통과) ✅
- 모든 프로젝트 문서가 docs/에 통합됨
- FSD 구조 완성: app, widgets, features, entities, shared 레이어 구축
- Compound Component 패턴 적용 완료
- **🎉 모든 페이지 UI 및 목업 데이터 기반 페이지 이동 구현 완료!**
- 다음: API 연동 또는 추가 기능 구현

---

## 아카이브

이전 작업 내역은 `history/` 폴더에서 확인할 수 있습니다.

- [2025년 5월 3주차](./history/2025-05/week-3.md)
- [2025년 5월 4주차](./history/2025-05/week-4.md)

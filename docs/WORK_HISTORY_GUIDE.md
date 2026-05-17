# Work History Guide

reasontogo 프로젝트의 작업 히스토리를 시간 순서대로 기록하고 관리하는 가이드입니다.

## 파일 구조

```
docs/
├── HISTORY.md              # 전체 작업 히스토리 (이 파일)
├── history/
│   ├── 2025-05/
│   │   ├── week-3.md      # 5월 3주차
│   │   └── week-4.md      # 5월 4주차
│   └── 2025-06/
│       ├── week-1.md      # 6월 1주차
│       └── week-2.md      # 6월 2주차
└── WORK_HISTORY_GUIDE.md  # 이 가이드 문서
```

## 작업 상태 표기

작업 항목은 다음 상태 중 하나를 가집니다:

- `[ ]` **예정**: 아직 시작하지 않음
- `[~]` **진행중**: 현재 작업 중
- `[x]` **완료**: 작업 완료
- `[-]` **보류**: 일시 중단
- `[!]` **블로킹**: 다른 작업에 의존하여 대기 중

## 작업 항목 형식

```markdown
### YYYY-MM-DD (요일)

#### [상태] 작업 제목

- **레이어**: FSD 레이어명
- **작업 내용**: 무엇을 했는지
- **작업 이유**: 왜 필요한지
- **작업 결과**: 어떤 결과가 나왔는지
- **커밋**: #커밋해시
- **이슈**: #이슈번호
- **소요 시간**: N시간
- **참고**: 추가 메모
```

## 템플릿

### 일일 작업 템플릿

```markdown
### 2025-05-18 (일)

#### [~] 프로젝트 초기 설정

- **레이어**: config
- **작업 내용**:
  - Next.js 15 프로젝트 생성
  - shadcn/ui 초기화
  - TailwindCSS 커스텀 컬러 설정
- **작업 이유**: 프로젝트 개발 환경 구축
- **작업 결과**: 기본 프로젝트 구조 완성
- **커밋**: #abc1234
- **이슈**: #1
- **소요 시간**: 2시간
- **참고**: DM Serif Display 폰트 설정 완료

#### [ ] PlaceCard Compound Component 구현

- **레이어**: features
- **작업 내용**: PlaceCard.Root, Image, Header, Content, Highlight, Stats 구현
- **작업 이유**: 재사용 가능한 컴포넌트 구조 확립
- **작업 결과**: -
- **커밋**: -
- **이슈**: #2
- **소요 시간**: -
- **참고**: -
```

### 주간 작업 템플릿

```markdown
# 2025년 5월 3주차 (5/18 - 5/24)

## 주간 목표

- [ ] FSD 구조 완성
- [ ] 공통 UI 컴포넌트 구현
- [ ] 목업 데이터 작성

## 진행 상황

### 2025-05-18 (일)

...

### 2025-05-19 (월)

...

## 주간 회고

- **잘된 점**:
- **아쉬운 점**:
- **다음 주 계획**:
```

## 레이어별 작업 분류

작업 항목은 FSD 레이어로 분류합니다:

### app (라우팅/페이지)

```markdown
#### [x] 랜딩 페이지 구현

- **레이어**: app
- **파일**: app/page.tsx
```

### widgets (위젯)

```markdown
#### [x] 히어로 위젯 구현

- **레이어**: widgets
- **파일**: widgets/landing-hero/ui/LandingHero.tsx
```

### features (기능)

```markdown
#### [x] PlaceCard 컴포넌트 구현

- **레이어**: features
- **파일**: features/place-card/ui/PlaceCard.tsx
```

### entities (엔티티)

```markdown
#### [x] Place 타입 정의

- **레이어**: entities
- **파일**: entities/place/model/types.ts
```

### shared (공통)

```markdown
#### [x] Logo 컴포넌트 구현

- **레이어**: shared-ui
- **파일**: shared/ui/Logo.tsx
```

### config (설정)

```markdown
#### [x] TailwindCSS 설정

- **레이어**: config
- **파일**: tailwind.config.ts
```

### docs (문서)

```markdown
#### [x] 커밋 컨벤션 작성

- **레이어**: docs
- **파일**: docs/COMMIT_CONVENTION.md
```

## 작업 우선순위 표기

작업 항목에 우선순위를 표기할 수 있습니다:

- `🔴 P0`: 최우선 (프로젝트 블로킹)
- `🟠 P1`: 높음 (주요 기능)
- `🟡 P2`: 중간 (부가 기능)
- `🟢 P3`: 낮음 (개선 사항)

```markdown
#### [~] 🔴 P0: 프로젝트 초기 설정

#### [ ] 🟠 P1: PlaceCard 컴포넌트 구현

#### [ ] 🟡 P2: 로딩 애니메이션 추가

#### [ ] 🟢 P3: 코드 주석 정리
```

## 이슈 연결 규칙

GitHub 이슈와 연결할 때:

```markdown
- **이슈**: #12 (Feature: PlaceCard 구현)
- **이슈**: Closes #34 (작업 완료 시)
- **이슈**: Refs #56 (참고 이슈)
```

## 커밋 연결 규칙

커밋 해시를 기록할 때:

```markdown
- **커밋**: abc1234
- **커밋**: abc1234, def5678 (여러 커밋)
- **PR**: #12 (Pull Request 번호)
```

## 예시: 완전한 일일 작업 기록

```markdown
# 2025-05-18 작업 기록

## 오늘의 목표

- [x] 프로젝트 초기 설정
- [~] 공통 UI 컴포넌트 3개 구현
- [ ] 목업 데이터 작성

---

### 2025-05-18 (일)

#### [x] 🔴 P0: Next.js 15 프로젝트 생성

- **레이어**: config
- **작업 내용**:
  - Next.js 15 프로젝트 생성
  - TypeScript, TailwindCSS, App Router 설정
  - FSD 폴더 구조 생성
- **작업 이유**: 프로젝트 개발 환경 구축
- **작업 결과**:
  - 기본 프로젝트 구조 완성
  - FSD 레이어 폴더 생성 (app, widgets, features, entities, shared)
- **커밋**: a1b2c3d
- **이슈**: Closes #1
- **소요 시간**: 1시간
- **참고**: `npx create-next-app@latest` 사용

#### [x] 🔴 P0: shadcn/ui 초기화 및 컬러 설정

- **레이어**: config
- **작업 내용**:
  - shadcn/ui 초기화
  - TailwindCSS 커스텀 컬러 팔레트 추가 (primary beige)
  - globals.css에 CSS 변수 및 필름 그레인 효과 추가
  - DM Serif Display, Pretendard 폰트 설정
- **작업 이유**: 디자인 시스템 구축
- **작업 결과**:
  - primary-50 ~ primary-500 컬러 적용
  - 필름 그레인 효과 구현 (.film-grain 클래스)
  - 폰트 로딩 최적화
- **커밋**: e4f5g6h
- **이슈**: Refs #1
- **소요 시간**: 1.5시간
- **참고**: shadcn/ui init 시 Default 스타일, Slate 베이스 선택

#### [~] 🟠 P1: Logo 컴포넌트 구현

- **레이어**: shared-ui
- **작업 내용**:
  - Logo.tsx 화살표 함수로 구현
  - size props (sm, md, lg) 지원
  - gradient text 적용
- **작업 이유**: 공통 UI 컴포넌트 구축
- **작업 결과**:
  - 재사용 가능한 Logo 컴포넌트 완성
  - DM Serif Display italic 적용
- **커밋**: i7j8k9l
- **이슈**: Refs #2
- **소요 시간**: 0.5시간
- **참고**: cn 유틸 함수 사용

#### [ ] 🟠 P1: IconButton 컴포넌트 구현

- **레이어**: shared-ui
- **작업 내용**: 원형 아이콘 버튼 구현
- **작업 이유**: 공통 UI 컴포넌트 구축
- **작업 결과**: -
- **커밋**: -
- **이슈**: #2
- **소요 시간**: -
- **참고**: lucide-react 아이콘 사용 예정

---

## 오늘의 성과

✅ 완료: 3개
🔄 진행중: 1개
📋 예정: 1개

**총 소요 시간**: 3시간

## 내일 할 일

- [ ] IconButton, Chip, StatBadge 컴포넌트 구현
- [ ] 목업 데이터 작성 (places.ts, courses.ts)
- [ ] Place, Course 타입 정의

## 메모

- shadcn/ui 컴포넌트는 필요할 때마다 `npx shadcn-ui@latest add` 로 추가
- 모든 컴포넌트는 화살표 함수로 작성 필수
- FSD 의존성 규칙 준수: widgets → features → entities → shared
```

## 주간 회고 템플릿

```markdown
# 2025년 5월 3주차 회고 (5/18 - 5/24)

## 주간 요약

- **완료한 작업**: 15개
- **진행중인 작업**: 3개
- **총 소요 시간**: 28시간

## 주요 성과

1. 프로젝트 초기 설정 완료
2. 공통 UI 컴포넌트 5개 구현
3. 목업 데이터 작성 완료

## 잘된 점

- FSD 구조를 명확하게 잡아서 레이어 분리가 깔끔함
- Compound Component Pattern으로 재사용성 확보
- 화살표 함수 규칙을 처음부터 적용해서 일관성 유지

## 아쉬운 점

- 타입 정의를 나중에 해서 일부 컴포넌트 수정 필요
- 목업 데이터 구조를 미리 설계했으면 더 빨랐을 듯

## 배운 점

- shadcn/ui는 컴포넌트를 프로젝트에 직접 복사하는 방식이라 커스터마이징이 자유로움
- Compound Component는 유연하지만 사용법을 문서화해야 함

## 다음 주 계획

- [ ] 모든 페이지 UI 구현 (6개)
- [ ] 페이지 간 이동 구현
- [ ] localStorage 기반 찜하기 기능

## 블로커 & 이슈

- 없음

## 참고 자료

- FSD 공식 문서: https://feature-sliced.design/
- shadcn/ui 문서: https://ui.shadcn.com/
```

## Claude Code 활용 가이드

### 1. 작업 시작 시

```
HISTORY.md 파일을 읽고, 오늘 날짜의 작업 섹션을 추가해주세요.
다음 작업을 진행합니다:
- PlaceCard 컴포넌트 구현
```

### 2. 작업 완료 시

```
HISTORY.md 파일을 업데이트해주세요:
- PlaceCard 컴포넌트 구현 완료
- 커밋 해시: abc1234
- 소요 시간: 2시간
```

### 3. 일일 회고 시

```
HISTORY.md에 오늘의 성과와 내일 할 일을 정리해주세요.
```

### 4. 주간 회고 시

```
이번 주 작업 내용을 바탕으로 주간 회고를 작성해주세요.
history/2025-05/week-3.md 파일을 생성해주세요.
```

## 작업 히스토리 검색

특정 작업을 찾을 때:

```markdown
# 검색 키워드

- 레이어: `## features` 섹션 검색
- 날짜: `### 2025-05-18` 검색
- 상태: `[x]`, `[~]`, `[ ]` 검색
- 우선순위: `🔴 P0`, `🟠 P1` 검색
- 이슈: `#12` 검색
```

## 파일 위치 가이드

### HISTORY.md (루트)

- 전체 프로젝트 히스토리
- 최근 1개월 작업만 유지
- 이전 작업은 history/ 폴더로 아카이빙

### history/YYYY-MM/week-N.md

- 주간 단위 아카이빙
- 상세한 작업 내용 보존
- 주간 회고 포함

## 작업 히스토리 규칙

1. **매일 업데이트**: 작업 시작 시, 완료 시 기록
2. **시간 순서**: 최신 작업이 위로 (역순)
3. **상태 업데이트**: 진행 상황에 따라 상태 변경
4. **커밋 연결**: 모든 작업은 커밋과 연결
5. **이슈 연결**: GitHub 이슈 번호 기록
6. **소요 시간**: 실제 작업 시간 기록
7. **회고 작성**: 매일, 매주 회고 작성

## 자동화 스크립트 (선택)

작업 히스토리 자동 생성 스크립트:

```bash
# scripts/add-work-item.sh
#!/bin/bash

DATE=$(date +%Y-%m-%d)
DAY=$(date +%a)

echo "### $DATE ($DAY)" >> docs/HISTORY.md
echo "" >> docs/HISTORY.md
echo "#### [ ] 작업 제목" >> docs/HISTORY.md
echo "- **레이어**: " >> docs/HISTORY.md
echo "- **작업 내용**: " >> docs/HISTORY.md
echo "- **작업 이유**: " >> docs/HISTORY.md
echo "- **작업 결과**: " >> docs/HISTORY.md
echo "- **커밋**: " >> docs/HISTORY.md
echo "- **이슈**: " >> docs/HISTORY.md
echo "- **소요 시간**: " >> docs/HISTORY.md
echo "- **참고**: " >> docs/HISTORY.md
echo "" >> docs/HISTORY.md

echo "✅ 오늘 날짜 섹션이 추가되었습니다."
```

사용:

```bash
chmod +x scripts/add-work-item.sh
./scripts/add-work-item.sh
```

## 팁 & 베스트 프랙티스

### 1. 작업 전 계획 세우기

매일 아침 "오늘의 목표" 섹션 작성

### 2. 작은 단위로 기록

큰 작업은 여러 개의 작은 작업으로 분할

### 3. 실패도 기록

안 된 것, 막힌 부분도 기록하여 나중에 참고

### 4. 스크린샷 첨부

UI 작업은 스크린샷을 이슈나 PR에 첨부

### 5. 링크 활용

관련 문서, 참고 자료 링크 기록

### 6. 태그 활용

`#bug`, `#refactor`, `#optimization` 등 태그 사용

### 7. 회고 중요

주간 회고로 패턴 발견 및 개선점 도출

---

이 가이드를 따라 작업 히스토리를 관리하면:

- ✅ 프로젝트 진행 상황을 명확하게 추적
- ✅ 작업 시간과 생산성을 측정
- ✅ 문제 발생 시 과거 작업 검색
- ✅ 팀원과의 커뮤니케이션 향상
- ✅ Claude Code가 컨텍스트를 이해하고 도움

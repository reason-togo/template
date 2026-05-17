# TODO & Issue Management Guide

reasontogo 프로젝트의 TODO 관리 및 GitHub 이슈 자동 생성 가이드입니다.

## 파일 구조

```
docs/
├── TODO.md                 # 할 일 목록 (이 파일 참고)
├── TODO_GUIDE.md          # 이 가이드 문서
├── ISSUE_TEMPLATES/       # 이슈 템플릿
│   ├── feature.md
│   ├── bug.md
│   ├── refactor.md
│   └── chore.md
└── PROJECT_STATUS.md      # 프로젝트 현황 대시보드
```

## TODO 항목 형식

```markdown
### [상태] [우선순위] 작업 제목

- **레이어**: FSD 레이어명
- **카테고리**: Feature | Bug | Refactor | Docs | Chore
- **설명**: 작업 상세 설명
- **이유**: 왜 필요한가
- **예상 시간**: N시간
- **의존성**: #이슈번호 또는 작업명
- **이슈**: #번호 (생성 후 기록)
- **담당자**: @username (선택)
- **마일스톤**: MVP | v1.0 | v2.0
- **레이블**: ui, api, data, etc
```

## 상태 코드

- `[ ]` **TODO**: 아직 시작 안 함
- `[~]` **IN_PROGRESS**: 진행 중
- `[x]` **DONE**: 완료
- `[-]` **HOLD**: 보류
- `[!]` **BLOCKED**: 블로킹됨
- `[?]` **REVIEW**: 검토 필요

## 우선순위

- `🔴 P0`: Critical - 프로젝트 블로킹, 즉시 처리
- `🟠 P1`: High - 주요 기능, 이번 주 완료
- `🟡 P2`: Medium - 부가 기능, 이번 스프린트
- `🟢 P3`: Low - 개선 사항, 여유 있을 때

## 카테고리별 레이블

### Feature (기능 추가)

- `feature`: 새로운 기능
- `enhancement`: 기능 개선
- `ui`: UI 컴포넌트
- `api`: API 연동

### Bug (버그 수정)

- `bug`: 버그
- `critical`: 심각한 버그
- `regression`: 회귀 버그

### Refactor (리팩터링)

- `refactor`: 코드 개선
- `performance`: 성능 개선
- `tech-debt`: 기술 부채

### Docs (문서)

- `docs`: 문서 작업
- `readme`: README 업데이트

### Chore (기타)

- `chore`: 기타 작업
- `dependencies`: 의존성 업데이트
- `ci`: CI/CD

## FSD 레이어별 레이블

- `layer:app`: App 레이어
- `layer:widgets`: Widgets 레이어
- `layer:features`: Features 레이어
- `layer:entities`: Entities 레이어
- `layer:shared`: Shared 레이어

## 마일스톤

### MVP (Minimum Viable Product)

- 목표: 2025-06-10
- 범위: 모든 페이지 UI 완성 + 목업 데이터 동작

### v1.0 (First Release)

- 목표: 2025-06-25
- 범위: TourAPI 연동 + 기본 추천 기능

### v2.0 (Enhanced)

- 목표: TBD
- 범위: LaaS AI 연동 + 실시간 컨텍스트

## 이슈 템플릿

### Feature Issue Template

```markdown
## 📋 기능 설명

<!-- 어떤 기능을 추가하나요? -->

## 🎯 목적

<!-- 왜 이 기능이 필요한가요? -->

## 📝 상세 요구사항

<!-- 구체적인 요구사항을 나열하세요 -->

- [ ] 요구사항 1
- [ ] 요구사항 2
- [ ] 요구사항 3

## 🎨 디자인 참고

<!-- Figma 링크, 스크린샷 등 -->

## 🏗️ 구현 방향

<!-- 어떻게 구현할 건가요? -->

## 📊 완료 조건 (Definition of Done)

- [ ] 코드 구현 완료
- [ ] 화살표 함수 사용
- [ ] TypeScript 타입 정의
- [ ] 커밋 컨벤션 준수
- [ ] HISTORY.md 업데이트

## 🔗 관련 이슈

<!-- 관련된 다른 이슈가 있나요? -->

- Refs #
- Depends on #
- Blocks #

## 📌 레이블

<!-- 자동으로 추가될 레이블 -->

`feature` `layer:features` `P1`

## 🎯 마일스톤

MVP
```

### Bug Issue Template

```markdown
## 🐛 버그 설명

<!-- 어떤 버그인가요? -->

## 📍 발생 위치

- **파일**:
- **레이어**:
- **함수/컴포넌트**:

## 🔄 재현 방법

1.
2.
3.

## ❌ 현재 동작

<!-- 현재 어떻게 동작하나요? -->

## ✅ 예상 동작

<!-- 어떻게 동작해야 하나요? -->

## 🖼️ 스크린샷

<!-- 있다면 첨부 -->

## 🌍 환경

- **OS**:
- **Browser**:
- **Node**:
- **Next.js**:

## 📊 우선순위

<!-- 얼마나 심각한가요? -->

- [ ] Critical (프로젝트 블로킹)
- [ ] High (주요 기능 영향)
- [ ] Medium (일부 기능 영향)
- [ ] Low (사소한 문제)

## 📌 레이블

`bug` `P1`
```

## Claude Code가 이슈를 생성하는 방법

### 1. TODO.md 읽기

```
TODO.md 파일을 읽고 아직 이슈가 생성되지 않은 항목을 찾아주세요.
```

### 2. 이슈 생성 여부 판단

Claude Code는 다음 조건을 확인:

- `이슈: -` 또는 이슈 필드가 비어있음
- 상태가 `[ ]` (TODO)
- 우선순위가 P0 또는 P1

### 3. 이슈 내용 생성

```
다음 TODO 항목으로 GitHub 이슈를 생성해주세요:

- 제목: [features-place-card] PlaceCard Compound Component 구현
- 레이블: feature, layer:features, P1
- 마일스톤: MVP
- 본문: Feature Issue Template 형식으로
```

### 4. 이슈 번호 업데이트

이슈 생성 후 TODO.md 업데이트:

```markdown
- **이슈**: #12
```

## 자동 이슈 생성 규칙

### 조건

다음 조건을 **모두** 만족하면 자동으로 이슈 생성:

1. ✅ 상태가 `[ ]` (TODO)
2. ✅ 우선순위가 P0 또는 P1
3. ✅ 이슈 필드가 비어있음
4. ✅ 카테고리가 명확함
5. ✅ 설명이 충분함 (1줄 이상)

### 제외 조건

다음 경우는 이슈를 생성하지 않음:

- ❌ 너무 작은 작업 (10분 미만 예상)
- ❌ 설명이 불충분함
- ❌ 다른 작업의 하위 작업
- ❌ 이미 이슈가 있음

## 이슈 제목 규칙

```
[레이어-모듈] 작업 내용
```

**예시:**

- `[features-place-card] PlaceCard Compound Component 구현`
- `[shared-ui] Logo 컴포넌트 추가`
- `[app-preferences] 취향 입력 페이지 구현`
- `[shared-mock] 관광지 목업 데이터 작성`
- `[config] TailwindCSS 커스텀 컬러 설정`

## 이슈 본문 자동 생성 예시

### TODO 항목

```markdown
### [ ] 🟠 P1: PlaceCard Compound Component 구현

- **레이어**: features-place-card
- **카테고리**: Feature
- **설명**: PlaceCard를 Root, Image, Header, Content, Highlight, Stats로 분리
- **이유**: 재사용 가능한 컴포넌트 구조 확립
- **예상 시간**: 2시간
- **의존성**: #2 (공통 UI 컴포넌트)
- **이슈**: -
- **마일스톤**: MVP
- **레이블**: feature, ui, layer:features
```

### 자동 생성된 이슈

````markdown
## 📋 기능 설명

PlaceCard를 Compound Component 패턴으로 구현합니다.

## 🎯 목적

재사용 가능한 컴포넌트 구조를 확립하여 다양한 레이아웃에서 유연하게 사용할 수 있도록 합니다.

## 📝 상세 요구사항

- [ ] PlaceCard.Root 컴포넌트 구현
- [ ] PlaceCard.Image 컴포넌트 구현 (gradient placeholder 지원)
- [ ] PlaceCard.Header 컴포넌트 구현 (제목 + 위치)
- [ ] PlaceCard.Content 컴포넌트 구현
- [ ] PlaceCard.Highlight 컴포넌트 구현 (실시간 추천 박스)
- [ ] PlaceCard.Stats 컴포넌트 구현 (시간 + 비용)
- [ ] 모든 컴포넌트를 화살표 함수로 작성
- [ ] TypeScript 타입 정의

## 🏗️ 구현 방향

features/place-card/ui/PlaceCard.tsx에 Compound Component 패턴으로 구현합니다.

```typescript
const PlaceCardRoot = ({ children, className }) => { ... }
const PlaceCardImage = ({ src, alt }) => { ... }
// ...

export const PlaceCard = {
  Root: PlaceCardRoot,
  Image: PlaceCardImage,
  // ...
}
```
````

## 📊 완료 조건 (Definition of Done)

- [ ] 모든 서브 컴포넌트 구현 완료
- [ ] 화살표 함수 사용
- [ ] TypeScript 타입 정의
- [ ] 사용 예시 문서화
- [ ] 커밋 컨벤션 준수
- [ ] HISTORY.md 업데이트

## 🔗 관련 이슈

- Depends on #2 (공통 UI 컴포넌트)

## 📌 레이블

`feature` `ui` `layer:features` `P1`

## 🎯 마일스톤

MVP

## ⏱️ 예상 소요 시간

2시간

````

## 프로젝트 상황 파악 (PROJECT_STATUS.md)

Claude Code가 프로젝트 상황을 파악하기 위한 대시보드:

```markdown
# reasontogo 프로젝트 현황

## 📊 전체 진행률

**MVP 마일스톤 (목표: 2025-06-10)**
- 전체: 30개 작업
- 완료: 5개 (16.7%)
- 진행중: 3개 (10%)
- 예정: 22개 (73.3%)

## 🎯 이번 주 목표 (5/18 - 5/24)

- [ ] 프로젝트 초기 설정
- [ ] 공통 UI 컴포넌트 5개
- [ ] 목업 데이터 작성
- [ ] PlaceCard, CourseList Compound Component

## 🔥 긴급 (P0)

- [ ] #1 프로젝트 초기 설정

## 🚀 우선 (P1)

- [ ] #2 공통 UI 컴포넌트 구현
- [ ] #3 목업 데이터 작성
- [ ] #4 PlaceCard Compound Component
- [ ] #5 CourseList Compound Component

## 📈 레이어별 진행 상황

### app (페이지)
- 전체: 6개
- 완료: 0개
- 진행: 0개

### features (기능)
- 전체: 8개
- 완료: 0개
- 진행: 0개

### shared (공통)
- 전체: 10개
- 완료: 0개
- 진행: 0개

## 🚧 블로커

없음

## 📝 최근 업데이트

- 2025-05-18: 프로젝트 문서 작성 (커밋 컨벤션, 작업 히스토리, TODO 가이드)
````

## Claude Code 활용 예시

### 1. TODO 항목을 이슈로 변환

```
TODO.md를 읽고 아직 이슈가 없는 P0, P1 항목들을 GitHub 이슈로 생성해주세요.
이슈 번호를 TODO.md에 업데이트해주세요.
```

### 2. 프로젝트 상황 파악

```
TODO.md와 HISTORY.md를 읽고 PROJECT_STATUS.md를 업데이트해주세요.
진행률과 이번 주 목표를 계산해주세요.
```

### 3. 다음 작업 추천

```
프로젝트 상황을 파악하고 다음에 해야 할 작업을 추천해주세요.
의존성과 우선순위를 고려해주세요.
```

### 4. 이슈 자동 생성 (배치)

```
TODO.md의 모든 미생성 이슈를 한 번에 생성해주세요:
- 우선순위 P0, P1만
- 적절한 레이블과 마일스톤 할당
- TODO.md에 이슈 번호 업데이트
```

## 이슈 생성 체크리스트

이슈 생성 전 확인:

- [ ] 제목이 명확한가?
- [ ] 레이어가 정확한가?
- [ ] 설명이 충분한가?
- [ ] 완료 조건이 명확한가?
- [ ] 레이블이 적절한가?
- [ ] 마일스톤이 할당되었는가?
- [ ] 의존성이 표시되었는가?
- [ ] 예상 시간이 합리적인가?

## 이슈 관리 베스트 프랙티스

### 1. 작은 단위로 분할

- 한 이슈 = 1-3시간 이내 작업
- 큰 작업은 여러 이슈로 분할
- Epic 이슈로 묶기

### 2. 명확한 완료 조건

- 체크리스트 형식으로 작성
- 테스트 가능한 조건
- 문서화 포함

### 3. 레이블 활용

- 최소 2개 이상 (카테고리 + 레이어)
- 우선순위 레이블 필수
- 검색 가능하도록

### 4. 의존성 명시

- Blocks, Depends on, Refs 활용
- 순서가 중요한 작업 표시

### 5. 정기적 업데이트

- 진행 상황 코멘트
- 블로커 즉시 보고
- 완료 시 체크리스트 확인

## 자동화 스크립트 (선택)

### 이슈 생성 스크립트 예시

```bash
#!/bin/bash
# scripts/create-issues.sh

# TODO.md에서 이슈가 없는 항목 추출
grep -A 10 "\[ \].*P[01]" docs/TODO.md | \
grep "이슈: -" -B 10 | \
# GitHub CLI로 이슈 생성
while read -r line; do
  gh issue create \
    --title "$title" \
    --body "$body" \
    --label "$labels" \
    --milestone "$milestone"
done
```

## 팁 & 트러블슈팅

### Q: 이슈가 너무 많아요

A: 마일스톤과 레이블로 필터링하세요. P0, P1만 집중.

### Q: 의존성이 복잡해요

A: 그래프로 시각화하거나, Epic 이슈로 그룹화하세요.

### Q: 예상 시간이 자꾸 틀려요

A: 실제 소요 시간을 기록하고 다음에 참고하세요.

### Q: Claude Code가 이슈를 잘못 생성해요

A: TODO 항목의 설명을 더 구체적으로 작성하세요.

---

이 가이드를 따라 TODO와 이슈를 관리하면:

- ✅ 프로젝트 상황을 한눈에 파악
- ✅ 이슈 생성 자동화
- ✅ 우선순위 명확화
- ✅ 의존성 관리
- ✅ Claude Code와 효율적 협업

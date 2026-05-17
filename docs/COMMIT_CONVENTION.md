# Commit Convention

이 문서는 reasontogo 프로젝트의 커밋 메시지 규칙을 정의합니다.

## 기본 형식

```
<type>(<scope>): <subject>

<body>

<footer>
```

### 커밋 메시지 구성

- `Type`: 변경의 성격을 나타냅니다. 대문자 시작(예: `Feature`, `Fix`)으로 작성합니다.
- `Scope`: 변경 범위를 간단히 명시합니다(선택).
- `Subject`: 50자 이내로 핵심 변경 내용을 요약합니다.
- `Body`: 상세 설명이 필요할 때 작성합니다(선택).
- `Footer`: 이슈/티켓, BREAKING CHANGE 등을 기록합니다(선택).

## Type 목록

- `Feature`: 새로운 기능 또는 파일 추가
- `Fix`: 버그 및 오류 수정
- `Docs`: 문서 변경
- `Style`: 코드 포맷/세미콜론/공백 등 동작에 영향 없는 변경
- `Refactor`: 기능 변화 없는 리팩터링
- `Perf`: 성능 개선
- `Test`: 테스트 추가/수정
- `Build`: 빌드/패키지/의존성 관련 변경
- `Ci`: CI 설정 변경
- `Chore`: 기타 잡무(스크립트, 설정 등)
- `Revert`: 이전 커밋 되돌림

### Type 표기 규칙

- Type은 대문자 시작만 허용합니다.
- 예: `Feature`, `Fix`, `Docs`

### 자동화/포맷 관련 Type 가이드

- 린트 설정/스크립트/CI 파이프라인 변경: `Ci` 또는 `Chore`
- 코드 포맷만 바뀐 변경(동작 영향 없음): `Style`

## Scope 가이드 (FSD 구조 기반)

reasontogo는 FSD(Feature-Sliced Design) 아키텍처를 사용합니다.

### 레이어별 Scope

- `app`: Next.js 라우팅 및 페이지
  - 예: `app-landing`, `app-preferences`, `app-recommendations`
- `widgets`: 페이지 레벨 컴포넌트
  - 예: `widgets-hero`, `widgets-recommendation`, `widgets-timeline`
- `features`: 기능별 컴포넌트
  - 예: `features-place-card`, `features-course-list`, `features-preferences`
- `entities`: 비즈니스 엔티티
  - 예: `entities-place`, `entities-course`
- `shared`: 공통 코드
  - `shared-ui`: 공통 UI 컴포넌트
  - `shared-mock`: 목업 데이터
  - `shared-lib`: 유틸리티 함수
  - `shared-config`: 설정 파일

### 전역 Scope

- `config`: 프로젝트 설정 (TailwindCSS, TypeScript 등)
- `docs`: 문서
- `infra`: 배포/인프라 관련
- `deps`: 의존성 업데이트

### Scope 작성 규칙

- FSD 레이어와 모듈명을 하이픈으로 연결합니다.
- 예: `features-place-card`, `shared-ui`, `app-preferences`
- 여러 레이어에 걸친 변경은 생략하거나 주된 레이어를 사용합니다.
- 모호할 경우 생략할 수 있습니다.

## Subject 가이드

- 명령형 현재형으로 작성합니다. (예: "추가", "수정", "개선")
- 마침표를 붙이지 않습니다.
- 변경 의도가 한눈에 보이도록 작성합니다.
- Type을 제외한 내용은 한국어로 작성합니다.

## Body 가이드

- 무엇을, 왜 변경했는지 설명합니다.
- 필요 시 영향 범위나 대안 비교를 포함합니다.
- 줄바꿈은 문장 단위로 사용합니다.

## Footer 가이드

- 관련 이슈/티켓을 연결합니다.
- 호환성 깨짐은 `BREAKING CHANGE:`로 명시합니다.
- Type을 제외한 내용은 한국어로 작성합니다.

## 이슈/티켓 포맷

- GitHub 이슈: `Closes #123`, `Fixes #123`, `Refs #123`
- 여러 개일 경우 줄바꿈으로 나열합니다.

## 예시

### Feature 예시

```
Feature(features-place-card): PlaceCard Compound Component 추가

PlaceCard를 Root, Image, Header, Content, Highlight, Stats로 분리하여
재사용 가능한 Compound Component 패턴으로 구현했습니다.

Closes #12
```

```
Feature(shared-mock): 관광지 목업 데이터 추가

군산 근대역사박물관, 공주 공산성, 강릉 커피거리 3개 관광지 데이터를 추가했습니다.
```

### Fix 예시

```
Fix(app-preferences): 3단계에서 다음 버튼 클릭 시 에러 수정

PreferenceState의 duration이 undefined일 때 발생하는 타입 에러를 수정했습니다.

Fixes #45
```

```
Fix(features-course-list): Transport 컴포넌트 간격 조정
```

### Refactor 예시

```
Refactor(shared-ui): 모든 컴포넌트를 화살표 함수로 변경

일반 함수 선언을 화살표 함수로 통일했습니다.

BREAKING CHANGE: 함수 호이스팅에 의존하던 코드는 동작하지 않을 수 있습니다.
```

```
Refactor(entities-place): Place 타입 인터페이스 개선
```

### Style 예시

```
Style(features-place-card): Prettier 포맷 적용
```

### Docs 예시

```
Docs: README에 프로젝트 구조 설명 추가
```

```
Docs(config): TailwindCSS 커스텀 컬러 가이드 추가
```

### Build 예시

```
Build: shadcn/ui 기본 컴포넌트 설치

button, card, badge, separator 컴포넌트를 추가했습니다.
```

```
Build(deps): Next.js 15.0.0으로 업데이트
```

### Chore 예시

```
Chore(config): ESLint 규칙 추가

화살표 함수 사용을 강제하는 규칙을 추가했습니다.
```

### 본문/푸터 템플릿 (한국어 기준)

```
<Type>(<Scope>): <Subject>

<무엇을 변경했는지>
<왜 필요한지 또는 영향 범위>

Closes #123
BREAKING CHANGE: <호환성 깨짐 설명>
```

## Revert 형식

```
Revert: <subject>

This reverts commit <sha>.
```

## 커밋 메시지 체크리스트

- [ ] type이 목록에 있는가?
- [ ] type이 대문자 시작인가?
- [ ] subject가 50자 이내인가?
- [ ] FSD 구조에 맞는 scope인가?
- [ ] breaking change가 있다면 footer에 표기했는가?
- [ ] 이슈/티켓 포맷이 규칙에 맞는가?
- [ ] 화살표 함수로 작성했는가? (코드 변경 시)

## reasontogo 프로젝트 특이사항

### 필수 규칙

1. **모든 컴포넌트와 함수는 화살표 함수로 작성**
   - 일반 함수 선언 사용 금지
   - Refactor 커밋으로 기존 코드 변경

2. **Compound Component Pattern 준수**
   - Root, Sub-component로 분리
   - features/ 레이어에서 구현

3. **FSD 의존성 규칙 준수**
   - widgets → features → entities → shared 단방향 의존성
   - 상위 레이어는 하위 레이어만 import

### 자주 사용하는 Scope 목록

**페이지 추가/수정:**

- `app-landing`
- `app-preferences`
- `app-recommendations`
- `app-course`
- `app-place`
- `app-favorites`

**컴포넌트 추가/수정:**

- `features-place-card`
- `features-course-list`
- `features-preferences`
- `shared-ui`
- `widgets-hero`
- `widgets-recommendation`
- `widgets-timeline`

**데이터/타입:**

- `shared-mock`
- `entities-place`
- `entities-course`

**설정:**

- `config`
- `shared-lib`
- `shared-config`

## 좋은 커밋 메시지 vs 나쁜 커밋 메시지

### ✅ 좋은 예시

```
Feature(features-place-card): PlaceCard.Stats 컴포넌트 추가

예상 시간과 비용을 표시하는 Stats 서브 컴포넌트를 추가했습니다.
StatBadge를 2개 조합하여 구성했습니다.
```

```
Fix(app-preferences): 2단계에서 선택 해제 시 상태 업데이트 안 되는 버그 수정
```

```
Refactor(shared-ui): Logo 컴포넌트를 화살표 함수로 변경
```

### ❌ 나쁜 예시

```
fix: 버그 수정
(Type 대문자 아님, subject 불명확)
```

```
Feature: 컴포넌트 추가.
(Scope 없음, 마침표 있음)
```

```
feature(place-card): add stats component
(Type 소문자, subject 영어)
```

```
Update files
(Type 없음, 의미 불명확)
```

## Claude Code 사용 시 팁

Claude Code에서 커밋 메시지를 자동 생성할 때:

1. **명확한 프롬프트 제공**

   ```
   다음 변경사항을 커밋해주세요:
   - Type: Feature
   - Scope: features-place-card
   - Subject: PlaceCard.Highlight 컴포넌트 추가
   ```

2. **COMMIT_CONVENTION.md 참조 요청**

   ```
   COMMIT_CONVENTION.md 파일을 참고하여 커밋 메시지를 작성해주세요.
   ```

3. **체크리스트 확인 요청**
   ```
   커밋 메시지가 체크리스트를 모두 만족하는지 확인해주세요.
   ```

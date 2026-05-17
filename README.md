# 떠날이유 (reasontogo)

> 광역시 말고, 지금 바로 갈 수 있는 소도시 여행

AI 기반 소도시 관광 큐레이션 서비스

## 📚 프로젝트 문서

프로젝트 개발에 필요한 모든 문서는 `docs/` 폴더에 있습니다.

### 핵심 문서

- **[TODO.md](docs/TODO.md)** - Phase별 구현 가이드 및 단계별 프롬프트
- **[PROJECT_STATUS.md](docs/PROJECT_STATUS.md)** - 프로젝트 현황 대시보드
- **[HISTORY.md](docs/HISTORY.md)** - 작업 히스토리 및 일일 기록
- **[COMMIT_CONVENTION.md](docs/COMMIT_CONVENTION.md)** - 커밋 메시지 규칙
- **[PROPOSAL.md](docs/PROPOSAL.md)** - 프로젝트 기획서

### 가이드

- **[TODO_GUIDE.md](docs/TODO_GUIDE.md)** - TODO 작성 및 관리 가이드
- **[WORK_HISTORY_GUIDE.md](docs/WORK_HISTORY_GUIDE.md)** - 작업 히스토리 작성 가이드

## 🏗️ 아키텍처

**FSD (Feature-Sliced Design) + Compound Component Pattern**

```
src/
├── app/           # Next.js App Router (페이지)
├── widgets/       # 페이지 레벨 컴포넌트
├── features/      # 기능별 컴포넌트
├── entities/      # 비즈니스 엔티티
└── shared/        # 공통 코드
    ├── ui/        # 공통 UI 컴포넌트
    ├── lib/       # 유틸리티
    ├── mock/      # 목업 데이터
    └── config/    # 설정
```

## 🚀 시작하기

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 작업 시작 전

Claude Code로 작업을 시작하기 전에 다음 문서를 읽어주세요:

1. `docs/TODO.md` - 현재 Phase 및 작업 확인
2. `docs/PROJECT_STATUS.md` - 프로젝트 상황 파악
3. `docs/COMMIT_CONVENTION.md` - 커밋 규칙 확인

## 🛠️ 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **UI Library**: shadcn/ui (Radix UI 기반)
- **Icons**: Lucide React
- **Architecture**: FSD + Compound Component Pattern

## ⚡ 필수 코딩 규칙

### 화살표 함수 필수

```typescript
// ✅ 올바른 예시
export const MyComponent = ({ prop }: Props) => {
  return <div>{prop}</div>
}

// ❌ 잘못된 예시
export function MyComponent({ prop }: Props) {
  return <div>{prop}</div>
}
```

### FSD 의존성 규칙

```
widgets → features → entities → shared
```

하위 레이어만 import 가능 (단방향 의존성)

## 📝 커밋 규칙

```
<Type>(<Scope>): <Subject>
```

예시:
```
Feature(features-place-card): PlaceCard Compound Component 추가
Fix(app-preferences): 3단계 버튼 클릭 에러 수정
```

자세한 내용은 [COMMIT_CONVENTION.md](docs/COMMIT_CONVENTION.md)를 참조하세요.

## 📦 프로젝트 구조

자세한 구조는 [TODO.md](docs/TODO.md)의 "아키텍처: FSD" 섹션을 참조하세요.

## 🎯 현재 진행 상황

[PROJECT_STATUS.md](docs/PROJECT_STATUS.md)에서 실시간 진행 현황을 확인할 수 있습니다.

## 📖 더 알아보기

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [FSD Architecture](https://feature-sliced.design/)

## 📄 라이선스

이 프로젝트는 개인 프로젝트입니다.

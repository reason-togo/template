# API 설정 가이드

이 프로젝트는 4개의 외부 API를 사용합니다. 이 문서에서 각 API의 **발급 방법**, **필요한 환경변수**, **동작 방식**을 설명합니다.

---

## 전체 구조 이해

```
브라우저 (클라이언트)
    ↓  POST /api/curate
Next.js 서버 (localhost:3000)
    ├─ GET /api/weather   → OpenWeatherMap API
    ├─ GET /api/sun       → Sunrise-Sunset API (키 불필요)
    ├─ GET /api/tour/area → 한국관광공사 TourAPI
    └─ POST LaaS          → LaaS AI 큐레이션 (선택)
```

클라이언트는 항상 **자기 서버(localhost:3000)**에만 요청합니다.  
외부 API 키는 서버 내부에서만 사용하므로 브라우저에 노출되지 않습니다.  
이것이 `localhost:3000/api/curate`로 호출하는 이유입니다.

---

## 1. 환경변수 파일 생성

프로젝트 루트(`package.json`이 있는 폴더)에 `.env.local` 파일을 만듭니다.

```
# 프로젝트 루트
/Users/js/Desktop/sources/js/reasontogo/
├── .env.local        ← 여기에 생성 (git에 커밋되지 않음)
├── package.json
├── next.config.js
└── src/
```

`.env.local` 파일 내용 (키 발급 후 채워 넣으세요):

```env
# 필수 ──────────────────────────────────────────
TOUR_API_KEY=여기에_관광공사_서비스키_입력
OPENWEATHER_KEY=여기에_openweathermap_키_입력

# 선택 (없으면 규칙 기반 폴백으로 자동 전환) ────
LAAS_API_KEY=여기에_laas_api_키_입력
LAAS_PROJECT_ID=여기에_laas_프로젝트_id_입력
LAAS_HASH_1=여기에_laas_프롬프트1_해시_입력
LAAS_HASH_2=여기에_laas_프롬프트2_해시_입력
```

> **주의**: `.env.local`은 절대 git에 커밋하지 마세요. `.gitignore`에 이미 포함되어 있습니다.

---

## 2. 한국관광공사 TourAPI

**용도**: 지역별·위치 기반 관광지 목록 조회  
**환경변수**: `TOUR_API_KEY`  
**비용**: 무료

### 발급 절차

1. [공공데이터포털](https://www.data.go.kr) 접속 → 회원가입/로그인
2. 검색창에 **"한국관광공사 국문 관광정보 서비스(TourAPI)"** 검색
3. **"한국관광공사_국문_관광정보_서비스_TourAPI_V4.0"** 항목 클릭
4. **[활용신청]** 버튼 클릭
5. 활용 목적 작성 후 신청 완료
6. 마이페이지 → **인증키 발급 현황**에서 키 확인 (보통 1~2시간 내 자동 승인)
7. **일반 인증키(Decoding)** 값을 `.env.local`의 `TOUR_API_KEY`에 입력

> **중요**: 키는 **인코딩/디코딩** 두 가지가 있습니다. `.env.local`에는 반드시 **디코딩(Decoding)** 키를 사용하세요. 인코딩 키를 쓰면 API 호출 시 인증 오류가 발생합니다.

### 이 프로젝트에서 사용하는 API

| 엔드포인트 | 용도 | 호출 위치 |
|-----------|------|----------|
| `areaBasedList1` | 지역 코드로 관광지 목록 조회 | `/api/tour/area` |
| `locationBasedList1` | 좌표 기반 주변 관광지 조회 | `/api/tour/nearby` |
| `detailCommon1` | 관광지 상세 정보 | `/api/tour/detail` |
| `detailImage1` | 관광지 이미지 목록 | `/api/tour/detail` |

---

## 3. OpenWeatherMap

**용도**: 현재 날씨·기온 조회  
**환경변수**: `OPENWEATHER_KEY`  
**비용**: 무료 플랜으로 충분 (월 1,000회 무료)

### 발급 절차

1. [OpenWeatherMap](https://openweathermap.org) 접속 → 회원가입/로그인
2. 상단 메뉴 **[API keys]** 클릭 (또는 계정 → My API keys)
3. 기본으로 생성된 `Default` 키 복사
4. 또는 **[Generate]**로 새 키 생성 후 복사
5. `.env.local`의 `OPENWEATHER_KEY`에 입력

> 키 발급 후 **활성화까지 최대 2시간** 걸릴 수 있습니다. 그 전에는 401 오류가 납니다.  
> 키가 없어도 앱은 동작합니다 — "맑음 ☀️"으로 폴백됩니다.

---

## 4. Sunrise-Sunset API

**용도**: 일출·일몰 시간 조회  
**환경변수**: **없음 (API 키 불필요)**  
**비용**: 완전 무료 공개 API

별도 설정 없이 자동으로 동작합니다.  
API URL: `https://api.sunrise-sunset.org/json?lat=위도&lng=경도&formatted=0`

---

## 5. LaaS (AI 큐레이션, 선택 사항)

**용도**: 취향·날씨 기반 메인 관광지 AI 선정 + 감성 코스 스토리 생성  
**환경변수**: `LAAS_API_KEY`, `LAAS_PROJECT_ID`, `LAAS_HASH_1`, `LAAS_HASH_2`  
**비용**: 대회 플랫폼 (원티드 제공)

### 키가 없을 때 (현재 상태)

LaaS 키 없이도 앱은 완전히 동작합니다. TourAPI 결과를 순서대로 사용하는 **규칙 기반 폴백**으로 자동 전환됩니다. `/analyze` 로딩 화면에서 현재 모드를 알려주는 배너가 표시됩니다.

### 키가 있을 때

2회의 AI 호출로 더 정교한 결과를 제공합니다:
- **Call 1**: TourAPI 후보 10개 중 취향·날씨를 고려한 최적 관광지 1곳 선정
- **Call 2**: 선정된 관광지 기반으로 코스 순서·이동 방법·AI 감성 스토리 생성

### 발급 방법

원티드 해커톤/대회 참가자에게 제공되는 플랫폼입니다. 대회 운영진을 통해 발급받으세요.

---

## 6. 설정 완료 후 확인

`.env.local` 작성 후 개발 서버를 **재시작**해야 환경변수가 적용됩니다.

```bash
# 서버 종료 후 재시작
npm run dev
```

브라우저에서 직접 API를 테스트하는 방법:

```
# 날씨 (서울 시청 좌표)
http://localhost:3000/api/weather?lat=37.5665&lng=126.978

# 일몰 시간
http://localhost:3000/api/sun?lat=37.5665&lng=126.978

# 관광지 목록 (지역 코드 1 = 서울)
http://localhost:3000/api/tour/area?areaCode=1

# 주변 관광지 (경복궁 좌표)
http://localhost:3000/api/tour/nearby?mapX=126.9770&mapY=37.5796
```

각 API가 JSON 데이터를 반환하면 키가 올바르게 설정된 것입니다.

---

## 7. 지역 코드 참고

`/api/tour/area?areaCode=숫자` 에서 사용하는 코드입니다.

| 코드 | 지역 |
|------|------|
| 1 | 서울 |
| 2 | 인천 |
| 3 | 대전 |
| 4 | 대구 |
| 5 | 광주 |
| 6 | 부산 |
| 7 | 울산 |
| 8 | 세종 |
| 31 | 경기 |
| 32 | 강원 |
| 33 | 충북 |
| 34 | 충남 |
| 35 | 전북 |
| 36 | 전남 |
| 37 | 경북 |
| 38 | 경남 |
| 39 | 제주 |

현재 코드에서는 `areaCode=12`가 기본값으로 설정되어 있습니다 (전북). 실제 서비스에서는 사용자 취향 응답에서 지역을 파악해 동적으로 설정합니다.

import { NextRequest, NextResponse } from "next/server";

interface Preferences {
  mood?: string;
  style?: string;
  activity?: string;
  duration?: string;
  avoidances?: string;
}

interface Context {
  weather: { icon: string; description: string; temp: number | null };
  sun: { sunset: string; sunrise: string };
  lat: number;
  lng: number;
}

// 규칙 기반 폴백 코스 생성
// LaaS API 키가 없거나 LaaS 호출이 실패했을 때 실행됩니다.
// TourAPI 결과의 첫 번째 항목을 메인으로, 2~4번째를 주변 코스로 사용합니다.
function buildFallbackResult(items: Record<string, string>[], context: Context, prefs: Preferences) {
  const main = items[0];
  const nearby = items.slice(1, 4);

  const sunset = new Date(context.sun.sunset);
  const now = new Date();
  const diffMs = sunset.getTime() - now.getTime();
  const sunsetHours = Math.floor(diffMs / 3600000);
  const sunsetMins = Math.floor((diffMs % 3600000) / 60000);
  const sunsetRemaining = diffMs > 0
    ? `${sunsetHours > 0 ? `${sunsetHours}시간 ` : ""}${sunsetMins}분`
    : "일몰 후";

  const isSolo = prefs.style?.includes("혼자") ?? true;
  const isWalking = prefs.activity?.includes("걷") ?? true;

  return {
    // _mode: 클라이언트가 LaaS 사용 여부를 구분하기 위한 내부 플래그
    _mode: "fallback" as const,
    main: {
      contentId: main?.contentid,
      name: main?.title ?? "추천 여행지",
      location: main?.addr1 ?? "",
      imageUrl: main?.firstimage ?? "",
      description: main?.overview ?? "",
      aiStory: `지금 이 순간, ${context.weather.icon} ${context.weather.description} 날씨에 딱 어울리는 곳이에요.`,
      timingReason: `현재 시각 기준 일몰까지 ${sunsetRemaining} 남았습니다.`,
      estimatedTime: isWalking ? "약 2시간" : "약 1시간 30분",
      estimatedCost: "무료~소정 입장료",
      transitInfo: "대중교통 30분 내외",
      mapX: main?.mapx,
      mapY: main?.mapy,
      isSolo,
    },
    course: nearby.map((item, i) => ({
      order: i + 1,
      contentId: item?.contentid,
      name: item?.title ?? `여행지 ${i + 2}`,
      location: item?.addr1 ?? "",
      imageUrl: item?.firstimage ?? "",
      duration: "약 1시간",
      transport: i === 0 ? "도보 15분" : "도보 10분",
    })),
    context: {
      weather: `${context.weather.icon} ${context.weather.description}${context.weather.temp ? ` ${Math.round(context.weather.temp)}°` : ""}`,
      sunsetRemaining,
      sunsetTime: sunset.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }),
    },
  };
}

// 좌표 기반 지역코드 매핑 함수
function getAreaCodeFromCoordinates(lat: number, lng: number): string {
  // 제주도
  if (lat >= 33.1 && lat <= 33.6 && lng >= 126.1 && lng <= 126.9) return "39";

  // 부산
  if (lat >= 34.8 && lat <= 35.4 && lng >= 128.8 && lng <= 129.3) return "6";

  // 대구
  if (lat >= 35.6 && lat <= 36.0 && lng >= 128.3 && lng <= 129.0) return "4";

  // 울산
  if (lat >= 35.3 && lat <= 35.7 && lng >= 128.9 && lng <= 129.5) return "7";

  // 광주
  if (lat >= 35.0 && lat <= 35.3 && lng >= 126.7 && lng <= 127.0) return "5";

  // 대전
  if (lat >= 36.2 && lat <= 36.5 && lng >= 127.2 && lng <= 127.6) return "3";

  // 세종
  if (lat >= 36.4 && lat <= 36.7 && lng >= 127.1 && lng <= 127.4) return "8";

  // 인천
  if (lat >= 37.2 && lat <= 37.6 && lng >= 126.3 && lng <= 126.9) return "2";

  // 서울
  if (lat >= 37.4 && lat <= 37.7 && lng >= 126.7 && lng <= 127.2) return "1";

  // 강원도
  if (lat >= 37.0 && lng >= 127.5) return "32";

  // 경북
  if (lat >= 35.5 && lat <= 37.5 && lng >= 128.0 && lng <= 129.5) return "35";

  // 경남
  if (lat >= 34.5 && lat <= 35.5 && lng >= 127.5 && lng <= 129.0) return "36";

  // 전북
  if (lat >= 35.5 && lat <= 36.5 && lng >= 126.5 && lng <= 127.5) return "37";

  // 전남
  if (lat >= 34.0 && lat <= 35.5 && lng >= 126.0 && lng <= 127.5) return "38";

  // 충북
  if (lat >= 36.0 && lat <= 37.5 && lng >= 127.3 && lng <= 128.5) return "33";

  // 충남
  if (lat >= 36.0 && lat <= 37.0 && lng >= 126.0 && lng <= 127.5) return "34";

  // 경기도 (기본값 - 가장 넓은 범위)
  return "31";
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { preferences, lat, lng } = body as {
    preferences: Preferences;
    lat: number;
    lng: number;
  };

  const baseUrl = req.nextUrl.origin;

  // 좌표 기반 지역코드 매핑
  const areaCode = getAreaCodeFromCoordinates(lat, lng);

  // Step 1: 날씨·일몰·관광지 병렬 조회
  // - /api/weather: OpenWeatherMap API (OPENWEATHER_KEY 필요)
  // - /api/sun: Sunrise-Sunset.org API (키 불필요)
  // - /api/tour/area: TourAPI areaBasedList2 (TOUR_API_KEY 필요)
  const [weatherRes, sunRes, tourRes] = await Promise.allSettled([
    fetch(`${baseUrl}/api/weather?lat=${lat}&lng=${lng}`),
    fetch(`${baseUrl}/api/sun?lat=${lat}&lng=${lng}`),
    fetch(`${baseUrl}/api/tour/area?areaCode=${areaCode}`),
  ]);

  const weather = weatherRes.status === "fulfilled" && weatherRes.value.ok
    ? await weatherRes.value.json()
    : { icon: "☀️", description: "맑음", temp: null };

  const sun = sunRes.status === "fulfilled" && sunRes.value.ok
    ? await sunRes.value.json()
    : { sunrise: new Date().toISOString(), sunset: new Date(Date.now() + 7200000).toISOString() };

  const tourItems = tourRes.status === "fulfilled" && tourRes.value.ok
    ? (await tourRes.value.json()).items ?? []
    : [];

  // 이미지가 있는 항목만 필터링
  const itemsWithImages = tourItems.filter((item: Record<string, string>) => item.firstimage);

  if (itemsWithImages.length === 0) {
    console.warn(`TourAPI: areaCode=${areaCode}에서 이미지가 있는 관광지를 찾을 수 없음 (전체: ${tourItems.length}개)`);
    return NextResponse.json({
      error: "해당 지역의 관광지 데이터를 불러올 수 없습니다. 잠시 후 다시 시도해 주세요.",
      _mode: "error",
    }, { status: 503 });
  }

  console.log(`TourAPI: areaCode=${areaCode}, 전체 ${tourItems.length}개 중 이미지 있는 항목 ${itemsWithImages.length}개 사용`);

  const context: Context = { weather, sun, lat, lng };

  // Step 2: LaaS AI 큐레이션 (LAAS_API_KEY 환경 변수가 설정된 경우에만 실행)
  // LaaS(대회 플랫폼)를 통해 두 번의 AI 호출로 최적 관광지와 감성 스토리를 생성합니다.
  // - Call 1: TourAPI 후보 10개 중 취향·날씨 기반으로 메인 관광지 1개 선정
  // - Call 2: 메인 관광지 + 주변 관광지 기반으로 코스 순서·이동 수단·AI 스토리 생성
  // LAAS_API_KEY가 없으면 아래 규칙 기반 폴백으로 자동 전환됩니다.
  const laasKey = process.env.LAAS_API_KEY;

  if (laasKey) {
    console.log("[LaaS] API 키 확인됨 — AI 큐레이션 시작");
    try {
      // LaaS Call 1: 취향·날씨 컨텍스트를 반영한 메인 관광지 선정
      // params: candidates(최대 10개 후보), preferences(사용자 취향), weather(현재 날씨)
      const laasCall1 = await fetch("https://laas.wanted.co.kr/api/v1/completion", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${laasKey}` },
        body: JSON.stringify({
          project: process.env.LAAS_PROJECT_ID,
          hash: process.env.LAAS_HASH_1,
          params: {
            candidates: JSON.stringify(
              itemsWithImages.slice(0, 10).map((i: Record<string, string>) => ({
                id: i.contentid,
                name: i.title,
                address: i.addr1,
              }))
            ),
            preferences: JSON.stringify(preferences),
            weather: `${weather.description}${weather.temp ? ` ${Math.round(weather.temp)}°C` : ""}`,
          },
        }),
      });

      if (!laasCall1.ok) {
        // LaaS Call 1 실패 — HTTP 오류 코드 로그 후 폴백으로 전환
        console.warn(`[LaaS] Call 1 실패 (HTTP ${laasCall1.status}) — 규칙 기반 폴백으로 전환`);
        const result = buildFallbackResult(itemsWithImages, context, preferences);
        return NextResponse.json(result);
      }

      const call1Data = await laasCall1.json();
      console.log("[LaaS] Call 1 완료 — 메인 관광지 선정됨:", call1Data?.result?.contentId);

      const mainId = call1Data?.result?.contentId ?? itemsWithImages[0]?.contentid;
      const mainItem = itemsWithImages.find((i: Record<string, string>) => i.contentid === mainId) ?? itemsWithImages[0];

      // Step 2-a: 선정된 메인 관광지 주변 관광지 조회 (TourAPI locationBasedList1)
      const nearbyRes = await fetch(
        `${baseUrl}/api/tour/nearby?mapX=${mainItem.mapx}&mapY=${mainItem.mapy}`
      );
      const nearbyItems = nearbyRes.ok ? (await nearbyRes.json()).items ?? [] : itemsWithImages.slice(1);

      // LaaS Call 2: 메인 관광지 + 주변 관광지 기반으로 코스·스토리 생성
      // params: main(메인 관광지), nearby(주변 5곳), preferences(취향), context(날씨·일몰 시각)
      const laasCall2 = await fetch("https://laas.wanted.co.kr/api/v1/completion", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${laasKey}` },
        body: JSON.stringify({
          project: process.env.LAAS_PROJECT_ID,
          hash: process.env.LAAS_HASH_2,
          params: {
            main: JSON.stringify({ name: mainItem.title, address: mainItem.addr1 }),
            nearby: JSON.stringify(
              nearbyItems.slice(0, 5).map((i: Record<string, string>) => ({
                name: i.title,
                address: i.addr1,
              }))
            ),
            preferences: JSON.stringify(preferences),
            context: JSON.stringify({
              weather: weather.description,
              sunsetTime: new Date(sun.sunset).toLocaleTimeString("ko-KR", {
                hour: "2-digit",
                minute: "2-digit",
              }),
            }),
          },
        }),
      });

      if (!laasCall2.ok) {
        // LaaS Call 2 실패 — 메인 관광지는 확정됐으므로 메인은 LaaS 결과, 코스는 폴백
        console.warn(`[LaaS] Call 2 실패 (HTTP ${laasCall2.status}) — 규칙 기반 폴백으로 전환`);
        const result = buildFallbackResult(itemsWithImages, context, preferences);
        return NextResponse.json(result);
      }

      const call2Data = await laasCall2.json();
      console.log("[LaaS] Call 2 완료 — AI 코스·스토리 생성됨");

      // LaaS 성공: _mode: "laas" 플래그를 포함하여 응답
      return NextResponse.json({
        ...call2Data.result,
        // _mode: 클라이언트가 LaaS 사용 여부를 구분하기 위한 내부 플래그
        _mode: "laas",
        context: {
          weather: `${weather.icon} ${weather.description}`,
          sun,
        },
      });

    } catch (e) {
      // 네트워크 오류 등 예외 발생 시 규칙 기반 폴백으로 전환
      console.error("[LaaS] 오류 발생 — 규칙 기반 폴백으로 전환:", e);
    }
  } else {
    // LAAS_API_KEY 미설정 — 규칙 기반 폴백으로 실행됩니다.
    // .env.local에 LAAS_API_KEY, LAAS_PROJECT_ID, LAAS_HASH_1, LAAS_HASH_2를 설정하면 AI 큐레이션이 활성화됩니다.
    console.log("[LaaS] API 키 미설정 — 규칙 기반 폴백으로 실행");
  }

  // Step 3: 규칙 기반 폴백 — TourAPI 결과의 순서를 그대로 사용
  const result = buildFallbackResult(itemsWithImages, context, preferences);
  return NextResponse.json(result);
}

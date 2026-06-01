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

// 규칙 기반 폴백 코스 생성 (LaaS 없을 때)
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

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { preferences, lat, lng } = body as {
    preferences: Preferences;
    lat: number;
    lng: number;
  };

  const baseUrl = req.nextUrl.origin;

  // 병렬로 날씨·일몰·관광지 조회
  const [weatherRes, sunRes, tourRes] = await Promise.allSettled([
    fetch(`${baseUrl}/api/weather?lat=${lat}&lng=${lng}`),
    fetch(`${baseUrl}/api/sun?lat=${lat}&lng=${lng}`),
    fetch(`${baseUrl}/api/tour/area?areaCode=12`), // TODO: 취향 지역 코드 매핑
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

  if (tourItems.length === 0) {
    return NextResponse.json({ error: "관광지 데이터를 불러올 수 없습니다. 다른 지역을 선택해주세요." }, { status: 503 });
  }

  const context: Context = { weather, sun, lat, lng };

  // LaaS 호출 (키가 있을 때만)
  const laasKey = process.env.LAAS_API_KEY;
  if (laasKey) {
    try {
      // LaaS Call 1: 메인 관광지 선정
      const laasCall1 = await fetch("https://laas.wanted.co.kr/api/v1/completion", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${laasKey}` },
        body: JSON.stringify({
          project: process.env.LAAS_PROJECT_ID,
          hash: process.env.LAAS_HASH_1,
          params: {
            candidates: JSON.stringify(tourItems.slice(0, 10).map((i: Record<string, string>) => ({ id: i.contentid, name: i.title, address: i.addr1 }))),
            preferences: JSON.stringify(preferences),
            weather: `${weather.description}${weather.temp ? ` ${Math.round(weather.temp)}°C` : ""}`,
          },
        }),
      });

      if (laasCall1.ok) {
        const call1Data = await laasCall1.json();
        const mainId = call1Data?.result?.contentId ?? tourItems[0]?.contentid;
        const mainItem = tourItems.find((i: Record<string, string>) => i.contentid === mainId) ?? tourItems[0];

        // 주변 관광지 조회
        const nearbyRes = await fetch(
          `${baseUrl}/api/tour/nearby?mapX=${mainItem.mapx}&mapY=${mainItem.mapy}`
        );
        const nearbyItems = nearbyRes.ok ? (await nearbyRes.json()).items ?? [] : tourItems.slice(1);

        // LaaS Call 2: 코스·스토리 생성
        const laasCall2 = await fetch("https://laas.wanted.co.kr/api/v1/completion", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${laasKey}` },
          body: JSON.stringify({
            project: process.env.LAAS_PROJECT_ID,
            hash: process.env.LAAS_HASH_2,
            params: {
              main: JSON.stringify({ name: mainItem.title, address: mainItem.addr1 }),
              nearby: JSON.stringify(nearbyItems.slice(0, 5).map((i: Record<string, string>) => ({ name: i.title, address: i.addr1 }))),
              preferences: JSON.stringify(preferences),
              context: JSON.stringify({ weather: weather.description, sunsetTime: new Date(sun.sunset).toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }) }),
            },
          }),
        });

        if (laasCall2.ok) {
          const call2Data = await laasCall2.json();
          return NextResponse.json({ ...call2Data.result, context: { weather: `${weather.icon} ${weather.description}`, sun } });
        }
      }
    } catch (e) {
      console.error("LaaS error, falling back to rule-based:", e);
    }
  }

  // 규칙 기반 폴백
  const result = buildFallbackResult(tourItems, context, preferences);
  return NextResponse.json(result);
}

import { NextRequest, NextResponse } from "next/server";

const TOUR_API_BASE = "https://apis.data.go.kr/B551011/KorService2";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const areaCode = searchParams.get("areaCode") ?? "12"; // 전북 기본
  const sigunguCode = searchParams.get("sigunguCode") ?? "";
  const contentTypeId = searchParams.get("contentTypeId") ?? "12"; // 관광지

  const serviceKey = process.env.TOUR_API_KEY;
  if (!serviceKey) {
    return NextResponse.json({ items: [], totalCount: 0, error: "TOUR_API_KEY not set" });
  }

  try {
    // serviceKey는 별도로 처리 (인코딩 이슈 방지)
    const params = new URLSearchParams({
      numOfRows: "20",
      pageNo: "1",
      MobileOS: "ETC",
      MobileApp: "TteanalIyu",
      _type: "json",
      areaCode,
      contentTypeId,
      ...(sigunguCode ? { sigunguCode } : {}),
    });

    const url = `${TOUR_API_BASE}/areaBasedList2?serviceKey=${serviceKey}&${params}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("TourAPI HTTP error:", {
        status: res.status,
        statusText: res.statusText,
        url,
        response: errorText
      });
      throw new Error(`TourAPI HTTP ${res.status}: ${res.statusText}`);
    }

    const data = await res.json();

    // TourAPI는 HTTP 200이어도 response.header.resultCode로 에러를 반환할 수 있음
    if (data?.response?.header?.resultCode !== "0000") {
      console.error("TourAPI result error:", {
        resultCode: data?.response?.header?.resultCode,
        resultMsg: data?.response?.header?.resultMsg,
        url
      });
    }

    const items = data?.response?.body?.items?.item ?? [];

    return NextResponse.json({
      items: Array.isArray(items) ? items : [items],
      totalCount: data?.response?.body?.totalCount ?? 0,
    });
  } catch (e) {
    console.error("TourAPI area error:", e);
    return NextResponse.json({ items: [], totalCount: 0 });
  }
}

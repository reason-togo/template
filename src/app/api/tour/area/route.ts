import { NextRequest, NextResponse } from "next/server";

const TOUR_API_BASE = "https://apis.data.go.kr/B551011/KorService1";

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
    const params = new URLSearchParams({
      serviceKey,
      numOfRows: "20",
      pageNo: "1",
      MobileOS: "ETC",
      MobileApp: "TteanalIyu",
      _type: "json",
      areaCode,
      contentTypeId,
      ...(sigunguCode ? { sigunguCode } : {}),
    });

    const res = await fetch(
      `${TOUR_API_BASE}/areaBasedList1?${params}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) throw new Error("TourAPI error");

    const data = await res.json();
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

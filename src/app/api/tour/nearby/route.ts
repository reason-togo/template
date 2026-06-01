import { NextRequest, NextResponse } from "next/server";

const TOUR_API_BASE = "https://apis.data.go.kr/B551011/KorService1";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mapX = searchParams.get("mapX");
  const mapY = searchParams.get("mapY");
  const radius = searchParams.get("radius") ?? "2000"; // 기본 2km

  if (!mapX || !mapY) {
    return NextResponse.json({ error: "mapX, mapY required" }, { status: 400 });
  }

  const serviceKey = process.env.TOUR_API_KEY;
  if (!serviceKey) {
    return NextResponse.json({ items: [], totalCount: 0, error: "TOUR_API_KEY not set" });
  }

  // 소도시 특성상 반경 폴백: 2km → 5km → 10km
  const radii = [Number(radius), 5000, 10000];

  for (const r of radii) {
    try {
      const params = new URLSearchParams({
        serviceKey,
        numOfRows: "10",
        pageNo: "1",
        MobileOS: "ETC",
        MobileApp: "TteanalIyu",
        _type: "json",
        mapX,
        mapY,
        radius: String(r),
        contentTypeId: "12",
      });

      const res = await fetch(
        `${TOUR_API_BASE}/locationBasedList1?${params}`,
        { next: { revalidate: 1800 } }
      );
      if (!res.ok) continue;

      const data = await res.json();
      const items = data?.response?.body?.items?.item ?? [];
      const arr = Array.isArray(items) ? items : [items];

      if (arr.length >= 2) {
        return NextResponse.json({ items: arr, totalCount: arr.length, radius: r });
      }
    } catch {
      continue;
    }
  }

  return NextResponse.json({ items: [], totalCount: 0 });
}

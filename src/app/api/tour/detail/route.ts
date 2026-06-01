import { NextRequest, NextResponse } from "next/server";

const TOUR_API_BASE = "https://apis.data.go.kr/B551011/KorService2";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const contentId = searchParams.get("contentId");
  const contentTypeId = searchParams.get("contentTypeId") ?? "12";

  if (!contentId) {
    return NextResponse.json({ error: "contentId required" }, { status: 400 });
  }

  const serviceKey = process.env.TOUR_API_KEY;
  if (!serviceKey) {
    return NextResponse.json({ error: "TOUR_API_KEY not set" }, { status: 503 });
  }

  // serviceKey는 별도로 처리 (인코딩 이슈 방지)
  const base = { MobileOS: "ETC", MobileApp: "TteanalIyu", _type: "json", contentId };

  try {
    const [commonRes, imageRes] = await Promise.allSettled([
      fetch(`${TOUR_API_BASE}/detailCommon2?serviceKey=${serviceKey}&${new URLSearchParams({ ...base, defaultYN: "Y", firstImageYN: "Y", addrinfoYN: "Y", mapinfoYN: "Y", overviewYN: "Y" })}`, { next: { revalidate: 3600 } }),
      fetch(`${TOUR_API_BASE}/detailImage2?serviceKey=${serviceKey}&${new URLSearchParams({ ...base, imageYN: "Y", subImageYN: "Y" })}`, { next: { revalidate: 3600 } }),
    ]);

    let common = null;
    if (commonRes.status === "fulfilled" && commonRes.value.ok) {
      const d = await commonRes.value.json();
      common = d?.response?.body?.items?.item?.[0] ?? null;
    }

    let images: string[] = [];
    if (imageRes.status === "fulfilled" && imageRes.value.ok) {
      const d = await imageRes.value.json();
      const items = d?.response?.body?.items?.item ?? [];
      images = (Array.isArray(items) ? items : [items]).map((img: Record<string, string>) => img.originimgurl).filter(Boolean);
    }

    return NextResponse.json({ common, images });
  } catch (e) {
    console.error("TourAPI detail error:", e);
    return NextResponse.json({ common: null, images: [] });
  }
}

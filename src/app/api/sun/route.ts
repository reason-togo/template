import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  if (!lat || !lng) {
    return NextResponse.json({ error: "lat, lng required" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&formatted=0`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) throw new Error("Sunrise-Sunset API error");

    const data = await res.json();
    if (data.status !== "OK") throw new Error("Invalid response");

    return NextResponse.json({
      sunrise: data.results.sunrise,
      sunset: data.results.sunset,
      solarNoon: data.results.solar_noon,
      dayLength: data.results.day_length,
    });
  } catch {
    // 기본 일몰 시간 폴백 (오후 7시)
    const now = new Date();
    const sunset = new Date(now);
    sunset.setHours(19, 0, 0, 0);
    const sunrise = new Date(now);
    sunrise.setHours(6, 0, 0, 0);

    return NextResponse.json({
      sunrise: sunrise.toISOString(),
      sunset: sunset.toISOString(),
      solarNoon: null,
      dayLength: null,
    });
  }
}

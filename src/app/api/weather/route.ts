import { NextRequest, NextResponse } from "next/server";

const WEATHER_ICONS: Record<string, string> = {
  "01": "☀️", "02": "🌤️", "03": "⛅", "04": "☁️",
  "09": "🌧️", "10": "🌦️", "11": "⛈️", "13": "🌨️", "50": "🌫️",
};

const WEATHER_KO: Record<string, string> = {
  "01d": "맑음", "01n": "맑음", "02d": "구름 조금", "02n": "구름 조금",
  "03d": "구름", "03n": "구름", "04d": "흐림", "04n": "흐림",
  "09d": "비", "09n": "비", "10d": "비", "10n": "비",
  "11d": "천둥번개", "13d": "눈", "50d": "안개",
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  if (!lat || !lng) {
    return NextResponse.json({ error: "lat, lng required" }, { status: 400 });
  }

  const apiKey = process.env.OPENWEATHER_KEY;
  if (!apiKey) {
    return NextResponse.json({ icon: "☀️", description: "맑음", temp: null }, { status: 200 });
  }

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`,
      { next: { revalidate: 600 } }
    );
    if (!res.ok) throw new Error("OpenWeatherMap error");

    const data = await res.json();
    const iconCode: string = data.weather?.[0]?.icon ?? "01d";
    const prefix = iconCode.slice(0, 2);

    return NextResponse.json({
      icon: WEATHER_ICONS[prefix] ?? "☀️",
      description: WEATHER_KO[iconCode] ?? data.weather?.[0]?.description ?? "맑음",
      temp: data.main?.temp ?? null,
      humidity: data.main?.humidity ?? null,
    });
  } catch {
    return NextResponse.json({ icon: "☀️", description: "맑음", temp: null });
  }
}

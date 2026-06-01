"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { StatusBar } from "@/shared/ui/StatusBar";
import { HomeBar } from "@/shared/ui/HomeBar";

interface ContextData {
  weather: string;
  temp: string;
  sunsetRemaining: string;
  sunsetProgress: number;
  dayOfWeek: string;
}

const MountainSilhouette = () => (
  <svg
    className="absolute bottom-0 left-0 right-0 w-full"
    style={{ height: 220 }}
    viewBox="0 0 390 220"
    preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0,220 L0,130 L25,105 L55,118 L85,72 L108,90 L130,50 L155,68 L175,32 L195,48 L215,28 L238,44 L260,65 L285,85 L315,105 L345,95 L375,110 L390,105 L390,220 Z"
      fill="rgba(175,159,127,0.6)"
    />
    <path
      d="M0,220 L0,158 L45,148 L80,138 L115,150 L145,128 L175,143 L205,122 L235,140 L268,134 L300,146 L335,155 L365,148 L390,153 L390,220 Z"
      fill="rgba(207,199,168,0.85)"
    />
    <rect x="128" y="47" width="5" height="8" fill="rgba(175,159,127,0.6)" />
    <rect x="138" y="47" width="5" height="8" fill="rgba(175,159,127,0.6)" />
    <rect x="148" y="47" width="5" height="8" fill="rgba(175,159,127,0.6)" />
  </svg>
);

const DAYS = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];

export const LandingPage = () => {
  const router = useRouter();
  const [ctx, setCtx] = useState<ContextData>({
    weather: "☀️ 맑음",
    temp: "18°",
    sunsetRemaining: "불러오는 중…",
    sunsetProgress: 60,
    dayOfWeek: DAYS[new Date().getDay()],
  });

  useEffect(() => {
    const fetchContext = async () => {
      try {
        const pos = await new Promise<GeolocationPosition>((res, rej) =>
          navigator.geolocation.getCurrentPosition(res, rej, { timeout: 5000 })
        );
        const { latitude: lat, longitude: lng } = pos.coords;

        const [weatherRes, sunRes] = await Promise.allSettled([
          fetch(`/api/weather?lat=${lat}&lng=${lng}`),
          fetch(`/api/sun?lat=${lat}&lng=${lng}`),
        ]);

        let weather = "☀️ 맑음";
        let temp = "";
        if (weatherRes.status === "fulfilled" && weatherRes.value.ok) {
          const d = await weatherRes.value.json();
          weather = d.icon ? `${d.icon} ${d.description}` : weather;
          temp = d.temp ? `${Math.round(d.temp)}°` : "";
        }

        let sunsetRemaining = "";
        let sunsetProgress = 60;
        if (sunRes.status === "fulfilled" && sunRes.value.ok) {
          const d = await sunRes.value.json();
          const sunset = new Date(d.sunset);
          const now = new Date();
          const diffMs = sunset.getTime() - now.getTime();
          if (diffMs > 0) {
            const h = Math.floor(diffMs / 3600000);
            const m = Math.floor((diffMs % 3600000) / 60000);
            sunsetRemaining = h > 0 ? `🌇 ${h}시간 ${m}분` : `🌇 ${m}분`;
            const sunrise = new Date(d.sunrise);
            const total = sunset.getTime() - sunrise.getTime();
            const elapsed = now.getTime() - sunrise.getTime();
            sunsetProgress = Math.min(100, Math.max(0, (elapsed / total) * 100));
          } else {
            sunsetRemaining = "🌙 일몰 후";
          }
        }

        setCtx({
          weather,
          temp,
          sunsetRemaining: sunsetRemaining || "🌇 2시간 15분",
          sunsetProgress,
          dayOfWeek: DAYS[new Date().getDay()],
        });
      } catch {
        // geolocation 거부 또는 API 실패 시 기본값 유지
      }
    };

    fetchContext();
  }, []);

  return (
    <div className="screen bg-landing">
      {/* 배경 별 장식 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { top: "12%", left: "8%", size: 3, opacity: 0.3, duration: "4.2s" },
          { top: "18%", left: "82%", size: 2, opacity: 0.2, duration: "3.1s" },
          { top: "28%", left: "65%", size: 4, opacity: 0.25, duration: "5.5s" },
          { top: "8%", left: "45%", size: 2, opacity: 0.15, duration: "3.8s" },
        ].map((s, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-brown-700 animate-[twinkle_var(--d)_ease-in-out_infinite]"
            style={{
              top: s.top,
              left: s.left,
              width: s.size,
              height: s.size,
              opacity: s.opacity,
              ["--d" as string]: s.duration,
            }}
          />
        ))}
      </div>

      <MountainSilhouette />

      <StatusBar />

      {/* 콘텐츠 */}
      <div className="absolute inset-x-0 top-[54px] bottom-0 flex flex-col px-6 pt-7">
        {/* AI 배지 */}
        <div className="inline-flex items-center gap-2 self-start bg-brown-700/10 border border-brown-700/25 rounded-2xl px-3.5 py-1.5 mb-[22px]">
          <div className="relative w-2 h-2 flex-shrink-0">
            <div className="w-2 h-2 rounded-full bg-brown-700" />
            <div className="absolute inset-[-4px] rounded-full border border-brown-700/40 animate-ripple" />
          </div>
          <span className="text-[11.5px] text-brown-700 font-medium tracking-[0.06em]">
            AI 실시간 큐레이션 활성
          </span>
        </div>

        {/* 헤드라인 */}
        <p className="text-[19px] font-light text-brown-500 leading-[1.4] mb-1.5">
          지금 이 순간,
        </p>
        <h1
          className="font-extrabold text-brown-900 leading-[1.08] mb-2.5"
          style={{ fontSize: 44, letterSpacing: "-0.03em" }}
        >
          떠날 수 있는
          <br />
          <span className="text-brown-700">이유</span>를 찾다
        </h1>
        <p className="text-[13.5px] text-brown-400 leading-[1.6] mb-7">
          AI가 지금 날씨·시간·감정을 분석해
          <br />
          딱 맞는 국내 여행지를 실시간으로 추천해드려요
        </p>

        {/* 컨텍스트 위젯 */}
        <div className="bg-brown-200/35 border border-brown-200 rounded-[18px] p-[18px] mb-[18px]">
          <div className="flex gap-0">
            {[
              { label: "현재 날씨", value: `${ctx.weather} ${ctx.temp}`.trim() },
              { label: "요일", value: ctx.dayOfWeek },
            ].map((col, i) => (
              <div
                key={col.label}
                className={`flex-1 flex flex-col gap-1 ${i > 0 ? "pl-4 ml-4 border-l border-brown-200" : ""}`}
              >
                <span className="text-[10px] text-brown-400 tracking-[0.1em] uppercase">
                  {col.label}
                </span>
                <span className="text-[15.5px] font-semibold text-brown-900">
                  {col.value}
                </span>
              </div>
            ))}
          </div>

          <div className="h-px bg-brown-200 my-3.5" />

          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] text-brown-400 tracking-[0.1em] uppercase">
              일몰까지 남은 시간
            </span>
            <span className="text-[13px] font-semibold text-brown-700">
              {ctx.sunsetRemaining}
            </span>
          </div>
          <div className="h-1 bg-brown-200 rounded-sm overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brown-700 to-brown-500 rounded-sm transition-all duration-1000"
              style={{ width: `${ctx.sunsetProgress}%` }}
            />
          </div>
        </div>

        {/* 필터 칩 */}
        <div className="flex flex-wrap gap-2 mb-auto">
          {["✕ 사람 많은 곳 제외", "✕ 비싼 입장료 제외", "✕ 복잡한 계획 없이"].map((c) => (
            <span
              key={c}
              className="bg-brown-400/20 border border-brown-200 rounded-2xl px-3 py-1.5 text-xs text-brown-500"
            >
              {c}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="py-5">
          <button
            onClick={() => router.push("/preferences")}
            className="w-full h-14 bg-brown-700 text-cream-50 rounded-2xl text-[17px] font-bold tracking-[-0.01em] shadow-btn btn-press mb-3.5 flex items-center justify-center gap-2"
          >
            지금 바로 시작하기 →
          </button>
          <p className="text-center text-xs text-brown-400">
            3분 대화로 나만의 여행지를 찾아드립니다
          </p>
        </div>
      </div>

      <HomeBar />
    </div>
  );
};

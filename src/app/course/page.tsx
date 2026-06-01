"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { StatusBar } from "@/shared/ui/StatusBar";
import { HomeBar } from "@/shared/ui/HomeBar";

interface CourseItem {
  order: number;
  name: string;
  location: string;
  imageUrl?: string;
  duration?: string;
  transport?: string;
  icon?: string;
  tags?: string[];
}

interface CurationResult {
  main?: { name: string; location: string; estimatedCost?: string };
  course?: CourseItem[];
  context?: { weather?: string; sunsetRemaining?: string; sunsetTime?: string };
}

const CIRCLE_COLORS = ["bg-brown-500", "bg-brown-700", "bg-brown-900"];
const ICONS = ["🚉", "🏛️", "☕", "🌇", "🎭"];

export default function CoursePage() {
  const router = useRouter();
  const [data, setData] = useState<CurationResult | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("curation");
      if (raw) setData(JSON.parse(raw));
    } catch {}
  }, []);

  const main = data?.main;
  const course = data?.course ?? [];
  const ctx = data?.context;

  // 현재 시간 + 이동 시간 계산 (단순 추정)
  const now = new Date();
  const arrivalTime = new Date(now.getTime() + 35 * 60000);
  const fmt = (d: Date) => d.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="screen bg-app-bg flex flex-col">
      <StatusBar />

      {/* 헤더 */}
      <div className="flex items-center px-5 pb-4 gap-3 flex-shrink-0">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 rounded-full bg-brown-100 flex items-center justify-center flex-shrink-0"
        >
          <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
            <path d="M8.5 1L1.5 8L8.5 15" stroke="#3A2410" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span
          className="text-[18px] font-extrabold text-brown-900 flex-1"
          style={{ letterSpacing: "-0.02em" }}
        >
          {main?.name ?? "여행 코스"}
        </span>
        <button
          onClick={() => router.push("/share")}
          className="text-[12px] text-brown-700 font-semibold"
        >
          공유
        </button>
      </div>

      {/* 출발 스트립 */}
      <div className="mx-5 mb-4 bg-depart rounded-2xl px-4 py-3.5 flex items-center gap-3 flex-shrink-0">
        <span className="text-2xl flex-shrink-0">🚀</span>
        <div className="flex-1">
          <div className="text-[11px] text-white/50 tracking-[0.06em] mb-0.5">지금 출발 시</div>
          <div className="text-[16px] font-bold text-white">
            {fmt(arrivalTime)} 현장 도착{ctx?.sunsetTime ? ` · ${ctx.sunsetTime} 석양 🌇` : ""}
          </div>
          <div className="text-[11.5px] text-white/50 mt-0.5">
            마지막 지하철 22:30{main?.estimatedCost ? ` · 총 비용 ${main.estimatedCost}` : ""}
          </div>
        </div>
      </div>

      {/* 지도 영역 (SVG 도식화 — Kakao Map SDK로 교체 예정) */}
      <div className="mx-5 mb-4 rounded-[18px] overflow-hidden relative flex-shrink-0" style={{ height: 190, background: "#D4CAB8" }}>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 60%, rgba(207,199,168,.8), transparent 40%), radial-gradient(ellipse at 70% 30%, rgba(195,185,155,.7), transparent 40%)",
          }}
        />
        <svg className="absolute inset-0" width="350" height="190" viewBox="0 0 350 190">
          <line x1="60" y1="0" x2="60" y2="190" stroke="#CFC7A8" strokeWidth="8" />
          <line x1="180" y1="0" x2="180" y2="190" stroke="#CFC7A8" strokeWidth="8" />
          <line x1="280" y1="0" x2="280" y2="190" stroke="#AF9F7F" strokeWidth="6" />
          <line x1="0" y1="70" x2="350" y2="70" stroke="#CFC7A8" strokeWidth="8" />
          <line x1="0" y1="130" x2="350" y2="130" stroke="#AF9F7F" strokeWidth="6" />
          <polyline
            points="60,130 60,70 180,70 180,130 280,130"
            stroke="#70502E"
            strokeWidth="3"
            fill="none"
            strokeDasharray="6,4"
            strokeLinecap="round"
          />
          <circle cx="60" cy="130" r="8" fill="#907857" stroke="white" strokeWidth="2" />
          <circle cx="180" cy="70" r="8" fill="#70502E" stroke="white" strokeWidth="2" />
          <circle cx="280" cy="130" r="8" fill="#3A2410" stroke="white" strokeWidth="2" />
          <text x="50" y="155" fontSize="9" fill="#3A2410" fontFamily="-apple-system,sans-serif" fontWeight="600">출발</text>
          <text x="167" y="60" fontSize="9" fill="#3A2410" fontFamily="-apple-system,sans-serif" fontWeight="600">{main?.name?.slice(0, 4) ?? "메인"}</text>
          <text x="268" y="155" fontSize="9" fill="#3A2410" fontFamily="-apple-system,sans-serif" fontWeight="600">도착</text>
        </svg>
        <div className="absolute bottom-2.5 right-2.5 bg-white/85 backdrop-blur-sm rounded-lg px-2 py-1 text-[10px] text-gray-500 tracking-[0.03em]">
          Kakao Map
        </div>
      </div>

      {/* 타임라인 */}
      <div className="flex-1 overflow-y-auto px-5 pb-[90px]">
        <div className="flex flex-col">
          {course.length > 0 ? (
            course.map((item, i) => (
              <div key={i}>
                <div className="flex gap-3.5">
                  <div className="flex flex-col items-center w-10 flex-shrink-0">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-base border-[2.5px] border-white shadow-card flex-shrink-0 ${
                        CIRCLE_COLORS[Math.min(i, CIRCLE_COLORS.length - 1)]
                      }`}
                    >
                      {item.icon ?? ICONS[Math.min(i, ICONS.length - 1)]}
                    </div>
                    {i < course.length - 1 && (
                      <div className="w-0.5 flex-1 min-h-4 mt-1 mb-1 mx-auto bg-brown-200" />
                    )}
                  </div>
                  <div className="flex-1 pb-6 pt-1.5">
                    <div className="text-[11px] text-brown-700 font-semibold tracking-[0.04em] mb-0.5">
                      {i === 0 ? "지금 출발" : `${fmt(new Date(now.getTime() + (i * 45 + 35) * 60000))} 도착`}
                    </div>
                    <div className="text-[15px] font-bold text-brown-900 mb-1">{item.name}</div>
                    <p className="text-[12.5px] text-brown-500 leading-[1.5] mb-2">{item.location}</p>
                    {item.tags && (
                      <div className="flex flex-wrap gap-1.5">
                        {item.tags.map((t) => (
                          <span key={t} className="text-[10.5px] px-2 py-0.5 rounded-md bg-brown-100 text-brown-500">{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                {/* 이동 수단 */}
                {i < course.length - 1 && item.transport && (
                  <div className="ml-[54px] mb-3 bg-brown-100 rounded-[10px] px-3 py-2 flex items-center gap-2">
                    <span className="text-base">🚶</span>
                    <span className="text-[12px] text-brown-500">{item.transport}</span>
                  </div>
                )}
              </div>
            ))
          ) : (
            // 기본 코스 (데이터 없을 때)
            [
              { icon: "🚉", label: "지금 출발", name: "출발지", desc: "현재 위치에서 출발하세요." },
              { icon: "🏛️", label: fmt(arrivalTime), name: main?.name ?? "메인 여행지", desc: main?.location ?? "" },
              { icon: "☕", label: fmt(new Date(now.getTime() + 80 * 60000)), name: "주변 카페", desc: "잠시 쉬어가세요." },
            ].map((step, i, arr) => (
              <div key={i}>
                <div className="flex gap-3.5">
                  <div className="flex flex-col items-center w-10 flex-shrink-0">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-base border-[2.5px] border-white shadow-card ${CIRCLE_COLORS[i]}`}>
                      {step.icon}
                    </div>
                    {i < arr.length - 1 && <div className="w-0.5 flex-1 min-h-4 mt-1 mb-1 mx-auto bg-brown-200" />}
                  </div>
                  <div className="flex-1 pb-6 pt-1.5">
                    <div className="text-[11px] text-brown-700 font-semibold tracking-[0.04em] mb-0.5">{step.label}</div>
                    <div className="text-[15px] font-bold text-brown-900 mb-1">{step.name}</div>
                    <p className="text-[12.5px] text-brown-500 leading-[1.5]">{step.desc}</p>
                  </div>
                </div>
                {i < arr.length - 1 && (
                  <div className="ml-[54px] mb-3 bg-brown-100 rounded-[10px] px-3 py-2 flex items-center gap-2">
                    <span className="text-base">🚶</span>
                    <span className="text-[12px] text-brown-500">도보 이동</span>
                  </div>
                )}
              </div>
            ))
          )}
          <div className="h-2" />
        </div>
      </div>

      {/* 바텀 CTA */}
      <div className="absolute bottom-0 left-0 right-0 bg-cream-50 border-t border-brown-200 px-5 flex items-center gap-2.5" style={{ height: 80 }}>
        <button
          onClick={() => router.push("/share")}
          className="w-[50px] h-[50px] bg-brown-100 rounded-[14px] text-lg flex items-center justify-center"
        >
          ↑
        </button>
        <button className="flex-1 h-[50px] bg-brown-900 text-cream-50 rounded-[14px] text-[15px] font-bold btn-press flex items-center justify-center gap-2">
          지금 출발하기
          {main?.estimatedCost && (
            <span className="text-brown-200">· {main.estimatedCost}</span>
          )}
        </button>
      </div>

      <HomeBar />
    </div>
  );
}

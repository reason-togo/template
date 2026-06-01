"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { StatusBar } from "@/shared/ui/StatusBar";
import { BottomNavigation } from "@/shared/ui/BottomNavigation";

interface CourseItem {
  order: number;
  contentId?: string;
  name: string;
  location: string;
  imageUrl?: string;
  duration: string;
  transport: string;
}

interface CurationResult {
  main?: {
    contentId?: string;
    name: string;
    location: string;
    imageUrl?: string;
    aiStory?: string;
    timingReason?: string;
    estimatedTime?: string;
    estimatedCost?: string;
    transitInfo?: string;
    isSolo?: boolean;
  };
  course?: CourseItem[];
  context?: {
    weather?: string;
    sunsetRemaining?: string;
    sunsetTime?: string;
  };
}

const FILTERS = ["지금 추천 ⚡", "당일치기", "무료·저렴", "조용한 곳", "걷기 좋은"];

const GRADIENT_BGS = [
  "linear-gradient(160deg,#5C3D1E 0%,#7A5434 50%,#907857 100%)",
  "linear-gradient(160deg,#8B7355,#70502E)",
  "linear-gradient(160deg,#907857,#6B4F2C)",
  "linear-gradient(160deg,#7A6A4A,#907857)",
];

export default function RecommendationsPage() {
  const router = useRouter();
  const [data, setData] = useState<CurationResult | null>(null);
  const [activeFilter, setActiveFilter] = useState("지금 추천 ⚡");
  const [savedMain, setSavedMain] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("curation");
      if (raw) setData(JSON.parse(raw));
    } catch {}
  }, []);

  const handleSaveMain = () => {
    if (!data?.main) return;
    setSavedMain((v) => !v);
    try {
      const arr = JSON.parse(localStorage.getItem("favorites") ?? "[]");
      const id = data.main.contentId ?? data.main.name;
      if (!savedMain && !arr.find((x: { id: string }) => x.id === id)) {
        arr.unshift({
          id,
          name: data.main.name,
          location: data.main.location,
          savedAt: new Date().toISOString(),
        });
        localStorage.setItem("favorites", JSON.stringify(arr));
      }
    } catch {}
  };

  const goToDetail = (id?: string) => {
    router.push(`/place/${id ?? "main"}`);
  };

  const main = data?.main;
  const course = data?.course ?? [];
  const ctx = data?.context;

  return (
    <div className="screen bg-app-bg flex flex-col">
      <StatusBar />

      {/* 헤더 */}
      <div className="bg-app-bg px-5 pb-3.5 border-b border-brown-200 flex-shrink-0">
        <div className="flex items-center justify-between mb-2.5">
          <h1
            className="text-[20px] font-extrabold text-brown-900"
            style={{ letterSpacing: "-0.025em" }}
          >
            AI 추천 결과
          </h1>
          {ctx && (
            <div className="flex items-center gap-1.5 bg-brown-700 rounded-2xl px-3 py-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-brown-200 animate-blink" />
              <span className="text-[11.5px] text-white font-medium">
                {ctx.weather ?? "☀️ 맑음"}{ctx.sunsetRemaining ? ` · 석양 ${ctx.sunsetRemaining}` : ""}
              </span>
            </div>
          )}
        </div>

        {/* 필터 바 */}
        <div className="flex gap-2 overflow-x-auto pb-px">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`flex-shrink-0 rounded-2xl px-3.5 py-1.5 text-[12.5px] border transition-all duration-150 whitespace-nowrap select-none ${
                activeFilter === f
                  ? "bg-brown-900 border-brown-900 text-white font-semibold"
                  : f === "지금 추천 ⚡"
                  ? "bg-cream-50 border-brown-700 text-brown-700"
                  : "bg-cream-50 border-brown-200 text-brown-500"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* 스크롤 영역 */}
      <div className="flex-1 overflow-y-auto px-5 py-4 pb-[90px] flex flex-col gap-3.5">
        {/* Featured Card */}
        <div
          className="bg-cream-50 rounded-[20px] overflow-hidden shadow-featured border-2 border-brown-700 cursor-pointer card-press"
          onClick={() => goToDetail(main?.contentId)}
        >
          {/* 이미지 영역 */}
          <div className="h-40 relative flex items-end p-3.5">
            {main?.imageUrl ? (
              <Image
                src={main.imageUrl}
                alt={main.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="absolute inset-0" style={{ background: GRADIENT_BGS[0] }} />
            )}
            <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-xl px-2.5 py-1.5 text-[11px] text-white z-10">
              {ctx?.sunsetRemaining ? `석양까지 ${ctx.sunsetRemaining}` : "지금 출발 → 도착 예정"}
            </div>
            <div className="relative z-10 bg-brown-700 rounded-2xl px-3 py-1 text-[11px] font-bold text-white tracking-[0.04em]">
              AI 추천 1순위 ✨
            </div>
          </div>

          <div className="p-4">
            <h2 className="text-[18px] font-extrabold text-brown-900 mb-1" style={{ letterSpacing: "-0.02em" }}>
              {main?.name ?? "추천 여행지"}
            </h2>
            <p className="text-[12px] text-brown-500 mb-2.5">📍 {main?.location ?? "위치 불러오는 중"}</p>

            {/* AI 스토리 */}
            {main?.aiStory && (
              <div className="bg-brown-700/6 border-l-[3px] border-brown-700 rounded-[0_10px_10px_0] px-3 py-2.5 mb-3">
                <div className="text-[10px] text-brown-700 font-semibold tracking-[0.08em] mb-1">✨ AI가 지금 추천하는 이유</div>
                <p className="text-[13px] text-brown-900 leading-[1.55]">{main.aiStory}</p>
              </div>
            )}

            {/* 메타 pill */}
            <div className="flex flex-wrap gap-2 mb-3.5">
              {[
                main?.transitInfo && `🚇 ${main.transitInfo}`,
                main?.estimatedCost && `💰 ${main.estimatedCost}`,
                main?.estimatedTime && `🚶 ${main.estimatedTime}`,
                ctx?.sunsetTime && `🌇 석양 ${ctx.sunsetTime}`,
              ].filter(Boolean).map((p) => (
                <span key={p} className="flex items-center gap-1 bg-brown-100 rounded-[10px] px-2.5 py-1.5 text-[12px] text-brown-900">
                  {p}
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); goToDetail(main?.contentId); }}
                className="flex-1 h-11 bg-brown-700 text-cream-50 rounded-xl text-[14px] font-bold"
              >
                여행 상세 보기 →
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleSaveMain(); }}
                className="w-11 h-11 bg-brown-100 rounded-xl flex items-center justify-center text-lg"
              >
                {savedMain ? "❤️" : "🤍"}
              </button>
            </div>
          </div>
        </div>

        {/* 주변 코스 카드 */}
        {(course.length > 0 ? course : Array(3).fill(null)).map((item, i) => (
          <div
            key={i}
            className="bg-cream-50 rounded-2xl overflow-hidden shadow-card flex cursor-pointer card-press"
            onClick={() => item && goToDetail(item.contentId)}
          >
            <div className="w-[100px] flex-shrink-0 relative" style={{ minHeight: 100 }}>
              {item?.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="100px"
                />
              ) : (
                <div className="absolute inset-0" style={{ background: GRADIENT_BGS[(i + 1) % GRADIENT_BGS.length] }} />
              )}
            </div>
            <div className="flex-1 p-3.5">
              <p className="text-[15px] font-bold text-brown-900 mb-0.5" style={{ letterSpacing: "-0.01em" }}>
                {item?.name ?? `주변 여행지 ${i + 1}`}
              </p>
              <p className="text-[11.5px] text-brown-500 mb-1.5">📍 {item?.location ?? "위치 정보"}</p>
              <div className="flex flex-wrap gap-1.5">
                {item?.transport && (
                  <span className="text-[10.5px] px-2 py-0.5 rounded-md bg-brown-100 text-brown-500 font-medium">
                    {item.transport}
                  </span>
                )}
                {item?.duration && (
                  <span className="text-[10.5px] px-2 py-0.5 rounded-md bg-brown-700/10 text-brown-700 font-medium">
                    {item.duration}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}

        <div className="h-2" />
      </div>

      <BottomNavigation active="recommendations" />
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { StatusBar } from "@/shared/ui/StatusBar";

interface PlaceDetail {
  name: string;
  location: string;
  imageUrl?: string;
  aiStory?: string;
  timingReason?: string;
  estimatedTime?: string;
  estimatedCost?: string;
  transitInfo?: string;
  isSolo?: boolean;
  contentId?: string;
}

interface CurationResult {
  main?: PlaceDetail;
  course?: Array<{
    order: number;
    contentId?: string;
    name: string;
    location: string;
    imageUrl?: string;
    duration?: string;
    transport?: string;
  }>;
  context?: { weather?: string; sunsetRemaining?: string; sunsetTime?: string };
}

const HeroMountain = () => (
  <svg
    className="absolute bottom-0 left-0 right-0 w-full"
    viewBox="0 0 390 80"
    preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0,80 L0,50 L60,35 L110,45 L150,20 L190,35 L230,15 L270,30 L310,40 L390,25 L390,80 Z"
      fill="rgba(92,61,30,0.5)"
    />
    <path
      d="M0,80 L0,65 L80,55 L140,62 L200,48 L250,58 L310,55 L390,60 L390,80 Z"
      fill="rgba(58,36,16,0.7)"
    />
  </svg>
);

export default function PlaceDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [place, setPlace] = useState<PlaceDetail | null>(null);
  const [courseSteps, setCourseSteps] = useState<CurationResult["course"]>([]);
  const [ctx, setCtx] = useState<CurationResult["context"]>();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("curation");
      if (raw) {
        const data: CurationResult = JSON.parse(raw);
        const id = params.id as string;

        // id가 "main"이거나 main의 contentId와 일치하면 main 사용
        if (id === "main" || id === data.main?.contentId) {
          setPlace(data.main ?? null);
        } else {
          // course에서 해당 contentId 찾기
          const courseItem = data.course?.find((item) => item.contentId === id);
          if (courseItem) {
            // course 아이템을 PlaceDetail 형식으로 변환
            setPlace({
              name: courseItem.name,
              location: courseItem.location,
              imageUrl: courseItem.imageUrl,
              contentId: courseItem.contentId,
              // course에는 상세 정보가 없으므로 기본값 사용
              aiStory: `${courseItem.name}을(를) 방문해보세요.`,
              estimatedTime: courseItem.duration,
              transitInfo: courseItem.transport,
            });
          } else {
            // 못 찾으면 main 사용
            setPlace(data.main ?? null);
          }
        }

        setCourseSteps(data.course ?? []);
        setCtx(data.context);

        const arr = JSON.parse(localStorage.getItem("favorites") ?? "[]");
        if (id && arr.find((x: { id: string }) => x.id === id)) {
          setSaved(true);
        }
      }
    } catch {}
  }, [params.id]);

  const handleSave = () => {
    setSaved((v) => !v);
    if (!place) return;
    try {
      const arr = JSON.parse(localStorage.getItem("favorites") ?? "[]");
      const id = place.contentId ?? place.name;
      if (!saved) {
        arr.unshift({ id, name: place.name, location: place.location, savedAt: new Date().toISOString() });
      } else {
        const idx = arr.findIndex((x: { id: string }) => x.id === id);
        if (idx > -1) arr.splice(idx, 1);
      }
      localStorage.setItem("favorites", JSON.stringify(arr));
    } catch {}
  };

  if (!place) {
    return (
      <div className="screen bg-app-bg flex items-center justify-center">
        <p className="text-brown-500 text-sm">정보를 불러오는 중…</p>
      </div>
    );
  }

  const infoGrid = [
    { icon: "💰", label: "예상 비용", value: place.estimatedCost ?? "무료", note: "입장료 확인 필요" },
    { icon: "🚇", label: "이동 시간", value: place.transitInfo ?? "약 30분", note: "대중교통 기준" },
    { icon: "🚶", label: "총 코스", value: place.estimatedTime ?? "약 2시간", note: "도보 기준" },
    { icon: "👤", label: "혼자 여행", value: place.isSolo !== false ? "최적 ⭐" : "추천", note: "산책하기 좋음" },
  ];

  return (
    <div className="screen bg-app-bg flex flex-col">
      {/* 히어로 (260px) */}
      <div className="relative flex-shrink-0" style={{ height: 260 }}>
        {/* 배경 이미지 또는 기본 배경 */}
        {place.imageUrl ? (
          <Image
            src={place.imageUrl}
            alt={place.name}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-hero" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 to-black/50 z-[1]" />
        <div className="relative z-[2]">
          <HeroMountain />
        </div>

        <StatusBar dark />

        {/* 뒤로 + 액션 버튼 */}
        <div className="absolute left-5 flex items-center gap-2 z-10" style={{ top: 56 }}>
          <button
            onClick={() => router.back()}
            className="w-[38px] h-[38px] rounded-full bg-black/35 backdrop-blur-sm flex items-center justify-center"
          >
            <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
              <path d="M8.5 1L1.5 8L8.5 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <div className="absolute right-5 flex items-center gap-2 z-10" style={{ top: 56 }}>
          <button
            onClick={handleSave}
            className="w-[38px] h-[38px] rounded-full bg-black/35 backdrop-blur-sm flex items-center justify-center text-base"
          >
            {saved ? "❤️" : "🤍"}
          </button>
          <button
            onClick={() => router.push("/share")}
            className="w-[38px] h-[38px] rounded-full bg-black/35 backdrop-blur-sm flex items-center justify-center text-base"
          >
            ⬆️
          </button>
        </div>

        {/* 배지 + 타이밍 */}
        <div className="absolute bottom-4 left-5 bg-brown-700 rounded-2xl px-3 py-1 text-[11px] font-bold text-white tracking-[0.04em]">
          AI 추천 1순위 ✨
        </div>
        {ctx?.sunsetRemaining && (
          <div className="absolute bottom-4 right-5 bg-black/45 backdrop-blur-sm rounded-xl px-2.5 py-1.5 text-[11px] text-white">
            석양까지 {ctx.sunsetRemaining}
          </div>
        )}
      </div>

      {/* 스크롤 콘텐츠 */}
      <div className="flex-1 overflow-y-auto pb-[80px]">
        <div className="px-5 pt-5">
          {/* 장소 이름 */}
          <h1
            className="text-[26px] font-extrabold text-brown-900 mb-1.5"
            style={{ letterSpacing: "-0.025em" }}
          >
            {place.name}
          </h1>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-[13px] text-brown-500">📍 {place.location}</span>
          </div>

          {/* AI 스토리 블록 */}
          <div className="bg-cream-50 rounded-2xl p-4 mb-4 shadow-card">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brown-700 to-brown-500 flex items-center justify-center text-sm">
                ✨
              </div>
              <div>
                <div className="text-[13px] font-bold text-brown-900">AI가 지금 추천하는 이유</div>
                <div className="text-[11px] text-brown-500">
                  {ctx?.weather ?? "실시간 분석"} 기준
                </div>
              </div>
            </div>
            <p className="text-[14.5px] text-brown-900 leading-[1.65]">
              {place.aiStory ?? "지금 이 순간 날씨와 시간에 딱 맞는 여행지예요."}
            </p>
            {place.timingReason && (
              <div className="mt-3 bg-gradient-to-br from-brown-700/8 to-brown-500/6 border border-brown-700/20 rounded-[14px] p-3 flex items-start gap-2.5">
                <span className="text-xl flex-shrink-0">🌇</span>
                <p className="text-[13px] text-brown-500 leading-[1.5]">{place.timingReason}</p>
              </div>
            )}
          </div>

          {/* 정보 그리드 2×2 */}
          <div className="grid grid-cols-2 gap-2.5 mb-4">
            {infoGrid.map((c) => (
              <div key={c.label} className="bg-cream-50 rounded-[14px] p-3.5 shadow-light">
                <div className="text-[22px] mb-1.5">{c.icon}</div>
                <div className="text-[10.5px] text-brown-500 tracking-[0.05em] mb-0.5">{c.label}</div>
                <div className="text-[15px] font-bold text-brown-900">{c.value}</div>
                <div className="text-[11px] text-brown-500 mt-0.5">{c.note}</div>
              </div>
            ))}
          </div>

          {/* 교통 알림 */}
          <div className="bg-brown-700 rounded-[14px] px-4 py-3.5 mb-4 flex items-center gap-3">
            <span className="text-xl flex-shrink-0">🚆</span>
            <p className="text-[13px] text-white/80 leading-[1.4]">
              마지막 귀가 지하철{" "}
              <span className="text-brown-200 font-bold">22:30</span>. 지금 출발하면 여유롭게 즐기고 돌아올 수 있어요.
            </p>
          </div>

          {/* 추천 동선 */}
          {courseSteps && courseSteps.length > 0 && (
            <>
              <h3 className="text-[15px] font-bold text-brown-900 mb-3" style={{ letterSpacing: "-0.01em" }}>
                추천 동선
              </h3>
              <div className="flex flex-col gap-2 mb-5">
                {courseSteps.map((step, i) => (
                  <div key={i} className="bg-cream-50 rounded-xl px-3.5 py-3 flex items-center gap-3 shadow-light">
                    <div className="w-6 h-6 rounded-full bg-brown-700 text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0">
                      {step.order}
                    </div>
                    <div className="flex-1">
                      <div className="text-[13.5px] font-semibold text-brown-900">{step.name}</div>
                      <div className="text-[11.5px] text-brown-500 mt-0.5">{step.location}</div>
                    </div>
                    {step.duration && (
                      <span className="text-[12px] text-brown-700 font-semibold whitespace-nowrap">{step.duration}</span>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="h-3" />
        </div>
      </div>

      {/* 바텀 CTA */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-cream-50 border-t border-brown-200 px-5 flex items-center gap-2.5">
        <button
          onClick={handleSave}
          className={`w-[50px] h-[50px] rounded-[14px] flex items-center justify-center text-[22px] transition-all ${
            saved ? "bg-brown-700/10 border border-brown-700/30" : "bg-brown-100"
          }`}
        >
          {saved ? "❤️" : "🤍"}
        </button>
        <button
          onClick={() => router.push("/course")}
          className="flex-1 h-[50px] bg-brown-700 text-cream-50 rounded-[14px] text-[16px] font-bold shadow-btn btn-press"
        >
          여행 코스 보기 →
        </button>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { StatusBar } from "@/shared/ui/StatusBar";
import { HomeBar } from "@/shared/ui/HomeBar";

interface CurationResult {
  main?: {
    name: string;
    location: string;
    aiStory?: string;
    estimatedCost?: string;
    transitInfo?: string;
    estimatedTime?: string;
  };
  context?: {
    weather?: string;
    sunsetRemaining?: string;
    sunsetTime?: string;
  };
}

const MountainSVG = () => (
  <svg
    className="absolute bottom-0 left-0 right-0 w-full"
    viewBox="0 0 350 60"
    preserveAspectRatio="none"
  >
    <path
      d="M0,60 L0,35 L60,22 L110,32 L150,12 L190,25 L230,8 L270,20 L350,15 L350,60 Z"
      fill="rgba(13,27,62,.7)"
    />
  </svg>
);

export default function SharePage() {
  const router = useRouter();
  const [data, setData] = useState<CurationResult | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("curation");
      if (raw) setData(JSON.parse(raw));
    } catch {}
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
      setTimeout(() => setToast(null), 300);
    }, 2200);
  };

  const handleShare = (channel: string) => {
    showToast(`${channel}으로 공유 완료!`);
  };

  const handleCopyLink = () => {
    try {
      navigator.clipboard.writeText("https://tteonal.app/r/share");
    } catch {}
    showToast("링크 복사 완료!");
  };

  const main = data?.main;
  const ctx = data?.context;

  const now = new Date();
  const dateStr = now.toLocaleDateString("ko-KR", {
    year: "numeric", month: "2-digit", day: "2-digit", weekday: "short",
  });

  const pills = [
    main?.estimatedCost && `💰 ${main.estimatedCost}`,
    main?.transitInfo && `🚇 ${main.transitInfo}`,
    ctx?.sunsetTime && `🌇 석양 ${ctx.sunsetTime}`,
    "당일치기",
  ].filter(Boolean) as string[];

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
        <span className="text-[18px] font-extrabold text-brown-900 flex-1" style={{ letterSpacing: "-0.02em" }}>
          결과 공유하기
        </span>
      </div>

      {/* 스크롤 영역 */}
      <div className="flex-1 overflow-y-auto px-5 pb-6">
        {/* 카드 미리보기 */}
        <div
          className="rounded-[22px] overflow-hidden mb-5"
          style={{ background: "#70502E", boxShadow: "0 12px 40px rgba(6,9,26,.3)" }}
        >
          {/* 히어로 */}
          <div
            className="h-[150px] relative flex items-end p-3.5"
            style={{ background: "linear-gradient(160deg,#5C3D1E 0%,#7A5434 40%,#907857 100%)" }}
          >
            <MountainSVG />
            <div
              className="absolute top-3.5 left-4 text-[10px] tracking-[0.12em]"
              style={{ color: "rgba(255,255,255,.5)" }}
            >
              떠날이유 · AI 관광 큐레이션
            </div>
            <div className="relative z-10 text-[22px] font-extrabold text-white" style={{ letterSpacing: "-0.025em" }}>
              {main?.name ?? "추천 여행지"}
            </div>
          </div>

          {/* 카드 본문 */}
          <div className="p-4">
            {/* 석양 진행 바 */}
            <div
              className="h-[3px] rounded-sm mb-3.5"
              style={{ background: "linear-gradient(90deg,#CFC7A8,#907857,rgba(255,255,255,.2))" }}
            />

            <p className="text-[13px] leading-[1.6] mb-3.5" style={{ color: "rgba(255,255,255,.75)" }}>
              {main?.aiStory ?? "지금 이 순간 날씨와 시간에 딱 맞는 여행지예요."}{" "}
              {ctx?.weather && (
                <span style={{ color: "#CFC7A8", fontWeight: 600 }}>
                  {ctx.weather}{ctx.sunsetRemaining ? ` · 석양까지 ${ctx.sunsetRemaining}` : ""}
                </span>
              )}
            </p>

            {/* 태그 pill */}
            <div className="flex flex-wrap gap-2 mb-3.5">
              {pills.map((p) => (
                <span
                  key={p}
                  className="flex items-center gap-1.5 rounded-[10px] px-2.5 py-[5px] text-[12px]"
                  style={{ background: "rgba(255,255,255,.08)", color: "rgba(255,255,255,.7)" }}
                >
                  {p}
                </span>
              ))}
            </div>

            {/* 카드 푸터 */}
            <div
              className="flex justify-between items-center pt-3"
              style={{ borderTop: "1px solid rgba(255,255,255,.08)" }}
            >
              <span className="text-[11px]" style={{ color: "rgba(255,255,255,.35)" }}>
                {dateStr}
              </span>
              <span className="text-[11px] font-semibold tracking-[0.04em]" style={{ color: "#CFC7A8" }}>
                tteonal.app
              </span>
            </div>
          </div>
        </div>

        <p className="text-[12.5px] text-brown-500 text-center mb-5">
          위 카드가 공유됩니다. 친구에게 여행 이유를 전해보세요!
        </p>

        {/* 공유 채널 */}
        <div className="text-[14px] font-bold text-brown-900 mb-3">공유 채널 선택</div>
        <div className="grid grid-cols-2 gap-2.5 mb-5">
          <button
            onClick={() => handleShare("카카오톡")}
            className="bg-cream-50 border border-brown-200 rounded-2xl p-3.5 flex items-center gap-2.5 card-press text-left"
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-[18px] flex-shrink-0" style={{ background: "#FEE500" }}>
              💬
            </div>
            <div>
              <div className="text-[13.5px] font-semibold text-brown-900">카카오톡</div>
              <div className="text-[11px] text-brown-500 mt-0.5">친구에게 보내기</div>
            </div>
          </button>

          <button
            onClick={() => handleShare("인스타그램")}
            className="bg-cream-50 border border-brown-200 rounded-2xl p-3.5 flex items-center gap-2.5 card-press text-left"
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-[18px] flex-shrink-0"
              style={{ background: "linear-gradient(45deg,#F09433,#E6683C,#DC2743,#CC2366,#BC1888)" }}
            >
              📷
            </div>
            <div>
              <div className="text-[13.5px] font-semibold text-brown-900">인스타그램</div>
              <div className="text-[11px] text-brown-500 mt-0.5">스토리·피드 공유</div>
            </div>
          </button>

          <button
            onClick={handleCopyLink}
            className="bg-cream-50 border border-brown-200 rounded-2xl p-3.5 flex items-center gap-2.5 card-press text-left"
          >
            <div className="w-9 h-9 rounded-xl bg-brown-100 flex items-center justify-center text-[18px] flex-shrink-0">
              🔗
            </div>
            <div>
              <div className="text-[13.5px] font-semibold text-brown-900">링크 복사</div>
              <div className="text-[11px] text-brown-500 mt-0.5">URL 클립보드</div>
            </div>
          </button>

          <button
            onClick={() => handleShare("이미지 저장")}
            className="bg-cream-50 border border-brown-200 rounded-2xl p-3.5 flex items-center gap-2.5 card-press text-left"
          >
            <div className="w-9 h-9 rounded-xl bg-brown-100 flex items-center justify-center text-[18px] flex-shrink-0">
              ⬇️
            </div>
            <div>
              <div className="text-[13.5px] font-semibold text-brown-900">이미지 저장</div>
              <div className="text-[11px] text-brown-500 mt-0.5">카메라 롤에 저장</div>
            </div>
          </button>
        </div>

        <div className="h-px bg-brown-200 mb-5" />

        {/* 다시 시작 */}
        <button
          onClick={() => router.push("/preferences")}
          className="w-full bg-cream-50 border border-brown-200 rounded-2xl p-4 text-center card-press"
        >
          <div className="text-[28px] mb-2">✨</div>
          <div className="text-[14px] font-bold text-brown-900 mb-0.5">다른 여행지도 찾아볼까요?</div>
          <div className="text-[12px] text-brown-500">AI와 다시 대화하기</div>
        </button>
      </div>

      <HomeBar />

      {/* 토스트 */}
      {toast && (
        <div
          className="fixed left-1/2 z-50 bg-brown-700 text-white px-5 py-2.5 rounded-full text-[13px] font-medium whitespace-nowrap transition-all duration-300"
          style={{
            bottom: 40,
            transform: `translateX(-50%) translateY(${toastVisible ? "0" : "20px"})`,
            opacity: toastVisible ? 1 : 0,
          }}
        >
          {toast}
        </div>
      )}
    </div>
  );
}

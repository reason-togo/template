"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { StatusBar } from "@/shared/ui/StatusBar";
import { HomeBar } from "@/shared/ui/HomeBar";

interface Step {
  icon: string;
  label: string;
  note: string;
  doneLabel: string;
  delay: number;
  doneAt: number;
  progress: number;
}

const STEPS: Step[] = [
  { icon: "🌤️", label: "날씨 정보 불러오는 중", note: "기상청 API 연동", doneLabel: "날씨 분석 완료", delay: 400, doneAt: 1400, progress: 25 },
  { icon: "📍", label: "현재 위치 확인", note: "TourAPI 지역 매핑", doneLabel: "지역 매핑 완료", delay: 1600, doneAt: 2800, progress: 50 },
  { icon: "🌇", label: "일몰 시간 계산", note: "Sunrise-Sunset API", doneLabel: "일몰 시간 확인 완료", delay: 3000, doneAt: 4000, progress: 75 },
  { icon: "🤖", label: "맞춤 코스 생성 중", note: "LaaS AI 감성 스토리 생성", doneLabel: "코스 생성 완료", delay: 4200, doneAt: 6000, progress: 100 },
];

type StepState = "pending" | "active" | "done";

export default function AnalyzePage() {
  const router = useRouter();
  const [stepStates, setStepStates] = useState<StepState[]>(["pending", "pending", "pending", "pending"]);
  const [stepLabels, setStepLabels] = useState(STEPS.map((s) => s.label));
  const [visibleSteps, setVisibleSteps] = useState([false, false, false, false]);
  const [progress, setProgress] = useState(0);
  const [progPct, setProgPct] = useState("0%");
  // LaaS 사용 모드: null=로딩 중, "laas"=AI 큐레이션 성공, "fallback"=규칙 기반 사용
  const [curatMode, setCurateMode] = useState<"laas" | "fallback" | null>(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    STEPS.forEach((s, i) => {
      setTimeout(() => {
        setVisibleSteps((prev) => { const n = [...prev]; n[i] = true; return n; });
        setStepStates((prev) => { const n = [...prev]; n[i] = "active"; return n; });
      }, s.delay);

      setTimeout(() => {
        setStepStates((prev) => { const n = [...prev]; n[i] = "done"; return n; });
        setStepLabels((prev) => { const n = [...prev]; n[i] = s.doneLabel; return n; });
        setProgress(s.progress);
        setProgPct(`${s.progress}%`);
      }, s.doneAt);
    });

    // 취향 데이터 sessionStorage에서 로드
    const prefs = (() => {
      try { return JSON.parse(sessionStorage.getItem("preferences") ?? "{}"); } catch { return {}; }
    })();

    // POST /api/curate 호출 공통 처리
    // _mode 플래그로 LaaS AI 큐레이션 vs 규칙 기반 폴백 여부를 UI에 표시합니다.
    const callCurate = async (lat: number, lng: number) => {
      try {
        const res = await fetch("/api/curate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ preferences: prefs.answers ?? {}, lat, lng }),
        });
        if (res.ok) {
          const data = await res.json();
          sessionStorage.setItem("curation", JSON.stringify(data));
          // LaaS 사용 여부를 상태에 반영 — 화면에 알림 배너 표시
          setCurateMode(data._mode === "laas" ? "laas" : "fallback");
        } else {
          // API 오류 응답 — 폴백 모드로 표시
          setCurateMode("fallback");
        }
      } catch (e) {
        console.error("[Analyze] /api/curate 호출 실패:", e);
        setCurateMode("fallback");
      }
    };

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        await callCurate(lat, lng);
        setTimeout(() => router.push("/recommendations"), 6600);
      },
      async () => {
        // 위치 권한 거부 시 서울 시청 좌표(37.5665, 126.978)를 기본값으로 사용
        await callCurate(37.5665, 126.978);
        setTimeout(() => router.push("/recommendations"), 6600);
      },
      { timeout: 5000 }
    );
  }, [router]);

  return (
    <div className="screen bg-app-bg flex flex-col">
      <StatusBar />

      <div className="flex-1 flex flex-col items-center justify-center px-8 py-10 gap-0">
        {/* 3중 회전 링 */}
        <div className="relative w-[140px] h-[140px] mb-10 flex-shrink-0">
          {/* 외부 링 */}
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-brown-700 border-r-brown-700/20 animate-spin-ring" />
          {/* 중간 링 */}
          <div className="absolute inset-[14px] rounded-full border-2 border-transparent border-t-brown-500/80 border-l-brown-500/20 animate-spin-ring-slow" />
          {/* 내부 링 */}
          <div className="absolute inset-[28px] rounded-full border-2 border-transparent border-t-brown-700/30 animate-spin-ring-slower" />
          {/* 중앙 */}
          <div className="absolute inset-[42px] rounded-full bg-brown-700/10 flex items-center justify-center text-[26px]">
            🗺️
          </div>
        </div>

        <h2
          className="text-[22px] font-bold text-brown-900 text-center mb-2"
          style={{ letterSpacing: "-0.02em" }}
        >
          AI가 분석 중이에요
        </h2>
        <p className="text-[13.5px] text-brown-500 text-center mb-10 leading-[1.6]">
          지금 이 순간의 날씨·위치·시간을
          <br />
          실시간으로 분석해 최적의 여행지를 찾고 있어요
        </p>

        {/* LaaS 모드 알림 배너 — API 호출 완료 후 표시 */}
        {curatMode && (
          <div
            className={`w-full mb-6 rounded-[14px] px-4 py-3 flex items-center gap-2.5 transition-all duration-500 ${
              curatMode === "laas"
                ? "bg-brown-700/10 border border-brown-700/30"
                : "bg-brown-100 border border-brown-200"
            }`}
          >
            <span className="text-xl flex-shrink-0">
              {curatMode === "laas" ? "✨" : "ℹ️"}
            </span>
            <div>
              <div className={`text-[13px] font-semibold ${curatMode === "laas" ? "text-brown-700" : "text-brown-900"}`}>
                {curatMode === "laas"
                  ? "LaaS AI 큐레이션 완료"
                  : "기본 추천 모드로 실행 중"}
              </div>
              <div className="text-[11.5px] text-brown-500 mt-0.5">
                {curatMode === "laas"
                  ? "취향·날씨·시간을 반영한 AI 감성 스토리가 준비됐어요"
                  : "LaaS API 키 미설정 — TourAPI 기반 추천 결과를 제공합니다"}
              </div>
            </div>
          </div>
        )}

        {/* 단계 목록 */}
        <div className="w-full flex flex-col gap-3.5">
          {STEPS.map((s, i) => (
            <div
              key={i}
              className={`flex items-center gap-3.5 transition-all duration-500 ${visibleSteps[i] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-[15px] transition-all ${
                  stepStates[i] === "active"
                    ? "bg-brown-700/12 border border-brown-700/30 animate-pulse-icon"
                    : stepStates[i] === "done"
                    ? "bg-brown-500/15 border border-brown-500/40"
                    : "bg-brown-100 border border-brown-200"
                }`}
              >
                {s.icon}
              </div>
              <div className="flex flex-col gap-0.5 flex-1">
                <span
                  className={`text-[14.5px] font-medium transition-colors ${stepStates[i] === "done" ? "text-brown-500" : "text-brown-900"}`}
                >
                  {stepLabels[i]}
                </span>
                <span className="text-[11.5px] text-brown-400">{s.note}</span>
              </div>
              {stepStates[i] === "done" && <span className="text-base ml-auto">✅</span>}
            </div>
          ))}
        </div>

        {/* 진행 바 */}
        <div className="w-full mt-9">
          <div className="flex justify-between mb-2">
            <span className="text-[11px] text-brown-500 tracking-[0.06em]">분석 진행률</span>
            <span className="text-[11px] text-brown-500 tracking-[0.06em]">{progPct}</span>
          </div>
          <div className="h-1 bg-brown-200 rounded-sm overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brown-500 to-brown-700 rounded-sm transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <HomeBar />
    </div>
  );
}

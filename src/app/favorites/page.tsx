"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { StatusBar } from "@/shared/ui/StatusBar";
import { BottomNavigation } from "@/shared/ui/BottomNavigation";

interface FavoriteItem {
  id: string;
  name: string;
  location: string;
  savedAt: string;
  tags?: string[];
}

const GRADIENT_BGS = [
  "linear-gradient(160deg,#5C3D1E,#907857)",
  "linear-gradient(160deg,#8B7355,#70502E)",
  "linear-gradient(160deg,#907857,#6B4F2C)",
  "linear-gradient(160deg,#7A6A4A,#907857)",
  "linear-gradient(160deg,#70502E,#AF9F7F)",
];

const FILTERS = ["전체", "산책", "문화유산", "무료·저렴", "당일치기"];

function formatSavedDate(iso: string): string {
  try {
    const saved = new Date(iso);
    const now = new Date();
    const diffMs = now.getTime() - saved.getTime();
    const diffDays = Math.floor(diffMs / 86400000);
    if (diffDays === 0) return "오늘 저장";
    if (diffDays < 7) return `${diffDays}일 전 저장`;
    if (diffDays < 14) return "1주 전 저장";
    return `${Math.floor(diffDays / 7)}주 전 저장`;
  } catch {
    return "저장됨";
  }
}

export default function FavoritesPage() {
  const router = useRouter();
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [activeFilter, setActiveFilter] = useState("전체");

  useEffect(() => {
    try {
      const arr = JSON.parse(localStorage.getItem("favorites") ?? "[]");
      setFavorites(arr);
    } catch {}
  }, []);

  const handleUnsave = (id: string) => {
    setFavorites((prev) => {
      const next = prev.filter((f) => f.id !== id);
      try {
        localStorage.setItem("favorites", JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const displayed = favorites;

  return (
    <div className="screen bg-app-bg flex flex-col">
      <StatusBar />

      {/* 헤더 */}
      <div className="px-5 mb-3.5 flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-[22px] font-extrabold text-brown-900" style={{ letterSpacing: "-0.025em" }}>
            찜한 여행지
          </h1>
          <span className="text-[13px] text-brown-500">{favorites.length}곳</span>
        </div>

        {/* 필터 칩 */}
        <div className="flex gap-2 overflow-x-auto pb-px">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`flex-shrink-0 rounded-2xl px-3.5 py-1.5 text-[12.5px] border transition-all duration-150 whitespace-nowrap select-none ${
                activeFilter === f
                  ? "bg-brown-900 border-brown-900 text-white font-semibold"
                  : "bg-cream-50 border-brown-200 text-brown-500"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* 카드 목록 */}
      <div className="flex-1 overflow-y-auto px-5 pb-[90px] flex flex-col gap-3">
        {displayed.length > 0 ? (
          displayed.map((item, i) => (
            <div
              key={item.id}
              className="bg-cream-50 rounded-[18px] overflow-hidden shadow-card flex card-press cursor-pointer"
              onClick={() => router.push(`/place/${item.id}`)}
            >
              {/* 이미지 영역 */}
              <div
                className="w-[110px] flex-shrink-0 min-h-[100px]"
                style={{ background: GRADIENT_BGS[i % GRADIENT_BGS.length] }}
              />

              {/* 본문 */}
              <div className="flex-1 p-3.5">
                <div className="text-[15px] font-bold text-brown-900 mb-0.5" style={{ letterSpacing: "-0.01em" }}>
                  {item.name}
                </div>
                <div className="text-[12px] text-brown-500 mb-2">📍 {item.location}</div>

                {/* 태그 */}
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-2.5">
                    {item.tags.map((t) => (
                      <span
                        key={t}
                        className={`text-[10.5px] px-2 py-0.5 rounded-md ${
                          t === "무료"
                            ? "bg-brown-700/10 text-brown-700"
                            : "bg-brown-100 text-brown-500"
                        }`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {/* 푸터 */}
                <div className="flex items-center justify-between">
                  <span className="text-[10.5px] text-brown-400">{formatSavedDate(item.savedAt)}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUnsave(item.id);
                    }}
                    className="text-[18px] p-1 leading-none"
                  >
                    ❤️
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          /* 빈 상태 */
          <div className="flex flex-col items-center justify-center flex-1 gap-3.5 text-center py-16">
            <div className="text-[52px] opacity-60">🤍</div>
            <div>
              <div className="text-[18px] font-bold text-brown-900 mb-1">아직 찜한 여행지가 없어요</div>
              <p className="text-[13.5px] text-brown-500 leading-[1.6]">
                마음에 드는 여행지를 발견하면
                <br />
                하트를 눌러 저장해 보세요
              </p>
            </div>
            <button
              onClick={() => router.push("/recommendations")}
              className="mt-2 bg-brown-700 text-cream-50 rounded-[14px] px-6 py-3 text-[15px] font-bold btn-press"
            >
              AI 추천 받기
            </button>
          </div>
        )}

        <div className="h-2" />
      </div>

      <BottomNavigation active="favorites" />
    </div>
  );
}

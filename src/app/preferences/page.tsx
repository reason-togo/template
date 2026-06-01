"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { StatusBar } from "@/shared/ui/StatusBar";
import { HomeBar } from "@/shared/ui/HomeBar";

interface Message {
  id: number;
  type: "ai" | "user";
  text: string;
}

interface FlowStep {
  ai: string | ((answer: string) => string);
  chips: string[];
  multi?: boolean;
  confirm?: string;
}

const FLOW: FlowStep[] = [
  {
    ai: "안녕하세요 😊 오늘 기분이 어떠세요?",
    chips: ["좋아요 😊", "평범해요 😑", "우울해요 😔", "설레요 ✨"],
  },
  {
    ai: (ans) =>
      `${ans.includes("우울") || ans.includes("평범") ? "그런 날이군요." : "좋은 날이네요!"} 혼자 조용히 있고 싶으세요, 아니면 사람들 사이에서 기운을 낼까요?`,
    chips: ["혼자 조용히 🚶", "사람들 사이에서 🌟"],
  },
  {
    ai: "걷고 싶으세요, 아니면 앉아서 느긋하게 쉬고 싶으세요?",
    chips: ["걷고 싶어요 👟", "앉아서 쉬고 싶어요 🪑"],
  },
  {
    ai: "오늘 시간이 얼마나 있으세요?",
    chips: ["3~4시간", "반나절 (6시간)", "하루종일"],
  },
  {
    ai: "마지막으로 — 피하고 싶은 것들을 선택해주세요. (복수 선택 가능)",
    chips: ["사람 많은 곳", "비싼 입장료", "SNS 감성 장소", "긴 도보 코스", "없어요"],
    multi: true,
    confirm: "선택 완료 →",
  },
];

export default function PreferencesPage() {
  const router = useRouter();
  const msgsRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chips, setChips] = useState<string[]>([]);
  const [isMulti, setIsMulti] = useState(false);
  const [selectedMulti, setSelectedMulti] = useState<string[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [step, setStep] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const msgIdRef = useRef(0);
  const lastAnswerRef = useRef("");

  const addMsg = (type: "ai" | "user", text: string) => {
    const id = ++msgIdRef.current;
    setMessages((prev) => [...prev, { id, type, text }]);
    return id;
  };

  const showStep = (s: number, answer: string) => {
    if (s >= FLOW.length) return;
    const conf = FLOW[s];
    const aiText = typeof conf.ai === "function" ? conf.ai(answer) : conf.ai;

    setIsTyping(true);
    setChips([]);
    setIsMulti(false);
    setSelectedMulti([]);
    setShowConfirm(false);

    setTimeout(() => {
      setIsTyping(false);
      addMsg("ai", aiText);
      setChips(conf.chips);
      setIsMulti(!!conf.multi);
      setShowConfirm(!!conf.multi);
      setStep(s);
    }, 1100);
  };

  useEffect(() => {
    const timer = setTimeout(() => showStep(0, ""), 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = msgsRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, isTyping]);

  const handleChipClick = (chip: string, s: number) => {
    if (isMulti) {
      if (chip === "없어요") {
        setSelectedMulti((prev) =>
          prev.includes("없어요") ? [] : ["없어요"]
        );
      } else {
        setSelectedMulti((prev) => {
          const without = prev.filter((c) => c !== "없어요");
          return without.includes(chip)
            ? without.filter((c) => c !== chip)
            : [...without, chip];
        });
      }
    } else {
      handleAnswer(chip, s);
    }
  };

  const handleAnswer = (answer: string, s: number) => {
    lastAnswerRef.current = answer;
    setChips([]);
    setShowConfirm(false);
    setSelectedMulti([]);
    addMsg("user", answer);

    const nextStep = s + 1;
    if (nextStep >= FLOW.length) {
      // 모든 단계 완료
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addMsg("ai", "알겠습니다! 지금 날씨와 시간을 분석해서 딱 맞는 여행지를 찾고 있어요 ✨");
        // 취향 데이터 저장
        sessionStorage.setItem("preferences", JSON.stringify({ answers: gatherAnswers(answer) }));
        setTimeout(() => router.push("/analyze"), 1800);
      }, 1200);
    } else {
      showStep(nextStep, answer);
    }
  };

  const gatherAnswers = (lastAnswer: string) => ({
    mood: messages.find((m, i) => m.type === "user" && i === 0)?.text ?? "",
    style: messages.find((m, i) => m.type === "user" && i === 1)?.text ?? "",
    activity: messages.find((m, i) => m.type === "user" && i === 2)?.text ?? "",
    duration: messages.find((m, i) => m.type === "user" && i === 3)?.text ?? "",
    avoidances: lastAnswer,
  });

  const handleConfirm = () => {
    const answer = selectedMulti.length > 0 ? selectedMulti.join(", ") : "없어요";
    handleAnswer(answer, step);
  };

  const activeDot = Math.min(step, FLOW.length - 1);

  return (
    <div className="screen bg-app-bg flex flex-col">
      <StatusBar />

      {/* 헤더 */}
      <div className="flex items-center px-5 py-0 h-14 border-b border-brown-200 gap-3 flex-shrink-0">
        <button
          onClick={() => router.push("/")}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-brown-100 border border-brown-200 flex-shrink-0"
          aria-label="뒤로"
        >
          <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
            <path d="M8.5 1L1.5 8L8.5 15" stroke="#3A2410" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex-1 min-w-0">
          <div className="text-[16px] font-semibold text-brown-900">떠날이유 AI</div>
          <div className="text-[11px] text-brown-500 mt-px truncate">
            취향을 분석하고 있어요
          </div>
        </div>
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brown-700 to-brown-500 flex items-center justify-center text-base flex-shrink-0">
          ✨
        </div>
      </div>

      {/* 진행 도트 */}
      <div className="flex justify-center gap-1.5 pt-2.5 pb-0 flex-shrink-0">
        {FLOW.map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
              i < activeDot
                ? "bg-brown-700"
                : i === activeDot
                ? "bg-brown-900"
                : "bg-brown-200"
            }`}
          />
        ))}
      </div>

      {/* 메시지 영역 */}
      <div
        ref={msgsRef}
        className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-4 min-h-0"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2.5 items-end animate-fade-up ${msg.type === "user" ? "flex-row-reverse" : ""}`}
          >
            {msg.type === "ai" && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brown-700 to-brown-500 flex items-center justify-center text-sm flex-shrink-0">
                ✨
              </div>
            )}
            <div
              className={`max-w-[260px] px-4 py-3 text-[15px] leading-[1.5] ${
                msg.type === "ai"
                  ? "bg-cream-50 text-brown-900 border border-brown-200 rounded-[4px_18px_18px_18px]"
                  : "bg-brown-700 text-white font-medium rounded-[18px_4px_18px_18px]"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {/* 타이핑 인디케이터 */}
        {isTyping && (
          <div className="flex gap-2.5 items-end animate-fade-up">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brown-700 to-brown-500 flex items-center justify-center text-sm flex-shrink-0">
              ✨
            </div>
            <div className="flex items-center gap-1.5 px-4 py-3.5 bg-cream-50 border border-brown-200 rounded-[4px_18px_18px_18px]">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-[7px] h-[7px] rounded-full bg-brown-500 animate-bounce-dot"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 빠른 응답 칩 */}
      {chips.length > 0 && (
        <div className="px-5 py-3.5 flex flex-wrap gap-2 flex-shrink-0">
          {chips.map((chip) => (
            <button
              key={chip}
              onClick={() => handleChipClick(chip, step)}
              className={`px-4 py-2 rounded-2xl text-[13.5px] transition-all duration-150 whitespace-nowrap select-none ${
                isMulti
                  ? selectedMulti.includes(chip)
                    ? "bg-brown-500/20 border border-brown-500 text-brown-700 font-semibold"
                    : "bg-cream-50 border border-brown-200 text-brown-500"
                  : "bg-cream-50 border border-brown-200 text-brown-900 active:bg-brown-700 active:border-brown-700 active:text-white active:font-semibold"
              }`}
            >
              {chip}
            </button>
          ))}
          {showConfirm && (
            <button
              onClick={handleConfirm}
              className="w-full mt-1 bg-brown-700 text-cream-50 rounded-2xl py-2 text-[13.5px] font-semibold"
            >
              선택 완료 →
            </button>
          )}
        </div>
      )}

      {/* 입력창 */}
      <div className="flex items-center gap-2.5 px-4 h-[60px] border-t border-brown-200 flex-shrink-0">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="직접 입력하기..."
          className="flex-1 h-10 bg-cream-50 border border-brown-200 rounded-2xl px-4 text-[14px] text-brown-900 placeholder:text-brown-400 outline-none font-sans"
        />
        <button
          onClick={() => {
            if (inputValue.trim()) {
              handleAnswer(inputValue.trim(), step);
              setInputValue("");
            }
          }}
          disabled={!inputValue.trim()}
          className={`w-10 h-10 rounded-full bg-brown-700 flex items-center justify-center transition-opacity flex-shrink-0 ${inputValue.trim() ? "opacity-100" : "opacity-40"}`}
          aria-label="전송"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 13L13 7L1 1V5.5L9 7L1 8.5V13Z" fill="white" />
          </svg>
        </button>
      </div>

      <HomeBar />
    </div>
  );
}

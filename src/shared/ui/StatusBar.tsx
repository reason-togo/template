"use client";

import { useEffect, useState } from "react";

interface StatusBarProps {
  dark?: boolean;
}

export const StatusBar = ({ dark = false }: StatusBarProps) => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit", hour12: false }));
    };
    update();
    const id = setInterval(update, 10000);
    return () => clearInterval(id);
  }, []);

  const color = dark ? "text-white/90" : "text-brown-900/85";
  const fill = dark ? "white" : "#3A2410";

  return (
    <div className={`flex items-end justify-between h-[54px] px-6 pb-2.5 ${color}`}>
      <span className="text-[15px] font-semibold tracking-[0.01em]">{time}</span>
      <div className="flex items-center gap-1.5">
        {/* Signal */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
          <rect x="0" y="8" width="3" height="4" rx="0.5" fill={fill} fillOpacity="0.4" />
          <rect x="4.5" y="5" width="3" height="7" rx="0.5" fill={fill} fillOpacity="0.6" />
          <rect x="9" y="2" width="3" height="10" rx="0.5" fill={fill} fillOpacity="0.8" />
          <rect x="13.5" y="0" width="3" height="12" rx="0.5" fill={fill} />
        </svg>
        {/* WiFi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M8 9.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" fill={fill} />
          <path d="M3.2 6.4A6.6 6.6 0 0 1 8 4.3c1.8 0 3.5.7 4.8 2.1" stroke={fill} strokeWidth="1.4" strokeLinecap="round" fillOpacity="0" />
          <path d="M0.5 3.5A10.5 10.5 0 0 1 8 .5c2.9 0 5.5 1.1 7.5 3" stroke={fill} strokeWidth="1.4" strokeLinecap="round" fillOpacity="0" strokeOpacity="0.5" />
        </svg>
        {/* Battery */}
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke={fill} strokeOpacity="0.35" />
          <rect x="2" y="2" width="16" height="8" rx="2" fill={fill} />
          <path d="M23 4v4a2 2 0 0 0 0-4Z" fill={fill} fillOpacity="0.4" />
        </svg>
      </div>
    </div>
  );
};

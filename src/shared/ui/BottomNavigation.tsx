"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/lib/utils";

const NAV_ITEMS = [
  { label: "홈", icon: "🏠", href: "/" },
  { label: "추천", icon: "✨", href: "/recommendations" },
  { label: "찜", icon: "❤️", href: "/favorites" },
  { label: "내정보", icon: "👤", href: "/profile" },
] as const;

interface BottomNavigationProps {
  active?: "home" | "recommendations" | "favorites" | "profile";
}

export const BottomNavigation = ({ active }: BottomNavigationProps) => {
  const pathname = usePathname();

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[82px] bg-cream-50 border-t border-brown-200">
      <div className="flex items-start justify-around pt-3 px-4">
        {NAV_ITEMS.map((item) => {
          const isActive = active
            ? item.href === `/${active === "home" ? "" : active}`.replace("//", "/")
            : pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors",
                isActive ? "text-brown-700" : "text-brown-400"
              )}
            >
              <span className="text-xl leading-none">{item.icon}</span>
              <span
                className={cn(
                  "text-[11px]",
                  isActive ? "font-bold" : "font-normal"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

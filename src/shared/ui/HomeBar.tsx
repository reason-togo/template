import { cn } from "@/shared/lib/utils";

interface HomeBarProps {
  dark?: boolean;
  className?: string;
}

export const HomeBar = ({ dark = false, className }: HomeBarProps) => {
  return (
    <div className={cn("flex items-end justify-center h-[34px] pb-2", className)}>
      <div
        className={cn(
          "w-32 h-1 rounded-full",
          dark ? "bg-white/30" : "bg-brown-900/20"
        )}
      />
    </div>
  );
};

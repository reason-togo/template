import { Logo } from '@/shared/ui/Logo';
import { Button } from '@/shared/ui/button';
import Link from 'next/link';

interface LandingHeroProps {
  className?: string;
}

export const LandingHero = ({ className }: LandingHeroProps) => {
  return (
    <div className={className}>
      <div className="max-w-[390px] mx-auto px-6 py-12 text-center space-y-8">
        {/* Logo */}
        <Logo size="lg" />

        {/* Hero Title */}
        <div className="space-y-3">
          <h1 className="text-4xl font-bold text-secondary leading-tight">
            광역시 말고,
            <br />
            소도시로
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            지금 바로 갈 수 있는
            <br />
            숨은 여행지를 찾아드려요
          </p>
        </div>

        {/* Hero Image (Gradient Placeholder) */}
        <div className="w-full h-72 rounded-2xl overflow-hidden bg-gradient-to-br from-primary-200 via-primary-300 to-primary-400 flex items-center justify-center shadow-lg">
          <span className="text-white/80 text-sm font-medium">
            여행의 시작
          </span>
        </div>

        {/* CTA Button */}
        <Button
          asChild
          size="lg"
          className="w-full bg-gradient-to-r from-primary-300 to-primary-400 hover:from-primary-400 hover:to-primary-500 text-white font-semibold shadow-md"
        >
          <Link href="/preferences">여행지 찾기</Link>
        </Button>

        {/* Caption */}
        <p className="text-sm text-muted-foreground">
          제주·부산 말고 새로운 곳을 찾는다면
        </p>
      </div>
    </div>
  );
};

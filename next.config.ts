import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 개발 환경 최적화
  reactStrictMode: false, // CPU 부하 감소를 위해 비활성화

  // 컴파일 최적화
  compiler: {
    removeConsole: false,
  },

  // TypeScript 설정
  typescript: {
    ignoreBuildErrors: false,
  },

  // 외부 이미지 도메인 허용
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "tong.visitkorea.or.kr",
        pathname: "/cms/resource/**",
      },
      {
        protocol: "https",
        hostname: "tong.visitkorea.or.kr",
        pathname: "/cms/resource/**",
      },
    ],
  },
};

export default nextConfig;

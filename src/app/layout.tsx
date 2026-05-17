import type { Metadata } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-dm-serif",
  subsets: ["latin"],
});

const pretendard = Inter({
  variable: "--font-pretendard",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "떠날이유 - 소도시 여행 큐레이션",
  description: "광역시 말고, 지금 바로 갈 수 있는 소도시 여행",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${dmSerif.variable} ${pretendard.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

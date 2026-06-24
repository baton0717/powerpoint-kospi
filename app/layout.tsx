import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "파워포인트코스피 - PowerPoint로 보는 주식 시세",
  description: "프레젠테이션 하는 척 실시간 주가 확인",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}

import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://jachwibox.vercel.app'
  ),
  title: {
    default: '첫 자취 필수템 체크리스트 | 자취박스',
    template: '%s | 자취박스',
  },
  description:
    '원룸 자취 시작할 때 사야 할 것, 방 유형별·계절별 자취 필수템을 한눈에 정리했어요.',
  keywords: [
    '자취 필수템',
    '원룸 자취 시작',
    '첫 자취 뭐 사야해',
    '자취 체크리스트',
    '원룸 필수품 리스트',
    '자취 비용 계산',
    '자취 준비물',
    '혼자 살기 필수품',
  ],
  icons: {
    icon: '/logo/favicon.svg',
    apple: '/logo/symbol-only.svg',
  },
  openGraph: {
    title: '자취박스 — 첫 자취 필수템 체크리스트',
    description: '원룸 자취 시작할 때 사야 할 것을 한눈에',
    siteName: '자취박스',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="bg-dark text-text-primary antialiased">
        <Header />
        <div className="pt-14">{children}</div>
      </body>
    </html>
  );
}

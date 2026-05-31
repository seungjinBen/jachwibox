import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '자취박스 — 첫 자취 필수템 체크리스트',
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
  openGraph: {
    title: '자취박스 — 첫 자취 필수템 체크리스트',
    description: '원룸 자취 시작할 때 사야 할 것을 한눈에',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="bg-dark text-text-primary antialiased">{children}</body>
    </html>
  );
}

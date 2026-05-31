import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '방 유형 선택',
};

export default function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

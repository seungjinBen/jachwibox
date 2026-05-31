import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '계절 가이드',
};

export default function SeasonalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

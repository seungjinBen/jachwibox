import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '체크리스트',
};

export default function ChecklistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

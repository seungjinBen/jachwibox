'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const NAV_ITEMS = [
  { emoji: '🏠', label: '홈', href: '/' },
  { emoji: '✅', label: '체크리스트', href: '/checklist' },
  { emoji: '🌿', label: '계절 가이드', href: '/seasonal' },
  { emoji: '✨', label: 'AI 추천', href: '/ai' },
] as const;

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      {/* backdrop */}
      <div
        className="fixed inset-0 z-40 transition-opacity duration-250"
        style={{
          backgroundColor: 'rgba(0,0,0,0.6)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
        }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* 슬라이드 패널 */}
      <nav
        className="fixed top-0 right-0 z-50 h-full w-70 bg-dark border-l border-border flex flex-col"
        style={{
          width: 280,
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.25s ease',
        }}
        aria-label="모바일 메뉴"
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <span className="text-sm font-semibold text-text-secondary">메뉴</span>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-text-muted hover:text-text-primary transition-colors rounded-lg hover:bg-surface2"
            aria-label="메뉴 닫기"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M2 2L14 14M14 2L2 14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* 메뉴 항목 */}
        <ul className="flex-1 py-4 px-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-green-dim text-green-light'
                      : 'text-text-secondary hover:bg-surface2 hover:text-text-primary'
                  }`}
                >
                  <span className="text-base w-5 text-center">{item.emoji}</span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

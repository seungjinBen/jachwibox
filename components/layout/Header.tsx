'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MobileMenu from './MobileMenu';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY < 10) {
        setVisible(true);
      } else if (currentY < lastScrollY.current) {
        setVisible(true);
      } else if (currentY > lastScrollY.current + 4) {
        setVisible(false);
        setMenuOpen(false);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-30 bg-dark/90 backdrop-blur-sm border-b border-border"
        style={{
          transform: visible ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.2s ease',
        }}
      >
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          {/* 로고 */}
          <Link href="/" className="flex items-center" aria-label="자취박스 홈">
            {/* 데스크탑: 풀 로고 */}
            <Image
              src="/logo/logo-dark-green.svg"
              alt="자취박스"
              width={160}
              height={48}
              priority
              className="hidden md:block"
            />
            {/* 모바일: 심볼만 */}
            <Image
              src="/logo/symbol-only.svg"
              alt="자취박스"
              width={40}
              height={40}
              priority
              className="block md:hidden"
            />
          </Link>

          {/* 햄버거 버튼 */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="w-9 h-9 flex flex-col items-center justify-center gap-1.5 text-text-muted hover:text-text-primary transition-colors rounded-lg hover:bg-surface2"
            aria-label="메뉴 열기"
            aria-expanded={menuOpen}
          >
            <span
              className="block w-5 h-0.5 bg-current rounded-full transition-all duration-200"
              style={
                menuOpen
                  ? { transform: 'translateY(8px) rotate(45deg)' }
                  : {}
              }
            />
            <span
              className="block w-5 h-0.5 bg-current rounded-full transition-all duration-200"
              style={menuOpen ? { opacity: 0 } : {}}
            />
            <span
              className="block w-5 h-0.5 bg-current rounded-full transition-all duration-200"
              style={
                menuOpen
                  ? { transform: 'translateY(-8px) rotate(-45deg)' }
                  : {}
              }
            />
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

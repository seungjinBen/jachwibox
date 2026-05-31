'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { IconArrowLeft, IconHome, IconLayoutColumns, IconBuilding } from '@tabler/icons-react';
import FloorPlan from '@/components/setup/FloorPlan';
import type { RoomType } from '@/types';

interface RoomOption {
  type: RoomType;
  label: string;
  sublabel: string;
  icon: ReactNode;
  description: string;
}

const ROOM_OPTIONS: RoomOption[] = [
  {
    type: 'open',
    label: '원룸 (오픈형)',
    sublabel: '주방·거실·침실이 한 공간',
    icon: <IconHome size={24} />,
    description: '원룸에서 주방, 거실, 침실이 분리 없이 연결된 구조',
  },
  {
    type: 'separated',
    label: '원룸 (분리형)',
    sublabel: '침실 또는 주방이 구분된 구조',
    icon: <IconLayoutColumns size={24} />,
    description: '원룸이지만 방이나 주방이 문 또는 벽으로 분리된 구조',
  },
  {
    type: 'two_room',
    label: '투룸 이상',
    sublabel: '방이 2개 이상인 구조',
    icon: <IconBuilding size={24} />,
    description: '방이 2개 이상이거나 거실이 별도로 있는 구조',
  },
];

export default function SetupPage() {
  const [selected, setSelected] = useState<RoomType | null>(null);

  return (
    <div className="min-h-screen bg-dark">
      {/* 헤더 */}
      <header className="sticky top-14 z-20 bg-dark/90 backdrop-blur-sm border-b border-border">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/" className="text-text-muted hover:text-text-primary transition-colors">
            <IconArrowLeft size={20} />
          </Link>
          <span className="text-sm font-medium text-text-secondary">방 유형 선택</span>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 pb-24">
        {/* 스텝 인디케이터 */}
        <div className="flex items-center gap-2 pt-6 pb-8">
          <div className="flex gap-1.5">
            <div className="w-6 h-1.5 rounded-full bg-green-primary" />
            <div className="w-6 h-1.5 rounded-full bg-border2" />
            <div className="w-6 h-1.5 rounded-full bg-border2" />
          </div>
          <span className="text-xs text-text-muted ml-1">1 / 3단계</span>
        </div>

        <h1 className="text-2xl font-bold text-text-primary mb-2">
          어떤 방에 살고 계세요?
        </h1>
        <p className="text-text-muted text-sm mb-8">
          방 구조에 따라 필요한 물건이 달라져요.
        </p>

        {/* 방 유형 카드 */}
        <div className="space-y-3 mb-8">
          {ROOM_OPTIONS.map((option) => (
            <button
              key={option.type}
              onClick={() => setSelected(option.type)}
              className={`w-full text-left bg-surface border rounded-2xl p-5 transition-all ${
                selected === option.type
                  ? 'border-green-primary bg-green-dim'
                  : 'border-border hover:border-border2'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                    selected === option.type
                      ? 'bg-green-primary text-white'
                      : 'bg-surface2 text-text-muted'
                  }`}
                >
                  {option.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-text-primary mb-0.5">{option.label}</p>
                  <p className="text-xs text-text-muted mb-3">{option.sublabel}</p>

                  {/* 평면도 SVG */}
                  {selected === option.type && (
                    <FloorPlan roomType={option.type} />
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* 하단 CTA */}
        <div className="fixed bottom-0 left-0 right-0 bg-dark/95 backdrop-blur-sm border-t border-border px-4 py-4">
          <div className="max-w-lg mx-auto">
            {selected ? (
              <Link
                href={`/checklist?room=${selected}`}
                className="block w-full bg-green-primary hover:bg-green-muted text-white font-semibold py-4 rounded-2xl text-center text-base transition-colors"
              >
                다음으로 →
              </Link>
            ) : (
              <button
                disabled
                className="w-full bg-border text-text-dim font-semibold py-4 rounded-2xl text-base cursor-not-allowed"
              >
                방 유형을 선택해주세요
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

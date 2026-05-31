'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IconHome, IconLayoutColumns, IconBuilding, IconArrowRight } from '@tabler/icons-react';
import type { ReactNode } from 'react';
import FloorPlan from '@/components/setup/FloorPlan';
import type { RoomType } from '@/types';

interface RoomOption {
  type: RoomType;
  label: string;
  sublabel: string;
  icon: ReactNode;
  badge?: string;
}

const ROOM_OPTIONS: RoomOption[] = [
  {
    type: 'open',
    label: '원룸 (오픈형)',
    sublabel: '주방·거실·침실이 한 공간',
    icon: <IconHome size={24} />,
    badge: '가장 많은 유형',
  },
  {
    type: 'separated',
    label: '원룸 (분리형)',
    sublabel: '침실 또는 주방이 구분된 구조',
    icon: <IconLayoutColumns size={24} />,
  },
  {
    type: 'two_room',
    label: '투룸 이상',
    sublabel: '방이 2개 이상인 구조',
    icon: <IconBuilding size={24} />,
  },
];

const HIDDEN_GEMS: Record<RoomType, { name: string; tip: string; zone: string }[]> = {
  open: [
    {
      name: '암막 커튼',
      tip: '원룸은 외부 빛이 직접 들어와 수면을 방해해요. 설치하면 숙면의 질이 확실히 달라져요.',
      zone: '거실 · 침실',
    },
    {
      name: '수납 선반',
      tip: '벽 공간을 활용하면 좁은 원룸을 두 배로 넓게 쓸 수 있어요. 원룸 생존 필수템이에요.',
      zone: '거실 · 침실',
    },
    {
      name: '다용도 청소 스프레이',
      tip: '주방·욕실·가구 모두 쓸 수 있어요. 자취 초반엔 이것 하나로 청소 아이템을 대신할 수 있어요.',
      zone: '주방',
    },
  ],
  separated: [
    {
      name: '샤워 커튼',
      tip: '분리된 욕실에서 물이 튀는 걸 막아줘요. 없으면 샤워 후 바닥 물청소를 매일 해야 해요.',
      zone: '욕실',
    },
    {
      name: '암막 커튼',
      tip: '침실이 분리된 만큼 빛 차단이 더 중요해요. 아침 햇빛에 깨지 않으려면 필수예요.',
      zone: '침실',
    },
    {
      name: '옷걸이 + 행거',
      tip: '분리형도 옷장이 작은 경우가 많아요. 행거 하나면 옷 정리가 훨씬 편해져요.',
      zone: '침실',
    },
  ],
  two_room: [
    {
      name: '무선 청소기',
      tip: '방이 여러 개면 선 있는 청소기는 이동이 불편해요. 가볍고 편한 무선형을 추천해요.',
      zone: '거실',
    },
    {
      name: '공기청정기',
      tip: '투룸은 방이 나뉘어 공기 순환이 어려워요. 거실에 한 대만 있어도 큰 차이가 나요.',
      zone: '거실',
    },
    {
      name: '방별 멀티탭',
      tip: '방마다 콘센트가 부족한 경우가 많아요. 방 2개면 멀티탭도 2개 챙기는 게 좋아요.',
      zone: '침실',
    },
  ],
};

export default function SetupPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<RoomType | null>(null);

  return (
    <div className="min-h-screen bg-dark">
      <main className="max-w-lg mx-auto px-4 pb-16">
        <div className="pt-10 pb-8">
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            어떤 방에 살고 계세요?
          </h1>
          <p className="text-text-muted text-sm">
            방 구조에 따라 필요한 물건이 달라져요. 선택하면 방 구조와 꿀팁을 보여드려요.
          </p>
        </div>

        {/* Room type cards */}
        <div className="space-y-3">
          {ROOM_OPTIONS.map((option) => {
            const isSelected = selected === option.type;
            return (
              <button
                key={option.type}
                type="button"
                onClick={() => setSelected(option.type)}
                className={`w-full text-left rounded-2xl p-5 transition-all border ${
                  isSelected
                    ? 'border-green-primary bg-green-dim'
                    : 'bg-surface border-border hover:border-border2'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-green-primary text-white'
                        : 'bg-surface2 text-text-muted'
                    }`}
                  >
                    {option.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p
                        className={`font-semibold ${
                          isSelected ? 'text-green-light' : 'text-text-primary'
                        }`}
                      >
                        {option.label}
                      </p>
                      {option.badge && (
                        <span className="text-xs px-1.5 py-0.5 rounded-full bg-green-dim text-green-light border border-green-muted">
                          {option.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-text-muted">{option.sublabel}</p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      isSelected ? 'border-green-primary bg-green-primary' : 'border-border2'
                    }`}
                  >
                    {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Floor plan preview + hidden gems (shown when room type is selected) */}
        {selected && (
          <div className="mt-8 space-y-6">
            {/* Floor plan preview */}
            <div>
              <h2 className="text-sm font-semibold text-text-secondary mb-3">
                방 구조 미리보기
              </h2>
              <div className="bg-surface rounded-2xl border border-border p-4">
                <FloorPlan roomType={selected} maxHeight={180} />
              </div>
            </div>

            {/* Hidden gems */}
            <div>
              <h2 className="text-sm font-semibold text-text-secondary mb-1">
                이런 것도 챙겨보세요
              </h2>
              <p className="text-xs text-text-dim mb-3">
                처음 자취하면 생각 못하는 것들이에요
              </p>
              <div className="space-y-2">
                {HIDDEN_GEMS[selected].map((gem) => (
                  <div
                    key={gem.name}
                    className="bg-surface rounded-xl border border-border p-3.5"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xs px-1.5 py-0.5 rounded-md bg-green-dim text-green-light border border-green-muted flex-shrink-0 mt-0.5 whitespace-nowrap">
                        {gem.zone}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-text-primary">{gem.name}</p>
                        <p className="text-xs text-text-muted mt-0.5 leading-relaxed">
                          {gem.tip}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <button
              type="button"
              onClick={() => router.push(`/checklist?room=${selected}`)}
              className="w-full py-4 rounded-2xl bg-green-primary text-white font-semibold flex items-center justify-center gap-2 transition-opacity hover:opacity-90 active:opacity-80"
            >
              이 방으로 체크리스트 시작하기
              <IconArrowRight size={18} />
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

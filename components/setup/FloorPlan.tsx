'use client';

import { useState } from 'react';
import type { RoomType } from '@/types';

interface FloorPlanProps {
  roomType: RoomType;
}

interface RoomZone {
  id: string;
  label: string;
  tips: string[];
  path: string;
  textX: number;
  textY: number;
}

const OPEN_ZONES: RoomZone[] = [
  {
    id: 'bathroom',
    label: '욕실',
    tips: ['샤워 호스 + 헤드', '욕실 매트', '청소 솔'],
    path: 'M10 10 L90 10 L90 70 L10 70 Z',
    textX: 50,
    textY: 40,
  },
  {
    id: 'kitchen',
    label: '주방',
    tips: ['냄비 세트', '프라이팬', '도마 + 칼'],
    path: 'M90 10 L200 10 L200 70 L90 70 Z',
    textX: 145,
    textY: 40,
  },
  {
    id: 'living',
    label: '거실·침실',
    tips: ['이불 + 베개', '암막 커튼', '수납 선반'],
    path: 'M10 70 L200 70 L200 190 L10 190 Z',
    textX: 105,
    textY: 130,
  },
];

const SEPARATED_ZONES: RoomZone[] = [
  {
    id: 'bathroom',
    label: '욕실',
    tips: ['샤워 호스 + 헤드', '욕실 매트', '청소 솔'],
    path: 'M10 10 L90 10 L90 80 L10 80 Z',
    textX: 50,
    textY: 45,
  },
  {
    id: 'kitchen',
    label: '주방',
    tips: ['냄비 세트', '프라이팬', '전자레인지'],
    path: 'M90 10 L200 10 L200 80 L90 80 Z',
    textX: 145,
    textY: 45,
  },
  {
    id: 'bedroom',
    label: '침실',
    tips: ['이불 + 베개', '매트리스 커버', '암막 커튼'],
    path: 'M10 80 L110 80 L110 190 L10 190 Z',
    textX: 60,
    textY: 135,
  },
  {
    id: 'living',
    label: '거실',
    tips: ['수납 선반', '무선 청소기', '공기청정기'],
    path: 'M110 80 L200 80 L200 190 L110 190 Z',
    textX: 155,
    textY: 135,
  },
];

const TWO_ROOM_ZONES: RoomZone[] = [
  {
    id: 'bathroom',
    label: '욕실',
    tips: ['샤워 호스 + 헤드', '욕실 매트', '수건 걸이'],
    path: 'M10 10 L80 10 L80 70 L10 70 Z',
    textX: 45,
    textY: 40,
  },
  {
    id: 'kitchen',
    label: '주방',
    tips: ['냄비 세트', '프라이팬', '밥솥'],
    path: 'M80 10 L200 10 L200 70 L80 70 Z',
    textX: 140,
    textY: 40,
  },
  {
    id: 'bedroom1',
    label: '침실 1',
    tips: ['이불 + 베개', '매트리스 커버', '암막 커튼'],
    path: 'M10 70 L105 70 L105 130 L10 130 Z',
    textX: 57,
    textY: 100,
  },
  {
    id: 'bedroom2',
    label: '침실 2',
    tips: ['이불 + 베개', '수납 선반', '암막 커튼'],
    path: 'M105 70 L200 70 L200 130 L105 130 Z',
    textX: 152,
    textY: 100,
  },
  {
    id: 'living',
    label: '거실',
    tips: ['무선 청소기', '공기청정기', '수납 선반'],
    path: 'M10 130 L200 130 L200 190 L10 190 Z',
    textX: 105,
    textY: 160,
  },
];

const ZONES_MAP: Record<RoomType, RoomZone[]> = {
  open: OPEN_ZONES,
  separated: SEPARATED_ZONES,
  two_room: TWO_ROOM_ZONES,
};

export default function FloorPlan({ roomType }: FloorPlanProps) {
  const [activeZone, setActiveZone] = useState<string | null>(null);
  const zones = ZONES_MAP[roomType];
  const active = zones.find((z) => z.id === activeZone);

  return (
    <div className="w-full">
      <svg
        viewBox="0 8 210 198"
        className="w-full max-w-xs mx-auto"
        style={{ height: 180 }}
      >
        {zones.map((zone) => (
          <g key={zone.id} onClick={() => setActiveZone(zone.id === activeZone ? null : zone.id)}>
            <path
              d={zone.path}
              fill={activeZone === zone.id ? '#1A3020' : '#111E14'}
              stroke={activeZone === zone.id ? '#4A7C59' : '#1A3020'}
              strokeWidth="2"
              className="cursor-pointer transition-colors"
            />
            <text
              x={zone.textX}
              y={zone.textY}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="10"
              fill={activeZone === zone.id ? '#7DC48A' : '#6B8F72'}
              className="pointer-events-none select-none"
            >
              {zone.label}
            </text>
          </g>
        ))}
      </svg>

      {active && (
        <div className="mt-3 bg-green-dim border border-border2 rounded-xl p-3">
          <p className="text-xs text-green-light font-semibold mb-2">{active.label} 필수템</p>
          <ul className="space-y-1">
            {active.tips.map((tip) => (
              <li key={tip} className="text-xs text-text-muted flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-green-primary flex-shrink-0" />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

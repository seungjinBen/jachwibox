'use client';

import { useState } from 'react';
import type { RoomType } from '@/types';

export type FloorZone = {
  id: string;
  label: string;
  sublabel?: string;
  categories: string[];
  x: number;
  y: number;
  width: number;
  height: number;
};

type FloorConfig = {
  viewBox: string;
  height: number;
  zones: FloorZone[];
};

export const FLOOR_CONFIGS: Record<RoomType, FloorConfig> = {
  open: {
    viewBox: '0 0 300 200',
    height: 200,
    zones: [
      {
        id: '욕실',
        label: '욕실',
        sublabel: '화장실',
        categories: ['욕실'],
        x: 4, y: 4, width: 88, height: 96,
      },
      {
        id: '주방',
        label: '주방',
        categories: ['주방'],
        x: 100, y: 4, width: 196, height: 96,
      },
      {
        id: '거실·침실',
        label: '거실 · 침실',
        categories: ['침실·거실', '가전', '생활'],
        x: 4, y: 108, width: 292, height: 88,
      },
    ],
  },
  separated: {
    viewBox: '0 0 300 200',
    height: 200,
    zones: [
      {
        id: '욕실',
        label: '욕실',
        sublabel: '화장실',
        categories: ['욕실'],
        x: 4, y: 4, width: 88, height: 96,
      },
      {
        id: '주방',
        label: '주방',
        categories: ['주방'],
        x: 100, y: 4, width: 196, height: 96,
      },
      {
        id: '거실',
        label: '거실',
        categories: ['가전', '생활'],
        x: 4, y: 108, width: 140, height: 88,
      },
      {
        id: '침실',
        label: '침실',
        categories: ['침실·거실'],
        x: 152, y: 108, width: 144, height: 88,
      },
    ],
  },
  two_room: {
    viewBox: '0 0 300 240',
    height: 240,
    zones: [
      {
        id: '욕실',
        label: '욕실',
        sublabel: '화장실',
        categories: ['욕실'],
        x: 4, y: 4, width: 106, height: 76,
      },
      {
        id: '주방',
        label: '주방',
        categories: ['주방'],
        x: 4, y: 88, width: 106, height: 76,
      },
      {
        id: '침실2',
        label: '침실 2',
        categories: ['침실·거실'],
        x: 4, y: 172, width: 106, height: 64,
      },
      {
        id: '거실',
        label: '거실',
        categories: ['가전', '생활'],
        x: 118, y: 4, width: 178, height: 110,
      },
      {
        id: '침실',
        label: '침실',
        categories: ['침실·거실'],
        x: 118, y: 122, width: 178, height: 114,
      },
    ],
  },
};

type Props = {
  roomType: RoomType;
  selectedZone?: string | null;
  onZoneClick?: (zone: FloorZone) => void;
  maxHeight?: number;
};

export default function FloorPlan({
  roomType,
  selectedZone = null,
  onZoneClick,
  maxHeight = 240,
}: Props) {
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  const config = FLOOR_CONFIGS[roomType];
  const isInteractive = !!onZoneClick;

  return (
    <svg
      viewBox={config.viewBox}
      className="w-full"
      style={{ maxHeight }}
      aria-label="방 구조 평면도"
    >
      <rect x="0" y="0" width="300" height={config.height} rx="8" fill="#0D1A10" />

      {config.zones.map((zone) => {
        const isSelected = selectedZone === zone.id;
        const isHovered = isInteractive && hoveredZone === zone.id && !isSelected;
        const cx = zone.x + zone.width / 2;
        const cy = zone.y + zone.height / 2;
        const textY = zone.sublabel ? cy - 9 : cy;

        return (
          <g
            key={zone.id}
            onClick={() => onZoneClick?.(zone)}
            onMouseEnter={isInteractive ? () => setHoveredZone(zone.id) : undefined}
            onMouseLeave={isInteractive ? () => setHoveredZone(null) : undefined}
            style={{ cursor: isInteractive ? 'pointer' : 'default' }}
          >
            <rect
              x={zone.x}
              y={zone.y}
              width={zone.width}
              height={zone.height}
              rx="5"
              fill={isSelected ? '#264535' : isHovered ? '#1D2F22' : '#172418'}
              stroke={isSelected ? '#4A7C59' : isHovered ? '#304838' : '#1E3024'}
              strokeWidth={isSelected ? 2 : 1}
            />

            {isSelected && (
              <circle
                cx={zone.x + zone.width - 10}
                cy={zone.y + 10}
                r="4"
                fill="#4A7C59"
              />
            )}

            <text
              x={cx}
              y={textY}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={isSelected ? '#E8F2EA' : isHovered ? '#A8C8B4' : '#5E8A6C'}
              fontSize={zone.width < 120 ? '10' : '11'}
              fontWeight={isSelected ? '600' : '400'}
              fontFamily="system-ui,-apple-system,sans-serif"
            >
              {zone.label}
            </text>

            {zone.sublabel && (
              <text
                x={cx}
                y={cy + 10}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={isSelected ? '#90B89E' : '#3E5A48'}
                fontSize="9"
                fontFamily="system-ui,-apple-system,sans-serif"
              >
                {zone.sublabel}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

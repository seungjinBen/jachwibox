'use client';

import { useState } from 'react';
import { IconLoader2 } from '@tabler/icons-react';
import { getCurrentSeason } from '@/lib/season';
import type {
  RoomType,
  CookingFreq,
  WorkFromHome,
  Budget,
  AiRecommendResult,
} from '@/types';

interface AiRecommendFormProps {
  onResult: (result: AiRecommendResult) => void;
  initialRoomType?: RoomType;
}

interface ChipOption<T> {
  value: T;
  label: string;
}

const ROOM_OPTIONS: ChipOption<RoomType>[] = [
  { value: 'open', label: '원룸 오픈형' },
  { value: 'separated', label: '원룸 분리형' },
  { value: 'two_room', label: '투룸 이상' },
];

const COOKING_OPTIONS: ChipOption<CookingFreq>[] = [
  { value: 'never', label: '거의 안 해요' },
  { value: 'sometimes', label: '가끔 해요' },
  { value: 'often', label: '자주 해요' },
];

const WFH_OPTIONS: ChipOption<WorkFromHome>[] = [
  { value: 'no', label: '아니요' },
  { value: 'sometimes', label: '가끔' },
  { value: 'yes', label: '자주요' },
];

const BUDGET_OPTIONS: ChipOption<Budget>[] = [
  { value: 'low', label: '~50만원' },
  { value: 'mid', label: '50~100만원' },
  { value: 'high', label: '100만원+' },
];

const PET_OPTIONS: ChipOption<'yes' | 'no'>[] = [
  { value: 'no', label: '없어요' },
  { value: 'yes', label: '있어요' },
];

function ChipGroup<T extends string>({
  label,
  options,
  selected,
  onSelect,
}: {
  label: string;
  options: ChipOption<T>[];
  selected: T | null;
  onSelect: (value: T) => void;
}) {
  return (
    <div className="mb-6">
      <p className="text-sm font-semibold text-text-secondary mb-3">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onSelect(opt.value)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors border ${
              selected === opt.value
                ? 'bg-green-primary border-green-primary text-white'
                : 'bg-surface border-border text-text-muted hover:bg-surface2 hover:border-border2 hover:text-text-primary'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function AiRecommendForm({
  onResult,
  initialRoomType,
}: AiRecommendFormProps) {
  const [roomType, setRoomType] = useState<RoomType | null>(initialRoomType ?? null);
  const [cookingFreq, setCookingFreq] = useState<CookingFreq | null>(null);
  const [workFromHome, setWorkFromHome] = useState<WorkFromHome | null>(null);
  const [budget, setBudget] = useState<Budget | null>(null);
  const [hasPet, setHasPet] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isReady =
    roomType !== null &&
    cookingFreq !== null &&
    workFromHome !== null &&
    budget !== null &&
    hasPet !== null;

  const handleSubmit = async () => {
    if (!isReady) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/ai/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          room_type: roomType,
          season: getCurrentSeason(),
          cooking_freq: cookingFreq,
          work_from_home: workFromHome,
          budget,
          has_pet: hasPet,
        }),
      });

      if (!res.ok) {
        const json = (await res.json()) as { error?: string };
        throw new Error(json.error ?? '알 수 없는 오류가 발생했어요.');
      }

      const json = (await res.json()) as { data: AiRecommendResult };
      onResult(json.data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : '잠시 후 다시 시도해주세요.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface border border-border rounded-2xl p-5">
      <ChipGroup
        label="방 유형"
        options={ROOM_OPTIONS}
        selected={roomType}
        onSelect={(v) => setRoomType(v)}
      />
      <ChipGroup
        label="요리 빈도"
        options={COOKING_OPTIONS}
        selected={cookingFreq}
        onSelect={(v) => setCookingFreq(v)}
      />
      <ChipGroup
        label="재택근무"
        options={WFH_OPTIONS}
        selected={workFromHome}
        onSelect={(v) => setWorkFromHome(v)}
      />
      <ChipGroup
        label="예산대"
        options={BUDGET_OPTIONS}
        selected={budget}
        onSelect={(v) => setBudget(v)}
      />
      <ChipGroup
        label="반려동물"
        options={PET_OPTIONS}
        selected={hasPet === null ? null : hasPet ? 'yes' : 'no'}
        onSelect={(v) => setHasPet(v === 'yes')}
      />

      {error && <p className="text-sm text-coral mb-4">{error}</p>}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={!isReady || loading}
        className={`w-full py-4 rounded-2xl font-semibold text-base transition-colors flex items-center justify-center gap-2 ${
          isReady && !loading
            ? 'bg-green-primary hover:bg-green-muted text-white'
            : 'bg-surface2 text-text-dim cursor-not-allowed'
        }`}
      >
        {loading ? (
          <>
            <IconLoader2 size={18} className="animate-spin" />
            AI가 분석 중이에요...
          </>
        ) : (
          'AI 추천 받기'
        )}
      </button>
    </div>
  );
}

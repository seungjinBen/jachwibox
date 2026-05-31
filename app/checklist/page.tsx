'use client';

import { Suspense, useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { IconArrowLeft, IconX } from '@tabler/icons-react';
import BudgetBar from '@/components/checklist/BudgetBar';
import ItemRow from '@/components/checklist/ItemRow';
import CartFab from '@/components/checklist/CartFab';
import FloorPlan, { FLOOR_CONFIGS } from '@/components/setup/FloorPlan';
import type { FloorZone } from '@/components/setup/FloorPlan';
import type { ItemWithProducts, RoomType, Priority, ChecklistState } from '@/types';

type PriorityFilter = 'all' | 'must' | 'recommend';

const PRIORITY_FILTERS: { key: PriorityFilter; label: string }[] = [
  { key: 'all', label: '전체' },
  { key: 'must', label: '필수만' },
  { key: 'recommend', label: '추천 이상' },
];

const PRIORITY_GROUPS: { key: Priority; label: string; colorClass: string }[] = [
  { key: 'must', label: '필수', colorClass: 'text-coral' },
  { key: 'recommend', label: '추천', colorClass: 'text-green-light' },
  { key: 'optional', label: '선택', colorClass: 'text-text-muted' },
];

const ROOM_LABELS: Record<RoomType, string> = {
  open: '원룸 오픈형',
  separated: '원룸 분리형',
  two_room: '투룸 이상',
};

const VALID_ROOMS: RoomType[] = ['open', 'separated', 'two_room'];
const ROOM_KEY = 'jachwibox_last_room';
const BUDGET_KEY = 'jachwibox_budget_goal';

function getStorageKey(roomType: string) {
  return `jachwibox_checklist_${roomType}`;
}

function ChecklistContent() {
  const searchParams = useSearchParams();
  const roomParam = searchParams.get('room') as RoomType | null;

  const [roomType, setRoomType] = useState<RoomType>(
    roomParam && VALID_ROOMS.includes(roomParam) ? roomParam : 'open'
  );

  // Client-side: load saved room if no URL param, and persist current room
  useEffect(() => {
    if (!roomParam) {
      const saved = localStorage.getItem(ROOM_KEY) as RoomType | null;
      if (saved && VALID_ROOMS.includes(saved)) setRoomType(saved);
    }
  }, [roomParam]);

  useEffect(() => {
    localStorage.setItem(ROOM_KEY, roomType);
  }, [roomType]);

  const [items, setItems] = useState<ItemWithProducts[]>([]);
  const [checklist, setChecklist] = useState<ChecklistState>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('all');
  const [budgetGoal, setBudgetGoal] = useState<number>(500000);

  useEffect(() => {
    const saved = localStorage.getItem(BUDGET_KEY);
    if (saved) {
      const parsed = parseInt(saved, 10);
      if (!Number.isNaN(parsed) && parsed > 0) setBudgetGoal(parsed);
    }
  }, []);

  const handleBudgetGoalChange = useCallback((value: number) => {
    setBudgetGoal(value);
    localStorage.setItem(BUDGET_KEY, String(value));
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem(getStorageKey(roomType));
    if (stored) {
      try {
        setChecklist(JSON.parse(stored) as ChecklistState);
      } catch {
        // ignore parse errors
      }
    }
  }, [roomType]);

  const loadItems = useCallback(() => {
    setLoading(true);
    setError(null);
    fetch(`/api/items?room_type=${roomType}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: { data: ItemWithProducts[] }) => {
        setItems(data.data ?? []);
      })
      .catch((err: unknown) => {
        console.error('[checklist] Failed to load items:', err);
        setError('품목을 불러오지 못했어요. 잠시 후 다시 시도해주세요.');
      })
      .finally(() => setLoading(false));
  }, [roomType]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const handleToggle = useCallback(
    (id: string) => {
      setChecklist((prev) => {
        const next = { ...prev, [id]: !prev[id] };
        localStorage.setItem(getStorageKey(roomType), JSON.stringify(next));
        return next;
      });
    },
    [roomType]
  );

  const handleZoneClick = useCallback((zone: FloorZone) => {
    setSelectedZone((prev) => (prev === zone.id ? null : zone.id));
  }, []);

  // Zone filter
  const activeZone = selectedZone
    ? FLOOR_CONFIGS[roomType].zones.find((z) => z.id === selectedZone)
    : null;

  const zoneFilteredItems = activeZone
    ? items.filter((item) => activeZone.categories.includes(item.category_name ?? ''))
    : items;

  // Priority grouping
  // '필수만' = must only (초보자용)
  // '추천 이상' = recommend + optional (어느정도 해본 사람용, must 제외)
  // '전체' = all
  const visiblePriorities: Priority[] =
    priorityFilter === 'must'
      ? ['must']
      : priorityFilter === 'recommend'
      ? ['recommend', 'optional']
      : ['must', 'recommend', 'optional'];

  const groupedItems: Record<Priority, ItemWithProducts[]> = {
    must: zoneFilteredItems.filter((i) => i.priority === 'must'),
    recommend: zoneFilteredItems.filter((i) => i.priority === 'recommend'),
    optional: zoneFilteredItems.filter((i) => i.priority === 'optional'),
  };

  const totalVisible = visiblePriorities.reduce(
    (sum, p) => sum + groupedItems[p].length,
    0
  );

  return (
    <div className="min-h-screen bg-dark">
      {/* Sticky sub-header */}
      <header className="sticky top-14 z-20 bg-dark/90 backdrop-blur-sm border-b border-border">
        <div className="max-w-lg mx-auto px-4 h-12 flex items-center gap-3">
          <Link
            href="/setup"
            className="text-text-muted hover:text-text-primary transition-colors"
          >
            <IconArrowLeft size={20} />
          </Link>
          <span className="text-sm font-medium text-text-secondary flex-1">
            {ROOM_LABELS[roomType]} 체크리스트
          </span>
        </div>

        <BudgetBar items={items} checklist={checklist} budgetGoal={budgetGoal} onGoalChange={handleBudgetGoalChange} />

        {/* Priority filter */}
        <div className="max-w-lg mx-auto px-4 flex gap-2 py-2.5">
          {PRIORITY_FILTERS.map((filter) => (
            <button
              key={filter.key}
              type="button"
              onClick={() => setPriorityFilter(filter.key)}
              className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                priorityFilter === filter.key
                  ? 'bg-green-primary border-green-primary text-white'
                  : 'bg-surface border-border text-text-muted hover:border-border2'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-lg mx-auto pb-28">
        {/* Floor plan — 화면 1/3 차지 */}
        <div className="px-4 pt-4 pb-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-text-muted">
              구역을 탭하면 해당 아이템만 볼 수 있어요
            </p>
            {selectedZone && (
              <button
                type="button"
                onClick={() => setSelectedZone(null)}
                className="flex items-center gap-1 text-xs text-green-light hover:opacity-80 transition-opacity"
              >
                <IconX size={12} />
                전체 보기
              </button>
            )}
          </div>

          <div className="rounded-xl overflow-hidden border border-border">
            <FloorPlan
              roomType={roomType}
              selectedZone={selectedZone}
              onZoneClick={handleZoneClick}
              maxHeight={220}
            />
          </div>

          {selectedZone && (
            <p className="text-xs text-green-light mt-2 text-center">
              {selectedZone} 아이템 {zoneFilteredItems.length}개 표시 중
            </p>
          )}
        </div>

        {/* Items */}
        {error ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <p className="text-text-muted text-sm">{error}</p>
            <button
              type="button"
              onClick={loadItems}
              className="text-green-light text-sm hover:underline"
            >
              다시 시도
            </button>
          </div>
        ) : loading ? (
          <div className="flex items-center justify-center py-16 text-text-muted text-sm">
            불러오는 중...
          </div>
        ) : totalVisible === 0 ? (
          <div className="flex items-center justify-center py-16 text-text-muted text-sm">
            {selectedZone
              ? `${selectedZone}에 해당하는 아이템이 없어요`
              : '아이템이 없어요'}
          </div>
        ) : (
          <div>
            {visiblePriorities.map((priority) => {
              const group = PRIORITY_GROUPS.find((g) => g.key === priority);
              if (!group) return null;
              const groupItems = groupedItems[priority];
              if (groupItems.length === 0) return null;

              return (
                <div key={priority}>
                  <div className="px-4 py-2.5 bg-surface2/60 border-y border-border flex items-center gap-2">
                    <span className={`text-xs font-semibold ${group.colorClass}`}>
                      {group.label}
                    </span>
                    <span className="text-xs text-text-dim">{groupItems.length}개</span>
                  </div>
                  <div className="divide-y divide-border">
                    {groupItems.map((item) => (
                      <ItemRow
                        key={item.id}
                        item={item}
                        checklist={checklist}
                        onToggle={handleToggle}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <CartFab items={items} checklist={checklist} />
    </div>
  );
}

export default function ChecklistPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-dark flex items-center justify-center text-text-muted text-sm">
          불러오는 중...
        </div>
      }
    >
      <ChecklistContent />
    </Suspense>
  );
}

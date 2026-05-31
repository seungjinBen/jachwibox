'use client';

import { Suspense, useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { IconArrowLeft } from '@tabler/icons-react';
import BudgetBar from '@/components/checklist/BudgetBar';
import ItemRow from '@/components/checklist/ItemRow';
import CartFab from '@/components/checklist/CartFab';
import type { ItemWithProducts, RoomType, ChecklistState } from '@/types';

const CATEGORY_TABS = [
  { id: 'all', label: '전체' },
  { id: '주방', label: '주방' },
  { id: '욕실', label: '욕실' },
  { id: '침실·거실', label: '침실' },
  { id: '가전', label: '가전' },
];

function getStorageKey(roomType: string) {
  return `jachwibox_checklist_${roomType}`;
}

const ROOM_LABELS: Record<RoomType, string> = {
  open: '원룸 (오픈형)',
  separated: '원룸 (분리형)',
  two_room: '투룸 이상',
};

function ChecklistContent() {
  const searchParams = useSearchParams();
  const roomParam = searchParams.get('room') as RoomType | null;
  const roomType: RoomType = roomParam && ['open', 'separated', 'two_room'].includes(roomParam)
    ? roomParam
    : 'open';

  const [items, setItems] = useState<ItemWithProducts[]>([]);
  const [checklist, setChecklist] = useState<ChecklistState>({});
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    setLoading(true);
    fetch(`/api/items?room_type=${roomType}`)
      .then((res) => res.json())
      .then((data: { data: ItemWithProducts[] }) => {
        setItems(data.data ?? []);
      })
      .catch((err) => {
        console.error('[checklist] Failed to load items:', err);
      })
      .finally(() => setLoading(false));
  }, [roomType]);

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

  const filteredItems =
    activeTab === 'all'
      ? items
      : items.filter((item) => item.category_name === activeTab);

  return (
    <div className="min-h-screen bg-dark">
      {/* 헤더 */}
      <header className="sticky top-0 z-50 bg-dark/90 backdrop-blur-sm border-b border-border">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/setup" className="text-text-muted hover:text-text-primary transition-colors">
            <IconArrowLeft size={20} />
          </Link>
          <span className="text-sm font-medium text-text-secondary flex-1">
            {ROOM_LABELS[roomType]} 체크리스트
          </span>
        </div>

        {/* 예산 바 */}
        <BudgetBar items={items} checklist={checklist} />

        {/* 카테고리 탭 */}
        <div className="max-w-lg mx-auto px-4 flex gap-2 overflow-x-auto hide-scrollbar py-3">
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                activeTab === tab.id
                  ? 'bg-green-primary border-green-primary text-white'
                  : 'bg-surface border-border text-text-muted hover:border-border2'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-lg mx-auto pb-28">
        {loading ? (
          <div className="flex items-center justify-center py-16 text-text-muted text-sm">
            불러오는 중...
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="flex items-center justify-center py-16 text-text-muted text-sm">
            해당 카테고리에 품목이 없어요
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredItems.map((item) => (
              <ItemRow
                key={item.id}
                item={item}
                checklist={checklist}
                onToggle={handleToggle}
              />
            ))}
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

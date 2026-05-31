'use client';

import type { Item } from '@/types';
import type { ChecklistState } from '@/types';

interface BudgetBarProps {
  items: Item[];
  checklist: ChecklistState;
}

const BUDGET_GOAL = 500000;

function formatPrice(price: number): string {
  if (price >= 10000) return `${(price / 10000).toFixed(1).replace('.0', '')}만원`;
  return `${price.toLocaleString()}원`;
}

export default function BudgetBar({ items, checklist }: BudgetBarProps) {
  const total = items
    .filter((item) => checklist[item.id])
    .reduce((sum, item) => sum + item.price_min, 0);

  const percent = Math.min((total / BUDGET_GOAL) * 100, 100);
  const isOver = total > BUDGET_GOAL;

  return (
    <div className="bg-surface border-b border-border px-4 py-3">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-text-muted">예상 최소 비용</span>
          <div className="flex items-center gap-2">
            <span className={`text-sm font-bold ${isOver ? 'text-coral' : 'text-text-primary'}`}>
              {formatPrice(total)}
            </span>
            <span className="text-xs text-text-dim">/ 목표 50만원</span>
          </div>
        </div>
        <div className="h-1.5 bg-border rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              isOver ? 'bg-coral' : 'bg-green-primary'
            }`}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
}

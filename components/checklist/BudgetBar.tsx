'use client';

import { useState, useRef } from 'react';
import { IconPencil, IconCheck } from '@tabler/icons-react';
import type { Item, ChecklistState } from '@/types';

interface BudgetBarProps {
  items: Item[];
  checklist: ChecklistState;
  budgetGoal: number;
  onGoalChange: (value: number) => void;
}

function formatPrice(price: number): string {
  if (price >= 10000) return `${(price / 10000).toFixed(1).replace('.0', '')}만원`;
  return `${price.toLocaleString()}원`;
}

function parseInputToWon(raw: string): number | null {
  const trimmed = raw.replace(/,/g, '').trim();
  const manMatch = trimmed.match(/^(\d+(\.\d+)?)만?$/);
  if (manMatch) {
    const val = parseFloat(manMatch[1]) * 10000;
    return Number.isFinite(val) && val > 0 ? Math.round(val) : null;
  }
  const plain = parseInt(trimmed, 10);
  return !Number.isNaN(plain) && plain > 0 ? plain : null;
}

export default function BudgetBar({ items, checklist, budgetGoal, onGoalChange }: BudgetBarProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const total = items
    .filter((item) => checklist[item.id])
    .reduce((sum, item) => sum + item.price_min, 0);

  const percent = Math.min((total / budgetGoal) * 100, 100);
  const isOver = total > budgetGoal;

  const startEdit = () => {
    setDraft(String(Math.round(budgetGoal / 10000)));
    setEditing(true);
    setTimeout(() => inputRef.current?.select(), 0);
  };

  const commitEdit = () => {
    const parsed = parseInputToWon(draft);
    if (parsed) onGoalChange(parsed);
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') commitEdit();
    if (e.key === 'Escape') setEditing(false);
  };

  return (
    <div className="bg-surface border-b border-border px-4 py-3">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-text-muted">예상 최소 비용</span>
          <div className="flex items-center gap-1.5">
            <span className={`text-sm font-bold ${isOver ? 'text-coral' : 'text-text-primary'}`}>
              {formatPrice(total)}
            </span>
            <span className="text-xs text-text-dim">/</span>
            {editing ? (
              <div className="flex items-center gap-1">
                <input
                  ref={inputRef}
                  type="text"
                  inputMode="numeric"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onBlur={commitEdit}
                  className="w-16 text-xs text-right bg-surface2 border border-green-primary rounded px-1.5 py-0.5 text-text-primary focus:outline-none"
                  placeholder="50"
                />
                <span className="text-xs text-text-dim">만원</span>
                <button
                  type="button"
                  onClick={commitEdit}
                  className="text-green-light hover:opacity-80 transition-opacity"
                >
                  <IconCheck size={12} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={startEdit}
                className="flex items-center gap-0.5 text-xs text-text-dim hover:text-text-muted transition-colors group"
              >
                목표 {formatPrice(budgetGoal)}
                <IconPencil size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            )}
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

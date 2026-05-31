'use client';

import { useState } from 'react';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import ProductCard from './ProductCard';
import type { ItemWithProducts, Priority } from '@/types';
import type { ChecklistState } from '@/types';

interface ItemRowProps {
  item: ItemWithProducts;
  checklist: ChecklistState;
  onToggle: (id: string) => void;
}

const PRIORITY_LABELS: Record<Priority, string> = {
  must: '필수',
  recommend: '추천',
  optional: '선택',
};

const PRIORITY_COLORS: Record<Priority, string> = {
  must: 'bg-coral/20 text-coral border-coral/30',
  recommend: 'bg-green-dim text-green-light border-green-muted',
  optional: 'bg-surface2 text-text-muted border-border',
};

export default function ItemRow({ item, checklist, onToggle }: ItemRowProps) {
  const [expanded, setExpanded] = useState(false);
  const checked = checklist[item.id] ?? false;

  return (
    <div className={`border-b border-border transition-opacity ${checked ? 'opacity-60' : ''}`}>
      <div className="flex items-center gap-3 py-4 px-4">
        {/* 체크박스 */}
        <button
          onClick={() => onToggle(item.id)}
          className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
            checked
              ? 'bg-green-primary border-green-primary'
              : 'bg-transparent border-border2 hover:border-green-primary'
          }`}
        >
          {checked && (
            <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
              <path
                d="M1 4L4.5 7.5L11 1"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>

        {/* 품목 정보 */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`text-sm font-medium ${checked ? 'line-through text-text-dim' : 'text-text-primary'}`}
            >
              {item.name}
            </span>
            <span
              className={`text-xs px-1.5 py-0.5 rounded-full border ${PRIORITY_COLORS[item.priority]}`}
            >
              {PRIORITY_LABELS[item.priority]}
            </span>
          </div>
          <p className="text-xs text-text-muted mt-0.5">{item.price_display}</p>
        </div>

        {/* 펼치기 버튼 */}
        {item.products.length > 0 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-text-muted hover:text-text-primary transition-colors flex-shrink-0"
          >
            {expanded ? <IconChevronUp size={18} /> : <IconChevronDown size={18} />}
          </button>
        )}
      </div>

      {/* 상품 카드 펼침 */}
      {expanded && item.products.length > 0 && (
        <div className="px-4 pb-4 grid grid-cols-1 gap-2">
          {item.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

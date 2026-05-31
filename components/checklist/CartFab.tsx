'use client';

import { useState } from 'react';
import { IconShoppingCart, IconX, IconExternalLink } from '@tabler/icons-react';
import { trackAndOpen } from '@/lib/coupang';
import type { ItemWithProducts } from '@/types';
import type { ChecklistState } from '@/types';

interface CartFabProps {
  items: ItemWithProducts[];
  checklist: ChecklistState;
}

function formatPrice(price: number): string {
  if (price >= 10000) return `${(price / 10000).toFixed(1).replace('.0', '')}만원`;
  return `${price.toLocaleString()}원`;
}

export default function CartFab({ items, checklist }: CartFabProps) {
  const [open, setOpen] = useState(false);

  const checkedItems = items.filter((item) => checklist[item.id]);
  const totalMin = checkedItems.reduce((sum, item) => sum + item.price_min, 0);
  const totalMax = checkedItems.reduce((sum, item) => sum + item.price_max, 0);

  return (
    <>
      {/* FAB 버튼 */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-4 z-40 bg-green-primary hover:bg-green-muted text-white rounded-2xl px-4 py-3 flex items-center gap-2 shadow-lg transition-colors"
      >
        <IconShoppingCart size={20} />
        <span className="text-sm font-semibold">
          나의 구매 목록 {checkedItems.length}/{items.length}
        </span>
      </button>

      {/* 모달 오버레이 */}
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="relative bg-surface border-t border-border rounded-t-3xl max-h-[80vh] flex flex-col">
            {/* 모달 헤더 */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div>
                <h2 className="font-bold text-text-primary">나의 구매 목록</h2>
                <p className="text-xs text-text-muted mt-0.5">
                  {checkedItems.length}개 선택됨
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-text-muted hover:text-text-primary transition-colors"
              >
                <IconX size={20} />
              </button>
            </div>

            {/* 목록 */}
            <div className="flex-1 overflow-y-auto">
              {checkedItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-text-muted">
                  <IconShoppingCart size={36} className="mb-3 opacity-40" />
                  <p className="text-sm">체크한 품목이 없어요</p>
                </div>
              ) : (
                <ul className="divide-y divide-border">
                  {checkedItems.map((item) => {
                    const budgetProduct = item.products.find((p) => p.type === 'budget');
                    return (
                      <li key={item.id} className="flex items-center gap-3 px-5 py-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-text-primary truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-text-muted">{item.price_display}</p>
                        </div>
                        {budgetProduct && (
                          <button
                            onClick={() => trackAndOpen(budgetProduct.coupang_url, item.name)}
                            className="text-coral hover:text-coral/70 transition-colors flex-shrink-0"
                          >
                            <IconExternalLink size={16} />
                          </button>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* 예산 요약 */}
            {checkedItems.length > 0 && (
              <div className="border-t border-border px-5 py-4 bg-surface">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-text-muted">예상 총 비용</span>
                  <span className="text-base font-bold text-text-primary">
                    {formatPrice(totalMin)} ~ {formatPrice(totalMax)}
                  </span>
                </div>
                <p className="text-xs text-text-dim">가성비 상품 기준 최저가입니다</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

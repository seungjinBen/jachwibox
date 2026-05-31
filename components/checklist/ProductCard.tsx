'use client';

import { trackAndOpen } from '@/lib/coupang';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

const TYPE_LABELS: Record<Product['type'], string> = {
  budget: '가성비',
  performance: '성능',
  design: '디자인',
};

const TYPE_COLORS: Record<Product['type'], string> = {
  budget: 'bg-green-dim text-green-light border-green-muted',
  performance: 'bg-surface2 text-text-secondary border-border2',
  design: 'bg-surface2 text-coral border-border2',
};

function formatPrice(price: number): string {
  if (price >= 10000) return `${(price / 10000).toFixed(1).replace('.0', '')}만원`;
  return `${price.toLocaleString()}원`;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-surface2 border border-border rounded-xl p-3 flex flex-col gap-2">
      <div className="flex items-start justify-between gap-2">
        <span
          className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full border ${TYPE_COLORS[product.type]}`}
        >
          {TYPE_LABELS[product.type]}
        </span>
        <span className="text-sm font-bold text-text-primary whitespace-nowrap">
          {formatPrice(product.price)}
        </span>
      </div>

      <p className="text-sm font-medium text-text-primary leading-snug">{product.name}</p>
      <p className="text-xs text-text-muted leading-relaxed">{product.reason}</p>

      <button
        onClick={() => trackAndOpen(product.coupang_url, product.name)}
        className="w-full mt-1 bg-coral hover:bg-coral/80 text-white text-xs font-semibold py-2 rounded-lg transition-colors"
      >
        쿠팡에서 보기 →
      </button>
    </div>
  );
}

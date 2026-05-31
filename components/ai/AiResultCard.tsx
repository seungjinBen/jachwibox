'use client';

import { IconBulb, IconExternalLink } from '@tabler/icons-react';
import { trackAndOpen } from '@/lib/coupang';
import type { AiRecommendation, Priority } from '@/types';

interface AiResultCardProps {
  recommendation: AiRecommendation;
}

const PRIORITY_CONFIG: Record<Priority, { label: string; className: string }> = {
  must: { label: '필수', className: 'bg-coral/20 text-coral' },
  recommend: { label: '추천', className: 'bg-green-dim text-green-light' },
  optional: { label: '선택', className: 'bg-surface2 text-text-muted' },
};

export default function AiResultCard({ recommendation: rec }: AiResultCardProps) {
  const priorityConfig = PRIORITY_CONFIG[rec.priority] ?? PRIORITY_CONFIG.optional;
  const coupangUrl =
    rec.coupang_url ??
    `https://www.coupang.com/np/search?q=${encodeURIComponent(rec.item_name)}`;

  return (
    <div className="bg-surface border border-border rounded-2xl p-5">
      <div className="flex items-start gap-3 mb-3">
        <span className="w-7 h-7 rounded-full bg-green-dim flex items-center justify-center text-xs font-bold text-green-light flex-shrink-0 mt-0.5">
          {rec.rank}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="font-semibold text-text-primary">{rec.item_name}</h3>
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-full ${priorityConfig.className}`}
            >
              {priorityConfig.label}
            </span>
          </div>
          <p className="text-xs text-text-muted">
            {rec.category} · {rec.estimated_price}
          </p>
        </div>
      </div>

      <p className="text-sm text-text-secondary leading-relaxed mb-3">{rec.reason}</p>

      <div className="flex items-start gap-2 bg-green-dim/50 rounded-xl px-3 py-2 mb-4">
        <IconBulb size={14} className="text-green-light flex-shrink-0 mt-0.5" />
        <p className="text-xs text-text-secondary leading-relaxed">{rec.tip}</p>
      </div>

      <button
        type="button"
        onClick={() => trackAndOpen(coupangUrl, rec.item_name)}
        className="w-full py-2.5 rounded-xl bg-coral/10 hover:bg-coral/20 text-coral text-sm font-semibold transition-colors flex items-center justify-center gap-1.5"
      >
        쿠팡에서 보기
        <IconExternalLink size={14} />
      </button>
    </div>
  );
}

'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { IconSparkles } from '@tabler/icons-react';
import AiRecommendForm from '@/components/ai/AiRecommendForm';
import AiResultCard from '@/components/ai/AiResultCard';
import { getCurrentSeason, getSeasonLabel } from '@/lib/season';
import type { AiRecommendResult, RoomType } from '@/types';

function AiPageContent() {
  const searchParams = useSearchParams();
  const roomParam = searchParams.get('room') as RoomType | null;

  const [result, setResult] = useState<AiRecommendResult | null>(null);
  const [showForm, setShowForm] = useState(true);
  const currentSeason = getCurrentSeason();

  const handleResult = (data: AiRecommendResult) => {
    setResult(data);
    setShowForm(false);
  };

  const seasonColors: Record<string, { bg: string; text: string }> = {
    spring: { bg: '#7DC48A22', text: '#7DC48A' },
    summer: { bg: '#E8826A22', text: '#E8826A' },
    fall: { bg: '#C4884A22', text: '#C4884A' },
    winter: { bg: '#4A7CB022', text: '#4A7CB0' },
  };
  const seasonColor = seasonColors[currentSeason];

  return (
    <div className="min-h-screen bg-dark">
      <main className="max-w-lg mx-auto px-4 pb-16">
        {/* 헤더 섹션 */}
        <section className="pt-10 pb-8">
          <div className="inline-flex items-center gap-2 bg-green-dim border border-border2 rounded-full px-4 py-1.5 mb-5">
            <IconSparkles size={14} className="text-green-light" />
            <span className="text-xs text-green-light font-medium">AI 맞춤 추천</span>
          </div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">AI 맞춤 추천</h1>
          <p className="text-text-muted text-sm leading-relaxed">
            생활 패턴을 알려주시면 지금 당장 필요한 것만 골라드려요
          </p>
        </section>

        {/* 폼 */}
        {showForm && (
          <AiRecommendForm
            initialRoomType={roomParam ?? undefined}
            onResult={handleResult}
          />
        )}

        {/* 결과 */}
        {!showForm && result && (
          <div>
            {/* 요약 카드 */}
            <div className="bg-surface border border-border2 rounded-2xl p-5 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="text-xs font-medium px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: seasonColor.bg, color: seasonColor.text }}
                >
                  {getSeasonLabel(currentSeason)} 시즌
                </span>
              </div>
              <p className="text-text-primary font-medium mb-2">{result.summary}</p>
              <p className="text-text-muted text-sm">
                예상 총 비용:{' '}
                <span className="text-green-light font-semibold">
                  {result.total_budget_estimate}
                </span>
              </p>
            </div>

            {/* 추천 품목 리스트 */}
            <div className="space-y-3 mb-8">
              {result.recommendations.map((rec) => (
                <AiResultCard key={rec.rank} recommendation={rec} />
              ))}
            </div>

            {/* 재추천 버튼 */}
            <button
              onClick={() => {
                setShowForm(true);
                setResult(null);
              }}
              className="w-full py-3 rounded-xl border border-border2 text-text-muted text-sm font-medium hover:bg-surface2 hover:text-text-primary transition-colors"
            >
              다시 설정하기
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default function AiPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-dark" />}>
      <AiPageContent />
    </Suspense>
  );
}

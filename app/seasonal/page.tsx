'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { IconArrowLeft } from '@tabler/icons-react';
import TipCard from '@/components/seasonal/TipCard';
import { getCurrentSeason, getSeasonLabel, getSeasonColor } from '@/lib/season';
import type { Season, SeasonalTip } from '@/types';

const SEASONS: Season[] = ['spring', 'summer', 'fall', 'winter'];

export default function SeasonalPage() {
  const [activeSeason, setActiveSeason] = useState<Season>(getCurrentSeason());
  const [tips, setTips] = useState<SeasonalTip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/seasonal?season=${activeSeason}`)
      .then((res) => res.json())
      .then((data: { data: SeasonalTip[] }) => {
        setTips(data.data ?? []);
      })
      .catch((err) => {
        console.error('[seasonal] Failed to load tips:', err);
      })
      .finally(() => setLoading(false));
  }, [activeSeason]);

  return (
    <div className="min-h-screen bg-dark">
      {/* 헤더 */}
      <header className="sticky top-0 z-50 bg-dark/90 backdrop-blur-sm border-b border-border">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/" className="text-text-muted hover:text-text-primary transition-colors">
            <IconArrowLeft size={20} />
          </Link>
          <span className="text-sm font-medium text-text-secondary">계절별 자취 가이드</span>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 pb-16">
        <div className="pt-6 pb-8">
          <h1 className="text-2xl font-bold text-text-primary mb-2">계절별 자취 가이드</h1>
          <p className="text-text-muted text-sm">
            계절마다 놓치기 쉬운 자취 팁을 알려드려요.
          </p>
        </div>

        {/* 계절 선택 카드 */}
        <div className="grid grid-cols-4 gap-2 mb-8">
          {SEASONS.map((season) => {
            const color = getSeasonColor(season);
            const isActive = activeSeason === season;
            return (
              <button
                key={season}
                onClick={() => setActiveSeason(season)}
                className={`rounded-2xl py-3 flex flex-col items-center gap-1.5 border transition-all ${
                  isActive ? 'border-2' : 'bg-surface border-border'
                }`}
                style={
                  isActive
                    ? {
                        backgroundColor: `${color}18`,
                        borderColor: color,
                      }
                    : {}
                }
              >
                <span
                  className="text-lg"
                  style={isActive ? { color } : { color: '#6B8F72' }}
                >
                  {season === 'spring' && '🌸'}
                  {season === 'summer' && '☀️'}
                  {season === 'fall' && '🍂'}
                  {season === 'winter' && '❄️'}
                </span>
                <span
                  className="text-xs font-medium"
                  style={isActive ? { color } : { color: '#6B8F72' }}
                >
                  {getSeasonLabel(season)}
                </span>
              </button>
            );
          })}
        </div>

        {/* 팁 목록 */}
        {loading ? (
          <div className="flex items-center justify-center py-12 text-text-muted text-sm">
            불러오는 중...
          </div>
        ) : tips.length === 0 ? (
          <div className="flex items-center justify-center py-12 text-text-muted text-sm">
            팁이 없어요
          </div>
        ) : (
          <div className="space-y-3">
            {tips.map((tip) => (
              <TipCard key={tip.id} tip={tip} season={activeSeason} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

import Link from 'next/link';
import { IconBox, IconCheckbox, IconSun, IconBrain } from '@tabler/icons-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-dark">
      <main className="max-w-lg mx-auto px-4 pb-16">
        {/* 히어로 섹션 */}
        <section className="pt-12 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-green-dim border border-border2 rounded-full px-4 py-1.5 mb-6">
            <IconBox size={14} className="text-green-light" />
            <span className="text-xs text-green-light font-medium">자취 필수템 큐레이션</span>
          </div>

          <h1 className="text-3xl font-bold text-text-primary leading-tight mb-4 text-balance">
            첫 자취,
            <br />
            <span className="text-green-light">뭐부터 사야 할지</span> 막막하죠?
          </h1>

          <p className="text-text-muted text-base leading-relaxed mb-8">
            방 유형과 계절에 딱 맞는 자취 필수템을 골라드려요.
            <br />
            쿠팡 최저가 상품도 바로 확인할 수 있어요.
          </p>

          <Link
            href="/setup"
            className="inline-flex items-center gap-2 bg-green-primary hover:bg-green-muted text-white font-semibold px-8 py-4 rounded-2xl text-base transition-colors"
          >
            우리 집 맞춤 체크리스트 보기 →
          </Link>
        </section>

        {/* 특징 3가지 */}
        <section className="grid grid-cols-1 gap-3 mb-12">
          <div className="bg-surface border border-border rounded-2xl p-5 flex items-start gap-4">
            <div className="w-10 h-10 bg-green-dim rounded-xl flex items-center justify-center flex-shrink-0">
              <IconCheckbox size={20} className="text-green-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-text-primary mb-1">방 유형별 맞춤 추천</h2>
              <p className="text-text-muted text-sm leading-relaxed">
                원룸 오픈형, 분리형, 투룸 등 내 방 구조에 꼭 필요한 것만 추천해드려요.
              </p>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-2xl p-5 flex items-start gap-4">
            <div className="w-10 h-10 bg-green-dim rounded-xl flex items-center justify-center flex-shrink-0">
              <IconSun size={20} className="text-green-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-text-primary mb-1">계절별 자취 가이드</h2>
              <p className="text-text-muted text-sm leading-relaxed">
                여름엔 제습, 겨울엔 단열. 계절마다 놓치기 쉬운 자취 팁을 알려드려요.
              </p>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-2xl p-5 flex items-start gap-4">
            <div className="w-10 h-10 bg-green-dim rounded-xl flex items-center justify-center flex-shrink-0">
              <IconBrain size={20} className="text-green-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-text-primary mb-1">AI 맞춤 추천 (준비 중)</h2>
              <p className="text-text-muted text-sm leading-relaxed">
                요리 빈도, 예산, 재택 여부까지 반영한 AI 개인 추천이 곧 출시돼요.
              </p>
            </div>
          </div>
        </section>

        {/* 하단 CTA */}
        <section className="bg-surface border border-border2 rounded-2xl p-6 text-center">
          <p className="text-text-secondary font-medium mb-4">
            3분이면 내 자취 필수템 리스트 완성!
          </p>
          <Link
            href="/setup"
            className="inline-flex items-center gap-2 bg-green-primary hover:bg-green-muted text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors"
          >
            지금 바로 시작하기 →
          </Link>
        </section>
      </main>
    </div>
  );
}

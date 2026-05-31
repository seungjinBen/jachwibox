import anthropic, { CLAUDE_MODEL } from '@/lib/anthropic';
import { generateCacheKey, checkCache, saveCache } from '@/lib/cache';
import { supabaseAdmin } from '@/lib/supabase';
import type {
  AiRecommendRequest,
  AiRecommendResult,
  AiRecommendation,
} from '@/types';

const ROOM_TYPE_LABELS: Record<string, string> = {
  open: '원룸 오픈형',
  separated: '원룸 분리형',
  two_room: '투룸 이상',
};

const SEASON_LABELS: Record<string, string> = {
  spring: '봄',
  summer: '여름',
  fall: '가을',
  winter: '겨울',
};

const COOKING_LABELS: Record<string, string> = {
  never: '거의 안 해요',
  sometimes: '가끔 해요',
  often: '자주 해요',
};

const WFH_LABELS: Record<string, string> = {
  no: '아니요',
  sometimes: '가끔',
  yes: '자주요',
};

const BUDGET_LABELS: Record<string, string> = {
  low: '~50만원',
  mid: '50~100만원',
  high: '100만원+',
};

const VALID_ROOM_TYPES = ['open', 'separated', 'two_room'] as const;
const VALID_SEASONS = ['spring', 'summer', 'fall', 'winter'] as const;
const VALID_COOKING_FREQS = ['never', 'sometimes', 'often'] as const;
const VALID_WFH = ['no', 'sometimes', 'yes'] as const;
const VALID_BUDGETS = ['low', 'mid', 'high'] as const;

function isValidRequest(body: unknown): body is AiRecommendRequest {
  if (!body || typeof body !== 'object') return false;
  const b = body as Record<string, unknown>;
  return (
    (VALID_ROOM_TYPES as readonly string[]).includes(b.room_type as string) &&
    (VALID_SEASONS as readonly string[]).includes(b.season as string) &&
    (VALID_COOKING_FREQS as readonly string[]).includes(b.cooking_freq as string) &&
    (VALID_WFH as readonly string[]).includes(b.work_from_home as string) &&
    (VALID_BUDGETS as readonly string[]).includes(b.budget as string) &&
    typeof b.has_pet === 'boolean'
  );
}

function buildPrompt(body: AiRecommendRequest): string {
  return `다음 조건의 첫 자취생에게 지금 당장 가장 필요한 물품을 추천해주세요.

조건:
- 방 유형: ${ROOM_TYPE_LABELS[body.room_type]}
- 현재 계절: ${SEASON_LABELS[body.season]}
- 요리 빈도: ${COOKING_LABELS[body.cooking_freq]}
- 재택근무: ${WFH_LABELS[body.work_from_home]}
- 예산: ${BUDGET_LABELS[body.budget]}
- 반려동물: ${body.has_pet ? '있어요' : '없어요'}

다음 JSON 형식으로만 응답하세요. 마크다운이나 코드블록 없이 순수 JSON만:
{
  "recommendations": [
    {
      "rank": 1,
      "item_name": "품목명",
      "category": "카테고리",
      "reason": "이 사람에게 필요한 구체적인 이유 (1~2문장)",
      "priority": "must",
      "estimated_price": "가격대 (예: 1~3만원)",
      "tip": "구매 시 주의사항이나 꿀팁 한 줄"
    }
  ],
  "total_budget_estimate": "총 예산 예시 (예: 최소 15만원~)",
  "summary": "이 사람에게 한 줄 조언"
}
추천 개수는 8개로 고정.`;
}

async function enrichWithCoupangUrls(
  recommendations: AiRecommendation[]
): Promise<AiRecommendation[]> {
  const itemNames = recommendations.map((r) => r.item_name);

  const { data: items } = await supabaseAdmin
    .from('items')
    .select('id, name')
    .in('name', itemNames);

  if (!items || items.length === 0) return recommendations;

  const itemIdByName: Record<string, string> = {};
  for (const item of items) {
    itemIdByName[item.name as string] = item.id as string;
  }

  const itemIds = Object.values(itemIdByName);
  const { data: products } = await supabaseAdmin
    .from('products')
    .select('item_id, coupang_url')
    .in('item_id', itemIds)
    .eq('type', 'budget');

  if (!products || products.length === 0) return recommendations;

  const coupangByItemId: Record<string, string> = {};
  for (const product of products) {
    coupangByItemId[product.item_id as string] = product.coupang_url as string;
  }

  return recommendations.map((r) => {
    const itemId = itemIdByName[r.item_name];
    const url = itemId ? coupangByItemId[itemId] : undefined;
    return url ? { ...r, coupang_url: url } : r;
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!isValidRequest(body)) {
      return Response.json(
        { error: '입력값이 올바르지 않습니다.' },
        { status: 400 }
      );
    }

    const cacheKey = generateCacheKey(body);

    const cached = await checkCache(cacheKey);
    if (cached) {
      return Response.json({ data: cached, cached: true }, { status: 200 });
    }

    const message = await anthropic.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 1500,
      system:
        '당신은 자취 생활 전문가입니다. 응답은 반드시 JSON 형식으로만 반환하세요. 마크다운 코드블록이나 추가 설명 없이 순수 JSON만 반환하세요.',
      messages: [{ role: 'user', content: buildPrompt(body) }],
    });

    const content = message.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from Claude');
    }

    const cleaned = content.text
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();
    const parsed = JSON.parse(cleaned) as AiRecommendResult;

    const enriched = await enrichWithCoupangUrls(parsed.recommendations).catch(
      () => parsed.recommendations
    );
    const result: AiRecommendResult = { ...parsed, recommendations: enriched };

    saveCache(cacheKey, result, 24).catch(() => undefined);

    return Response.json({ data: result, cached: false }, { status: 200 });
  } catch (error) {
    console.error('[api/ai/recommend] Error:', error);
    return Response.json(
      { error: '서버 오류가 발생했어요. 잠시 후 다시 시도해주세요.' },
      { status: 500 }
    );
  }
}

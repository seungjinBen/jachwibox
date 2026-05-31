import anthropic, { CLAUDE_MODEL, DEFAULT_MAX_TOKENS } from '@/lib/anthropic';
import { generateCacheKey, checkCache, saveCache } from '@/lib/cache';
import type { AiRecommendation } from '@/types';

interface RecommendRequest {
  room_type: string;
  season: string;
  cooking_freq: 'never' | 'sometimes' | 'often';
  budget: number;
  work_from_home: boolean;
}

interface RecommendResponse {
  recommendations: AiRecommendation[];
}

function buildPrompt(body: RecommendRequest): string {
  const cookingMap = { never: '거의 안 함', sometimes: '가끔', often: '자주' };

  return `당신은 자취 생활 전문가입니다. 다음 조건의 자취생에게 지금 당장 사야 할 품목을 우선순위 순으로 추천해주세요.

조건:
- 방 유형: ${body.room_type}
- 현재 계절: ${body.season}
- 요리 빈도: ${cookingMap[body.cooking_freq]}
- 예산: ${body.budget.toLocaleString()}원
- 재택 근무 여부: ${body.work_from_home ? '예' : '아니오'}

응답은 반드시 아래 JSON 형식으로만 반환하세요. 마크다운 코드블록(\`\`\`)이나 추가 설명 없이 순수 JSON만 반환하세요:
{
  "recommendations": [
    {
      "rank": 1,
      "item_name": "품목명",
      "reason": "이 조건에서 이 품목이 우선순위인 이유 (한 문장)",
      "priority": "must"
    }
  ]
}

priority는 반드시 "must", "recommend", "optional" 중 하나만 사용하세요.
최대 10개까지 추천해주세요.`;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as RecommendRequest;

    if (!body.room_type || !body.season || !body.cooking_freq || body.budget == null) {
      return Response.json(
        { error: 'room_type, season, cooking_freq, budget 값이 필요합니다.' },
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
      max_tokens: DEFAULT_MAX_TOKENS,
      system:
        '당신은 자취 생활 전문가입니다. 응답은 반드시 JSON 형식으로만 반환하세요. 마크다운 코드블록이나 추가 설명 없이 순수 JSON만 반환하세요.',
      messages: [{ role: 'user', content: buildPrompt(body) }],
    });

    const content = message.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from Claude');
    }

    const result = JSON.parse(content.text) as RecommendResponse;

    await saveCache(cacheKey, result, 24);

    return Response.json({ data: result, cached: false }, { status: 200 });
  } catch (error) {
    console.error('[api/ai/recommend] Error:', error);
    return Response.json(
      { error: '서버 오류가 발생했어요. 잠시 후 다시 시도해주세요.' },
      { status: 500 }
    );
  }
}

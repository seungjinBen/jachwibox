import { supabase } from '@/lib/supabase';
import type { Season } from '@/types';

export const dynamic = 'force-dynamic';

const VALID_SEASONS: Season[] = ['spring', 'summer', 'fall', 'winter'];

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const season = searchParams.get('season') as Season | null;

    if (!season || !VALID_SEASONS.includes(season)) {
      return Response.json(
        { error: '올바른 season 값을 입력해주세요. (spring | summer | fall | winter)' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('seasonal_tips')
      .select('id, season, title, content, item_id, sort_order')
      .eq('season', season)
      .order('sort_order');

    if (error) throw error;

    return Response.json({ data: data ?? [] }, { status: 200 });
  } catch (error) {
    console.error('[api/seasonal] Error:', error);
    return Response.json(
      { error: '서버 오류가 발생했어요. 잠시 후 다시 시도해주세요.' },
      { status: 500 }
    );
  }
}

import { supabase } from '@/lib/supabase';
import type { RoomType } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const roomType = searchParams.get('room_type') as RoomType | null;

    if (!roomType || !['open', 'separated', 'two_room'].includes(roomType)) {
      return Response.json(
        { error: '올바른 room_type을 입력해주세요.' },
        { status: 400 }
      );
    }

    const { data: categories, error: catError } = await supabase
      .from('categories')
      .select('id, name, icon, sort_order')
      .contains('room_types', [roomType])
      .order('sort_order');

    if (catError) throw catError;

    const categoryIds = (categories ?? []).map((c) => c.id);

    const { data: items, error: itemError } = await supabase
      .from('items')
      .select(`
        id, category_id, name, priority, room_types,
        price_min, price_max, price_display, description,
        products (id, item_id, type, name, reason, price, coupang_url)
      `)
      .in('category_id', categoryIds)
      .contains('room_types', [roomType])
      .order('priority');

    if (itemError) throw itemError;

    const itemsWithCategoryName = (items ?? []).map((item) => {
      const category = (categories ?? []).find((c) => c.id === item.category_id);
      return { ...item, category_name: category?.name ?? '' };
    });

    return Response.json({ data: itemsWithCategoryName }, { status: 200 });
  } catch (error) {
    console.error('[api/items] Error:', error);
    return Response.json(
      { error: '서버 오류가 발생했어요. 잠시 후 다시 시도해주세요.' },
      { status: 500 }
    );
  }
}

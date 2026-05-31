import dotenv from 'dotenv';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import { CATEGORIES, ITEMS } from '../data/seed/items';
import { PRODUCTS } from '../data/seed/products';
import { SEASONAL_TIPS } from '../data/seed/seasonal_tips';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ 환경 변수 누락: NEXT_PUBLIC_SUPABASE_URL 또는 SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

// ─── Step 1: 카테고리 삽입 ──────────────────────────────────────────────────
async function seedCategories(): Promise<Record<string, string>> {
  console.log('📦 카테고리 삽입 중...');

  const { data: existing, error: fetchErr } = await supabase
    .from('categories')
    .select('id, name');
  if (fetchErr) throw new Error(`카테고리 조회 실패: ${fetchErr.message}`);

  const existingMap = new Map<string, string>(
    (existing ?? []).map((c: { id: string; name: string }) => [c.name, c.id])
  );

  const toInsert = CATEGORIES.filter((c) => !existingMap.has(c.name));

  if (toInsert.length > 0) {
    const { data: inserted, error } = await supabase
      .from('categories')
      .insert(
        toInsert.map((c) => ({
          name: c.name,
          icon: c.icon,
          room_types: c.room_types,
          sort_order: c.sort_order,
        }))
      )
      .select('id, name');
    if (error) throw new Error(`카테고리 삽입 실패: ${error.message}`);
    (inserted ?? []).forEach((c: { id: string; name: string }) =>
      existingMap.set(c.name, c.id)
    );
  }

  console.log(
    `  ✅ 카테고리 ${CATEGORIES.length}개 완료 (신규 ${toInsert.length}개)`
  );

  const keyToId: Record<string, string> = {};
  for (const cat of CATEGORIES) {
    const id = existingMap.get(cat.name);
    if (id) keyToId[cat.key] = id;
  }
  return keyToId;
}

// ─── Step 2: 품목 삽입 ───────────────────────────────────────────────────────
async function seedItems(
  categoryKeyToId: Record<string, string>
): Promise<Record<string, string>> {
  console.log('📋 품목 삽입 중...');

  const { data: existing, error: fetchErr } = await supabase
    .from('items')
    .select('id, name');
  if (fetchErr) throw new Error(`품목 조회 실패: ${fetchErr.message}`);

  const existingMap = new Map<string, string>(
    (existing ?? []).map((i: { id: string; name: string }) => [i.name, i.id])
  );

  const toInsert = ITEMS.filter((i) => !existingMap.has(i.name));

  if (toInsert.length > 0) {
    const { data: inserted, error } = await supabase
      .from('items')
      .insert(
        toInsert.map((i) => ({
          category_id: categoryKeyToId[i.category_key],
          name: i.name,
          priority: i.priority,
          room_types: i.room_types,
          price_min: i.price_min,
          price_max: i.price_max,
          price_display: i.price_display,
          description: i.description,
        }))
      )
      .select('id, name');
    if (error) throw new Error(`품목 삽입 실패: ${error.message}`);
    (inserted ?? []).forEach((i: { id: string; name: string }) =>
      existingMap.set(i.name, i.id)
    );
  }

  console.log(`  ✅ 품목 ${ITEMS.length}개 완료 (신규 ${toInsert.length}개)`);

  const nameToId: Record<string, string> = {};
  for (const item of ITEMS) {
    const id = existingMap.get(item.name);
    if (id) nameToId[item.name] = id;
  }
  return nameToId;
}

// ─── Step 3: 상품 삽입 ───────────────────────────────────────────────────────
async function seedProducts(itemNameToId: Record<string, string>): Promise<void> {
  console.log('🛒 상품 삽입 중...');

  const { data: existing, error: fetchErr } = await supabase
    .from('products')
    .select('item_id, type');
  if (fetchErr) throw new Error(`상품 조회 실패: ${fetchErr.message}`);

  const existingSet = new Set<string>(
    (existing ?? []).map(
      (p: { item_id: string; type: string }) => `${p.item_id}:${p.type}`
    )
  );

  const toInsert = PRODUCTS.filter((p) => {
    const itemId = itemNameToId[p.item_name];
    return itemId && !existingSet.has(`${itemId}:${p.type}`);
  });

  if (toInsert.length > 0) {
    const { error } = await supabase.from('products').insert(
      toInsert.map((p) => ({
        item_id: itemNameToId[p.item_name],
        type: p.type,
        name: p.name,
        reason: p.reason,
        price: p.price,
        coupang_url: p.coupang_url,
      }))
    );
    if (error) throw new Error(`상품 삽입 실패: ${error.message}`);
  }

  console.log(`  ✅ 상품 ${PRODUCTS.length}개 완료 (신규 ${toInsert.length}개)`);
}

// ─── Step 4: 계절 팁 삽입 ────────────────────────────────────────────────────
async function seedSeasonalTips(
  itemNameToId: Record<string, string>
): Promise<void> {
  console.log('🌿 계절 팁 삽입 중...');

  const { data: existing, error: fetchErr } = await supabase
    .from('seasonal_tips')
    .select('season, title');
  if (fetchErr) throw new Error(`계절 팁 조회 실패: ${fetchErr.message}`);

  const existingSet = new Set<string>(
    (existing ?? []).map(
      (t: { season: string; title: string }) => `${t.season}:${t.title}`
    )
  );

  const toInsert = SEASONAL_TIPS.filter(
    (t) => !existingSet.has(`${t.season}:${t.title}`)
  );

  if (toInsert.length > 0) {
    const { error } = await supabase.from('seasonal_tips').insert(
      toInsert.map((t) => ({
        season: t.season,
        title: t.title,
        content: t.content,
        item_id: t.item_name ? (itemNameToId[t.item_name] ?? null) : null,
        sort_order: t.sort_order,
      }))
    );
    if (error) throw new Error(`계절 팁 삽입 실패: ${error.message}`);
  }

  console.log(
    `  ✅ 계절 팁 ${SEASONAL_TIPS.length}개 완료 (신규 ${toInsert.length}개)`
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main(): Promise<void> {
  console.log('\n🚀 자취박스 시드 데이터 삽입 시작...\n');

  try {
    const categoryKeyToId = await seedCategories();
    const itemNameToId = await seedItems(categoryKeyToId);
    await seedProducts(itemNameToId);
    await seedSeasonalTips(itemNameToId);

    console.log('\n✨ 모든 시드 데이터 삽입 완료!\n');
  } catch (error) {
    console.error('\n❌ 시드 실패:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

void main();

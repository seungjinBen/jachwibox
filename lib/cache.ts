import { supabaseAdmin } from '@/lib/supabase';
import { createHash } from 'crypto';

export function generateCacheKey(params: object): string {
  const serialized = JSON.stringify(params, Object.keys(params).sort());
  return createHash('sha256').update(serialized).digest('hex');
}

export async function checkCache(key: string): Promise<object | null> {
  const { data, error } = await supabaseAdmin
    .from('ai_cache')
    .select('result')
    .eq('cache_key', key)
    .gt('expires_at', new Date().toISOString())
    .single();

  if (error || !data) return null;
  return data.result as object;
}

export async function saveCache(
  key: string,
  result: object,
  hours: number
): Promise<void> {
  const expiresAt = new Date(Date.now() + hours * 60 * 60 * 1000).toISOString();

  const { error } = await supabaseAdmin.from('ai_cache').upsert({
    cache_key: key,
    result,
    expires_at: expiresAt,
  });

  if (error) {
    console.error('[cache] saveCache error:', error);
  }
}

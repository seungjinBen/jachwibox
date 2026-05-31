-- 품목 카테고리
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  icon TEXT,
  room_types TEXT[] NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 품목
CREATE TABLE items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  priority TEXT NOT NULL CHECK (priority IN ('must', 'recommend', 'optional')),
  room_types TEXT[] NOT NULL,
  price_min INT NOT NULL,
  price_max INT NOT NULL,
  price_display TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 상품 추천 (품목당 가성비/성능/디자인 3종)
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id UUID REFERENCES items(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('budget', 'performance', 'design')),
  name TEXT NOT NULL,
  reason TEXT NOT NULL,
  price INT NOT NULL,
  coupang_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 계절 팁
CREATE TABLE seasonal_tips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  season TEXT NOT NULL CHECK (season IN ('spring', 'summer', 'fall', 'winter')),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  item_id UUID REFERENCES items(id) ON DELETE SET NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- AI 응답 캐시 (Claude API 비용 절감)
CREATE TABLE ai_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cache_key TEXT UNIQUE NOT NULL,
  result JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL
);

-- 인덱스
CREATE INDEX idx_items_room_types ON items USING GIN (room_types);
CREATE INDEX idx_items_priority ON items (priority);
CREATE INDEX idx_seasonal_tips_season ON seasonal_tips (season);
CREATE UNIQUE INDEX idx_ai_cache_cache_key ON ai_cache (cache_key);
CREATE INDEX idx_ai_cache_expires_at ON ai_cache (expires_at);

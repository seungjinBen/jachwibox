export type RoomType = 'open' | 'separated' | 'two_room';
export type Season = 'spring' | 'summer' | 'fall' | 'winter';
export type Priority = 'must' | 'recommend' | 'optional';
export type ProductType = 'budget' | 'performance' | 'design';

export interface Category {
  id: string;
  name: string;
  icon: string | null;
  room_types: RoomType[];
  sort_order: number;
}

export interface Item {
  id: string;
  category_id: string;
  name: string;
  priority: Priority;
  room_types: RoomType[];
  price_min: number;
  price_max: number;
  price_display: string;
  description: string | null;
}

export interface Product {
  id: string;
  item_id: string;
  type: ProductType;
  name: string;
  reason: string;
  price: number;
  coupang_url: string;
}

export interface ItemWithProducts extends Item {
  products: Product[];
}

export interface SeasonalTip {
  id: string;
  season: Season;
  title: string;
  content: string;
  item_id: string | null;
  sort_order: number;
}

export interface AiRecommendation {
  rank: number;
  item_name: string;
  reason: string;
  priority: Priority;
}

export type ChecklistState = Record<string, boolean>;
